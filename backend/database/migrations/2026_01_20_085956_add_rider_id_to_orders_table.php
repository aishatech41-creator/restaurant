<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('rider_id')->nullable()->constrained('users')->onDelete('set null');
            $table->json('rider_location')->nullable(); // For real-time tracking
            $table->string('status')->default('pending'); // Ensure status is present if not already, though payment_status exists. Let's add specific order status if needed. 
            // Actually, `payment_status` exists. `status` might be redundant or useful for 'delivering', 'picked_up'.
            // Let's add 'status' to track order flow beyond payment.
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['rider_id']);
            $table->dropColumn(['rider_id', 'rider_location', 'status']);
        });
    }
};
