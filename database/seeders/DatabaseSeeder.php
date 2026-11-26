<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Akun Default Operator SDN 003 Samarinda
        User::updateOrCreate(
            ['email' => 'operator@sdn003samarinda.sch.id'],
            [
                'name' => 'Operator SDN 003',
                'username' => 'operator',
                'password' => Hash::make('password123'),
                'role' => 'operator',
                'is_active' => true,
            ]
        );

        // 2. Akun Demo Guru
        User::updateOrCreate(
            ['email' => 'guru@sdn003samarinda.sch.id'],
            [
                'name' => 'Budi Santoso, S.Pd',
                'username' => 'guru_budi',
                'password' => Hash::make('password123'),
                'role' => 'guru',
                'is_active' => true,
            ]
        );

        // 3. Seed konten publik
        $this->call(PublicContentSeeder::class);
    }
}
