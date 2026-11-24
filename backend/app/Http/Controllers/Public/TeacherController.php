<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\TeacherProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');

        $teachers = TeacherProfile::published()
            ->when($search, function ($query, $search) {
                $query->where('full_name', 'like', "%{$search}%")
                      ->orWhere('position', 'like', "%{$search}%");
            })
            ->orderBy('full_name')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Public/Teachers', [
            'teachers' => $teachers,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
}
