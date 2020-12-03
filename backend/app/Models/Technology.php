<?php

namespace App\Models;

use Eloquence\Behaviours\CamelCasing;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Technology extends Model
{
    use HasFactory, CamelCasing;

    protected $guarded = [];


}
