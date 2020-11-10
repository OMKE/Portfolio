<?php

namespace App\Observers;

use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectObserver
{
    /**
     * Handle the Project "created" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function created(Project $project)
    {
        //
    }

    /**
     * Handle the Project "updated" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function updated(Project $project)
    {
        //
    }

    /**
     * Handle the Project "deleted" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function deleted(Project $project)
    {

		$imageNameToDeleted = Str::afterLast($project->image, '/');

		if(Storage::disk('projects')->exists($imageNameToDeleted))
		{
			// Delete old image
			Storage::disk('projects')->delete($imageNameToDeleted);
		}
		// Check for folder
		if(Storage::disk('projects')->exists($project->id))
		{
			// Delete
			Storage::disk('projects')->deleteDir($project->id);
		}
    }

    /**
     * Handle the Project "restored" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function restored(Project $project)
    {
        //
    }

    /**
     * Handle the Project "force deleted" event.
     *
     * @param  \App\Models\Project  $project
     * @return void
     */
    public function forceDeleted(Project $project)
    {
        //
    }
}
