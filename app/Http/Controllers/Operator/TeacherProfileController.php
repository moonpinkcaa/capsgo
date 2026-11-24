<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\TeacherProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherProfileController extends Controller
{
    public function index(): Response
    {
        $teachers = TeacherProfile::orderBy('full_name')->paginate(10);
        return Inertia::render('Operator/Content/Teachers/Index', ['teachers' => $teachers]);
    }

    public function create(): Response
    {
        return Inertia::render('Operator/Content/Teachers/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:150'],
            'position' => ['nullable', 'string', 'max:100'],
            'public_bio' => ['nullable', 'string'],
            'is_published' => ['boolean'],
        ]);

        TeacherProfile::create($validated);
        return redirect()->route('operator.teachers.index')->with('success', 'Data guru publik berhasil ditambahkan.');
    }

    public function edit(TeacherProfile $teacher): Response
    {
        return Inertia::render('Operator/Content/Teachers/Edit', ['teacher' => $teacher]);
    }

    public function update(Request $request, TeacherProfile $teacher): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:150'],
            'position' => ['nullable', 'string', 'max:100'],
            'public_bio' => ['nullable', 'string'],
            'is_published' => ['boolean'],
        ]);

        $teacher->update($validated);
        return redirect()->route('operator.teachers.index')->with('success', 'Data guru publik berhasil diperbarui.');
    }

    public function destroy(TeacherProfile $teacher): RedirectResponse
    {
        $teacher->delete();
        return redirect()->route('operator.teachers.index')->with('success', 'Data guru publik berhasil dihapus.');
    }
}
