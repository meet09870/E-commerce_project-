<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name' =>'mimes:png,jpg,jpeg,gif'
        ]);
         if($validator->fails()){
            return response()->json([
                'status' =>false,
                'errors' =>$validator->errors()
            ]);
        }
        $image=$request->image;


        $ext = $image->getClientOriginalExtension();
            $imageName = strtotime('now').'.'.$ext; 

            // save data in temp image table
            $tempimage = new TempImge();
            $tempimage->name = $imageName;
            $tempimage->save();
            
            // save data in uploads/temp image 
            $image->move(public_path('uploads/temp'),$imageName);

            // create small thumbnail here
            $sourcepath = public_path('uploads/temp/'.$imageName);
            $destpath = public_path('uploads/temp/thumb/'.$imageName);
            $manager = new ImageManager(Driver::class); 
            $image = $manager->read( $sourcepath);
            $image->coverDown(300, 300);
            $image->save($destpath);

              return response()->json([
                'status' =>true,
                'data' => $tempimage,
                'meassgae' =>"Image Uploads Successfully"
            ]);

    }
    
}
