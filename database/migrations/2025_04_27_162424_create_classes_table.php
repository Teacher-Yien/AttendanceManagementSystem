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
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('className'); // ឈ្មោះជាភាសាខ្មែរ
            $table->string('subjectName'); // ឈ្មោះជាភាសាខ្មែរ
            $table->string('room_number'); // ឈ្មោះជាភាសាខ្មែរ
            $table->string('years'); // ឈ្មោះជាភាសាខ្មែរ
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};
