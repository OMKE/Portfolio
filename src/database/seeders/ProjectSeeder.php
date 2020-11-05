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
				'description' => '<h1>Description about Tales of Alester</h1><p>This is first paragraph</p>',
				'thumbnail' => 'toa_small.png',
				'background_image' => 'toa_big.png',
				'source_code_url' => 'https://github.com/OMKE/TalesOfAlester',
			]);
		Project::factory()
			->create([
				'title' => 'Deezer',
				'description' => '<h1>Description about Deezer - clone</h1><p>This is first paragraph</p>',
				'thumbnail' => 'deezer_small.png',
				'background_image' => 'deezer_big.png',
				'website_url' => 'https://deezer.omaririskic.com',
				'source_code_url' => 'https://github.com/OMKE/Deezer',
			]);

		Project::factory()
			->create([
				'title' => 'GuhSaiyan Shop',
				'description' => '<h1>Description about University of Los Angeles</h1><p>This is first paragraph</p>',
				'thumbnail' => 'guh_small.png',
				'background_image' => 'guh_big.png',
				'website_url' => 'https://guhsaiyan.omaririskic.com',
			]);

		Project::factory()
			->create([
				'title' => 'University of Los Angeles',
				'thumbnail' => 'ula_small.png',
				'description' => '<h1>Description about University of Los Angeles</h1><p>This is first paragraph</p>',
				'background_image' => 'ula_big.png',
				'website_url' => 'https://ula.omaririskic.com',
				'source_code_url' => 'https://github.com/OMKE/ULA',
			]);
    }
}
