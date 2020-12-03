<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginTest extends TestCase
{
	use RefreshDatabase;
	/*
	 * Test - User has passed invalid credentials
	 */
    public function testInvalidCredentials()
	{
		$response = $this->postJson('/api/v1/auth/login', ['email' => 'omar@omaririskic.com', 'password' => 'omar123']);

		$response
			->assertStatus(401)
			->assertJson([
				'error'=> 'Unauthorized'
			]);

	}
	/*
	 * Test - User has passed valid credentials
	 */
	public function testValidCredentials()
	{
		$this->withoutExceptionHandling();


		$email = "omar@omaririskic.com";
		$password = "omar1234";

		$user = User::factory()->create([
			'email' => $email,
			'password' => Hash::make($password)
		]);

		$this->actingAs($user, 'api');

		$response = $this->postJson('/api/v1/auth/login', ['email' => $email, 'password' => $password]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'access_token',
				'token_type',
				'expires_in'
			]);


	}

}
