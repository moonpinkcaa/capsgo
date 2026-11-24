<?php

namespace Tests\Feature;

use App\Models\Achievement;
use App\Models\Extracurricular;
use App\Models\Facility;
use App\Models\SchoolEvent;
use App\Models\SchoolProfile;
use App\Models\TeacherProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicContentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        SchoolProfile::create([
            'school_name' => 'SDN 003 Samarinda',
            'short_description' => 'Sekolah berkarakter dan berprestasi.',
            'vision' => 'Cerdas dan beriman.',
            'mission' => 'Mewujudkan generasi unggul.',
        ]);
    }

    public function test_public_pages_accessible_without_authentication(): void
    {
        $this->get('/')->assertStatus(200);
        $this->get('/profil-sekolah')->assertStatus(200);
        $this->get('/struktur-organisasi')->assertStatus(200);
        $this->get('/guru')->assertStatus(200);
        $this->get('/fasilitas')->assertStatus(200);
        $this->get('/ekstrakurikuler')->assertStatus(200);
        $this->get('/kegiatan')->assertStatus(200);
        $this->get('/prestasi')->assertStatus(200);
        $this->get('/kontak')->assertStatus(200);
    }

    public function test_draft_facility_does_not_appear_on_public_page(): void
    {
        Facility::create([
            'name' => 'Fasilitas Rahasia Draf',
            'category' => 'Umum',
            'publication_status' => 'draf',
        ]);

        Facility::create([
            'name' => 'Perpustakaan Terbit',
            'category' => 'Umum',
            'publication_status' => 'terbit',
        ]);

        $response = $this->get('/fasilitas');
        $response->assertStatus(200);
        $response->assertDontSee('Fasilitas Rahasia Draf');
    }

    public function test_draft_event_does_not_appear_on_public_page(): void
    {
        SchoolEvent::create([
            'title' => 'Kegiatan Internal Belum Terbit',
            'event_date' => '2026-06-01',
            'category' => 'Internal',
            'publication_status' => 'draf',
        ]);

        SchoolEvent::create([
            'title' => 'Upacara Terbit',
            'event_date' => '2026-06-01',
            'category' => 'Umum',
            'publication_status' => 'terbit',
        ]);

        $response = $this->get('/kegiatan');
        $response->assertStatus(200);
        $response->assertDontSee('Kegiatan Internal Belum Terbit');
    }

    public function test_unpublished_teacher_does_not_appear_on_public_page(): void
    {
        TeacherProfile::create([
            'full_name' => 'Guru Privat Belum Terbit',
            'position' => 'Guru',
            'is_published' => false,
            'is_active' => true,
        ]);

        $response = $this->get('/guru');
        $response->assertStatus(200);
        $response->assertDontSee('Guru Privat Belum Terbit');
    }
}
