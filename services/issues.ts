import { getToken } from "@/utils/test-token-storage";
import { useCallback, useState } from "react";
import { useServicesEntries } from "./services_endpoints";

export type IssueStatus = 'open' | 'in_progress' | 'closed';
type IssuePriority = 'low' | 'medium' | 'high' | 'critical';
type IssueAttachment = {
    id: number;
    file: string;
    file_type: string;
    created_at: string;
};
type IssueTypeDetail = {
    id: number;
    name: string;
    sample_form: string;
    created_at: string;
};


export type IssueVote = {
    up: number,
    down: number,
    score: number,
    my_vote: number
}

export type IssueUser = {
    id: string,
    username: string,
    full_name: string,
    avatar?: string,
    first_name: string,
    last_name: string,
    is_staff: boolean,
    date_joined: string
}

export type Issue = {
    id: string;
    user: IssueUser;

    issue_type: number;
    issue_type_detail: IssueTypeDetail;

    title: string;
    description: string;

    status: IssueStatus;
    priority: IssuePriority;

    location_latitude: number | null;
    location_longitude: number | null;

    created_at: string;
    updated_at: string;
    closed_at: string | null;

    attachments: IssueAttachment[];
    vote_summary: IssueVote
};

type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Issue[];
};


export function useIssue(initialPage: number = 1) {
    const [page, setPage] = useState<number>(initialPage);
    const [status, setStatus] = useState<string | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    const [data, setData] = useState<PaginatedResponse<Issue> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { getIssuesEntry } = useServicesEntries();

    const fetchIssues = useCallback(async (statusFilter?: string | null, searchText?: string | null) => {
        setLoading(true);
        setError(null);

        try {
            const access = await getToken();

            const params = new URLSearchParams();
            params.append('page', page.toString());

            const statusToUse = statusFilter !== undefined ? statusFilter : status;
            // fetch issues data from status 
            const searchToUse = searchText !== undefined ? searchText : search;
            if (statusToUse) {
                params.append('status', statusToUse);
            }

            if (searchToUse) {
                params.append('search_title', searchToUse);
            }

            const url = `${getIssuesEntry}?${params.toString()}`;
            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access}`
                }
            });

            if (!res.ok) throw new Error(`Failed to fetch issues: ${res.status}`);

            const json: PaginatedResponse<Issue> = await res.json();
            setData(json);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    }, [page, status, getIssuesEntry]);

    const filterByStatus = useCallback(async (newStatus: string | null) => {
        setStatus(newStatus);
        await fetchIssues(newStatus);
        setPage(1);
    }, [fetchIssues]);

    const filterBySearch = useCallback(async (newSearch: string | null) => {
        setSearch(newSearch);
        await fetchIssues(null, newSearch);
        setPage(1);
    }, [fetchIssues]);

    return {
        issues: data?.results ?? [],
        count: data?.count ?? 0,
        currentPage: page,
        setPage,
        currentStatus: status,
        filterByStatus,
        filterBySearch,
        loading,
        fetchIssues,
        error,
        refetch: fetchIssues,
        next: data?.next,
        previous: data?.previous,
        hasNext: Boolean(data?.next),
        hasPrevious: Boolean(data?.previous),
    };

}
