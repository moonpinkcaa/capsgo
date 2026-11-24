<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Tampilkan daftar akun Guru
     */
    public function index(): Response
    {
        $teachers = User::where('role', 'guru')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Operator/Users/Index', [
            'teachers' => $teachers,
        ]);
    }

    /**
     * Form pembuatan akun Guru baru oleh Operator
     */
    public function create(): Response
    {
        return Inertia::render('Operator/Users/Create');
    }

    /**
     * Simpan akun Guru baru (Sesuai Lampiran D.8 PRD)
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'email' => ['nullable', 'string', 'lowercase', 'email', 'max:150', 'unique:'.User::class],
            'username' => ['nullable', 'string', 'max:80', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if (empty($request->email) && empty($request->username)) {
            return back()->withErrors(['login' => 'Email atau Username harus diisi minimal salah satu.']);
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role' => 'guru', // Selalu role guru dari form ini
            'is_active' => true,
        ]);

        return redirect()->route('operator.users.index')->with('success', 'Akun Guru berhasil dibuat.');
    }

    /**
     * Toggle status aktif / nonaktif akun Guru
     */
    public function toggleActive(User $user): RedirectResponse
    {
        if ($user->role !== 'guru') {
            abort(403, 'Hanya akun Guru yang dapat diatur dari modul ini.');
        }

        $user->update([
            'is_active' => ! $user->is_active,
        ]);

        $statusText = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Akun Guru {$user->name} berhasil {$statusText}.");
    }
}
