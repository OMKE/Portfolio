<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    private ProjectService $projectService;

    public function __construct(ProjectService $projectService)
	{
		$this->projectService = $projectService;

		$this->middleware('jwt.auth', ['except' => ['index', 'show']]);
	}

	public function index() : JsonResponse
	{
		return $this->projectService->getAll();
	}

	public function show(Project $project) : JsonResponse
	{
		return $this->projectService->getOne($project);
	}

	public function store(CreateProjectRequest $request) : JsonResponse
	{
		return $this->projectService->store($request->validated());
	}

	public function update(Project $project, UpdateProjectRequest $request) : JsonResponse
	{
		return $this->projectService->update($project, $request->validated());
	}

	public function delete(Project $project)
	{
		return $this->projectService->delete($project);
	}
}
