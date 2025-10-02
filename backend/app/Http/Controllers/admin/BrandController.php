<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    // Get all brands
    public function index()
    {
        $brands = Brand::orderBy('created_at', 'DESC')->get(); 
        return response()->json([
            'status' => 200,
            'data' => $brands
        ]);
    }

    // Store a new brand
    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'status' => 'required' // You should also validate status if it's required
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ], 400);
        }

        $brand = new Brand();
        $brand->name = $req->name;
        $brand->status = $req->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => 'Brand created successfully',
            'data' => $brand
        ], 200);
    }

    // Show a specific brand
    public function show($id)
    {
        $brand = Brand::find($id); 

        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $brand 
        ]);
    }

    // Update an existing brand
    public function update(Request $req, $id)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'status' => 'required' // add if status is necessary
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->errors()
            ], 400);
        }

        $brand = Brand::find($id); 

        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found' 
            ], 404);
        }

        $brand->name = $req->name;
        $brand->status = $req->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => 'Brand updated successfully',
            'data' => $brand
        ], 200);
    }

    // Delete a brand
    public function destroy($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json([
                'status' => 404,
                'message' => 'Brand not found'
            ], 404);
        }

        $brand->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Brand deleted successfully'
        ], 200);
    }
}
