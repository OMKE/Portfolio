<?php


namespace App\Services;


use App\Models\Experience;
use Illuminate\Http\JsonResponse;

class ExperienceService
{

	public function getAll(): JsonResponse
	{
		return response()->json(Experience::all());
	}

	public function getOne(Experience $experience)
	{
		return response()->json(Experience::find($experience->id));
	}

	public function store(array $validated) : JsonResponse
	{
		$experience = new Experience($validated);
		$experience->save();

		return response()->json(['message' => 'Experience has been added', 'data' => $experience]);
	}


	public function update(Experience $experience, array $validated) : JsonResponse
	{
		$experience->update($validated);

		return response()->json(['message' => 'Experience has been updated', 'data' => $experience]);
	}

	public function delete(Experience $experience)
	{
		$experience->delete();

		return response()->json(['message' => 'Experience has been deleted']);
	}
}