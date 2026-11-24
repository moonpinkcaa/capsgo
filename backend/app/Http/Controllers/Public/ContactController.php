<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function __invoke(): Response
    {
        $profile = SchoolProfile::first();

        return Inertia::render('Public/Contact', [
            'profile' => $profile,
        ]);
    }
}
