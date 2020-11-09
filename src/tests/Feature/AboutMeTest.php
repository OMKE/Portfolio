<?php

namespace Tests\Feature;

use App\Models\AboutMe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AboutMeTest extends TestCase
{

	use RefreshDatabase;

	/** @test */
	public function unAuthenticatedUserCanNotCreateAboutMe()
	{
//		$this->withoutExceptionHandling();


		$response = $this
			->postJson('/api/v1/about-me', [
				'heading' => 'Hi, my name is Guest',
				'position' => 'Junior',
				'location' => 'New York, USA',
				'biography' => '<h1>Biography about guest</h1><p>This is some paragraph about Guest</p>'
			]);

		$response
			->assertStatus(401)
			->assertJson(['message' => 'Token not provided']);

    }

	/** @test */
	public function authenticatedUserCanCreateAboutMe()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/about-me', [
				'heading' => 'Hi, my name is Guest',
				'position' => 'Junior',
				'location' => 'New York, USA',
				'biography' => '<h1>Biography about guest</h1><p>This is some paragraph about Guest</p>'
			]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data' => ['heading', 'position', 'location', 'biography', 'createdAt', 'updatedAt', 'id']
				]
			);

		$this->assertCount(1, AboutMe::all());
    }

	/** @test */
	public function aboutMeInformationCanBeUpdated()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$this
			->postJson('/api/v1/about-me', [
				'heading' => 'Hi, my name is Guest',
				'position' => 'Junior',
				'location' => 'New York, USA',
				'biography' => '<h1>Biography about guest</h1><p>This is some paragraph about Guest</p>'
			]);

		$aboutMe = AboutMe::first();

		$response = $this->putJson('/api/v1/about-me', [
			'heading' => "Hi, my name is Guest but I'm updated",
			'position' => 'Junior Intermediate',
			'location' => 'San Francisco, USA',
			'biography' => '<h1>Updated biography about guest</h1><p>This is some paragraph about Guest</p>'
		]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data' => ['heading', 'position', 'location', 'biography', 'createdAt', 'updatedAt', 'id']
			]);

		$this->assertCount(1, AboutMe::all());

		$updatedAboutMe = AboutMe::first();
		$this->assertEquals("Hi, my name is Guest but I'm updated", $updatedAboutMe->heading);
		$this->assertEquals("Junior Intermediate", $updatedAboutMe->position);
		$this->assertEquals("San Francisco, USA", $updatedAboutMe->location);
		$this->assertEquals("<h1>Updated biography about guest</h1><p>This is some paragraph about Guest</p>", $updatedAboutMe->biography);

    }

	/** @test */
	public function aHeadingIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/about-me', [
				'position' => 'Junior',
				'location' => 'New York, USA',
				'biography' => '<h1>Biography about guest</h1><p>This is some paragraph about Guest</p>'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['heading']
			]);

		$this->assertCount(0, AboutMe::all());
    }


	/** @test */
	public function aPositionIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/about-me', [
				'heading' => 'Hi, my name is Guest',
				'location' => 'New York, USA',
				'biography' => '<h1>Biography about guest</h1><p>This is some paragraph about Guest</p>'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['position']
			]);

		$this->assertCount(0, AboutMe::all());
	}

	/** @test */
	public function aLocationIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/about-me', [
				'heading' => 'Hi, my name is Guest',
				'position' => 'Junior',
				'biography' => '<h1>Biography about guest</h1><p>This is some paragraph about Guest</p>'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['location']
			]);

		$this->assertCount(0, AboutMe::all());
	}

	/** @test */
	public function aBiographyIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/about-me', [
				'heading' => 'Hi, my name is Guest',
				'position' => 'Junior',
				'location' => 'New York, USA'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['biography']
			]);

		$this->assertCount(0, AboutMe::all());
	}
}
