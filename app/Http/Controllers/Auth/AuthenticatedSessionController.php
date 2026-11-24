<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'login' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        // Cek apakah login menggunakan email atau username
        $fieldType = filter_var($credentials['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        $authAttempt = [
            $fieldType => $credentials['login'],
            'password' => $credentials['password'],
        ];

        if (! Auth::attempt($authAttempt, $request->boolean('remember'))) {
            return back()->withErrors([
                'login' => 'Kombinasi identitas akun atau kata sandi tidak sesuai.',
            ]);
        }

        $user = Auth::user();

        // Pemeriksaan status akun aktif (Sesuai PRD 3.2.4)
        if (! $user->is_active) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return back()->withErrors([
                'login' => 'Akun Anda dinonaktifkan oleh sekolah. Silakan hubungi Operator.',
            ]);
        }

        // Catat waktu login terakhir
        $user->update(['last_login_at' => now()]);

        $request->session()->regenerate();

        // Redirect cerdas berdasarkan role (Sesuai PRD 3.2.1)
        if ($user->role === 'operator') {
            return redirect()->intended(route('operator.dashboard'));
        }

        return redirect()->intended(route('guru.dashboard'));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
