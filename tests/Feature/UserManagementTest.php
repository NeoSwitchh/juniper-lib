<?php

use App\Models\AuditLog;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('users.index'))->assertRedirect(route('login'));
});

test('non-admin users are forbidden', function () {
    $this->actingAs(User::factory()->create(['role' => User::ROLE_USER]));

    $this->get(route('users.index'))->assertForbidden();
});

test('admins can view the users list', function () {
    $this->actingAs(User::factory()->create(['role' => User::ROLE_ADMIN]));

    $this->get(route('users.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('users/index')
            ->has('users'));
});

test('admins can create users', function () {
    $this->actingAs(User::factory()->create(['role' => User::ROLE_ADMIN]));

    $this->post(route('users.store'), [
        'name' => 'New Patron',
        'email' => 'patron@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'role' => User::ROLE_USER,
        'is_active' => '1',
    ])->assertRedirect(route('users.index'));

    $this->assertDatabaseHas('users', [
        'email' => 'patron@example.com',
        'role' => User::ROLE_USER,
        'is_active' => true,
    ]);

    expect(AuditLog::where('action', 'user.created')->exists())->toBeTrue();
});

test('admins can update users', function () {
    $admin = User::factory()->create(['role' => User::ROLE_ADMIN]);
    $user = User::factory()->create(['role' => User::ROLE_USER]);

    $this->actingAs($admin)
        ->put(route('users.update', $user), [
            'name' => 'Updated Name',
            'email' => $user->email,
            'role' => User::ROLE_USER,
            'is_active' => '1',
        ])
        ->assertRedirect(route('users.index'));

    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'Updated Name',
    ]);

    expect(AuditLog::where('action', 'user.updated')->exists())->toBeTrue();
});

test('admins cannot change their own role or status', function () {
    $admin = User::factory()->create(['role' => User::ROLE_ADMIN]);

    $this->actingAs($admin)
        ->put(route('users.update', $admin), [
            'name' => $admin->name,
            'email' => $admin->email,
            'role' => User::ROLE_USER,
            'is_active' => '0',
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('users', [
        'id' => $admin->id,
        'role' => User::ROLE_ADMIN,
        'is_active' => true,
    ]);
});

test('admins can delete other users', function () {
    $admin = User::factory()->create(['role' => User::ROLE_ADMIN]);
    $user = User::factory()->create(['role' => User::ROLE_USER]);

    $this->actingAs($admin)
        ->delete(route('users.destroy', $user))
        ->assertRedirect(route('users.index'));

    $this->assertDatabaseMissing('users', ['id' => $user->id]);

    expect(AuditLog::where('action', 'user.deleted')->exists())->toBeTrue();
});

test('admins cannot delete their own account', function () {
    $admin = User::factory()->create(['role' => User::ROLE_ADMIN]);

    $this->actingAs($admin)
        ->delete(route('users.destroy', $admin))
        ->assertRedirect();

    $this->assertDatabaseHas('users', ['id' => $admin->id]);
});
