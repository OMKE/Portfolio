<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\TechnologyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', fn() => response()->json(['author' => 'Omar Iriskic', 'domain' => 'omaririskic.com', 'contact' => 'contact@omaririskic.com', 'api_version' => 'v1']));


Route::group([
	'prefix' => 'auth'
], function ($router) {
	Route::post('login', [AuthController::class, 'login'])->name('login');
	Route::post('logout', [AuthController::class, 'logout']);
	Route::post('refresh', [AuthController::class, 'refresh']);
	Route::get('me', [AuthController::class, 'me']);
});


Route::group([
	'prefix' => 'technologies'
], function ($router) {
	Route::get('', [TechnologyController::class, 'index']);
	Route::get('/{technology}', [TechnologyController::class, 'show']);
	Route::post('', [TechnologyController::class, 'store']);
	Route::put('/{technology}', [TechnologyController::class, 'update']);
	Route::delete('/{technology}', [TechnologyController::class, 'delete']);
	Route::post('/image', [TechnologyController::class, 'uploadImage']);
	Route::delete('/image', [TechnologyController::class, 'deleteImage']);
});

