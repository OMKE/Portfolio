<?php


namespace App\Services;


use App\Models\Technology;
use App\Utilities\ImageFromBase64Converter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\UploadedFile;

class TechnologyService
{

	public function getAll(): JsonResponse
	{
		$technologies = Technology::orderBy('order_number')->get();

		return response()->json($technologies);
	}

	public function getOne(Technology $technology): JsonResponse
	{
		return response()->json($technology);
	}

	public function store(array $validated) : JsonResponse
	{
	    $imageConverter = new ImageFromBase64Converter($validated['image'], $validated['name']);

        // Save image to disk
        \Storage::disk('technologies')->put($imageConverter->getImageName(), $imageConverter->getImage());

        $imageStoragePath = \Storage::url('technologies/' . $imageConverter->getImageName());

        $data = $validated;

        $data['image'] = $imageStoragePath;

        $technology = new Technology($data);

		$technology->save();

		return response()->json(['message' => 'Technology has been added', 'data' => $technology]);
	}


	public function update(Technology $technology, array $validated): JsonResponse
	{
	    // Check if user uploaded new image
	    if($technology->image != $validated['image'])
        {
            $imageToDelete = \Str::afterLast($technology->image, '/');
            if(\Storage::disk('technologies')->exists($imageToDelete))
            {
                \Storage::disk('technologies')->delete($imageToDelete);
            }
        }
	    // Create an image from base64
        $imageConverter = new ImageFromBase64Converter($validated['image'], $validated['name']);


	    \Storage::disk('technologies')->put($imageConverter->getImageName(), $imageConverter->getImage());
	    $imageStoragePath = \Storage::url('technologies/' . $imageConverter->getImageName());
	    $data = $validated;

	    $data['image'] = $imageStoragePath;

	    $technology->update($data);

		return response()->json(['message' => 'Technology has been updated', 'data' => $technology]);
	}

	public function delete(Technology $technology) : JsonResponse
	{
		$technology->delete();

		return response()->json(['message' => 'Technology has been deleted']);
	}
}
