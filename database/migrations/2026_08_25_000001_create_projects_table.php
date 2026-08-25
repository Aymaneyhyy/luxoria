<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type'); // Villa, Penthouse, Appartement, Résidence
            $table->text('description');
            $table->decimal('price', 15, 2);
            $table->string('location');
            $table->string('status'); // Disponible, En Construction, Vendu / Réservé
            $table->integer('surface'); // m2
            $table->integer('bedrooms')->default(3);
            $table->integer('bathrooms')->default(2);
            $table->string('image')->default('/images/projects/villa_marina.png');
            $table->json('gallery')->nullable();
            $table->json('features')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
