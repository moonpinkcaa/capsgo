<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Operator\UserController;
use App\Http\Controllers\Operator\SchoolProfileController;
use App\Http\Controllers\Operator\TeacherProfileController;
use App\Http\Controllers\Operator\FacilityController;
use App\Http\Controllers\Operator\ExtracurricularController;
use App\Http\Controllers\Operator\SchoolEventController;
use App\Http\Controllers\Operator\AchievementController;
use App\Models\TeacherProfile;
use App\Models\Facility;
use App\Models\Extracurricular;
use App\Models\SchoolEvent;
use App\Models\Achievement;
use App\Models\SchoolProfile;
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
    return Inertia::render('Public/SchoolProfile', [
        'profile' => SchoolProfile::first(),
    ]);
})->name('public.profile');

Route::get('/struktur-organisasi', function () {
    return Inertia::render('Public/Organization');
})->name('public.organization');

Route::get('/guru', function () {
    $teachers = TeacherProfile::where('is_published', true)->orderBy('created_at','desc')->get();
    return Inertia::render('Public/Teachers/Index', ['teachers' => $teachers]);
})->name('public.teachers.index');

Route::get('/fasilitas', function () {
    $facilities = Facility::where('publication_status','published')->orderBy('created_at','desc')->get();
    return Inertia::render('Public/Facilities/Index', ['facilities' => $facilities]);
})->name('public.facilities.index');

Route::get('/ekstrakurikuler', function () {
    $extracurriculars = Extracurricular::where('publication_status','published')->orderBy('created_at','desc')->get();
    return Inertia::render('Public/Extracurriculars/Index', ['extracurriculars' => $extracurriculars]);
})->name('public.extracurriculars.index');

Route::get('/kegiatan', function () {
    $events = SchoolEvent::where('publication_status','published')->orderBy('created_at','desc')->get();
    return Inertia::render('Public/Events/Index', ['events' => $events]);
})->name('public.events.index');

Route::get('/kegiatan/{event}', function (\App\Models\SchoolEvent $event) {
    return Inertia::render('Public/Events/Show', ['event' => $event]);
})->name('public.events.show');

Route::get('/prestasi', function () {
    $achievements = Achievement::where('publication_status','published')->orderBy('created_at','desc')->get();
    return Inertia::render('Public/Achievements/Index', ['achievements' => $achievements]);
})->name('public.achievements.index');

Route::get('/kontak', function () {
    return Inertia::render('Public/Contact', [
        'profile' => SchoolProfile::first(),
    ]);
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

    // Manajemen Akun Guru (Anggota 1)
    Route::get('/akun-guru', [UserController::class, 'index'])->name('users.index');
    Route::get('/akun-guru/tambah', [UserController::class, 'create'])->name('users.create');
    Route::post('/akun-guru', [UserController::class, 'store'])->name('users.store');
    Route::patch('/akun-guru/{user}/toggle', [UserController::class, 'toggleActive'])->name('users.toggle');

    // Profil Sekolah (Anggota 2)
    Route::get('/profil-sekolah', [SchoolProfileController::class, 'edit'])->name('school_profile');
    Route::put('/profil-sekolah', [SchoolProfileController::class, 'update'])->name('school_profile.update');

    // Data Guru Publik (Anggota 2)
    Route::get('/guru', [TeacherProfileController::class, 'index'])->name('teachers.index');
    Route::get('/guru/tambah', [TeacherProfileController::class, 'create'])->name('teachers.create');
    Route::post('/guru', [TeacherProfileController::class, 'store'])->name('teachers.store');
    Route::get('/guru/{teacher}/edit', [TeacherProfileController::class, 'edit'])->name('teachers.edit');
    Route::put('/guru/{teacher}', [TeacherProfileController::class, 'update'])->name('teachers.update');
    Route::delete('/guru/{teacher}', [TeacherProfileController::class, 'destroy'])->name('teachers.destroy');

    // Fasilitas (Anggota 2)
    Route::get('/fasilitas', [FacilityController::class, 'index'])->name('facilities.index');
    Route::get('/fasilitas/tambah', [FacilityController::class, 'create'])->name('facilities.create');
    Route::post('/fasilitas', [FacilityController::class, 'store'])->name('facilities.store');
    Route::get('/fasilitas/{facility}/edit', [FacilityController::class, 'edit'])->name('facilities.edit');
    Route::put('/fasilitas/{facility}', [FacilityController::class, 'update'])->name('facilities.update');
    Route::delete('/fasilitas/{facility}', [FacilityController::class, 'destroy'])->name('facilities.destroy');

    // Ekstrakurikuler (Anggota 2)
    Route::get('/ekstrakurikuler', [ExtracurricularController::class, 'index'])->name('extracurriculars.index');
    Route::get('/ekstrakurikuler/tambah', [ExtracurricularController::class, 'create'])->name('extracurriculars.create');
    Route::post('/ekstrakurikuler', [ExtracurricularController::class, 'store'])->name('extracurriculars.store');
    Route::get('/ekstrakurikuler/{extracurricular}/edit', [ExtracurricularController::class, 'edit'])->name('extracurriculars.edit');
    Route::put('/ekstrakurikuler/{extracurricular}', [ExtracurricularController::class, 'update'])->name('extracurriculars.update');
    Route::delete('/ekstrakurikuler/{extracurricular}', [ExtracurricularController::class, 'destroy'])->name('extracurriculars.destroy');

    // Kegiatan & Dokumentasi (Anggota 2)
    Route::get('/kegiatan', [SchoolEventController::class, 'index'])->name('events.index');
    Route::get('/kegiatan/tambah', [SchoolEventController::class, 'create'])->name('events.create');
    Route::post('/kegiatan', [SchoolEventController::class, 'store'])->name('events.store');
    Route::get('/kegiatan/{event}/edit', [SchoolEventController::class, 'edit'])->name('events.edit');
    Route::put('/kegiatan/{event}', [SchoolEventController::class, 'update'])->name('events.update');
    Route::delete('/kegiatan/{event}', [SchoolEventController::class, 'destroy'])->name('events.destroy');

    // Prestasi Siswa (Anggota 2)
    Route::get('/prestasi', [AchievementController::class, 'index'])->name('achievements.index');
    Route::get('/prestasi/tambah', [AchievementController::class, 'create'])->name('achievements.create');
    Route::post('/prestasi', [AchievementController::class, 'store'])->name('achievements.store');
    Route::get('/prestasi/{achievement}/edit', [AchievementController::class, 'edit'])->name('achievements.edit');
    Route::put('/prestasi/{achievement}', [AchievementController::class, 'update'])->name('achievements.update');
    Route::delete('/prestasi/{achievement}', [AchievementController::class, 'destroy'])->name('achievements.destroy');

    // Operasional & Arsip (Anggota 3)
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
