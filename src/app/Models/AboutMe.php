<?php

namespace App\Models;

use Eloquence\Behaviours\CamelCasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutMe extends Model
{
	protected $table = "about_me";

	protected $guarded = [];

    use HasFactory, CamelCasing;
}
