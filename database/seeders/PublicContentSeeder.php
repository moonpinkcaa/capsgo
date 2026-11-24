<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeacherProfile;
use App\Models\Facility;
use App\Models\Extracurricular;
use App\Models\SchoolEvent;
use App\Models\Achievement;
use App\Models\SchoolProfile;
use Carbon\Carbon;

class PublicContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // School profile (single record)
        SchoolProfile::factory()->create([
            'name' => 'SDN 003 Samarinda',
            'address' => 'Jalan Merdeka No.12, Samarinda',
            'phone' => '0812-3456-7890',
            'email' => 'info@sdn003samarinda.sch.id',
            'publication_status' => 'published',
        ]);

        // Teachers
        TeacherProfile::factory()->count(5)->create([
            'publication_status' => 'published',
        ]);

        // Facilities
        Facility::factory()->count(6)->create([
            'publication_status' => 'published',
        ]);

        // Extracurriculars
        Extracurricular::factory()->count(4)->create([
            'publication_status' => 'published',
        ]);

        // School events
        SchoolEvent::factory()->count(3)->create([
            'publication_status' => 'published',
            'date' => Carbon::now()->subDays(10),
        ]);

        // Achievements
        Achievement::factory()->count(5)->create([
            'publication_status' => 'published',
            'date' => Carbon::now()->subMonths(1),
        ]);
    }
}
