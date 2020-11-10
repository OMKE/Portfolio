<?php

namespace App\Observers;

use App\Models\ProjectImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectImageObserver
{
    /**
     * Handle the ProjectImage "created" event.
     *
     * @param  \App\Models\ProjectImage  $projectImage
     * @return void
     */
    public function created(ProjectImage $projectImage)
    {
        //
    }

    /**
     * Handle the ProjectImage "updated" event.
     *
     * @param  \App\Models\ProjectImage  $projectImage
     * @return void
     */
    public function updated(ProjectImage $projectImage)
    {
        //
    }

    /**
     * Handle the ProjectImage "deleted" event.
     *
     * @param  \App\Models\ProjectImage  $projectImage
     * @return void
     */
    public function deleted(ProjectImage $projectImage)
    {
		$imageName = Str::afterLast($projectImage->image, '/');
		if(Storage::disk('projects')->exists($projectImage->project->id . '/' . $imageName))
		{
			Storage::disk('projects')->delete($projectImage->project->id . '/' . $imageName);
		}
    }

    /**
     * Handle the ProjectImage "restored" event.
     *
     * @param  \App\Models\ProjectImage  $projectImage
     * @return void
     */
    public function restored(ProjectImage $projectImage)
    {
        //
    }

    /**
     * Handle the ProjectImage "force deleted" event.
     *
     * @param  \App\Models\ProjectImage  $projectImage
     * @return void
     */
    public function forceDeleted(ProjectImage $projectImage)
    {
        //
    }
}
