<?php

namespace Tests\Feature;

use App\Models\Technology;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TechnologyTest extends TestCase
{
	use RefreshDatabase;


	/** @test */
    public function unAuthenticatedUserCanNotAddTechnology()
	{
		$response = $this
			->postJson(
				'/api/v1/technologies',
				['name' => "New technology", 'image' => 'someImagePath', 'orderNumber' => 32]);

		$response
			->assertStatus(401)
			->assertJson(['message' => 'Token not provided']);
	}

	/** @test */
	public function authenticatedUserCanAddTechnology()
	{


		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson(
				'/api/v1/technologies',
				['name' => "New technology", 'image' => 'someImagePath', 'orderNumber' => 32]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data' => [
					'name', 'image', 'orderNumber', 'updatedAt', 'createdAt', 'id'
				]
			]);

		$this->assertCount(1, Technology::all());
	}

	/** @test */
	public function aNameIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson(
				'/api/v1/technologies',
				['image' => 'someImagePath', 'orderNumber' => 32]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => [
					'name'
				]
			]);

		$this->assertCount(0, Technology::all());
	}

	/** @test */
	public function anImageIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson(
				'/api/v1/technologies',
				['name' => 'New technology', 'orderNumber' => 32]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => [
					'image'
				]
			]);

		$this->assertCount(0, Technology::all());
	}

	/** @test */
	public function anOrderNumberIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson(
				'/api/v1/technologies',
				['name' => 'New technology', 'imagePath' => 'someImagePath']);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => [
					'orderNumber'
				]
			]);

		$this->assertCount(0, Technology::all());
	}

	/** @test */
	public function aNameHasToBeLongerThanThreeCharacters()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson(
				'/api/v1/technologies',
				['name' => 'Ne', 'imagePath' => 'someImagePath', 'orderNumber' => 32]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => [
					'name'
				]
			]);

		$this->assertCount(0, Technology::all());
	}

	/** @test */
	public function aTechnologyCanBeUpdated()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$this
			->postJson(
				'/api/v1/technologies',
				['name' => "New technology", 'image' => 'someImagePath', 'orderNumber' => 32]);

		$technology = Technology::first();

		$this
			->putJson(
			'/api/v1/technologies/' . $technology->id,
				['name' => 'Updated technology', 'image' => 'someNewImagePath', 'orderNumber' => 42]
		);

		$this->assertEquals('Updated technology', Technology::first()->name);
		$this->assertEquals('someNewImagePath', Technology::first()->image);
		$this->assertEquals(42, Technology::first()->orderNumber);
	}

	/** @test */
	public function aTechnologyCanBeDeleted()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$this
			->postJson(
				'/api/v1/technologies',
				['name' => "New technology", 'image' => 'someImagePath', 'orderNumber' => 32]);

		$technology = Technology::first();

		$this->delete('/api/v1/technologies/' . $technology->id);

		$this->assertCount(0, Technology::all());
	}

}
