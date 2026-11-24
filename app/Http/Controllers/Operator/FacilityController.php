<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    public function index(): Response
    {
        $facilities = Facility::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Operator/Content/Facilities/Index', ['facilities' => $facilities]);
    }

    public function create(): Response
    {
        return Inertia::render('Operator/Content/Facilities/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'category' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'publication_status' => ['required', 'in:draft,published,archived'],
        ]);

        Facility::create(array_merge($validated, ['created_by' => auth()->id()]));
        return redirect()->route('operator.facilities.index')->with('success', 'Fasilitas berhasil ditambahkan.');
    }

    public function edit(Facility $facility): Response
    {
        return Inertia::render('Operator/Content/Facilities/Edit', ['facility' => $facility]);
    }

    public function update(Request $request, Facility $facility): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'category' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'publication_status' => ['required', 'in:draft,published,archived'],
        ]);

        $facility->update($validated);
        return redirect()->route('operator.facilities.index')->with('success', 'Fasilitas berhasil diperbarui.');
    }

    public function destroy(Facility $facility): RedirectResponse
    {
        $facility->delete();
        return redirect()->route('operator.facilities.index')->with('success', 'Fasilitas berhasil dihapus.');
    }
}
