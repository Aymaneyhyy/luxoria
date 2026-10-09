<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Buyer;
use App\Models\ContactMessage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_projects' => Project::count(),
            'total_buyers' => Buyer::count(),
            'total_revenue' => Buyer::sum('paid_amount'),
            'unread_messages' => ContactMessage::where('is_read', false)->count(),
        ];

        $recentBuyers = Buyer::with('project')
            ->latest()
            ->take(5)
            ->get();

        $recentMessages = ContactMessage::latest()
            ->take(4)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentBuyers' => $recentBuyers,
            'recentMessages' => $recentMessages,
        ]);
    }
}
