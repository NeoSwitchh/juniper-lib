import { Form } from '@inertiajs/react';
import UserController from '@/actions/App/Http/Controllers/UserController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type UserFormValues = {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    is_active: boolean;
};

type UserFormProps = {
    user?: UserFormValues;
    roles: string[];
};

export default function UserForm({ user, roles }: UserFormProps) {
    const isEditing = user !== undefined;

    return (
        <Form
            {...(isEditing
                ? UserController.update.form(user.id)
                : UserController.store.form())}
            options={{ preserveScroll: true }}
            className="space-y-6"
        >
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            defaultValue={user?.name ?? ''}
                            placeholder="Full name"
                            autoComplete="name"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            required
                            defaultValue={user?.email ?? ''}
                            placeholder="email@example.com"
                            autoComplete="username"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" defaultValue={user?.role ?? 'user'}>
                            <SelectTrigger id="role" className="w-full">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        <span className="capitalize">
                                            {role}
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            {isEditing ? 'New password' : 'Password'}
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            required={!isEditing}
                            placeholder={
                                isEditing
                                    ? 'Leave blank to keep current password'
                                    : 'Minimum 8 characters'
                            }
                            autoComplete="new-password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    {isEditing && (
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm new password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                placeholder="Repeat new password"
                                autoComplete="new-password"
                            />
                            <InputError
                                message={errors.password_confirmation}
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="is_active"
                            name="is_active"
                            value="1"
                            defaultChecked={user?.is_active ?? true}
                        />
                        <Label htmlFor="is_active">Active (can sign in)</Label>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />}
                            {isEditing ? 'Save changes' : 'Create user'}
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
