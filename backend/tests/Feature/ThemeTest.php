<?php

namespace Tests\Feature;

use App\Models\Theme;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ThemeTest extends TestCase
{
	use RefreshDatabase;

	/** @test */
	public function unAuthenticatedUserCannotSeeThemes()
	{
		$response = $this->get('/api/v1/project-themes');

		$response
			->assertStatus(401)
			->assertJson(['message' => 'Token not provided']);
	}

	/** @test */
	public function unAuthenticatedUserCannotSeeOneTheme()
	{
		$theme = Theme::factory()->create(['name' => 'Some theme', 'primary_color' => '#fff', 'secondary_color'=>'#fff', 'text_color'=>'#fff']);

		$response = $this->get('/api/v1/project-themes/' . $theme->id);

		$response
			->assertStatus(401)
			->assertJson(['message' => 'Token not provided']);
	}

	/** @test */
	public function unAuthenticatedUserCannotCreate()
	{
		$response = $this
			->postJson('/api/v1/project-themes', [
				'name' => 'Default',
				'primaryColor' => '#fff',
				'secondaryColor' => '#fff',
				'textColor' => '#fff',
		]);

		$response
			->assertStatus(401)
			->assertJson(['message' => 'Token not provided']);

		$this->assertCount(0, Theme::all());
	}

	/** @test */
	public function authenticatedUserCanCreateTheme()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/project-themes', [
				'name' => 'Default',
				'primaryColor' => '#fff',
				'secondaryColor' => '#fff',
				'textColor' => '#fff',
			]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data' => ['id', 'name', 'primaryColor', 'secondaryColor', 'textColor', 'createdAt', 'updatedAt']
			]);

		$this->assertCount(1, Theme::all());
	}

	/** @test */
	public function aThemeCanBeUpdated()
	{

		$this->withoutExceptionHandling();

		$user = User::factory()->create();

		$this->actingAs($user);

		$this
			->postJson('/api/v1/project-themes', [
				'name' => 'Default',
				'primaryColor' => '#fff',
				'secondaryColor' => '#fff',
				'textColor' => '#fff',
			]);

		$theme = Theme::first();

		$response = $this->putJson('/api/v1/project-themes/' . $theme->id, [
			'name' => 'Updated',
			'primaryColor' => '#000',
			'secondaryColor' => '#000',
			'textColor' => '#000',
		]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data' => ['id', 'name', 'primaryColor', 'secondaryColor', 'textColor', 'createdAt', 'updatedAt']
			]);

		$updated = Theme::first();

		$this->assertEquals('Updated', $updated->name);
		$this->assertEquals('#000', $updated->primaryColor);
		$this->assertEquals('#000', $updated->secondaryColor);
		$this->assertEquals('#000', $updated->textColor);

		$this->assertCount(1, Theme::all());
	}

	/** @test */
	public function aNameIsRequired()
	{

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/project-themes', [
				'primaryColor' => '#fff',
				'secondaryColor' => '#fff',
				'textColor' => '#fff',
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['name']
			]);
	}

	/** @test */
	public function aPrimaryColorIsRequired()
	{

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/project-themes', [
				'name' => 'New theme',
				'secondaryColor' => '#fff',
				'textColor' => '#fff',
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['primaryColor']
			]);
	}

	/** @test */
	public function aSecondaryColorIsRequired()
	{

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/project-themes', [
				'name' => 'New theme',
				'primaryColor' => '#fff',
				'textColor' => '#fff',
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['secondaryColor']
			]);
	}

	/** @test */
	public function aTextColorIsRequired()
	{

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this
			->postJson('/api/v1/project-themes', [
				'name' => 'New theme',
				'primaryColor' => '#fff',
				'secondaryColor' => '#fff'
			]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['textColor']
			]);
	}
}
