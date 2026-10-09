<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'description',
        'price',
        'location',
        'status',
        'surface',
        'bedrooms',
        'bathrooms',
        'image',
        'gallery',
        'features',
        'is_featured',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'surface' => 'integer',
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'gallery' => 'array',
        'features' => 'array',
        'is_featured' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->name);
            }
        });

        static::updating(function ($project) {
            if ($project->isDirty('name')) {
                $project->slug = Str::slug($project->name);
            }
        });
    }

    public function buyers(): HasMany
    {
        return $table = $this->hasMany(Buyer::class);
    }
}
