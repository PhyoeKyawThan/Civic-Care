import { User } from "./User";

export type IssueType = {
    id: number,
    name: string,
    sample_form: string,
}

export type IssueStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type IssuePriority = 'low' | 'medium' | 'high' | 'critical'; 

export type Issue = {
    id: string,
    user: User | 'Anonymous',
    title: string,
    description: string,
    status: IssueStatus,
    priority: IssuePriority,
    location_latitude?: number,
    location_longitude?: number
}