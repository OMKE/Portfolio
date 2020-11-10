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

        \Validator::extend('base64_image', function ($attribute, $value, $parameters, $validator) {

			try {
				$result = mime_content_type($value);
				if ($result == 'image/png' || $result == 'image/jpeg') {
					return true;
				} else {
					return $validator->errors()->add('image', 'base64 image is not png or jpeg');
				}
			} catch (\ErrorException $e)
			{
				return $validator->errors()->add('image', 'base64 image is not png or jpeg');
			}

		});
    }
}
