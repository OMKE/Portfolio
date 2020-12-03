@component('mail::message')
# Introduction
<p>New message from {{ $message->name }}</p>
<p>Sent from: {{ $message->email }}</p>
<p>Message: <br>
	{{ $message->message }}
</p>





{{ config('app.name') }}
@endcomponent
