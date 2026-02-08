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
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
        Schema::dropIfExists('cache');
        Schema::dropIfExists('cache_locks');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // We typically don't need to recreate them here for this specific cleanup task, 
        // but normally we would define the creation logic. 
        // Leaving empty as requested to just "remove" them.
    }
};
