<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $level = $request->query('level');
        $category = $request->query('category');

        $achievements = Achievement::published()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('student_display_name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($level, function ($query, $level) {
                $query->where('level', $level);
            })
            ->when($category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->latest('achievement_date')
            ->paginate(9)
            ->withQueryString();

        $levels = Achievement::published()
            ->distinct()
            ->pluck('level')
            ->filter()
            ->values();

        $categories = Achievement::published()
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();

        return Inertia::render('Public/Achievements', [
            'achievements' => $achievements,
            'levels' => $levels,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'level' => $level,
                'category' => $category,
            ],
        ]);
    }
}
