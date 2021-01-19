<?php


namespace App\Services;


use App\Models\Project;
use App\Models\ProjectImage;
use App\Utilities\ImageFromBase64Converter;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectImageService
{

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
	    $imageConverter = new ImageFromBase64Converter($validated['image'], $project->title);


		// Folder name will be project id
		$folderName = $project->id;

		\Storage::disk('projects')->put($folderName . '/' . $imageConverter->getImageName(), $imageConverter->getImage());

		$imageStoragePath = \Storage::url('projects/' . $folderName . '/' . $imageConverter->getImageName());

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
			$imageConverter = new ImageFromBase64Converter($validated['image'], $project->title);

			\Storage::disk('projects')->put($folderName . '/' . $imageConverter->getImageName(), $imageConverter->getImage());

			// Get image path that will be stored in DB
			$imageStoragePath = \Storage::url('projects/' . $folderName . '/' . $imageConverter->getImageName());

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
