<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Products_size extends Model
{
    public function sizes()
{
     return $this->belongsTo(Size::class, 'sizes_id');
}
}
