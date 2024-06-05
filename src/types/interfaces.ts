export interface LoginPayload {
    email: string
    password: string
}

export interface User {
    email: string;
    email_verified_at?: Date;
    id: number;
    name: string;
    two_factor_confirmed_at?: Date;
    two_factor_recovery_codes?: number;
    two_factor_secret?: string;
    updated_at: Date;
    created_at: Date;
}