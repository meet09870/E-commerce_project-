<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrductImage extends Model
{
    protected $appends = ['image_url'];

     public function getImageUrlAttribute(){
         if($this->image == ""){
             return "";
         }

        return asset('/uploads/Product/small/'.$this->image);

     }
}
