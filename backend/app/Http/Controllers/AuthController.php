<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function register(Request $request) {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
            'phone' => 'required|string'
        ]);

        \Illuminate\Support\Facades\Log::info('Register Request Data:', $request->all());
        \Illuminate\Support\Facades\Log::info('Validated Fields:', $fields);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'phone' => $fields['phone']
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $fields['email'])->first();

        // Check password
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'Bad creds'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }

    public function update(Request $request) {
        $user = auth()->user();
        
        $fields = $request->validate([
            'name' => 'string',
            'phone' => 'string',
            'photo_url' => 'nullable|string'
        ]);

        if($request->has('name')) {
            $user->name = $fields['name'];
        }
        if($request->has('phone')) {
            $user->phone = $fields['phone'];
        }
        if($request->has('photo_url')) {
            $user->photo_url = $fields['photo_url'];
        }

        $user->save();

        return response()->json([
            'user' => $user,
            'message' => 'Profile updated successfully'
        ], 200);
    }
}
