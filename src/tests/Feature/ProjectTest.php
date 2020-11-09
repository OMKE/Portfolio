<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProjectTest extends TestCase
{

	use RefreshDatabase;

	/** @test */
	public function unAuthenticatedUserCannotCreateProject()
	{
		$response = $this->post('/api/v1/projects', [
			'themeId' => 1,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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',
			'websiteUrl' => 'https://example.com/',
		]);

		$response
			->assertStatus(401)
			->assertJson(['message' => 'Token not provided']);

		$this->assertCount(0, Project::all());
    }

	/** @test */
	public function authenticatedUserCanCreateProject()
	{
		$this->withoutExceptionHandling();

		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->post('/api/v1/projects', [
			'themeId' => $theme->id,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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',
			'websiteUrl' => 'https://example.com/',
		]);


		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data'
			]);

		$this->assertCount(1, Project::all());

		// todo - Test file saving
    }

	/** @test */
	public function aThemeIdIsRequired()
	{
		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->post('/api/v1/projects', [
			'title' => 'New project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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',
			'websiteUrl' => 'https://example.com/',
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure(['message', 'errors' => ['themeId']]);


		$this->assertCount(0, Project::all());
    }

	/** @test */
	public function aThemeWithIdDoesntExistsInDatabase()
	{
		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->post('/api/v1/projects', [
			'themeId' => 2,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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',
			'websiteUrl' => 'https://example.com/',
		]);


		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['themeId']
			]);

		$this->assertCount(0, Project::all());
    }

	/** @test */
	public function aTitleIsRequired()
	{

		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->post('/api/v1/projects', [
			'themeId' => $theme->id,
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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',
			'websiteUrl' => 'https://example.com/',
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure(['message', 'errors' => ['title']]);


		$this->assertCount(0, Project::all());
    }

	/** @test */
	public function aDescriptionIsRequired()
	{
		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->post('/api/v1/projects', [
			'themeId' => $theme->id,
			'title' => 'New project',
			'image' => 'base64,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',
			'websiteUrl' => 'https://example.com/',
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure(['message', 'errors' => ['description']]);


		$this->assertCount(0, Project::all());
    }

	/** @test */
	public function anImageIsRequired()
	{
		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->post('/api/v1/projects', [
			'themeId' => $theme->id,
			'title' => 'New project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'websiteUrl' => 'https://example.com/',
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure(['message', 'errors' => ['image']]);


		$this->assertCount(0, Project::all());
    }

	/** @test */
	public function websiteUrlAndSourceCodeUrlAndVideoUrlAreNotRequired()
	{
		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$response = $this->post('/api/v1/projects', [
			'themeId' => $theme->id,
			'title' => 'New project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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',
		]);

		$response
			->assertStatus(200)
			->assertJsonStructure(['message', 'data' => ['id', 'themeId', 'title', 'description','image', 'createdAt', 'updatedAt']]);


		$this->assertCount(1, Project::all());
    }

	/** @test */
	public function aProjectCanBeUpdated()
	{

		$this->withoutExceptionHandling();

		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);
		$theme2 = Theme::factory()->create(['id' => 2, 'name' => 'Secondary', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$this->post('/api/v1/projects', [
			'themeId' => $theme->id,
			'title' => 'New project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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',
		]);

		$project = Project::first();

		$response = $this->putJson('/api/v1/projects/' . $project->id, [
			'themeId' => $theme2->id,
			'title' => 'Updated project',
			'description' => '<h1>Updated description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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'
		]);

		$response
			->assertStatus(200)
			->assertJsonStructure(['message', 'data' => ['id', 'themeId', 'title', 'description','image', 'createdAt', 'updatedAt']]);

		$this->assertCount(1, Project::all());


		$updatedProject = Project::first();

		$this->assertEquals(2, $updatedProject->themeId);
		$this->assertEquals('Updated project', $updatedProject->title);
		$this->assertEquals('<h1>Updated description about new project</h1><p>This is some project descrption</p>', $updatedProject->description);
    }


	/** @test */
	public function aProjectCanBeDeleted()
	{
		$this->withoutExceptionHandling();

		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$this->post('/api/v1/projects', [
			'themeId' => $theme->id,
			'title' => 'New project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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',
		]);

		$project = Project::first();

		$project->images()->create(
			['projectId' => $project->id, 'description' => '<h1>This is some description </h1>', 'image' => 'some/path/to/the/image.png']
		);
		$project->images()->create(
			['projectId' => $project->id, 'description' => '<h1>This is another description </h1>', 'image' => 'some/path/to/the/image2.png']
		);



		$response = $this->delete('/api/v1/projects/' . $project->id);

		$response
			->assertStatus(200)
			->assertJsonStructure(['message']);


		$this->assertCount(0, ProjectImage::all());
		$this->assertCount(0, Project::all());

    }
}
