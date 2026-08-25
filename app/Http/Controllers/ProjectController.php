<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\ProjectRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
        }

        $projects = $query->latest()->get();

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Form');
    }

    public function store(ProjectRequest $request)
    {
        $data = $request->validated();
        
        if (empty($data['image'])) {
            $data['image'] = '/images/projects/villa_marina.png';
        }

        Project::create($data);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Projet immobilier créé avec succès.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
        ]);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $project->update($data);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Projet immobilier mis à jour avec succès.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Projet supprimé.');
    }
}
