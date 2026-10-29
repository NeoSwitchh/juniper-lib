<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed application users.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Library Admin',
            'email' => 'admin@example.com',
            'role' => User::ROLE_ADMIN,
            'is_active' => true,
        ]);

        foreach ([
            ['name' => 'Alice Johnson', 'email' => 'alice@example.com'],
            ['name' => 'Sarah Davis', 'email' => 'sarah@example.com'],
            ['name' => 'David Miller', 'email' => 'david@example.com'],
        ] as $attributes) {
            User::factory()->create([
                ...$attributes,
                'role' => User::ROLE_USER,
                'is_active' => true,
            ]);
        }

        User::factory()->create([
            'name' => 'Suspended Patron',
            'email' => 'suspended@example.com',
            'role' => User::ROLE_USER,
            'is_active' => false,
        ]);
    }
}
