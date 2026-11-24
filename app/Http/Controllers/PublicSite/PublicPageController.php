<?php

namespace App\Http\Controllers\PublicSite;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use App\Models\TeacherProfile;
use App\Models\Facility;
use App\Models\Extracurricular;
use App\Models\SchoolEvent;
use App\Models\Achievement;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    /**
     * Halaman Profil Sekolah
     */
    public function schoolProfile(): Response
    {
        $profile = SchoolProfile::first();

        return Inertia::render('Public/SchoolProfile', [
            'profile' => $profile,
        ]);
    }

    /**
     * Halaman Struktur Organisasi
     */
    public function organization(): Response
    {
        return Inertia::render('Public/Organization');
    }

    /**
     * Halaman Daftar Guru Publik
     */
    public function teachers(): Response
    {
        $teachers = TeacherProfile::where('is_published', true)
            ->where('is_active', true)
            ->orderBy('full_name')
            ->get();

        return Inertia::render('Public/Teachers/Index', [
            'teachers' => $teachers,
        ]);
    }

    /**
     * Halaman Daftar Fasilitas
     */
    public function facilities(): Response
    {
        $facilities = Facility::where('publication_status', 'published')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Public/Facilities/Index', [
            'facilities' => $facilities,
        ]);
    }

    /**
     * Halaman Daftar Ekstrakurikuler
     */
    public function extracurriculars(): Response
    {
        $extracurriculars = Extracurricular::where('publication_status', 'published')
            ->orderBy('name')
            ->get();

        return Inertia::render('Public/Extracurriculars/Index', [
            'extracurriculars' => $extracurriculars,
        ]);
    }

    /**
     * Halaman Daftar Kegiatan / Dokumentasi
     */
    public function events(): Response
    {
        $events = SchoolEvent::where('publication_status', 'published')
            ->orderBy('event_date', 'desc')
            ->paginate(9);

        return Inertia::render('Public/Events/Index', [
            'events' => $events,
        ]);
    }

    /**
     * Halaman Daftar Prestasi
     */
    public function achievements(): Response
    {
        $achievements = Achievement::where('publication_status', 'published')
            ->orderBy('achievement_date', 'desc')
            ->paginate(12);

        return Inertia::render('Public/Achievements/Index', [
            'achievements' => $achievements,
        ]);
    }

    /**
     * Halaman Kontak
     */
    public function contact(): Response
    {
        $profile = SchoolProfile::first();

        return Inertia::render('Public/Contact', [
            'profile' => $profile,
        ]);
    }
}
