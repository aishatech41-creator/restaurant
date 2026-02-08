<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'items',
        'total_amount',
        'delivery_details',
        'payment_status',
        'transaction_ref',
        'rider_id',
        'rider_location',
        'status'
    ];

    protected $casts = [
        'items' => 'array',
        'delivery_details' => 'array',
        'rider_location' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function rider()
    {
        return $this->belongsTo(User::class, 'rider_id');
    }
}
