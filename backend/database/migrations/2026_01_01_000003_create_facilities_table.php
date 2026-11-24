<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('category', 100)->default('Umum');
            $table->text('description')->nullable();
            $table->string('image_path', 255)->nullable();
            $table->enum('publication_status', ['draf', 'terbit', 'arsip'])->default('draf');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};
