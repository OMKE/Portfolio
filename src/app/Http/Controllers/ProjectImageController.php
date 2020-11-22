<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProjectImageRequest;
use App\Http\Requests\UpdateProjectImageRequest;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Services\ProjectImageService;
use Illuminate\Http\JsonResponse;

class ProjectImageController extends Controller
{
	private ProjectImageService $projectImageService;

    public function __construct(ProjectImageService $projectImageService)
	{
		$this->projectImageService = $projectImageService;

		$this->middleware('jwt.auth', ['except' => ['index', 'show']]);
	}

	public function index(Project $project) : JsonResponse
	{
		return $this->projectImageService->getAll($project);
	}


	/**
	 * @param Project $project
	 * @param ProjectImage $image
	 * @return JsonResponse
	 *  image (not $projectImage) - implicitly bounded as child of $project, it will return 404 if child is not present in parent
	 *  Laravel will look into relationships and based on parameter name it will assume the relationship is in plural,
	 *  If we wanted to name parameter $projectImage, we would need to rename relationship in Project - $projectImages, as plural
	 */
	public function show(Project $project, ProjectImage $image) : JsonResponse
	{
		return $this->projectImageService->getOne($project, $image);
	}

	/**
	 * @param Project $project
	 * @param CreateProjectImageRequest $request
	 * @return JsonResponse
	 */
	public function store(Project $project, CreateProjectImageRequest $request) : JsonResponse
	{
		return $this->projectImageService->store($project, $request->validated());
	}

	public function update(Project $project, ProjectImage $image, UpdateProjectImageRequest $request) : JsonResponse
	{
		return $this->projectImageService->update($project, $image, $request->validated());
	}

	public function destroy(Project $project, ProjectImage $image) : JsonResponse
	{
		return $this->projectImageService->delete($project, $image);
	}
}
