<?php


namespace App\Services;


use App\Http\Requests\CreateTechnologyRequest;
use App\Http\Requests\UpdateTechnologyRequest;
use App\Models\Technology;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\URL;

class TechnologyService
{

	public function getAll(): JsonResponse
	{
		$technologies = Technology::orderBy('order_number')->get();

		return response()->json($technologies);
	}

	public function getOne(int $id): JsonResponse
	{
		$technology = Technology::findOrFail($id);

		return response()->json($technology);
	}

	public function store($data) : JsonResponse
	{

		$technology = new Technology($data);

		$technology->save();

		return response()->json(['message' => 'Technology has been added successfully', 'data' => $technology]);
	}


	public function uploadImage(UploadedFile $image): JsonResponse
	{
		$folder = 'technologies';

		$path = $image->storeAs("public/" . $folder, $image->getClientOriginalName());

		return response()->json('storage/' . $folder . '/' . $image->getClientOriginalName());
	}

	public function deleteImage(array $validated) : JsonResponse
	{
		$imagePath = str_replace('storage', 'public', $validated['imagePath']);


		if (\Storage::delete($imagePath))
		{
			return response()->json(['message' => 'Image has been successfully deleted']);
		} else {
			return response()->json(['error' => 'Image could not be found']);
		}
	}


	public function update(Technology $technology, array $validated): JsonResponse
	{
		$technology->update($validated);

		return response()->json(['message' => 'Technology has been updated successfully', 'data' => $technology]);
	}

	public function delete(Technology $technology)
	{
		$technology->delete();

		return response()->json(['message' => 'Technology has been deleted']);
	}
}