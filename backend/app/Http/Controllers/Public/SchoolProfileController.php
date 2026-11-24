<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Inertia\Inertia;
use Inertia\Response;

class SchoolProfileController extends Controller
{
    public function profile(): Response
    {
        $profile = SchoolProfile::first();

        return Inertia::render('Public/Profile', [
            'profile' => $profile,
        ]);
    }

    public function organization(): Response
    {
        $profile = SchoolProfile::first();

        return Inertia::render('Public/Organization', [
            'profile' => $profile,
        ]);
    }
}
