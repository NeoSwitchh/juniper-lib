<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Response;

class AuditLogController extends Controller
{
    /**
     * Show the audit log listing.
     */
    public function index(Request $request): Response
    {
        $validated = $request->validate([
            'q' => ['nullable', 'string'],
            'action' => ['nullable', 'string'],
        ]);

        $keyword = trim($validated['q'] ?? '');
        $action = $validated['action'] ?? '';

        $logs = AuditLog::query()
            ->with('user')
            ->when($action !== '', fn ($query) => $query->where('action', $action))
            ->when($keyword !== '', function ($query) use ($keyword) {
                $query->where(function ($q) use ($keyword) {
                    $q->whereHas('user', function ($uq) use ($keyword) {
                        $uq->where('name', 'like', '%'.$keyword.'%')
                            ->orWhere('email', 'like', '%'.$keyword.'%');
                    })->orWhere('description', 'like', '%'.$keyword.'%');
                });
            })
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(15)
            ->withQueryString();

        return inertia('audit-log/index', [
            'logs' => $logs->getCollection()
                ->map(fn (AuditLog $log) => [
                    'id' => $log->id,
                    'action' => $log->action,
                    'description' => $log->description,
                    'ip_address' => $log->ip_address,
                    'created_at' => $log->created_at?->toDateTimeString(),
                    'user' => $log->user === null ? null : [
                        'id' => $log->user->id,
                        'name' => $log->user->name,
                        'email' => $log->user->email,
                    ],
                ])
                ->values(),
            'meta' => [
                'currentPage' => $logs->currentPage(),
                'lastPage' => $logs->lastPage(),
                'total' => $logs->total(),
            ],
            'filters' => [
                'q' => $keyword,
                'action' => $action,
            ],
            'actions' => AuditLog::query()->distinct()->orderBy('action')->pluck('action')->values(),
        ]);
    }
}
