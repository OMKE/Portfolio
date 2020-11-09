<?php

namespace App\Providers;

use App\Models\Project;
use App\Models\ProjectImage;
use App\Observers\ProjectImageObserver;
use App\Observers\ProjectObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Project::observe(ProjectObserver::class);
        ProjectImage::observe(ProjectImageObserver::class);
    }
}
