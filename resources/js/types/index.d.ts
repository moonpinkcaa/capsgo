export interface User {
    id: number;
    name: string;
    email: string;
    username?: string | null;
    role: 'guru' | 'operator';
    is_active: boolean;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        success?: string;
        error?: string;
    };
};
