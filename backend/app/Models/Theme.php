<?php

namespace App\Models;

use Eloquence\Behaviours\CamelCasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory, CamelCasing;

    protected $guarded = [];

    public function projects()
	{
		return $this->hasMany(Project::class);
	}
}
