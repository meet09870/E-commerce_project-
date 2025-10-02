<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use App\Models\Product;
use App\Models\Products_size;
use App\Models\PrductImage;

use App\Models\TempImge;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'DESC')
            ->with(['product_images','products_sizes'])
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ]);
    }

    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'categories' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required',
            'status' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $product = new Product();
        $product->title = $req->title;
        $product->price = $req->price;
        $product->compare_price = $req->compare_price;
        $product->categories_id = $req->categories;
        $product->brands_id = $req->brands;
        $product->sku = $req->sku;
        $product->qty = $req->qty;
        $product->barcode = $req->barcode;
        $product->description = $req->description;
        $product->short_description = $req->short_description;
        $product->status = $req->status;
        $product->is_featured = $req->is_featured;
        $product->save();

          if (!empty($req->sizes) && is_array($req->sizes)) {
            
            foreach ($req->sizes as $sizeId) {
                $size = new Products_size();
                $size->sizes_id = $sizeId;
                $size->products_id = $product->id;  
                $size->save();
            }
        }

        // Handle image upload
           if (!empty($req->gallery)) {
            foreach ($req->gallery as $key => $tempImageId) {
        $tempImage = TempImge::find($tempImageId);

        // large thumbnail
        $extArray = explode('.', $tempImage->name);
        $ext = end($extArray);
        $imageName = $product->id . '-' . time() . '.' . $ext;

        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
        $img->scaleDown(1200);
        $img->save(public_path('uploads/Product/large/' . $imageName));

        // small
        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/Product/small/' . $imageName));

        $productImage =   new PrductImage();
        $productImage->image = $imageName;
        $productImage->products_id =  $product->id;
        $productImage->save();

        if ($key == 0) {
            $product->image = $imageName;
            $product->save();
        }
    }
}


      return response()->json([
        'status' => 200,
        'message' => 'Product saved successfully',
    ], 200);
    }

    public function show($id)
    {
        $product = Product::with('product_images')
          ->with(['product_images','Products_size'])
        ->find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found',
            ], 404);
        }

       $productSize =  $product->products_size()->pluck('sizes_id');

        return response()->json([
            'status' => 200,
            'data' => $product,
            'productSize' => $productSize
        ]);
    }



    public function update($id, Request $req)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found'
            ], 404);
        }


        $validator = Validator::make($req->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'categories' => 'required|integer',
            'sku' => 'required|unique:products,sku,' . $id,
            'is_featured' => 'required',
            'status' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $product->title = $req->title;
        $product->price = $req->price;
        $product->compare_price = $req->compare_price;
        $product->categories_id = $req->categories;
        $product->brands_id = $req->brands;
        $product->sku = $req->sku;
        $product->barcode = $req->barcode;
        $product->qty = $req->qty;
        $product->description = $req->description;
        $product->short_description = $req->short_description;
        $product->status = $req->status;
        $product->is_featured = $req->is_featured;
     

        $product->save();

            if (!empty($req->sizes) && is_array($req->sizes)) {
            Products_size::where('products_id', $product->id)->delete();
            foreach ($req->sizes as $sizeId) {
                $size = new Products_size();
                $size->sizes_id = $sizeId;
                $size->products_id = $product->id;  
                $size->save();
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully.'
        ], 200);
     }

    
            public function destroy($id)
            {
                $product = Product::with('product_images')->find($id);

                if (!$product) {
                    return response()->json([
                        'status' => 404,
                        'message' => ''
                    ], 404);
                }

                // delete related images first
                if ($product->product_images) {
                    foreach ($product->product_images as $productImage) {
                        File::delete(public_path('uploads/product/large/'.$productImage->image));
                        File::delete(public_path('uploads/product/small/'.$productImage->image));
                        $productImage->delete(); // delete DB record
                    }
                }

                // now delete product
                $product->delete();

                return response()->json([
                    'status' => 200,
                    'message' => 'Product deleted successfully'
                ], 200);
            }




public function saveProductImage(Request $request)
{
    $validator = Validator::make($request->all(), [
        'image' => 'required|mimes:png,jpg,jpeg,gif',
        'products_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'errors' => $validator->errors()
        ]);
    }

    $image = $request->file('image');

    // unique file name: products_id-timestamp.ext
    $imageName = $request->products_id . '-' . time() . '.' . $image->extension();

    // Save temp image
    $image->move(public_path('uploads/temp'), $imageName);

    $manager = new ImageManager(Driver::class);

    // Large thumbnail
    $img = $manager->read(public_path('uploads/temp/' . $imageName));
    $img->scaleDown(1200);
    $img->save(public_path('uploads/Product/large/' . $imageName));

    // Small thumbnail
    $img = $manager->read(public_path('uploads/temp/' . $imageName));
    $img->coverDown(400, 460);
    $img->save(public_path('uploads/Product/small/' . $imageName));

    // Save in DB
    $productimage = new PrductImage();
    $productimage->image = $imageName;
    $productimage->products_id = $request->products_id; 
    $productimage->save();

    return response()->json([
        'status' => 200,
        'data' => $productimage,
        'message' => "Image Uploaded Successfully"
    ]);
}


public function updateProductDefaultImage(Request $req){
    $product = Product::find($req->products_id);
     $product->image = $req->image;
     $product->save();

      return response()->json([
        'status' => 200,
        'message' => "product default change Successfully"
    ],200);
}

public function deleteProductDefaultImage($id){
    $productImage = PrductImage::find($id);
    if($productImage == null){
     return response()->json([
        'status' => 404,
        'message' => "Image not found"
    ],404);   
    }
     File::delete(public_path('uploads/product/large/'.$productImage->image));
     File::delete(public_path('uploads/product/small/'.$productImage->image));

     $productImage->delete();




      return response()->json([
        'status' => 200,
        'message' => "product image changed  successfully"
    ],200);
}
}


   

