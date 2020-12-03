<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMessageRequest extends FormRequest
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

	protected function prepareForValidation()
	{
		$this->merge([
			'ip' => request()->ip()
		]);
	}


	/**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'min:6'],
			'email' => ['required', 'email:rfc,dns'],
			'message' => ['required', 'min:30'],
			'ip' => ['required']
        ];
    }
}
