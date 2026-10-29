import { Form, Head, router } from '@inertiajs/react';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { index as auditLog } from '@/routes/audit-log';
import type { AuditLogEntry } from '@/types/audit';
import type { PaginatorMeta } from '@/types/biblio';
import type { VariantProps } from 'class-variance-authority';

type Props = {
    logs: AuditLogEntry[];
    meta: PaginatorMeta;
    filters: { q: string; action: string };
    actions: string[];
};

const actionVariant = (
    action: string,
): NonNullable<VariantProps<typeof badgeVariants>['variant']> => {
    switch (action) {
        case 'auth.login':
            return 'default';
        case 'auth.login_failed':
            return 'destructive';
        case 'user.deleted':
            return 'destructive';
        case 'user.updated':
            return 'outline';
        case 'auth.logout':
        case 'user.created':
        default:
            return 'secondary';
    }
};

export default function AuditLogIndex({ logs, meta, filters, actions }: Props) {
    return (
        <>
            <Head title="Audit Log" />

            <Heading
                title="Audit Log"
                description="Activity trail for user management and authentication"
            />

            <Form
                {...auditLog.form()}
                className="mb-4 flex flex-wrap items-end gap-3"
            >
                <div className="grid gap-1.5">
                    <label htmlFor="filter-q" className="text-sm font-medium">
                        User or description
                    </label>
                    <Input
                        id="filter-q"
                        type="search"
                        name="q"
                        defaultValue={filters.q}
                        placeholder="Search..."
                        className="h-9 w-64"
                    />
                </div>

                <div className="grid gap-1.5">
                    <label
                        htmlFor="filter-action"
                        className="text-sm font-medium"
                    >
                        Action
                    </label>
                    <Select
                        name="action"
                        defaultValue={
                            filters.action === '' ? 'all' : filters.action
                        }
                    >
                        <SelectTrigger id="filter-action" className="h-9 w-48">
                            <SelectValue placeholder="All actions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All actions</SelectItem>
                            {actions.map((action) => (
                                <SelectItem key={action} value={action}>
                                    {action}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    className="h-9"
                >
                    Filter
                </Button>
            </Form>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-44">Time</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="w-40">Action</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-32">IP Address</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="py-12 text-center text-muted-foreground"
                                >
                                    No audit log entries found.
                                </TableCell>
                            </TableRow>
                        )}
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="text-xs text-muted-foreground">
                                    {log.created_at ?? '—'}
                                </TableCell>
                                <TableCell>
                                    {log.user ? (
                                        <div>
                                            <p className="text-sm font-medium">
                                                {log.user.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {log.user.email}
                                            </p>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">
                                            —
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={actionVariant(log.action)}>
                                        {log.action}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {log.description}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {log.ip_address ?? '—'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Pagination
                currentPage={meta.currentPage}
                lastPage={meta.lastPage}
                onPageChange={(page) =>
                    router.get(
                        auditLog.url(),
                        {
                            ...(filters.q ? { q: filters.q } : {}),
                            ...(filters.action
                                ? { action: filters.action }
                                : {}),
                            page,
                        },
                        { preserveState: true, preserveScroll: true },
                    )
                }
            />
        </>
    );
}

AuditLogIndex.layout = {
    breadcrumbs: [
        {
            title: 'Audit Log',
            href: auditLog.url(),
        },
    ],
};
