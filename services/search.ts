import { Search } from "@/types/search";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServicesEntries } from "./services_endpoints";

interface SearchSerivceProps {
    search: Search
}

type SearchResult = {
    id: string,
    title: string,
    description: string
}


export const useSearch = () => {
    const [result, setResult] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { getIssuesEntry } = useServicesEntries();
    const [search, setSearch] = useState<string>("");
    
    
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(()=>{
        doSearch(search);
    }, [search]);

    const doSearch = useCallback(async (searchText: string) => {
        if (!searchText.trim()) {
            setResult([]);
            return;
        }
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setLoading(true);
        try {
            const response = await fetch(`${getIssuesEntry}?search=${encodeURIComponent(searchText)}`, {
                signal: controller.signal, 
                headers: { "Content-Type": "application/json" }
            });

            if (!response.ok) throw new Error("Search failed");

            const data = await response.json();
        
            setResult(data.results || data); 
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    }, [getIssuesEntry]);

    useEffect(()=>{
        doSearch('');
    }, [])

    return { result, loading, doSearch };
}