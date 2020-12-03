<?php


namespace App\Services;


use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectImageService
{
	private ProjectService $projectService;

	public function __construct(ProjectService $projectService)
	{
		$this->projectService = $projectService;
	}

	public function getAll(Project $project): JsonResponse
	{
		return response()->json($project->images()->get());
	}

	public function getOne(Project $project, ProjectImage $projectImage)
	{
		return response()->json($projectImage);
	}

	public function store(Project $project, array $validated) : JsonResponse
	{
		$image = $this->projectService->getImageFromBase64($validated['image']);
		$imageName = $this->projectService->getImageName($project->title, $this->projectService->getImageExtension($image));

		// Folder name will be project id
		$folderName = $project->id;

		\Storage::disk('projects')->put($folderName . '/' . $imageName, $image);

		$imageStoragePath = \Storage::url('projects/' . $folderName . '/' . $imageName);

		$data = $validated;

		$data['image'] = $imageStoragePath;

		$projectImage = $project->images()->create($data);


		return response()->json(['message' => 'Project image has been added', 'data' => $projectImage]);

	}

	public function update(Project $project, ProjectImage $projectImage, array $validated) : JsonResponse
	{
		$data = $validated;

		if($projectImage->image != $validated['image'])
		{

			$folderName = $project->id;

			// Str::afterLast returns element after last occurrence of delimiter, /path/to/the/image.png -> 'image.png' will be returned
			$imageNameToDeleted = Str::afterLast($projectImage->image, '/');


			if(Storage::disk('projects')->exists($folderName . '/' . $imageNameToDeleted))
			{
				// Delete old image
				Storage::disk('projects')->delete($folderName . '/' . $imageNameToDeleted);
			}


			// Decode an image from base64 and save it to disk
			$image = $this->projectService->getImageFromBase64($validated['image']);
			$imageName = $this->projectService->getImageName($project->title, $this->projectService->getImageExtension($image));

			\Storage::disk('projects')->put($folderName . '/' . $imageName, $image);

			// Get image path that will be stored in DB
			$imageStoragePath = \Storage::url('projects/' . $folderName . '/' . $imageName);

			$data['image'] = $imageStoragePath;

		}
		$projectImage->update($data);

		return response()->json(['message' => 'Project image has been updated', 'data' => $projectImage]);
	}

	public function delete(Project $project, ProjectImage $projectImage) : JsonResponse
	{
		$projectImage->delete();

		return response()->json(['message' => 'Project image has been deleted']);
	}


}