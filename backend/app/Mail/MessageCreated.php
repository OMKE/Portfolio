<?php

namespace App\Mail;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MessageCreated extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public Message $message;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
			->from($this->message->email)
			->subject("You got a new message from: " . $this->message->name)
			->markdown('emails.message-created');
    }
}
