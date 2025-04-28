<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
{
    Schema::create('attendances', function (Blueprint $table) {
        $table->id();
        $table->string('student_name');
        $table->foreignId('class_id')->constrained('class_models')->onDelete('cascade');
        $table->integer('week1')->default(0);
        $table->integer('week2')->default(0);
        $table->integer('week3')->default(0);
        $table->integer('week4')->default(0);
        $table->integer('week5')->default(0);
        $table->integer('week6')->default(0);
        $table->integer('week7')->default(0);
        $table->integer('total')->default(0);
        $table->timestamps();
    });
}


    public function down(): void
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->dropForeign(['class_id']);
            $table->dropColumn('class_id');
        });
    }
};