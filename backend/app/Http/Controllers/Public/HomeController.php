<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\Extracurricular;
use App\Models\Facility;
use App\Models\SchoolEvent;
use App\Models\SchoolProfile;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $profile = SchoolProfile::first();

        $featuredFacilities = Facility::published()
            ->latest()
            ->take(4)
            ->get();

        $extracurriculars = Extracurricular::published()
            ->latest()
            ->take(6)
            ->get();

        $recentEvents = SchoolEvent::published()
            ->with(['photos' => fn($q) => $q->take(1)])
            ->latest('event_date')
            ->take(3)
            ->get();

        $recentAchievements = Achievement::published()
            ->latest('achievement_date')
            ->take(3)
            ->get();

        return Inertia::render('Public/Home', [
            'profile' => $profile,
            'featuredFacilities' => $featuredFacilities,
            'extracurriculars' => $extracurriculars,
            'recentEvents' => $recentEvents,
            'recentAchievements' => $recentAchievements,
        ]);
    }
}
