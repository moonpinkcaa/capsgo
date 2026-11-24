<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->string('student_display_name', 150)->nullable();
            $table->string('category', 100)->default('Akademik');
            $table->string('level', 100)->default('Kota'); // e.g. Sekolah, Kecamatan, Kota, Provinsi, Nasional
            $table->date('achievement_date')->nullable();
            $table->text('description')->nullable();
            $table->string('image_path', 255)->nullable();
            $table->enum('publication_status', ['draf', 'terbit', 'arsip'])->default('draf');
            $table->unsignedBigInteger('verified_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('achievements');
    }
};
