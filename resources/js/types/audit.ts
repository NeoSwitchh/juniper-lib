export type AuditLogEntry = {
    id: number;
    action: string;
    description: string;
    ip_address: string | null;
    created_at: string | null;
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
};
