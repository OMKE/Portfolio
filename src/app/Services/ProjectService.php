<?php


namespace App\Services;


use App\Models\Project;
use App\Models\Theme;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Mimey\MimeTypes;

class ProjectService
{
	public function getAll(): JsonResponse
	{
		return response()->json(Project::all());
	}

	public function getOne(Project $project) : JsonResponse
	{
		return response()->json(Project::with('images')->find($project->id));
	}

	public function store(array $validated) : JsonResponse
	{
		$image = $this->getImageAndImageNameFromBase64($validated['image'], $validated['title'])['image'];
		$imageName = $this->getImageAndImageNameFromBase64($validated['image'], $validated['title'])['imageName'];

		\Storage::disk('projects')->put($imageName, $image);


		$imageStoragePath = Storage::url('projects/' . $imageName);

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

			// Store new image
			$image = $this->getImageAndImageNameFromBase64($validated['image'], $validated['title'])['image'];
			$imageName = $this->getImageAndImageNameFromBase64($validated['image'], $validated['title'])['imageName'];
			\Storage::disk('projects')->put($imageName, $image);
			$imageStoragePath = Storage::url('projects/' . $imageName);
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

		$project->delete();

		return response()->json(['message' => 'Project has been deleted']);
	}


	private function getImageAndImageNameFromBase64(string $base64Str, $imageName)
	{

		$imageBase64Str = substr($base64Str, strpos($base64Str, ',') + 1);

		$image = base64_decode($imageBase64Str);

		$mimes = new MimeTypes();

		$mimeType = getimagesizefromstring($image)['mime'];

		$extension = $mimes->getExtension($mimeType);


		$imageName = Str::random(5) . '_' . $imageName . '.' . $extension;

		return [
			'image' => $image,
			'imageName' => $imageName
		];
	}
}