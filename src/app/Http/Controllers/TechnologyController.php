<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTechnologyRequest;
use App\Http\Requests\DeleteTechnologyImageRequest;
use App\Http\Requests\UpdateTechnologyRequest;
use App\Http\Requests\UploadTechnologyImageRequest;
use App\Models\Technology;
use App\Services\TechnologyService;
use Illuminate\Http\File;
use Illuminate\Http\Request;

class TechnologyController extends Controller
{
	private TechnologyService $technologyService;

	public function __construct(TechnologyService $technologyService)
	{
		$this->middleware('jwt.auth', ['except' => ['index', 'show']]);
		$this->technologyService = $technologyService;
	}

	public function index()
	{
		return $this->technologyService->getAll();
	}

	public function show(Technology $technology)
	{
		return $this->technologyService->getOne($technology->id);
	}

	public function store(CreateTechnologyRequest $request)
	{
		return $this->technologyService->store($request->validated());
	}

	public function uploadImage(UploadTechnologyImageRequest $request)
	{
		return $this->technologyService->uploadImage($request->validated()['image']);
	}

	public function deleteImage(DeleteTechnologyImageRequest $request)
	{
		return $this->technologyService->deleteImage($request->validated());
	}

	public function update(Technology $technology, UpdateTechnologyRequest $request)
	{
		return $this->technologyService->update($technology, $request->validated());
	}

	public function delete(Technology $technology)
	{
		return $this->technologyService->delete($technology);
	}
}
