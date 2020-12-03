<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()
			->times(1)
			->create([
				'name' => 'Omar Iriskic',
				'email' => 'me@omaririskic.com',
				'password' => Hash::make('omar1234')
			]);
    }
}
