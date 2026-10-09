<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'        => 'required|string|max:255',
            'type'        => 'required|string|in:Villa,Penthouse,Appartement,Résidence,Domaine',
            'description' => 'required|string',
            'price'       => 'required|numeric|min:0',
            'location'    => 'required|string|max:255',
            'status'      => 'required|string|in:Disponible,En Construction,Vendu / Réservé',
            'surface'     => 'required|integer|min:1',
            'bedrooms'    => 'required|integer|min:0',
            'bathrooms'   => 'required|integer|min:0',
            'image_file'  => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120', // 5 MB max
            'image'       => 'nullable|string',
            'features'    => 'nullable|array',
            'is_featured' => 'boolean',
        ];
    }
}
