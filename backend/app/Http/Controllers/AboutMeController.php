<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAboutMeRequest;
use App\Http\Requests\UpdateAboutMeRequest;
use App\Services\AboutMeService;
use Illuminate\Http\JsonResponse;

class AboutMeController extends Controller
{
    private AboutMeService $aboutMeService;

    public function __construct(AboutMeService $aboutMeService)
	{
		$this->aboutMeService = $aboutMeService;

		$this->middleware('jwt.auth', ['except' => ['show']]);
	}

	public function show(): JsonResponse
	{
		return $this->aboutMeService->show();
	}

	public function store(CreateAboutMeRequest $request)
	{
		return $this->aboutMeService->store($request->validated());
	}

	public function update(UpdateAboutMeRequest $request)
	{
		return $this->aboutMeService->update($request->validated());
	}
}
