<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * List application users.
     */
    public function index(Request $request): Response
    {
        $validated = $request->validate([
            'q' => ['nullable', 'string'],
        ]);

        $keyword = trim($validated['q'] ?? '');

        $users = User::query()
            ->when($keyword !== '', function ($query) use ($keyword) {
                $query->where(function ($q) use ($keyword) {
                    $q->where('name', 'like', '%'.$keyword.'%')
                        ->orWhere('email', 'like', '%'.$keyword.'%');
                });
            })
            ->orderBy('id')
            ->paginate(10)
            ->withQueryString();

        return inertia('users/index', [
            'users' => $users->getCollection()
                ->map(fn (User $user) => $this->toResource($user))
                ->values(),
            'meta' => [
                'currentPage' => $users->currentPage(),
                'lastPage' => $users->lastPage(),
                'total' => $users->total(),
            ],
            'filters' => [
                'q' => $keyword,
            ],
        ]);
    }

    /**
     * Show the create user form.
     */
    public function create(): Response
    {
        return inertia('users/create', [
            'roles' => User::ROLES,
        ]);
    }

    /**
     * Persist a new user.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'in:'.implode(',', User::ROLES)],
            'is_active' => ['nullable', 'boolean'],
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => $validated['role'],
            'is_active' => $request->boolean('is_active'),
        ]);

        return redirect()
            ->route('users.index')
            ->with('toast', ['type' => 'success', 'message' => 'User created.']);
    }

    /**
     * Show the edit user form.
     */
    public function edit(User $user): Response
    {
        return inertia('users/edit', [
            'user' => $this->toResource($user),
            'roles' => User::ROLES,
        ]);
    }

    /**
     * Update an existing user.
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$user->id],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'in:'.implode(',', User::ROLES)],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $isActive = $request->boolean('is_active');

        if ($user->is($request->user()) && ($validated['role'] !== $user->role || $isActive !== (bool) $user->is_active)) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You cannot change your own role or status.',
            ]);
        }

        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
            'is_active' => $isActive,
        ]);

        if (filled($validated['password'] ?? null)) {
            $user->password = $validated['password'];
        }

        $user->save();

        return redirect()
            ->route('users.index')
            ->with('toast', ['type' => 'success', 'message' => 'User updated.']);
    }

    /**
     * Delete a user.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($user->is($request->user())) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You cannot delete your own account.',
            ]);
        }

        $user->delete();

        return redirect()
            ->route('users.index')
            ->with('toast', ['type' => 'success', 'message' => 'User deleted.']);
    }

    /**
     * @return array<string, mixed>
     */
    private function toResource(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'is_active' => $user->is_active,
            'email_verified_at' => $user->email_verified_at?->toIso8601String(),
            'created_at' => $user->created_at?->toDateTimeString(),
            'updated_at' => $user->updated_at?->toDateTimeString(),
        ];
    }
}
