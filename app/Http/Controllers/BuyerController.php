<?php

namespace App\Http\Controllers;

use App\Models\Buyer;
use App\Models\Project;
use App\Http\Requests\BuyerRequest;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BuyerController extends Controller
{
    public function index(Request $request)
    {
        $query = Buyer::with('project');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('full_name', 'like', "%{$search}%")
                  ->orWhere('cin', 'like', "%{$search}%")
                  ->orWhere('reference_code', 'like', "%{$search}%");
        }

        $buyers = $query->latest()->get();

        return Inertia::render('Admin/Buyers/Index', [
            'buyers' => $buyers,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        $projects = Project::select('id', 'name', 'type', 'price', 'location')->get();

        return Inertia::render('Admin/Buyers/Form', [
            'projects' => $projects,
        ]);
    }

    public function store(BuyerRequest $request)
    {
        $data = $request->validated();
        $data['reference_code'] = 'LUX-' . date('Y') . '-' . strtoupper(Str::random(4));

        Buyer::create($data);

        return redirect()->route('admin.buyers.index')
            ->with('success', 'Fiche acquéreur et transaction enregistrées avec succès.');
    }

    public function edit(Buyer $buyer)
    {
        $projects = Project::select('id', 'name', 'type', 'price', 'location')->get();

        return Inertia::render('Admin/Buyers/Form', [
            'buyer' => $buyer->load('project'),
            'projects' => $projects,
        ]);
    }

    public function update(BuyerRequest $request, Buyer $buyer)
    {
        $data = $request->validated();
        $buyer->update($data);

        return redirect()->route('admin.buyers.index')
            ->with('success', 'Fiche acquéreur mise à jour.');
    }

    public function destroy(Buyer $buyer)
    {
        $buyer->delete();

        return redirect()->route('admin.buyers.index')
            ->with('success', 'Fiche acquéreur supprimée.');
    }

    public function downloadPdf(Buyer $buyer)
    {
        $buyer->load('project');

        $pdf = Pdf::loadView('pdf.receipt', [
            'buyer' => $buyer,
        ]);

        $fileName = 'Recu_Vente_LUXORIA_' . $buyer->reference_code . '.pdf';

        return $pdf->download($fileName);
    }
}
