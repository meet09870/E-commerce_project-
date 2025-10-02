<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Illuminate\Http\Request;
use App\Models\PrductImage;

class ProductController extends Controller
{

public function getProduct(Request $req)
{
    $product = Product::where('status', 1)->orderBy('created_at', 'DESC');

    // filter Product by category
    if (!empty($req->categories)) {
        $catArray = explode(',', $req->categories);
        $product = $product->whereIn('categories_id', $catArray);
    }

     // filter Product by brands
    if (!empty($req->brands)) {
        $brandsArray = explode(',', $req->brands);
        $product = $product->whereIn('brands_id', $brandsArray);
    }

    $product = $product->get();

    return response()->json([
        'status' => 200,
        'data' => $product,
    ], 200);
}


    public function latestProduct(){
        $product = Product::where('status',1)->orderBy('created_at','DESC')->limit(8)->get();
          return response()->json([
            'status' => true,
            'data' => $product,
        ], 200);

    }


    public function featuredProduct(){
        $product = Product::where('is_featured','yes')->orderBy('created_at','DESC')->limit(8)->get();
          return response()->json([
            'status' => true,
            'data' => $product,
        ], 200);

    }

    public function getCaregories(){
      $categories = Category::orderBy('name','ASC')->where('status',1)->get();
        return response()->json([
            'status' => true,
            'data' => $categories ,
        ], 200);
    }

    public function getBrands(){
      $brands = Brand::orderBy('name','ASC')->where('status',1)->get();
        return response()->json([
            'status' => true,
            'data' => $brands,
        ], 200);
    }

public function getproducts($id)
{
    $product = Product::with(['product_images', 'products_sizes.sizes'])->find($id);

    if ($product == null) {
        return response()->json([
            'status' => 404,
            'message' => 'Product not found',
        ], 404);
    }

    return response()->json([
        'status' => 200,
        'data' => $product,
    ], 200);
}


}
