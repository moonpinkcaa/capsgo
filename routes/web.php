<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Operator\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes - CAPSGO SDN 003 Samarinda
|--------------------------------------------------------------------------
| Route diatur sesuai Dokumen PRD Bab 6 & Pembagian Tugas Anggota 1.
*/

// ==========================================
// 1. ROUTE PUBLIK (Bisa diakses tanpa login)
// PIC: Anggota 2
// ==========================================
Route::get('/', function () {
    return Inertia::render('Public/Home');
})->name('public.home');

Route::get('/profil-sekolah', function () {
    return Inertia::render('Public/SchoolProfile');
})->name('public.profile');

Route::get('/struktur-organisasi', function () {
    return Inertia::render('Public/Organization');
})->name('public.organization');

Route::get('/guru', function () {
    return Inertia::render('Public/Teachers/Index');
})->name('public.teachers.index');

Route::get('/fasilitas', function () {
    return Inertia::render('Public/Facilities/Index');
})->name('public.facilities.index');

Route::get('/ekstrakurikuler', function () {
    return Inertia::render('Public/Extracurriculars/Index');
})->name('public.extracurriculars.index');

Route::get('/kegiatan', function () {
    return Inertia::render('Public/Events/Index');
})->name('public.events.index');

Route::get('/prestasi', function () {
    return Inertia::render('Public/Achievements/Index');
})->name('public.achievements.index');

Route::get('/kontak', function () {
    return Inertia::render('Public/Contact');
})->name('public.contact');


// ==========================================
// 2. ROUTE AUTENTIKASI (Login & Logout)
// PIC: Anggota 1
// ==========================================
Route::middleware('guest')->group(function () {
    Route::get('/masuk', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/masuk', [AuthenticatedSessionController::class, 'store']);
});

Route::post('/keluar', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');


// ==========================================
// 3. ROUTE PORTAL GURU (Khusus Role 'guru')
// PIC: Anggota 3
// ==========================================
Route::middleware(['auth', 'role:guru'])->prefix('guru')->name('guru.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Guru/Dashboard');
    })->name('dashboard');

    Route::get('/jadwal', function () {
        return Inertia::render('Guru/Schedules/Index');
    })->name('schedules.index');

    Route::get('/kelas', function () {
        return Inertia::render('Guru/Classes/Index');
    })->name('classes.index');

    Route::get('/absensi', function () {
        return Inertia::render('Guru/Attendance/Index');
    })->name('attendance.index');

    Route::get('/dokumen', function () {
        return Inertia::render('Guru/Documents/Index');
    })->name('documents.index');
});


// ==========================================
// 4. ROUTE PORTAL OPERATOR (Khusus Role 'operator')
// PIC: Anggota 1 & Anggota 2 & Anggota 3
// ==========================================
Route::middleware(['auth', 'role:operator'])->prefix('operator')->name('operator.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Operator/Dashboard');
    })->name('dashboard');

    // Manajemen Akun Guru oleh Operator (PIC: Anggota 1)
    Route::get('/akun-guru', [UserController::class, 'index'])->name('users.index');
    Route::get('/akun-guru/tambah', [UserController::class, 'create'])->name('users.create');
    Route::post('/akun-guru', [UserController::class, 'store'])->name('users.store');
    Route::patch('/akun-guru/{user}/toggle', [UserController::class, 'toggleActive'])->name('users.toggle');

    // Modul Konten Publik (PIC: Anggota 2)
    Route::get('/profil-sekolah', function () {
        return Inertia::render('Operator/Content/SchoolProfile');
    })->name('school_profile');

    Route::get('/guru', function () {
        return Inertia::render('Operator/Content/Teachers');
    })->name('teachers');

    Route::get('/fasilitas', function () {
        return Inertia::render('Operator/Content/Facilities');
    })->name('facilities');

    Route::get('/ekstrakurikuler', function () {
        return Inertia::render('Operator/Content/Extracurriculars');
    })->name('extracurriculars');

    Route::get('/kegiatan', function () {
        return Inertia::render('Operator/Content/Events');
    })->name('events');

    Route::get('/prestasi', function () {
        return Inertia::render('Operator/Content/Achievements');
    })->name('achievements');

    // Modul Operasional & Berkas (PIC: Anggota 3)
    Route::get('/folder', function () {
        return Inertia::render('Operator/Documents/Folders');
    })->name('folders');

    Route::get('/dokumen', function () {
        return Inertia::render('Operator/Documents/Index');
    })->name('documents');

    Route::get('/absensi', function () {
        return Inertia::render('Operator/Operations/Attendance');
    })->name('attendance');

    Route::get('/koperasi', function () {
        return Inertia::render('Operator/Operations/Cooperative');
    })->name('cooperative');
});
