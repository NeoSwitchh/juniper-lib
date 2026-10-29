import { Form, Head, Link, router } from '@inertiajs/react';
import UserController from '@/actions/App/Http/Controllers/UserController';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useFlashToast } from '@/hooks/use-flash-toast';
import {
    create as createUser,
    edit as editUser,
    index as usersIndex,
} from '@/routes/users';
import type { PaginatorMeta } from '@/types/biblio';

type ManagedUser = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    is_active: boolean;
    created_at: string | null;
};

type Props = {
    users: ManagedUser[];
    meta: PaginatorMeta;
    filters: { q: string };
};

export default function UsersIndex({ users, meta, filters }: Props) {
    useFlashToast();

    return (
        <>
            <Head title="Users" />

            <div className="flex items-start justify-between">
                <Heading
                    title="Users"
                    description="Manage application user accounts"
                />
                <Button asChild>
                    <Link href={createUser()}>New user</Link>
                </Button>
            </div>

            <Form {...usersIndex.form()} className="mb-4 max-w-sm">
                <div className="flex gap-2">
                    <Input
                        type="search"
                        name="q"
                        defaultValue={filters.q}
                        placeholder="Search name or email..."
                        className="h-9"
                    />
                    <Button
                        type="submit"
                        variant="secondary"
                        size="sm"
                        className="h-9"
                    >
                        Search
                    </Button>
                </div>
            </Form>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="w-32 text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="text-muted-foreground">
                                    {user.id}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {user.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            user.role === 'admin'
                                                ? 'default'
                                                : 'secondary'
                                        }
                                        className="capitalize"
                                    >
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {user.is_active ? (
                                        <Badge variant="outline">Active</Badge>
                                    ) : (
                                        <Badge variant="destructive">
                                            Inactive
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {user.created_at
                                        ? user.created_at.split(' ')[0]
                                        : '—'}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            asChild
                                            variant="ghost"
                                            size="sm"
                                        >
                                            <Link href={editUser(user.id)}>
                                                Edit
                                            </Link>
                                        </Button>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive"
                                                >
                                                    Delete
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>
                                                    Delete {user.name}?
                                                </DialogTitle>
                                                <DialogDescription>
                                                    This will permanently delete
                                                    the account for {user.email}
                                                    . This action cannot be
                                                    undone.
                                                </DialogDescription>
                                                <Form
                                                    {...UserController.destroy.form(
                                                        user.id,
                                                    )}
                                                    options={{
                                                        preserveScroll: true,
                                                    }}
                                                >
                                                    {({ processing }) => (
                                                        <DialogFooter className="gap-2">
                                                            <DialogClose
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="secondary"
                                                                    type="button"
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </DialogClose>
                                                            <Button
                                                                variant="destructive"
                                                                type="submit"
                                                                disabled={
                                                                    processing
                                                                }
                                                            >
                                                                Delete user
                                                            </Button>
                                                        </DialogFooter>
                                                    )}
                                                </Form>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
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
                        usersIndex.url(),
                        {
                            ...(filters.q ? { q: filters.q } : {}),
                            page,
                        },
                        { preserveState: true, preserveScroll: true },
                    )
                }
            />
        </>
    );
}

UsersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: usersIndex.url(),
        },
    ],
};
