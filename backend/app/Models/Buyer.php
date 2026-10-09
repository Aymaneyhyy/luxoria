<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Buyer extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'full_name',
        'cin',
        'phone',
        'email',
        'address',
        'property_type',
        'unit_number',
        'surface',
        'agreed_price',
        'paid_amount',
        'payment_method',
        'payment_date',
        'payment_status',
        'reference_code',
        'notes',
    ];

    protected $casts = [
        'agreed_price' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'payment_date' => 'date',
        'surface' => 'integer',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
