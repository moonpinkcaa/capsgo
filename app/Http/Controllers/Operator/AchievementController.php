<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function index(): Response
    {
        $achievements = Achievement::orderBy('achievement_date', 'desc')->paginate(10);
        return Inertia::render('Operator/Content/Achievements/Index', ['achievements' => $achievements]);
    }

    public function create(): Response
    {
        return Inertia::render('Operator/Content/Achievements/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'student_display_name' => ['nullable', 'string', 'max:150'],
            'category' => ['nullable', 'string', 'max:100'],
            'level' => ['nullable', 'string', 'max:100'],
            'achievement_date' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'publication_status' => ['required', 'in:draft,published,archived'],
        ]);

        Achievement::create(array_merge($validated, ['verified_by' => auth()->id()]));
        return redirect()->route('operator.achievements.index')->with('success', 'Prestasi berhasil ditambahkan.');
    }

    public function edit(Achievement $achievement): Response
    {
        return Inertia::render('Operator/Content/Achievements/Edit', ['achievement' => $achievement]);
    }

    public function update(Request $request, Achievement $achievement): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'student_display_name' => ['nullable', 'string', 'max:150'],
            'category' => ['nullable', 'string', 'max:100'],
            'level' => ['nullable', 'string', 'max:100'],
            'achievement_date' => ['nullable', 'date'],
            'description' => ['nullable', 'string'],
            'publication_status' => ['required', 'in:draft,published,archived'],
        ]);

        $achievement->update($validated);
        return redirect()->route('operator.achievements.index')->with('success', 'Prestasi berhasil diperbarui.');
    }

    public function destroy(Achievement $achievement): RedirectResponse
    {
        $achievement->delete();
        return redirect()->route('operator.achievements.index')->with('success', 'Prestasi berhasil dihapus.');
    }
}
