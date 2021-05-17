<?php


namespace App\Services;



use App\Models\AboutMe;
use Illuminate\Http\JsonResponse;
use Stevebauman\Purify\Purify;


class AboutMeService
{

	private Purify $purify;

	public function __construct()
	{
		$this->purify = new Purify();
	}

	public function show() : JsonResponse
	{
		return response()->json(AboutMe::firstOrFail());
	}

	public function store(array $validated) : JsonResponse
	{
		$validated['biography'] = $this->purify->clean($validated['biography']);

		$aboutMe = AboutMe::updateOrCreate(
		    ['id' => 1],
            $validated
        );


		return response()->json(['message' => 'About me information has been added', 'data' => $aboutMe]);
	}

	public function update(array $validated) : JsonResponse
	{
		$validated['biography'] = $this->purify->clean($validated['biography']);

		$aboutMe = AboutMe::findOrFail(1);

		$aboutMe->update($validated);

		return response()->json(['message' => 'About me has been updated', 'data' => $aboutMe]);
	}
}
