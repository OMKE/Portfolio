<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class CreateProjectRequest extends FormRequest
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
            'themeId' => ['required', 'integer', 'exists:themes,id'],
			'title' => ['required', 'string', 'min:3', 'max:64'],
			'description' => ['required', 'string', 'min:32'],
			'image' => ['required', 'string', 'base64_image'],
			'websiteUrl' => ['sometimes', 'nullable', 'min:4', 'max:255'],
			'sourceCodeUrl' => ['sometimes', 'nullable', 'min:4', 'max:255'],
			'videoUrl' => ['sometimes', 'nullable', 'min:4', 'max:255']
        ];
    }
}
