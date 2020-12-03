<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMessageRequest;
use App\Models\Message;
use App\Services\MessageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
	private MessageService $messageService;

    public function __construct(MessageService $messageService)
	{
		$this->messageService = $messageService;

		$this->middleware('jwt.auth', ['except' => 'store']);
	}


	public function index() : JsonResponse
	{
		return $this->messageService->getAll();
	}

	public function show(Message $message) : JsonResponse
	{
		return $this->messageService->getOne($message);
	}

	public function store(CreateMessageRequest $request) : JsonResponse
	{
		return $this->messageService->store($request->validated());
	}

	public function destroy(Message $message) : JsonResponse
	{
		return $this->messageService->delete($message);
	}
}
