<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    /**
     * Get all settings as a key => value array.
     */
    public static function all($columns = ['*'])
    {
        return parent::all($columns)->pluck('value', 'key')->toArray();
    }

    /**
     * Get a single setting value by key.
     */
    public static function get(string $key, $default = null)
    {
        $setting = parent::where('key', $key)->first();
        return $setting ? $setting->value : $default;
    }

    /**
     * Set a single setting value.
     */
    public static function set(string $key, $value): void
    {
        parent::updateOrCreate(['key' => $key], ['value' => $value]);
    }

    /**
     * Set multiple settings at once.
     */
    public static function setMany(array $data): void
    {
        foreach ($data as $key => $value) {
            parent::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
