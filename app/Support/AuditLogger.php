<?php

namespace App\Support;

use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Model;

class AuditLogger
{
    /**
     * Record an audit log entry for the current request context.
     *
     * @param  array<string, mixed>  $oldValues
     * @param  array<string, mixed>  $newValues
     */
    public static function log(
        string $action,
        string $description,
        ?Model $auditable = null,
        array $oldValues = [],
        array $newValues = [],
    ): AuditLog {
        $request = request();

        return AuditLog::create([
            'user_id' => $request?->user()?->getAuthIdentifier(),
            'action' => $action,
            'description' => $description,
            'auditable_type' => $auditable?->getMorphClass(),
            'auditable_id' => $auditable?->getKey(),
            'old_values' => $oldValues === [] ? null : $oldValues,
            'new_values' => $newValues === [] ? null : $newValues,
            'ip_address' => $request?->ip(),
            'user_agent' => $request?->userAgent(),
        ]);
    }
}
