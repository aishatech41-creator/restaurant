<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Food;
use Illuminate\Http\Request;

class FoodController extends Controller
{
    public function index()
    {
        return Food::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'price' => 'required',
            'imageURL' => 'nullable',
            // Add other validations as needed
        ]);

        return Food::create($request->all());
    }

    public function destroy($id)
    {
        return Food::destroy($id);
    }
    public function update(Request $request, $id)
    {
        $food = Food::find($id);
        if (!$food) {
            return response()->json(['message' => 'Food not found'], 404);
        }

        $request->validate([
            'title' => 'required',
            'price' => 'required',
            'imageURL' => 'nullable',
        ]);

        $food->update($request->all());
        return $food;
    }
}
