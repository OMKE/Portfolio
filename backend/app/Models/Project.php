<?php

namespace App\Models;

use Eloquence\Behaviours\CamelCasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory, CamelCasing;

    protected $guarded = [];

    public function images()
	{
		return $this->hasMany(ProjectImage::class);
	}

	public function theme()
	{
		return $this->belongsTo(Theme::class);
	}
}
