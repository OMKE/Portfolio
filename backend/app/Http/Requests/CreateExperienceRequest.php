<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateExperienceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'date' => ['required', 'string', 'min:5', 'max:64'],
			'title' => ['required', 'string', 'min:5', 'max:64'],
			'company' => ['required', 'string', 'min:3', 'max:64']
        ];
    }
}
