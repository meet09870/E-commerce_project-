<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\order;
use App\Models\orderItem;


class OrderController extends Controller
{
    public function saveOrder(Request $req){
        if(!empty($req->cart)){
            // save order in db
        $order = new Order();
        $order->name =$req->name;
        $order->email =$req->email;
        $order->address =$req->address;
        $order->number =$req->number;
        $order->state =$req->state;
        $order->city =$req->city;
        $order->zip =$req->zip;
        $order->grandtotal =$req->grandtotal;
        $order->subtotal =$req->subtotal;
        $order->discount =$req->discount;
        $order->shipping =$req->shipping;
        $order->payment_status =$req->payment_status;
        $order->payment_status =$req->payment_status;
        $order->status =$req->status;
        $order->user_id =$req->user()->id;
        $order->save();

        // save order item 
        foreach ($req->cart as  $item){
            $orderItem = new orderItem();
            $orderItem->orders_id =  $order->id;
            $orderItem->price = $item['qty'] * $item['price'];
            $orderItem->unit_price =  $item['price'];
            $orderItem->qty =  $item['qty'];
            $orderItem->product_id =  $item['product_id'];
            $orderItem->size =  $item['size'];
            $orderItem->name =  $item['title'];
            $orderItem->save();

            return response()->json([
            'status' => 200,
            'message' => 'you have successfully placed yout order'
        ]);
            }
        }else{
               return response()->json([
            'status' => 400,
            'message' => 'your cart is empty'
        ]);
            
        }
        
        
     
    }
}
