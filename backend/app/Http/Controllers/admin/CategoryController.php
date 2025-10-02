<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index(){
    $categories = Category::orderBy('created_at','DESC')->get(); 
    return response()->json([
        'status' => 200,
        'data' => $categories
    ]);
    }


     public function store(Request $req){

        $validator=Validator::make($req->all(),[
            'name'=>'required'
        ]);
        if($validator->fails()){
             return response()->json([
            'status' => 400,
            'error' => $validator->errors()
        ], 400);
        }
        $category = new Category();
        $category->name=$req->name;
        $category->status=$req->status;
        $category->save();

         return response()->json([
            'status' => 200,
            'message' => 'category added successfully',
            'data'=>$category
        ], 200);

        
    }

    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $category
        ]);
    }

     public function update(Request $req, $id)
{
    $validator = Validator::make($req->all(), [
        'name' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 400,
            'error' => $validator->errors()
        ], 400);
    }

    $category = Category::find($id);

    if (!$category) {
        return response()->json([
            'status' => 404,
            'message' => 'Category not found'
        ], 404);
    }

    $category->name = $req->name;
    $category->status = $req->status;
    $category->save();

    return response()->json([
        'status' => 200,
        'message' => 'Category updated successfully',
        'data' => $category
    ], 200);
}

public function destroy($id)
{
    $category = Category::find($id);

    if (!$category) {
        return response()->json([
            'status' => 404,
            'message' => 'Category not found'
        ], 404);
    }

    $category->delete();

    return response()->json([
        'status' => 200,
        'message' => 'Category deleted successfully'
    ], 200);
}

}
