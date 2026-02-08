<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('Upload API Hit');
        \Illuminate\Support\Facades\Log::info('Header Auth:', [$request->header('Authorization')]);

        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            
            // Store in 'public/uploads'
            $path = $image->storeAs('uploads', $imageName, 'public');

            // Return the full URL
            return response()->json([
                'url' => asset('storage/' . $path),
                'message' => 'Image uploaded successfully'
            ], 200);
        }

        return response()->json(['error' => 'No image file provided'], 400);
    }
}
