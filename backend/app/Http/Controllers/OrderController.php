<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $fields = $request->validate([
            'items' => 'required|array',
            'total_amount' => 'required|numeric',
            'delivery_details' => 'required|array',
            'payment_status' => 'required|string',
            'transaction_ref' => 'nullable|string'
        ]);

        $order = Order::create([
            'user_id' => auth()->id(),
            'items' => $fields['items'],
            'total_amount' => $fields['total_amount'],
            'delivery_details' => $fields['delivery_details'],
            'payment_status' => $fields['payment_status'],
            'transaction_ref' => $fields['transaction_ref']
        ]);

        return response()->json(['message' => 'Order placed successfully', 'order' => $order], 201);
    }

    public function index()
    {
        $user = auth()->user();
        if ($user->role === 'admin') {
            return Order::with(['user', 'rider'])->orderBy('created_at', 'desc')->get();
        }
        
        return Order::with('rider')->where('user_id', $user->id)->orderBy('created_at', 'desc')->get();
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $order->update($request->only(['payment_status', 'status', 'rider_id']));
        return response()->json($order);
    }
}
