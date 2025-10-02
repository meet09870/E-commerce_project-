<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
   public function auth(Request $req)
{
    $validator = Validator::make($req->all(), [
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 400,
            'error' => $validator->errors()
        ], 400);
    }

    if (Auth::attempt(['email' => $req->email, 'password' => $req->password])) {
        $user = User::find(Auth::user()->id);

        if ($user->role == 'admin') {
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status' => 200,
                'token' => $token,
                'id' => $user->id,
                'name' => $user->name
            ], 200);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'You are not authorized to access admin panel.'
            ], 401);
        }
    } else {
        return response()->json([
            'status' => 401,
            'message' => 'Either email/password is incorrect.'
        ], 401);
    }
}
}
