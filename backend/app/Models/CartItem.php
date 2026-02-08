<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Food;
use App\Models\User;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'food_id',
        'qty'
    ];

    public function food()
    {
        return $this->belongsTo(Food::class, 'food_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
