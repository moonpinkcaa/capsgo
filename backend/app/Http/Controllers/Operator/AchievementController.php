<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');
        $level = $request->query('level');

        $achievements = Achievement::when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('student_display_name', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('publication_status', $status);
            })
            ->when($level, function ($query, $level) {
                $query->where('level', $level);
            })
            ->latest('achievement_date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Operator/Content/Achievements/Index', [
            'achievements' => $achievements,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'level' => $level,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'student_display_name' => 'nullable|string|max:150',
            'category' => 'required|string|max:100',
            'level' => 'required|string|max:100',
            'achievement_date' => 'nullable|date',
            'description' => 'nullable|string',
            'publication_status' => 'required|in:draf,terbit,arsip',
            'image' => 'nullable|image|max:3072',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('achievements', 'public');
        }

        $validated['verified_by'] = $request->user()?->id;

        Achievement::create($validated);

        return back()->with('success', 'Prestasi siswa berhasil ditambahkan.');
    }

    public function update(Request $request, Achievement $achievement): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'student_display_name' => 'nullable|string|max:150',
            'category' => 'required|string|max:100',
            'level' => 'required|string|max:100',
            'achievement_date' => 'nullable|date',
            'description' => 'nullable|string',
            'publication_status' => 'required|in:draf,terbit,arsip',
            'image' => 'nullable|image|max:3072',
        ]);

        if ($request->hasFile('image')) {
            if ($achievement->image_path) {
                Storage::disk('public')->delete($achievement->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('achievements', 'public');
        }

        $achievement->update($validated);

        return back()->with('success', 'Prestasi siswa berhasil diperbarui.');
    }

    public function destroy(Achievement $achievement): RedirectResponse
    {
        if ($achievement->image_path) {
            Storage::disk('public')->delete($achievement->image_path);
        }

        $achievement->delete();

        return back()->with('success', 'Prestasi siswa berhasil dihapus.');
    }
}
