<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\CartController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/food', [FoodController::class, 'index']);

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/update', [AuthController::class, 'update']);
    
    // Orders
    Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store']);
    Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'index']);
    Route::put('/orders/{id}', [\App\Http\Controllers\OrderController::class, 'update']);

    // Upload
    Route::post('/upload', [\App\Http\Controllers\UploadController::class, 'store']);

    // Food (Admin)
    Route::post('/food', [FoodController::class, 'store']);
    Route::post('/food/update/{id}', [FoodController::class, 'update']);
    Route::delete('/food/{id}', [FoodController::class, 'destroy']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::delete('/cart', [CartController::class, 'clear']);
});
