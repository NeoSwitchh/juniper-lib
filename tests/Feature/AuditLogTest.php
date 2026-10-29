<?php

use App\Models\AuditLog;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('audit-log.index'))->assertRedirect(route('login'));
});

test('non-admin users are forbidden', function () {
    $this->actingAs(User::factory()->create(['role' => User::ROLE_USER]));

    $this->get(route('audit-log.index'))->assertForbidden();
});

test('admins can view the audit log', function () {
    $this->actingAs(User::factory()->create(['role' => User::ROLE_ADMIN]));

    $this->get(route('audit-log.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('audit-log/index')
            ->has('logs')
            ->has('actions'));
});

test('the audit log can be filtered by action', function () {
    AuditLog::create([
        'user_id' => null,
        'action' => 'auth.login_failed',
        'description' => 'Failed login attempt for unknown@example.com',
        'ip_address' => '127.0.0.1',
    ]);
    AuditLog::create([
        'user_id' => null,
        'action' => 'auth.logout',
        'description' => 'Logged out: someone@example.com',
        'ip_address' => '127.0.0.1',
    ]);

    $this->actingAs(User::factory()->create(['role' => User::ROLE_ADMIN]))
        ->get(route('audit-log.index', ['action' => 'auth.login_failed']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('audit-log/index')
            ->has('logs', 1)
            ->where('logs.0.action', 'auth.login_failed'));
});

test('user creation is recorded in the audit log', function () {
    $admin = User::factory()->create(['role' => User::ROLE_ADMIN]);

    $this->actingAs($admin)
        ->post(route('users.store'), [
            'name' => 'Audited User',
            'email' => 'audited@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => User::ROLE_USER,
        ]);

    $log = AuditLog::where('action', 'user.created')
        ->where('description', 'Created user audited@example.com')
        ->first();

    expect($log)->not->toBeNull()
        ->and($log->user_id)->toBe($admin->id)
        ->and($log->new_values['email'])->toBe('audited@example.com');
});

test('successful logins are recorded in the audit log', function () {
    $user = User::factory()->create(['email' => 'login-audit@example.com']);

    $this->post(route('login'), [
        'email' => 'login-audit@example.com',
        'password' => 'password',
    ])->assertRedirect();

    expect(AuditLog::where('action', 'auth.login')
        ->where('user_id', $user->id)
        ->exists())->toBeTrue();
});

test('failed logins are recorded in the audit log', function () {
    $this->post(route('login'), [
        'email' => 'nobody@example.com',
        'password' => 'wrong-password',
    ])->assertSessionHasErrors();

    expect(AuditLog::where('action', 'auth.login_failed')
        ->where('description', 'like', '%nobody@example.com%')
        ->exists())->toBeTrue();
});
