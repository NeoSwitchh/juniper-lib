import { Form, Head, usePage } from '@inertiajs/react';
import UserController from '@/actions/App/Http/Controllers/UserController';
import Heading from '@/components/heading';
import TextLink from '@/components/text-link';
import UserForm from '@/components/user-form';
import { Button } from '@/components/ui/button';
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
import { index as usersIndex } from '@/routes/users';
import type { Auth } from '@/types';

type ManagedUser = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    is_active: boolean;
};

type Props = {
    user: ManagedUser;
    roles: string[];
};

type PageProps = {
    auth: Auth;
};

export default function UserEdit({ user, roles }: Props) {
    useFlashToast();

    const { auth } = usePage<PageProps>().props;
    const isSelf = auth.user.id === user.id;

    return (
        <>
            <Head title={`Edit ${user.name}`} />

            <div className="mx-auto max-w-2xl space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        variant="small"
                        title={`Edit ${user.name}`}
                        description="Update the account details below"
                    />
                    <TextLink href={usersIndex()}>Back to users</TextLink>
                </div>

                <UserForm user={user} roles={roles} />

                <div className="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
                    <div className="space-y-0.5 text-red-600 dark:text-red-100">
                        <p className="font-medium">Danger zone</p>
                        <p className="text-sm">
                            Deleting this account permanently removes access.
                        </p>
                    </div>

                    {isSelf ? (
                        <p className="text-sm text-muted-foreground">
                            You cannot delete your own account.
                        </p>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive">
                                    Delete account
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Delete {user.name}?</DialogTitle>
                                <DialogDescription>
                                    This will permanently delete the account for{' '}
                                    {user.email}. This action cannot be undone.
                                </DialogDescription>
                                <Form {...UserController.destroy.form(user.id)}>
                                    {({ processing }) => (
                                        <DialogFooter className="gap-2">
                                            <DialogClose asChild>
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
                                                disabled={processing}
                                            >
                                                Delete user
                                            </Button>
                                        </DialogFooter>
                                    )}
                                </Form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </>
    );
}

UserEdit.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: usersIndex.url(),
        },
    ],
};
