<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('buyers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->nullable()->constrained('projects')->onDelete('set null');
            
            // Infos Personnelles
            $table->string('full_name');
            $table->string('cin');
            $table->string('phone');
            $table->string('email');
            $table->text('address');
            
            // Infos du Bien
            $table->string('property_type'); // Villa, Penthouse, Appartement
            $table->string('unit_number');   // Lot 12, Penthouse A, Apt 304
            $table->integer('surface');      // m2
            $table->decimal('agreed_price', 15, 2);
            
            // Infos de Paiement
            $table->decimal('paid_amount', 15, 2);
            $table->string('payment_method'); // Virement, Chèque, Espèces
            $table->date('payment_date');
            $table->string('payment_status')->default('Acompte (30%)');
            
            $table->string('reference_code')->unique();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('buyers');
    }
};
