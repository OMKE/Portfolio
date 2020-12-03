<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAboutMeRequest extends FormRequest
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
            'heading' => ['required', 'string', 'min:10', 'max:64'],
			'position' => ['required', 'string', 'min:5', 'max:64'],
			'location' => ['required', 'string', 'min: 5', 'max: 64'],
			'biography' => ['required', 'string', 'min: 32']
        ];
    }
}
