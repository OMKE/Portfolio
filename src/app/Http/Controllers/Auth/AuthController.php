<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Services\AuthService;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api', ['except' => ['login']]);
	}

	/**
	 * Get a JWT via given credentials.
	 *
	 * @param UserLoginRequest $request
	 * @param AuthService $authService
	 * @return JsonResponse
	 */
	public function login(UserLoginRequest $request, AuthService $authService): JsonResponse
	{
		return $authService->login($request->validated());
	}

	/**
	 * Get the authenticated User.
	 */
	public function me(): JsonResponse
	{
		if(!auth()->user())
		{
			return response()->json(['error' => 'Unauthenticated'], 401);
		}
		return response()->json(auth()->user());
	}

	/**
	 * Log the user out (Invalidate the token).
	 */
	public function logout(): JsonResponse
	{
		auth()->logout();

		return response()->json(['message' => 'Successfully logged out']);
	}

	/**
	 * Refresh a token.
	 */
	public function refresh(): JsonResponse
	{
		return $this->respondWithToken(auth()->refresh());
	}

	/**
	 * Get the token array structure.
	 */
	public function guard(): StatefulGuard
	{
		return Auth::guard('api');
	}
}
