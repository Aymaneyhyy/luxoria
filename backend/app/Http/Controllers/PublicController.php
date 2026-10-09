<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ContactMessage;
use App\Http\Requests\ContactRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        $featuredProjects = Project::where('is_featured', true)
            ->take(3)
            ->get();

        $stats = [
            'total_projects' => Project::count(),
            'total_delivered' => Project::where('status', 'Vendu / Réservé')->count(),
            'vip_clients' => 120,
            'total_surface' => Project::sum('surface'),
        ];

        return Inertia::render('Home', [
            'featuredProjects' => $featuredProjects,
            'stats' => $stats,
        ]);
    }

    public function projects(Request $request)
    {
        $query = Project::query();

        // Filter by Type
        if ($request->filled('type') && $request->type !== 'All') {
            $query->where('type', $request->type);
        }

        // Filter by Status
        if ($request->filled('status') && $request->status !== 'All') {
            $query->where('status', $request->status);
        }

        // Filter by Max Price
        if ($request->filled('max_price')) {
            $query->where('price', '<=', (float)$request->max_price);
        }

        // Search Query
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $projects = $query->latest()->get();

        $maxPriceAvailable = Project::max('price') ?? 10000000;

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only(['type', 'status', 'max_price', 'search']),
            'maxPriceAvailable' => (float)$maxPriceAvailable,
        ]);
    }

    public function showProject($slug)
    {
        $project = Project::where('slug', $slug)->firstOrFail();

        $similarProjects = Project::where('id', '!=', $project->id)
            ->where('type', $project->type)
            ->take(2)
            ->get();

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'similarProjects' => $similarProjects,
        ]);
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function submitContact(ContactRequest $request)
    {
        ContactMessage::create($request->validated());

        return redirect()->back()->with('success', 'Votre message VIP a été transmis avec succès à notre direction commerciale.');
    }
}
