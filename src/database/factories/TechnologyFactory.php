<?php

namespace Database\Factories;

use App\Models\Technology;
use Illuminate\Database\Eloquent\Factories\Factory;

class TechnologyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Technology::class;

    private array $technologies = [
    	'Laravel', 'Angular', 'Django', 'SpringBoot', 'ReactJs', 'NodeJS', 'express', 'Ruby on Rails', 'Sass', "Less", 'nginx', 'Qt', 'NestJS'
	];

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
    	$random_tech = $this->technologies[array_rand($this->technologies)];
        return [
            'name' => $random_tech,
			'image' => $random_tech . '.png',
			'order_number' => rand(0, 100)
        ];
    }
}
