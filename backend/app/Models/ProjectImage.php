<?php

namespace App\Models;

use Eloquence\Behaviours\CamelCasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectImage extends Model
{
    use HasFactory, CamelCasing;

    protected $guarded = [];

    public function project()
	{
		return $this->belongsTo(Project::class);
	}
}
