<?php

namespace App\Utilities;

use Illuminate\Support\Str;
use Mimey\MimeTypes;

class ImageFromBase64Converter
{

    private string $prefix;

    private string $image;

    public function __construct(string $base64String, string $prefix)
    {
        $this->prefix = $prefix;
        $this->image = $this->convertImage($base64String);
    }

    public function convertImage(string $base64String): string
    {
        return base64_decode(substr($base64String, strpos($base64String, ',') + 1));
    }

    public function getImage(): string {
        return $this->image;
    }

    public function getImageName(): string {
        return time() . '_' . Str::snake(Str::lower($this->prefix)) . '.' . $this->getExtension();
    }

    public function getExtension(): string
    {
        $mimes = new MimeTypes();

        $mimeType = getimagesizefromstring($this->image)['mime'];

        return $mimes->getExtension($mimeType);
    }
}
