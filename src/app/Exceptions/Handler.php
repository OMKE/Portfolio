<?php

namespace App\Exceptions;


use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /*
	public function render($request, Throwable $e)
	{
		// Currently converts AuthorizationException to 403 HttpException
		// and ModelNotFoundException to 404 NotFoundHttpException
		$exception = $this->prepareException($e);
		// Default response
		$response = [
			'error' => 'Sorry, something went wrong.'
		];

		// Add debug info if app is in debug mode
		if (config('app.debug')) {
			// Add the exception class name, message and stack trace to response
			$response['exception'] = get_class($exception); // Reflection might be better here
			$response['message'] = $exception->getMessage();
			$response['trace'] = $exception->getTrace();
		}

		$status = 400;
		// Build correct status codes and status texts
		switch ($exception) {
			case $exception instanceof ValidationException:
				return $this->convertValidationExceptionToResponse($exception, $request);
			case $exception instanceof AuthenticationException:
				$status = 401;
				$response['error'] = Response::$statusTexts[$status];
				break;
			case $this->isHttpException($exception):
				$status = $exception->getStatusCode();
				$response['error'] = Response::$statusTexts[$status];
				break;
			default:
				break;
		}

		return response()->json($response, $status);
	}
	*/

}
