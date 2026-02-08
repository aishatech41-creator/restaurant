<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index()
    {
        return CartItem::where('user_id', auth()->id())->with('food')->get();
    }

    public function store(Request $request)
    {
        // Check if item exists for user
        $existing = CartItem::where('user_id', auth()->id())
            ->where('food_id', $request->food_id)
            ->first();

        if ($existing) {
            $existing->qty += $request->qty ?? 1;
            $existing->save();
            return $existing;
        }

        return CartItem::create([
            'user_id' => auth()->id(),
            'food_id' => $request->food_id,
            'qty' => $request->qty ?? 1
        ]);
    }

    public function destroy($id)
    {
        return CartItem::destroy($id);
    }

    public function clear()
    {
        return CartItem::where('user_id', auth()->id())->delete();
    }
}
