<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateExperienceRequest;
use App\Http\Requests\UpdateExperienceRequest;
use App\Models\Experience;
use App\Services\ExperienceService;
use Illuminate\Http\JsonResponse;

class ExperienceController extends Controller
{
	private ExperienceService $experienceService;

	public function __construct(ExperienceService $experienceService)
	{
		$this->experienceService = $experienceService;

		$this->middleware('jwt.auth', ['except' => ['index', 'show']]);
	}

	public function index() : JsonResponse
	{
		return $this->experienceService->getAll();
	}

	public function show(Experience $experience) : JsonResponse
	{
		return $this->experienceService->getOne($experience);
	}

	public function store(CreateExperienceRequest $request): JsonResponse
	{
		return $this->experienceService->store($request->validated());
	}


	public function update(Experience $experience, UpdateExperienceRequest $request) : JsonResponse
	{
		return $this->experienceService->update($experience, $request->validated());
	}

	public function delete(Experience $experience)
	{
		return $this->experienceService->delete($experience);
	}


}
