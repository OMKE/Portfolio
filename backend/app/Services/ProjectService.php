<?php


namespace App\Services;


use App\Models\Project;
use App\Models\Theme;
use App\Utilities\ImageFromBase64Converter;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Mimey\MimeTypes;

class ProjectService
{
	public function getAll(): JsonResponse
	{
	    $projects = Project::orderBy('created_at', 'desc')->get()->map(function ($project) {
	        $project->image = url($project->image);
	        return $project;
        });

		return response()->json($projects);
	}

	public function getOne(Project $project) : JsonResponse
	{
	    $project->image = url($project->image);
		return response()->json($project);
	}

	public function store(array $validated) : JsonResponse
	{
        $imageConverter = new ImageFromBase64Converter($validated['image'], $validated['title']);

        \Storage::disk('projects')->put($imageConverter->getImageName(), $imageConverter->getImage());


		$imageStoragePath = Storage::url('projects/' . $imageConverter->getImageName());

		$data = $validated;

		$data['image'] = $imageStoragePath;

		$project = new Project($data);
		$project->save();

		return response()->json(['message' => 'Project has been added', 'data' => $project]);


	}

	public function update(Project $project, array $validated) : JsonResponse
	{
		$data = $validated;
		if($project->image != $validated['image'])
		{
			// Get image name as it's last element
			$imageNameToDeleted = Str::afterLast($project->image, '/');


			if(Storage::disk('projects')->exists($imageNameToDeleted))
			{
				// Delete old image
				Storage::disk('projects')->delete($imageNameToDeleted);
			}

			// Convert image from base64
			$imageConverter = new ImageFromBase64Converter($validated['image'], $validated['title']);

			// Store new image
			\Storage::disk('projects')->put($imageConverter->getImageName(), $imageConverter->getImage());
			$imageStoragePath = Storage::url('projects/' . $imageConverter->getImageName());
			$data['image'] = $imageStoragePath;
		}

		$project->update($data);

		return response()->json(['message' => 'Project has been updated', 'data' => $project]);

	}

	/**
	 * @param Project $project
	 * @return JsonResponse
	 * @throws \Exception
	 * @desc - Observer is deleting the image
	 */
	public function delete(Project $project) : JsonResponse
	{
		$project->images()->each(fn ($image) => $image->delete());
		$project->delete();

		return response()->json(['message' => 'Project has been deleted']);
	}

}
