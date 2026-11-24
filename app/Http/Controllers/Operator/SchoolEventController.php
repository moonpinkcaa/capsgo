<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\SchoolEvent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SchoolEventController extends Controller
{
    public function index(): Response
    {
        $events = SchoolEvent::orderBy('event_date', 'desc')->paginate(10);
        return Inertia::render('Operator/Content/Events/Index', ['events' => $events]);
    }

    public function create(): Response
    {
        return Inertia::render('Operator/Content/Events/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'event_date' => ['required', 'date'],
            'category' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'publication_status' => ['required', 'in:draft,published,archived'],
        ]);

        SchoolEvent::create(array_merge($validated, ['created_by' => auth()->id()]));
        return redirect()->route('operator.events.index')->with('success', 'Kegiatan berhasil ditambahkan.');
    }

    public function edit(SchoolEvent $event): Response
    {
        return Inertia::render('Operator/Content/Events/Edit', ['event' => $event]);
    }

    public function update(Request $request, SchoolEvent $event): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'event_date' => ['required', 'date'],
            'category' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'publication_status' => ['required', 'in:draft,published,archived'],
        ]);

        $event->update($validated);
        return redirect()->route('operator.events.index')->with('success', 'Kegiatan berhasil diperbarui.');
    }

    public function destroy(SchoolEvent $event): RedirectResponse
    {
        $event->delete();
        return redirect()->route('operator.events.index')->with('success', 'Kegiatan berhasil dihapus.');
    }
}
