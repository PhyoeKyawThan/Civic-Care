import { IssuePriority, IssueStatus } from "./Issue"

export type IssuePostUser = {
    id: string,
    username: string,
    avatar?: string,
    first_name: string,
    last_name: string,
    is_staff: boolean, // decide whether posted user is administrator or not
    date_joined: string,
}

export type IssuePostIssueType = {
    id: number,
    name: string,
}

export type IssuePostAttachment = {
    id: number,
    file: string,
    file_type: string,
    created_at: string
}

export type IssuePost = {
    id: number,
    user: IssuePostUser,
    issue_type_detail: IssuePostIssueType,
    title: string,
    description: string,
    status: IssueStatus,
    priority: IssuePriority,
    location_latitude?: number,
    location_longtitude?: number,
    created_at: string,
    update_at?: string,
    closed_at?: string,
    attachments: IssuePostAttachment[]
}