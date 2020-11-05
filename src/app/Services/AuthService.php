<?php


namespace App\Services;




use Illuminate\Http\JsonResponse;

class AuthService
{

	public function login(array $credentials): JsonResponse
	{
		if (! $token = auth('api')->attempt($credentials)) {
			return response()->json(['error' => 'Unauthorized'], 401);
		}

		return $this->respondWithToken($token);
	}


	public function respondWithToken($token): JsonResponse
	{
		return response()->json([
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => auth('api')->factory()->getTTL() * 60
		]);
	}
}