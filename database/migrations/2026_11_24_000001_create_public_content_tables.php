<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Sesuai Bab 5.2 PRD CAPSGO
     */
    public function up(): void
    {
        // 1. Profil Guru Publik (teacher_profiles)
        Schema::create('teacher_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('full_name', 150);
            $table->string('position', 100)->nullable();
            $table->string('photo_path', 255)->nullable();
            $table->text('public_bio')->nullable();
            $table->boolean('is_published')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 2. Profil Sekolah (school_profiles)
        Schema::create('school_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('school_name', 150)->default('SDN 003 Samarinda');
            $table->text('short_description')->nullable();
            $table->text('history')->nullable();
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->text('address')->nullable();
            $table->string('public_phone', 50)->nullable();
            $table->string('public_email', 100)->nullable();
            $table->string('logo_path', 255)->nullable();
            $table->string('cover_path', 255)->nullable();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        // 3. Fasilitas (facilities)
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('category', 100)->nullable();
            $table->text('description')->nullable();
            $table->string('image_path', 255)->nullable();
            $table->enum('publication_status', ['draft', 'published', 'archived'])->default('draft');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        // 4. Ekstrakurikuler (extracurriculars)
        Schema::create('extracurriculars', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->text('description')->nullable();
            $table->string('schedule_text', 150)->nullable();
            $table->string('supervisor_name', 150)->nullable();
            $table->string('image_path', 255)->nullable();
            $table->enum('publication_status', ['draft', 'published', 'archived'])->default('draft');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        // 5. Kegiatan Sekolah (school_events)
        Schema::create('school_events', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->date('event_date');
            $table->string('category', 100)->nullable();
            $table->text('description')->nullable();
            $table->string('cover_image_path', 255)->nullable();
            $table->enum('publication_status', ['draft', 'published', 'archived'])->default('draft');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });

        // 6. Prestasi Siswa (achievements)
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->string('student_display_name', 150)->nullable();
            $table->string('category', 100)->nullable();
            $table->string('level', 100)->nullable(); // Kota, Provinsi, Nasional
            $table->date('achievement_date')->nullable();
            $table->text('description')->nullable();
            $table->string('image_path', 255)->nullable();
            $table->enum('publication_status', ['draft', 'published', 'archived'])->default('draft');
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('school_events');
        Schema::dropIfExists('extracurriculars');
        Schema::dropIfExists('facilities');
        Schema::dropIfExists('school_profiles');
        Schema::dropIfExists('teacher_profiles');
    }
};
