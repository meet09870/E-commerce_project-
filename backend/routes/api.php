<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\front\AccountController;
use App\Http\Controllers\front\ProductController as FrontProductController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\front\OrderController;




Route::post('/admin/login',[AuthController::class,'auth']);
Route::get('get-latest-product',[FrontProductController::class,'latestProduct']);
Route::get('get-featured-product',[FrontProductController::class,'featuredProduct']);
Route::get('get-categories',[FrontProductController::class,'getCaregories']);
Route::get('get-brand',[FrontProductController::class,'getBrands']);
Route::get('get-product',[FrontProductController::class,'getProduct']);
Route::get('get-products/{id}',[FrontProductController::class,'getproducts']);

// register 
Route::post('register',[AccountController::class,'register']);
// login
Route::post('login',[AccountController::class,'auth']);

Route::group(['middleware' => ['auth:sanctum','CheckUserRole']], function() { 
Route::post('/save-orders',[OrderController::class,'saveOrder']);
});




Route::group(['middleware' => ['auth:sanctum', 'block.mobile','CheckAdminRole']], function() { 
  
  Route::get('categories',[CategoryController::class,'index']);
   Route::post('categories',[CategoryController::class,'store']);
   Route::get('categories/{id}',[CategoryController::class,'show']);
   Route::get('categories',[CategoryController::class,'index']);
   Route::put('categories/{id}',[CategoryController::class,'update']);
   Route::delete('categories/{id}',[CategoryController::class,'destroy']);

  // Route::resource('categories',CategoryController::class);
   Route::resource('brands',BrandController::class);
   Route::resource('product',ProductController::class);
  Route::get('sizes',[SizeController::class,'index']);



   Route::post('temp-image',[TempImageController::class,'store']);
   Route::post('save-product-image',[ProductController::class,'saveProductImage']);
   Route::get('default-image',[ProductController::class,'updateProductDefaultImage']);
   Route::delete('/delete-product-image/{id}', [ProductController::class, 'deleteProductDefaultImage']);
   







});
