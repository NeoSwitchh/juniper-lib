import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import TextLink from '@/components/text-link';
import UserForm from '@/components/user-form';
import { create as createUser, index as usersIndex } from '@/routes/users';

export default function UserCreate({ roles }: { roles: string[] }) {
    return (
        <>
            <Head title="New user" />

            <div className="mx-auto max-w-2xl space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        variant="small"
                        title="New user"
                        description="Create a new application account"
                    />
                    <TextLink href={usersIndex()}>Back to users</TextLink>
                </div>

                <UserForm roles={roles} />
            </div>
        </>
    );
}

UserCreate.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: usersIndex.url(),
        },
        {
            title: 'New user',
            href: createUser.url(),
        },
    ],
};
