<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateThemeRequest;
use App\Http\Requests\UpdateThemeRequest;
use App\Models\Theme;
use App\Services\ThemeService;
use Illuminate\Http\JsonResponse;

class ThemeController extends Controller
{
	private ThemeService $themeService;

	public function __construct(ThemeService $themeService)
	{
		$this->themeService = $themeService;

		$this->middleware('jwt.auth');
	}

	public function index() : JsonResponse
	{
		return $this->themeService->getAll();
	}

	public function show(Theme $theme) : JsonResponse
	{
		return $this->themeService->getOne($theme);
	}

	public function store(CreateThemeRequest $request) : JsonResponse
	{
		return $this->themeService->store($request->validated());
	}

	public function update(Theme $theme, UpdateThemeRequest $request) : JsonResponse
	{
		return $this->themeService->update($theme, $request->validated());
	}
}
