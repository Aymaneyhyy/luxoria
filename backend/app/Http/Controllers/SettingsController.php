<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Show the settings page in the admin.
     */
    public function index()
    {
        $settings = Setting::all();

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    /**
     * Save updated settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'company_name'  => 'nullable|string|max:100',
            'tagline'       => 'nullable|string|max:200',
            'address_line1' => 'nullable|string|max:200',
            'address_line2' => 'nullable|string|max:200',
            'phone_primary' => 'nullable|string|max:50',
            'phone_hours'   => 'nullable|string|max:100',
            'email_vip'     => 'nullable|email|max:100',
            'email_contact' => 'nullable|email|max:100',
            'hero_title'    => 'nullable|string|max:200',
            'hero_subtitle' => 'nullable|string|max:500',
            'about_text'    => 'nullable|string|max:500',
            'vip_clients'   => 'nullable|string|max:20',
            'facebook_url'  => 'nullable|url|max:200',
            'instagram_url' => 'nullable|url|max:200',
            'linkedin_url'  => 'nullable|url|max:200',
            'whatsapp'      => 'nullable|string|max:50',
        ]);

        Setting::setMany($validated);

        return redirect()->back()->with('success', 'Paramètres mis à jour avec succès.');
    }
}
