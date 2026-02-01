export type UserRole = 'citizan' | 'administrator';

export interface User {
    id: string,
    username: string,
    full_name: string,
    email: string,
    phone: string,
    avatar?: string,
    date_of_birth: string,
    role: UserRole,
    created_at: string,
    updated_at: string,
}

export interface LoginCredentials {
    email: string,
    password: string
}

export interface SignupData {
    username?: string,
    email: string,
    phone: string,
    password: string,
    fullName?: string,
    dateOfBirth: string,
    avatar?: string,
    role: string
}
