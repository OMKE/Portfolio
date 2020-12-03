<?php

namespace Database\Seeders;

use App\Models\AboutMe;
use Illuminate\Database\Seeder;

class AboutMeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AboutMe::factory()
			->create([
				'heading' => "Hi, my name is Omar 👋",
				'position' => 'Junior',
				'location' => 'Novi Sad, Serbia',
				'biography' => '<h5> Biography </h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Auctor elit sed vulputate mi sit amet. Aliquet lectus proin nibh nisl condimentum. Dictumst quisque sagittis purus sit amet volutpat consequat. Ultricies lacus sed turpis tincidunt id.</p>'
			]);
    }
}
