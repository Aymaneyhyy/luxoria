<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BuyerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'project_id' => 'nullable|exists:projects,id',
            'full_name' => 'required|string|max:255',
            'cin' => 'required|string|max:50',
            'phone' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'property_type' => 'required|string|max:100',
            'unit_number' => 'required|string|max:100',
            'surface' => 'required|integer|min:1',
            'agreed_price' => 'required|numeric|min:0',
            'paid_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:100',
            'payment_date' => 'required|date',
            'payment_status' => 'required|string|max:100',
            'notes' => 'nullable|string',
        ];
    }
}
