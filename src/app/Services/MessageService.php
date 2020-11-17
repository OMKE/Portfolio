<?php


namespace App\Services;




use App\Models\Message;
use Illuminate\Http\JsonResponse;

class MessageService
{
	public function getAll() : JsonResponse
	{
		return response()->json(Message::all());
	}

	public function getOne(Message $message) : JsonResponse
	{
		return response()->json($message);
	}

	public function store(array $validated) : JsonResponse
	{
		$message = new Message($validated);
		$message->save();

		return response()->json(['message' => 'Message has been sent. You will be contacted shortly', 'data'=> $message]);
	}

	public function delete(Message $message)
	{
		$message->delete();
		return response()->json(['message' => 'Message has been deleted']);
	}
}