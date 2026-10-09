<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Insert default settings
        $defaults = [
            ['key' => 'company_name',    'value' => 'LUXORIA'],
            ['key' => 'tagline',         'value' => 'Promoteur de Référence Prestige'],
            ['key' => 'address_line1',   'value' => 'Marina Tower, Étage 18'],
            ['key' => 'address_line2',   'value' => 'Bd de la Corniche, Casablanca'],
            ['key' => 'phone_primary',   'value' => '+212 5 22 00 00 00'],
            ['key' => 'phone_hours',     'value' => 'Du Lundi au Samedi: 9h - 20h'],
            ['key' => 'email_vip',       'value' => 'vip@luxoria.ma'],
            ['key' => 'email_contact',   'value' => 'contact@luxoria.ma'],
            ['key' => 'hero_title',      'value' => "L'Art de Vivre d'Exception & Rareté"],
            ['key' => 'hero_subtitle',   'value' => "Conception et réalisation de résidences de très haut standing, penthouses surplombant la ville et domaines contemporains d'une élégance intemporelle."],
            ['key' => 'about_text',      'value' => "Notre promesse repose sur l'intégrité architecturale, le raffinement des matériaux et un accompagnement sur mesure d'exception."],
            ['key' => 'vip_clients',     'value' => '120'],
            ['key' => 'facebook_url',    'value' => ''],
            ['key' => 'instagram_url',   'value' => ''],
            ['key' => 'linkedin_url',    'value' => ''],
            ['key' => 'whatsapp',        'value' => '+212522000000'],
        ];

        foreach ($defaults as $setting) {
            DB::table('settings')->insert(array_merge($setting, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
