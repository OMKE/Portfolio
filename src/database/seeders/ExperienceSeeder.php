<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Experience::factory()
			->create([
				'date' => '2017-2021',
				'title' => 'Software Engineering',
				'company' => 'Singidunum University'
			]);

		Experience::factory()
			->create([
				'date' => 'February 2019',
				'title' => 'Internship',
				'company' => 'Schneider Electric DMS'
			]);
    }
}
