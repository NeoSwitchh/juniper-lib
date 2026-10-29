<?php

namespace Database\Seeders;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Database\Seeder;

class AuditLogSeeder extends Seeder
{
    /**
     * Seed sample audit log entries.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@example.com')->first();
        $alice = User::where('email', 'alice@example.com')->first();
        $sarah = User::where('email', 'sarah@example.com')->first();

        $this->entry(
            action: 'auth.login',
            description: "Logged in: {$admin->email}",
            user: $admin,
            daysAgo: 6,
        );

        $this->entry(
            action: 'user.created',
            description: "Created user {$alice->email}",
            user: $admin,
            auditable: $alice,
            newValues: [
                'name' => $alice->name,
                'email' => $alice->email,
                'role' => $alice->role,
                'is_active' => true,
            ],
            daysAgo: 5,
        );

        $this->entry(
            action: 'user.created',
            description: "Created user {$sarah->email}",
            user: $admin,
            auditable: $sarah,
            newValues: [
                'name' => $sarah->name,
                'email' => $sarah->email,
                'role' => $sarah->role,
                'is_active' => true,
            ],
            daysAgo: 4,
        );

        $this->entry(
            action: 'auth.login_failed',
            description: 'Failed login attempt for unknown@example.com',
            daysAgo: 3,
        );

        $this->entry(
            action: 'auth.login',
            description: "Logged in: {$alice->email}",
            user: $alice,
            daysAgo: 2,
        );

        $this->entry(
            action: 'user.updated',
            description: "Updated user {$sarah->email}",
            user: $admin,
            auditable: $sarah,
            oldValues: ['name' => 'Sarah D.'],
            newValues: ['name' => $sarah->name],
            daysAgo: 1,
        );

        $this->entry(
            action: 'auth.logout',
            description: "Logged out: {$alice->email}",
            user: $alice,
            daysAgo: 1,
        );
    }

    /**
     * Create a single audit log entry with a backdated timestamp.
     *
     * @param  array<string, mixed>  $oldValues
     * @param  array<string, mixed>  $newValues
     */
    private function entry(
        string $action,
        string $description,
        ?User $user = null,
        ?User $auditable = null,
        array $oldValues = [],
        array $newValues = [],
        int $daysAgo = 0,
    ): void {
        $log = new AuditLog([
            'user_id' => $user?->id,
            'action' => $action,
            'description' => $description,
            'auditable_type' => $auditable?->getMorphClass(),
            'auditable_id' => $auditable?->getKey(),
            'old_values' => $oldValues === [] ? null : $oldValues,
            'new_values' => $newValues === [] ? null : $newValues,
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Seeder',
        ]);

        $when = now()->subDays($daysAgo)->subHours(3);
        $log->created_at = $when;
        $log->updated_at = $when;
        $log->save();
    }
}
