import { getToken } from "@/utils/test-token-storage";
import { useEffect, useState } from "react";
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


export function useIssue(page: number = 1) {
    const [data, setData] = useState<PaginatedResponse<Issue> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { getIssuesEntry } = useServicesEntries();
    useEffect(() => {
        let isMounted = true;

        const fetchIssues = async () => {
            setLoading(true);
            setError(null);

            try {
                const access = await getToken();
                const res = await fetch(`${getIssuesEntry}?page=${page}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access}`
                    }
                });
                if (!res.ok) throw new Error("Failed to fetch issues");

                const json: PaginatedResponse<Issue> = await res.json();

                if (isMounted) {
                    setData(json);
                }
            } catch (err) {
                if (isMounted) {
                    setError((err as Error).message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchIssues();

        return () => {
            isMounted = false;
        };
    }, [page, getIssuesEntry]);

    return {
        issues: data?.results ?? [],
        count: data?.count ?? 0,
        next: data?.next,
        previous: data?.previous,
        hasNext: Boolean(data?.next),
        hasPrevious: Boolean(data?.previous),
        loading,
        error,
    };

}
