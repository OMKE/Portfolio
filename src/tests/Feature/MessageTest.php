<?php

namespace Tests\Feature;


use App\Mail\MessageCreated;
use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use Illuminate\Support\Facades\Mail;
use ReCaptcha\ReCaptcha;
use Tests\TestCase;

class MessageTest extends TestCase
{
	use RefreshDatabase;

	/** @test */
	public function aGuestUserCanSendMessage()
	{
		$this->withoutExceptionHandling();

		Mail::fake();


		$response = $this->postJson('/api/v1/messages', [
			'name' => 'Omar Iriskic',
			'email' => 'omaririskic.dev@gmail.com',
			'message' => 'This is a test message. This is a test message.'
		]);

		$response
			->assertStatus(200)
			->assertJsonStructure([
				'message',
				'data' => ['id', 'name', 'email', 'message', 'createdAt', 'updatedAt']
			]);

		$this->assertCount(1, Message::all());
		$message = Message::first();

		Mail::assertQueued(MessageCreated::class, function ($mail) {
			return $mail->hasTo(config('mail.to.address'));
		});

		$this->assertEquals('Omar Iriskic', $message->name);
		$this->assertEquals('omaririskic.dev@gmail.com', $message->email);
		$this->assertEquals('This is a test message. This is a test message.', $message->message);
    }

	/** @test */
	public function aNameIsRequired()
	{
		Mail::fake();

		$response = $this->postJson('/api/v1/messages', [
			'email' => 'omaririskic.dev@gmail.com',
			'message' => 'This is a test message. This is a test message.'
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['name']
			]);

		$this->assertCount(0, Message::all());


		Mail::assertNothingSent();

    }

	/** @test */
	public function anEmailIsRequired()
	{
		Mail::fake();

		$response = $this->postJson('/api/v1/messages', [
			'name' => 'Omar Iriskic',
			'message' => 'This is a test message. This is a test message.'
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['email']
			]);

		$this->assertCount(0, Message::all());


		Mail::assertNothingSent();
    }

	/** @test */
	public function aMessageIsRequired()
	{
		Mail::fake();

		$response = $this->postJson('/api/v1/messages', [
			'name' => 'Omar Iriskic',
			'email' => 'omaririskic.dev@gmail.com',
		]);

		$response
			->assertStatus(422)
			->assertJsonStructure([
				'message',
				'errors' => ['message']
			]);

		$this->assertCount(0, Message::all());


		Mail::assertNothingSent();
    }

	/** @test */
	public function aMessageCanBeDeleted()
	{
		$user = User::factory()->create();
		$this->actingAs($user);

		$message = Message::factory()->create([
			'name' => 'Some name',
			'email' => 'example@example.com',
			'message' => "This is a test message, this is a test message"
		]);


		$response = $this->delete('/api/v1/messages/' . $message->id);

		$response
			->assertStatus(200)
			->assertJsonStructure(['message']);

		$this->assertCount(0, Message::all());
    }
}
