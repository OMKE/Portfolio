<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Theme::factory()->create([
        	'name' => 'Default',
			'primary_color' => '#BE1B3F',
			'secondary_color' => '#CA2D4F',
			'text_color' => '#FFF'
		]);

		Theme::factory()->create([
			'name' => 'Papaya - Blue',
			'primary_color' => '#F98E1D',
			'secondary_color' => '#2D56BB',
			'text_color' => '#FFF'
		]);

		Theme::factory()->create([
			'name' => 'Green - Dark',
			'primary_color' => '#34B4A5',
			'secondary_color' => '#303030',
			'text_color' => '#FFF'
		]);

		Theme::factory()->create([
			'name' => 'Yellow - Dark',
			'primary_color' => '#fff200',
			'secondary_color' => '#303030',
			'text_color' => '#000'
		]);
    }
}
