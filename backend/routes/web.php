<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes - CAPSGO (SDN 003 Samarinda)
|--------------------------------------------------------------------------
|
| Dibangun sesuai spesifikasi CAPSGO.md.
| Modul Publik dan Modul Operator Konten Publik (PIC: Anggota 2).
|
*/

// ==========================================
// 1. ROUTE WEBSITE PUBLIK (Tanpa Login)
// ==========================================
Route::group([], function () {
    Route::get('/', \App\Http\Controllers\Public\HomeController::class)->name('public.home');
    Route::get('/profil-sekolah', [\App\Http\Controllers\Public\SchoolProfileController::class, 'profile'])->name('public.profile');
    Route::get('/struktur-organisasi', [\App\Http\Controllers\Public\SchoolProfileController::class, 'organization'])->name('public.organization');
    Route::get('/guru', [\App\Http\Controllers\Public\TeacherController::class, 'index'])->name('public.teachers.index');
    Route::get('/fasilitas', [\App\Http\Controllers\Public\FacilityController::class, 'index'])->name('public.facilities.index');
    Route::get('/ekstrakurikuler', [\App\Http\Controllers\Public\ExtracurricularController::class, 'index'])->name('public.extracurriculars.index');
    Route::get('/kegiatan', [\App\Http\Controllers\Public\SchoolEventController::class, 'index'])->name('public.events.index');
    Route::get('/kegiatan/{event}', [\App\Http\Controllers\Public\SchoolEventController::class, 'show'])->name('public.events.show');
    Route::get('/prestasi', [\App\Http\Controllers\Public\AchievementController::class, 'index'])->name('public.achievements.index');
    Route::get('/kontak', \App\Http\Controllers\Public\ContactController::class)->name('public.contact');
});

// ==========================================
// 2. ROUTE AUTENTIKASI (Dikelola Anggota 1)
// ==========================================
// Placeholder route autentikasi untuk pengujian navigasi jika belum login
Route::get('/masuk', function () {
    return \Inertia\Inertia::render('Auth/Login');
})->name('login');

// ==========================================
// 3. ROUTE OPERATOR (Pengelolaan Konten Publik - PIC Anggota 2)
// ==========================================
Route::prefix('operator')->name('operator.')->group(function () {
    // Pengelolaan Profil Sekolah
    Route::get('/profil-sekolah', [\App\Http\Controllers\Operator\SchoolProfileController::class, 'index'])->name('school-profile.index');
    Route::put('/profil-sekolah', [\App\Http\Controllers\Operator\SchoolProfileController::class, 'update'])->name('school-profile.update');

    // Pengelolaan Fasilitas
    Route::get('/fasilitas', [\App\Http\Controllers\Operator\FacilityController::class, 'index'])->name('facilities.index');
    Route::post('/fasilitas', [\App\Http\Controllers\Operator\FacilityController::class, 'store'])->name('facilities.store');
    Route::put('/fasilitas/{facility}', [\App\Http\Controllers\Operator\FacilityController::class, 'update'])->name('facilities.update');
    Route::delete('/fasilitas/{facility}', [\App\Http\Controllers\Operator\FacilityController::class, 'destroy'])->name('facilities.destroy');

    // Pengelolaan Ekstrakurikuler
    Route::get('/ekstrakurikuler', [\App\Http\Controllers\Operator\ExtracurricularController::class, 'index'])->name('extracurriculars.index');
    Route::post('/ekstrakurikuler', [\App\Http\Controllers\Operator\ExtracurricularController::class, 'store'])->name('extracurriculars.store');
    Route::put('/ekstrakurikuler/{activity}', [\App\Http\Controllers\Operator\ExtracurricularController::class, 'update'])->name('extracurriculars.update');
    Route::delete('/ekstrakurikuler/{activity}', [\App\Http\Controllers\Operator\ExtracurricularController::class, 'destroy'])->name('extracurriculars.destroy');

    // Pengelolaan Dokumentasi Kegiatan
    Route::get('/kegiatan', [\App\Http\Controllers\Operator\SchoolEventController::class, 'index'])->name('events.index');
    Route::post('/kegiatan', [\App\Http\Controllers\Operator\SchoolEventController::class, 'store'])->name('events.store');
    Route::put('/kegiatan/{event}', [\App\Http\Controllers\Operator\SchoolEventController::class, 'update'])->name('events.update');
    Route::delete('/kegiatan/{event}', [\App\Http\Controllers\Operator\SchoolEventController::class, 'destroy'])->name('events.destroy');

    // Pengelolaan Prestasi Siswa
    Route::get('/prestasi', [\App\Http\Controllers\Operator\AchievementController::class, 'index'])->name('achievements.index');
    Route::post('/prestasi', [\App\Http\Controllers\Operator\AchievementController::class, 'store'])->name('achievements.store');
    Route::put('/prestasi/{achievement}', [\App\Http\Controllers\Operator\AchievementController::class, 'update'])->name('achievements.update');
    Route::delete('/prestasi/{achievement}', [\App\Http\Controllers\Operator\AchievementController::class, 'destroy'])->name('achievements.destroy');
});
