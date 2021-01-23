export interface LoginResponseSuccess {
    access_token: string;
    token_type: string;
    expires_in: number;
}
export interface LoginResponseFailure {
    error: string;
}
