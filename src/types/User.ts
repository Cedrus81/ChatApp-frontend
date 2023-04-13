export type User = {
    id: number;
    email: string;
    photo?: string;
    name?: string;
    phone?: string;
    bio?: string;
}

export type ContextType = { user: User | null };
