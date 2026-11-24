<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\SchoolEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SchoolEventController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $category = $request->query('category');

        $events = SchoolEvent::published()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($category, function ($query, $category) {
                $query->where('category', $category);
            })
            ->latest('event_date')
            ->paginate(6)
            ->withQueryString();

        $categories = SchoolEvent::published()
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();

        return Inertia::render('Public/Events/Index', [
            'events' => $events,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }

    public function show(int $id): Response
    {
        $event = SchoolEvent::published()
            ->with('photos')
            ->findOrFail($id);

        $relatedEvents = SchoolEvent::published()
            ->where('id', '!=', $event->id)
            ->latest('event_date')
            ->take(3)
            ->get();

        return Inertia::render('Public/Events/Show', [
            'event' => $event,
            'relatedEvents' => $relatedEvents,
        ]);
    }
}
