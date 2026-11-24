<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\EventPhoto;
use App\Models\SchoolEvent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SchoolEventController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $events = SchoolEvent::with('photos')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('publication_status', $status);
            })
            ->latest('event_date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Operator/Content/SchoolEvents/Index', [
            'events' => $events,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'event_date' => 'required|date',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'publication_status' => 'required|in:draf,terbit,arsip',
            'cover_image' => 'nullable|image|max:4096',
            'photos.*' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('cover_image')) {
            $validated['cover_image_path'] = $request->file('cover_image')->store('events', 'public');
        }

        $validated['created_by'] = $request->user()?->id;

        $event = SchoolEvent::create($validated);

        if ($request->hasFile('photos')) {
            $sort = 0;
            foreach ($request->file('photos') as $photoFile) {
                $path = $photoFile->store('events/gallery', 'public');
                EventPhoto::create([
                    'school_event_id' => $event->id,
                    'file_path' => $path,
                    'sort_order' => $sort++,
                ]);
            }
        }

        return back()->with('success', 'Kegiatan sekolah berhasil ditambahkan.');
    }

    public function update(Request $request, SchoolEvent $event): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:200',
            'event_date' => 'required|date',
            'category' => 'required|string|max:100',
            'description' => 'nullable|string',
            'publication_status' => 'required|in:draf,terbit,arsip',
            'cover_image' => 'nullable|image|max:4096',
            'photos.*' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('cover_image')) {
            if ($event->cover_image_path) {
                Storage::disk('public')->delete($event->cover_image_path);
            }
            $validated['cover_image_path'] = $request->file('cover_image')->store('events', 'public');
        }

        $event->update($validated);

        if ($request->hasFile('photos')) {
            $currentCount = $event->photos()->count();
            foreach ($request->file('photos') as $photoFile) {
                $path = $photoFile->store('events/gallery', 'public');
                EventPhoto::create([
                    'school_event_id' => $event->id,
                    'file_path' => $path,
                    'sort_order' => $currentCount++,
                ]);
            }
        }

        return back()->with('success', 'Kegiatan sekolah berhasil diperbarui.');
    }

    public function destroy(SchoolEvent $event): RedirectResponse
    {
        if ($event->cover_image_path) {
            Storage::disk('public')->delete($event->cover_image_path);
        }

        foreach ($event->photos as $photo) {
            Storage::disk('public')->delete($photo->file_path);
            $photo->delete();
        }

        $event->delete();

        return back()->with('success', 'Kegiatan sekolah berhasil dihapus.');
    }
}
