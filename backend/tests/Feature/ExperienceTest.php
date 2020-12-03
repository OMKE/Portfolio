<?php

namespace Tests\Feature;

use App\Models\Experience;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExperienceTest extends TestCase
{

	use RefreshDatabase;

	/** @test */
	public function unAuthenticatedUserCanNotCreateExperience()
	{

		$response = $this->postJson('/api/v1/experiences',
			[
				'date' => '2020-2021',
				'title' => 'New experience',
				'company' => 'Acme'
			]);

		$response
			->assertStatus(401)
			->assertJson(['message' => 'Token not provided']);

		$this->assertCount(0, Experience::all());
	}

	/** @test */
	public function authenticatedUserCanCreateExperience()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->postJson('/api/v1/experiences',
			[
				'date' => '2020-2021',
				'title' => 'New experience',
				'company' => 'Acme'
			]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data' => [ 'id', 'date', 'title', 'company', 'createdAt', 'updatedAt' ]
			]);

		$this->assertCount(1, Experience::all());
	}

	/** @test */
	public function aDateIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->postJson('/api/v1/experiences',
			[
				'title' => 'New experience',
				'company' => 'Acme'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['date']
			]);

		$this->assertCount(0, Experience::all());
	}

	/** @test */
	public function aTitleIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->postJson('/api/v1/experiences',
			[
				'date' => '2020',
				'company' => 'Acme'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['title']
			]);

		$this->assertCount(0, Experience::all());
	}

	/** @test */
	public function aCompanyIsRequired()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->postJson('/api/v1/experiences',
			[
				'date' => '2020',
				'title' => 'New experience'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['company']
			]);

		$this->assertCount(0, Experience::all());
	}

	/** @test */
	public function aDateHasToBeLongerThanFiveCharacters()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->postJson('/api/v1/experiences',
			[
				'date' => '2020',
				'title' => 'New experience',
				'company' => 'Acme'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['date']
			]);

		$this->assertCount(0, Experience::all());
	}

	/** @test */
	public function aTitleHasToBeLongerThanFiveCharacters()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->postJson('/api/v1/experiences',
			[
				'date' => '2020-2021',
				'title' => 'New',
				'company' => 'Acme'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['title']
			]);

		$this->assertCount(0, Experience::all());
	}


	/** @test */
	public function aCompanyHasToBeLongerThanThreeCharacters()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->postJson('/api/v1/experiences',
			[
				'date' => '2020-2021',
				'title' => 'New experience',
				'company' => 'Ac'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['company']
			]);

		$this->assertCount(0, Experience::all());
	}

	/** @test */
	public function anExperienceCanBeUpdated()
	{
		$this->withoutExceptionHandling();
		$user = User::factory()->create();

		$this->actingAs($user);

		$this->postJson('/api/v1/experiences',
			[
				'date' => '2020-2021',
				'title' => 'New experience',
				'company' => 'Acme'
			]);

		$experience = Experience::first();

		$response = $this
			->putJson('/api/v1/experiences/' . $experience->id,
				[
					'date' => '2020-2022',
					'title' => 'Updated experience',
					'company' => 'Meca'
				]
		);
		$this->assertEquals('2020-2022', Experience::find(1)->date);
		$this->assertEquals('Updated experience', Experience::find(1)->title);
		$this->assertEquals('Meca', Experience::find(1)->company);
	}

	/** @test */
	public function anExperienceCanBeDeleted()
	{
		$this->withoutExceptionHandling();
		$user = User::factory()->create();

		$this->actingAs($user);

		$this->postJson('/api/v1/experiences',
			[
				'date' => '2020-2021',
				'title' => 'New experience',
				'company' => 'Acme'
			]);

		$experience = Experience::first();

		$response = $this
			->delete('/api/v1/experiences/' . $experience->id);

		$this->assertCount(0, Experience::all());
	}
}
