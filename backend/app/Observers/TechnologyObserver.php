<?php

namespace App\Observers;

use App\Models\Technology;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TechnologyObserver
{
    /**
     * Handle the Technology "created" event.
     *
     * @param  \App\Models\Technology  $technology
     * @return void
     */
    public function created(Technology $technology)
    {
        //
    }

    /**
     * Handle the Technology "updated" event.
     *
     * @param  \App\Models\Technology  $technology
     * @return void
     */
    public function updated(Technology $technology)
    {
        //
    }

    /**
     * Handle the Technology "deleted" event.
     *
     * @param  \App\Models\Technology  $technology
     * @return void
     */
    public function deleted(Technology $technology)
    {
        $imageName = Str::afterLast($technology->image, '/');
        if(Storage::disk('technologies')->exists($imageName))
        {
            Storage::disk('technologies')->delete($imageName);
        }
    }

    /**
     * Handle the Technology "restored" event.
     *
     * @param  \App\Models\Technology  $technology
     * @return void
     */
    public function restored(Technology $technology)
    {
        //
    }

    /**
     * Handle the Technology "force deleted" event.
     *
     * @param  \App\Models\Technology  $technology
     * @return void
     */
    public function forceDeleted(Technology $technology)
    {
        //
    }
}
