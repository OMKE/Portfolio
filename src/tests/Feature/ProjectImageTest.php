<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Theme;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectImageTest extends TestCase
{

	use RefreshDatabase;

	/** @test */
	public function unAuthenticatedUserCannotCreateProjectImage()
	{

//		$this->withoutExceptionHandling();

		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$project = Project::factory()->create(['themeId' => $theme->id,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'base64,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',
			'websiteUrl' => 'https://example.com/']);



		$response = $this->postJson('/api/v1/projects/' . $project->id . '/images', [
			'image' => 'base64,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',
			'description' => '<h1>Maxime maxime</h1><p>Dolores nemo tempora quia doloremque expedita. Veritatis rerum quia laudantium pariatur sequi. Necessitatibus sit sint accusamus in quasi delectus placeat voluptas. Aliquid quasi ipsa aut dolor.</p>'
		]);

		$response
			->assertStatus(401)
			->assertJson([
				'message' => 'Token not provided'
			]);


		$this->assertCount(0, ProjectImage::all());

    }

	/** @test */
	public function authenticatedUserCanCreateProjectImage()
	{

		Storage::fake('projects');

		$this->withoutExceptionHandling();


		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$project = Project::factory()->create(['themeId' => $theme->id,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'data:image/png;base64,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',
			'websiteUrl' => 'https://example.com/']);



		$response = $this->postJson('/api/v1/projects/' . $project->id . '/images', [
			'image' => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAK8BAMAAAD/lHFwAAAAG1BMVEUAmf/////f8v+f2P8fpf9/zP+/5f9fv/8/sv/7XAkNAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAIRUlEQVR4nO3cTY/bxhkAYOpbx9WmtntcJSnio9dtkB4lJ3Cvlg85rwCjznHlFD5HKdDfXVL80IhDek17Da+k5wFWWo2kF5pXw+HMkFSSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwzd5Pr/86Y6Sewn7+7ez724/N+yxmcxnqUcfLLmXsO+ygtmrzwv7gA1mh3YtabjOH7ypXhaXfNj1YdQnLUFe5gWPF/dWnwemMb0vigeXi/JlccmHNaY3CjKcFyXf32ONHpSm9Fa1rqodl9yhKb1xkDLfH/2tHZ2m9I6rR98Ur4pL7tCU3jjIuip5du8Vexia0rtJ739Y/GtdPGwsuUNTeqMgk6zd/mf4vnzBCWpI77Coblb7v+xeFJfcpSG9cZBl8HUuvkDdHoDRvwN5NUdl89qUg6i45C6/BlHXeTrjIKui1WYJP92xWWWSV7dfdo5py77c/ROXdLHJ0xoHmZd9btrWrz7vox+DZV7dTdgnlO2tVtLBsEhrFGRS9QnL0+18A+t8gLSuNtV0671JGks6GBcDsSjIuOpp0n7j8Wd87uOQtqa/Zvf7HU3aqi6aSzpIW+0fjUF61X4ya8+f/rmPxIu8b5jum9I4T3hc0kE6mdj1DXGQ7X5LWBdfwSm7zpvXYD86GOX/xiWl1T5nbYOKQdFG4yDX+/HC6vSHDtOi/v19Ay1aXFxSSp8pm928Ze+/LTIXB5nvm+y2e5d+bMZFfnpB95r3iXFJKdv531T/NY4p1sUoLA4ShOp179KPTbkLWgYtab7rL+KSyrocUvVbdv7l/jIOMgze0f/Y2eDxmhe13QQLLNe7lMcllW05RVi17PP6ZVajIJNgfWjQeY95bEZlDcPdzGq3xccllUHRJwzbVr1W5dcRBQn3kqOTn1csgxlqlcDNLidxSSVL61WSLygsGqIOqyYaBRkEKZ189nGmh25V5iccg+Z79Ljk4G1ZYpYt+RlVnWoUJBxCT0992rZvZt3S+yJvttctxzGqbeLM07tvZuHYIN/dxyV7+WJi61JPtU3EQcLRwvDU09ur0lbLw1VTSWCeZWnctlC5T1sUpJbe7gudx2QVTr8WZelHpHeb9SrbloHVaF9+3umdV/UL52X5bCouCWQHKBfrlkltf/9lREEOIp34ktlkP0rqmN6s2/2p7WDZZt8ln3V6x/u6dkxvNmi4bDtAv96/86zTu91Purqmd7k7Fty4ZDAN0n7W6Q2WEjru2nYTtpbl2nAp4Zx3bWH1uqY3e7olOeGLzzm94Zy/c3o3s7YFmXCB4pzTOw6q2m1SnL+55VjDOkjpOU+Kw6lu5/T2Zy3HgQ6muuec3nAxtrZy+KyppP7m5s7h4LhnFKS2IPmRp14epbBjrK17v2oqCWXziuae8+AQTxSktpx+wuu90zA/2+jQT1wSGrQOzLZhpxEFmZ7NwaBRuG3Go6m28VX1+pZpxSrsSKIg4WjhtA9l9sPGEx8xj0tCaVOcN3ed87Clx0HO5kD8Mqzd+OB8j8vGkkBaMvvfLOoykvqZY3GQYCyxbRl7nIaD8x5H0dlKcUkgTdvjaePI9/C8xzjI6lxOglqHtet4Ct8mK7lu2jWND76KMz6F73Db7nYC6jxL0rJpaNY7zPnZnoA6Pazdusvp06PdV1NdNxHaHn4VUZBzOX26VrtNl5P/l7v3lmeTHKh9FVGQczn5/7CT7HbpStHrrhqmXevD/dXZXrpS6yS7XHhVnlvWbzjaVhutne2FV9vDOVOXywYHRVons2ipZ1rL+FleNpjZ1LbNrLpvo4te3zZd9Lott/h5NDSb1DuSKEiW6MenfdFr5ro2HNhfCPtNa0lhXbbETbTzH9RL4iDXVUnjyasnorYP6vCDA/s+YRw17HHUT0dBTv8HBzLzemY++ucy9nu0aTQ060eb/Bn+XEZmVp+SfvSPvQTjsXU9m72oNz7DH3tJoklbJj934dEHS5J8MFCOJJb1pr2NFxnjIKtdyQmPyppNns+iH9qql9xL2N/nZ/hDWwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0KhX/PFFSO89mF3+o+WZWnov0ke92WyWXCZJ/yJ7mPp5/jZJXs7eJL2rJJl/2U96lC6Gf295piG9u9vHfyTvi/QO/7b4b3rzy+tF77dksv7yn/boXCQvkuffJf3FJP1n9O2zpPf6IrsbfLtKn+29/i4Z36bPBOl9cpO8LdI7eJXfjJ713ifjzdesxwOVpnf05uWrwe0y+T359Zcfk96b3d2vv2SNsZc+Nb1KfkyC9F48nV4V6e0v8pvhVa//x5866ljaOfQXw6vps9e3/0y+T9tpb7G7+z5Zps/20qeSt+lf2kln/e4uve/Ht0V6e+XNRW9y81Z6Y+mubdcor57eXGUpzLKV3V2Ufe9F8ufgNglbb/9dErfe5Icr6Y1dZPnJmujNbzdpk93lMLsLWm//dfHCIr2jR0nc9yarV9IbS9OU9b3J69t3r5L3i5+zHGZ3+743mTwpXlikd/dgdxuMHBKD5CZZmtKRQ7JdLBfJZP40S1J2tx85JJOr4oVhevMO5OdZOe5NpPcTjW+/9ic4ae++9gc4ab2nX/sTAADwSf4PWkSC7Y+Oe9QAAAAASUVORK5CYII=',
			'description' => '<h1>Maxime maxime</h1><p>Dolores nemo tempora quia doloremque expedita. Veritatis rerum quia laudantium pariatur sequi. Necessitatibus sit sint accusamus in quasi delectus placeat voluptas. Aliquid quasi ipsa aut dolor.</p>'
		]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data' => ['id', 'projectId', 'image', 'description']
			]);


		$this->assertCount(1, ProjectImage::all());
    }

	/** @test */
	public function aDescriptionIsRequired()
	{
		Storage::fake('projects');


		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$project = Project::factory()->create(['themeId' => $theme->id,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'data:image/png;base64,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',
			'websiteUrl' => 'https://example.com/']);



		$response = $this->postJson('/api/v1/projects/' . $project->id . '/images', [
			'image' => 'data:image/png;base64,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',
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['description']
			]);

		$this->assertCount(0, ProjectImage::all());
    }

	/** @test */
	public function anImageIsRequired()
	{
		Storage::fake('projects');


		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$project = Project::factory()->create(['themeId' => $theme->id,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'data:image/png;base64,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',
			'websiteUrl' => 'https://example.com/']);



		$response = $this->postJson('/api/v1/projects/' . $project->id . '/images', [
			'description' => '<h1>Maxime maxime</h1><p>Dolores nemo tempora quia doloremque expedita. Veritatis rerum quia laudantium pariatur sequi. Necessitatibus sit sint accusamus in quasi delectus placeat voluptas. Aliquid quasi ipsa aut dolor.</p>'
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['image']
			]);

		$this->assertCount(0, ProjectImage::all());
    }

	/** @test */
	public function anImageIsNotBase64String()
	{
		Storage::fake('projects');


		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$project = Project::factory()->create(['themeId' => $theme->id,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'this_is_some_invalid_data',
			'websiteUrl' => 'https://example.com/']);



		$response = $this->postJson('/api/v1/projects/' . $project->id . '/images', [
			'description' => '<h1>Maxime maxime</h1><p>Dolores nemo tempora quia doloremque expedita. Veritatis rerum quia laudantium pariatur sequi. Necessitatibus sit sint accusamus in quasi delectus placeat voluptas. Aliquid quasi ipsa aut dolor.</p>'
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['image']
			]);

		$this->assertCount(0, ProjectImage::all());
    }

	/** @test */
	public function aProjectImageCanBeUpdated()
	{
		Storage::fake('projects');


		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$user = User::factory()->create();

		$this->actingAs($user);

		$project = Project::factory()->create(['themeId' => $theme->id,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'data:image/png;base64,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',
			'websiteUrl' => 'https://example.com/']);

		$image = ProjectImage::factory()->create([
			'project_id' => $project->id
		]);

		$response = $this->putJson('/api/v1/projects/' . $project->id . '/images/' . $image->id, [
			'image' => 'data:image/png;base64,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',
			'description' => '<h1>Updated description</h1><p>Dolores nemo tempora quia doloremque expedita. Veritatis rerum quia laudantium pariatur sequi. Necessitatibus sit sint accusamus in quasi delectus placeat voluptas. Aliquid quasi ipsa aut dolor.</p>'
		]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data' => ['id', 'projectId', 'image', 'description', 'createdAt', 'updatedAt']
			]);



		$updatedImage = ProjectImage::first();


		$this->assertEquals
		(
			'<h1>Updated description</h1><p>Dolores nemo tempora quia doloremque expedita. Veritatis rerum quia laudantium pariatur sequi. Necessitatibus sit sint accusamus in quasi delectus placeat voluptas. Aliquid quasi ipsa aut dolor.</p>',
			$updatedImage->description
		);

		$this->assertCount(1, ProjectImage::all());
    }


	/** @test */
	public function aProjectImageCanBeDeleted()
	{
		$user = User::factory()->create();

		$this->actingAs($user);

		$theme = Theme::factory()->create(['id' => 1, 'name' => 'Default', 'primaryColor' => '#fff', 'secondaryColor'=>'#fff', 'textColor' => '#fff']);

		$project = Project::factory()->create(['themeId' => $theme->id,
			'title' => 'Some new project',
			'description' => '<h1>Description about new project</h1><p>This is some project descrption</p>',
			'image' => 'data:image/png;base64,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',
			'websiteUrl' => 'https://example.com/']);

		$image = ProjectImage::factory()->create([
			'project_id' => $project->id
		]);

		$response = $this->delete('/api/v1/projects/' . $project->id . '/images/' . $image->id);

		$response
			->assertStatus(200)
			->assertJsonStructure(['message']);


		$this->assertCount(0, ProjectImage::all());
    }
}
