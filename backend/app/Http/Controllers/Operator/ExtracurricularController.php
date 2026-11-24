<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ExtracurricularController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $extracurriculars = Extracurricular::when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('supervisor_name', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('publication_status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Operator/Content/Extracurriculars/Index', [
            'extracurriculars' => $extracurriculars,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'schedule_text' => 'nullable|string|max:150',
            'supervisor_name' => 'nullable|string|max:150',
            'publication_status' => 'required|in:draf,terbit,arsip',
            'image' => 'nullable|image|max:3072',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('extracurriculars', 'public');
        }

        $validated['created_by'] = $request->user()?->id;

        Extracurricular::create($validated);

        return back()->with('success', 'Ekstrakurikuler berhasil ditambahkan.');
    }

    public function update(Request $request, Extracurricular $activity): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'schedule_text' => 'nullable|string|max:150',
            'supervisor_name' => 'nullable|string|max:150',
            'publication_status' => 'required|in:draf,terbit,arsip',
            'image' => 'nullable|image|max:3072',
        ]);

        if ($request->hasFile('image')) {
            if ($activity->image_path) {
                Storage::disk('public')->delete($activity->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('extracurriculars', 'public');
        }

        $activity->update($validated);

        return back()->with('success', 'Ekstrakurikuler berhasil diperbarui.');
    }

    public function destroy(Extracurricular $activity): RedirectResponse
    {
        if ($activity->image_path) {
            Storage::disk('public')->delete($activity->image_path);
        }

        $activity->delete();

        return back()->with('success', 'Ekstrakurikuler berhasil dihapus.');
    }
}
