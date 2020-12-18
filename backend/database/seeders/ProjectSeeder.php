<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		Project::factory()
			->create([
				'title' => 'Tales of Alester',
				'theme_id' => random_int(1, 4),
				'description' => '<h1>Description about Tales of Alester</h1><p>This is first paragraph</p>',
				'image' => 'https://via.placeholder.com/800x600',
				'source_code_url' => 'https://github.com/OMKE/TalesOfAlester',
			]);
		Project::factory()
			->create([
				'title' => 'Deezer',
				'theme_id' => random_int(1, 4),
				'description' => '<h1>Description about Deezer - clone</h1><p>This is first paragraph</p>',
				'image' => 'https://via.placeholder.com/800x600',
				'website_url' => 'https://deezer.omaririskic.com',
				'source_code_url' => 'https://github.com/OMKE/Deezer',
			]);

		Project::factory()
			->create([
				'title' => 'GuhSaiyan Shop',
				'theme_id' => random_int(1, 4),
				'description' => '<h1>Description about University of Los Angeles</h1><p>This is first paragraph</p>',
				'image' => 'https://via.placeholder.com/800x600',
				'website_url' => 'https://guhsaiyan.omaririskic.com',
			]);

		Project::factory()
			->create([
				'title' => 'University of Los Angeles',
				'theme_id' => random_int(1, 4),
				'image' => 'https://via.placeholder.com/800x600',
				'description' => '<h1>Description about University of Los Angeles</h1><p>This is first paragraph</p>',
				'website_url' => 'https://ula.omaririskic.com',
				'source_code_url' => 'https://github.com/OMKE/ULA',
			]);
    }
}
