<?php

namespace App\Providers;

use App\Models\User;
use App\Observers\UserObserver;
use App\Support\AuditLogger;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        User::observe(UserObserver::class);

        Event::listen(Login::class, function (Login $event): void {
            AuditLogger::log('auth.login', "Logged in: {$event->user->email}", $event->user);
        });

        Event::listen(Logout::class, function (Logout $event): void {
            if ($event->user !== null) {
                AuditLogger::log('auth.logout', "Logged out: {$event->user->email}", $event->user);
            }
        });

        Event::listen(Failed::class, function (Failed $event): void {
            $email = $event->credentials['email'] ?? 'unknown';

            AuditLogger::log('auth.login_failed', "Failed login attempt for {$email}");
        });
    }
}
