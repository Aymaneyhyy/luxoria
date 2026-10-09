<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\ProjectRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
            'filters'  => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Form');
    }

    public function store(ProjectRequest $request)
    {
        $data = $request->safe()->except(['image_file']);

        // Handle image upload
        if ($request->hasFile('image_file')) {
            $data['image'] = $this->saveImage($request->file('image_file'));
        } elseif (empty($data['image'])) {
            $data['image'] = '/images/projects/default.jpg';
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
        $data = $request->safe()->except(['image_file']);

        // Handle image upload
        if ($request->hasFile('image_file')) {
            // Delete old image if it was an upload (not a default)
            if ($project->image && str_starts_with($project->image, '/storage/projects/')) {
                $oldPath = str_replace('/storage/', '', $project->image);
                Storage::disk('public')->delete($oldPath);
            }
            $data['image'] = $this->saveImage($request->file('image_file'));
        }

        $project->update($data);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Projet immobilier mis à jour avec succès.');
    }

    public function destroy(Project $project)
    {
        // Delete uploaded image if applicable
        if ($project->image && str_starts_with($project->image, '/storage/projects/')) {
            $oldPath = str_replace('/storage/', '', $project->image);
            Storage::disk('public')->delete($oldPath);
        }

        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Projet supprimé.');
    }

    /**
     * Save an uploaded image and return its public URL.
     */
    private function saveImage($file): string
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $file->storeAs('projects', $filename, 'public');
        return '/storage/projects/' . $filename;
    }
}
