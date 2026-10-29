<?php

namespace App\Observers;

use App\Models\User;
use App\Support\AuditLogger;

class UserObserver
{
    /**
     * Attributes that are recorded in the audit trail when they change.
     */
    private const AUDITED_ATTRIBUTES = ['name', 'email', 'role', 'is_active'];

    public function created(User $user): void
    {
        AuditLogger::log(
            'user.created',
            "Created user {$user->email}",
            $user,
            newValues: $this->audited($user->getAttributes()),
        );
    }

    public function updated(User $user): void
    {
        $changes = collect($user->getChanges())
            ->only(self::AUDITED_ATTRIBUTES);

        if ($changes->isEmpty()) {
            return;
        }

        AuditLogger::log(
            'user.updated',
            "Updated user {$user->email}",
            $user,
            oldValues: $this->audited($user->getOriginal()),
            newValues: $changes->all(),
        );
    }

    public function deleted(User $user): void
    {
        AuditLogger::log(
            'user.deleted',
            "Deleted user {$user->email}",
            $user,
            oldValues: $this->audited($user->getAttributes()),
        );
    }

    /**
     * @param  array<string, mixed>  $attributes
     * @return array<string, mixed>
     */
    private function audited(array $attributes): array
    {
        return array_intersect_key($attributes, array_flip(self::AUDITED_ATTRIBUTES));
    }
}
