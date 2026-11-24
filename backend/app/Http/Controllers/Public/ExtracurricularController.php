<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExtracurricularController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');

        $extracurriculars = Extracurricular::published()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('supervisor_name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('Public/Extracurriculars', [
            'extracurriculars' => $extracurriculars,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
}
