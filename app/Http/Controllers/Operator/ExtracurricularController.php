<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Extracurricular;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExtracurricularController extends Controller
{
    public function index(): Response
    {
        $extracurriculars = Extracurricular::orderBy('name')->paginate(10);
        return Inertia::render('Operator/Content/Extracurriculars/Index', ['extracurriculars' => $extracurriculars]);
    }

    public function create(): Response
    {
        return Inertia::render('Operator/Content/Extracurriculars/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
            'schedule_text' => ['nullable', 'string', 'max:150'],
            'supervisor_name' => ['nullable', 'string', 'max:150'],
            'publication_status' => ['required', 'in:draft,published,archived'],
        ]);

        Extracurricular::create(array_merge($validated, ['created_by' => auth()->id()]));
        return redirect()->route('operator.extracurriculars.index')->with('success', 'Ekstrakurikuler berhasil ditambahkan.');
    }

    public function edit(Extracurricular $extracurricular): Response
    {
        return Inertia::render('Operator/Content/Extracurriculars/Edit', ['extracurricular' => $extracurricular]);
    }

    public function update(Request $request, Extracurricular $extracurricular): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string'],
            'schedule_text' => ['nullable', 'string', 'max:150'],
            'supervisor_name' => ['nullable', 'string', 'max:150'],
            'publication_status' => ['required', 'in:draft,published,archived'],
        ]);

        $extracurricular->update($validated);
        return redirect()->route('operator.extracurriculars.index')->with('success', 'Ekstrakurikuler berhasil diperbarui.');
    }

    public function destroy(Extracurricular $extracurricular): RedirectResponse
    {
        $extracurricular->delete();
        return redirect()->route('operator.extracurriculars.index')->with('success', 'Ekstrakurikuler berhasil dihapus.');
    }
}
