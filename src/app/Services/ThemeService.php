<?php


namespace App\Services;


use App\Models\Theme;
use Illuminate\Http\JsonResponse;

class ThemeService
{
	public function getAll() : JsonResponse
	{
		return response()->json(Theme::all());
	}

	public function getOne(Theme $theme) : JsonResponse
	{
		return response()->json($theme);
	}

	public function store(array $validated) : JsonResponse
	{
		$theme = new Theme($validated);

		$theme->save();

		return response()->json(['message'=> 'Theme has been added', 'data' => $theme]);

	}

	public function  update(Theme $theme, array $validated) : JsonResponse
	{
		$theme->update($validated);

		return response()->json(['message' => 'Theme has been updated', 'data' => $theme]);
	}
}
