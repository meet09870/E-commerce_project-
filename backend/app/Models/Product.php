<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
     protected $appends = ['image_url'];

     public function getImageUrlAttribute(){
         if($this->image == ""){
             return "";
         }

        return asset('/uploads/Product/small/'.$this->image);

     }

   function product_images(){
    return $this->hasMany(PrductImage::class, 'products_id', 'id');
}

  public function Products_size()
    {
        return $this->hasMany(Products_size::class, 'sizes_id', 'id');
    }
   public function products_sizes()
    {
        return $this->hasMany(Products_size::class, 'products_id');
    }
    
}
