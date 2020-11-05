<?php

namespace Database\Seeders;

use App\Models\Technology;

use Database\Factories\TechnologyFactory;
use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		Technology::factory()
			->times(10)
			->create();
    }
}
