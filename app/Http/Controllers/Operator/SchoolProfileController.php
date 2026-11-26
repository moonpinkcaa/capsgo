<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SchoolProfileController extends Controller
{
    public function edit(): Response
    {
        $profile = SchoolProfile::firstOrCreate(
            [],
            ['school_name' => 'SDN 003 Samarinda']
        );

        return Inertia::render('Operator/Content/SchoolProfile/Edit', [
            'profile' => $profile,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'school_name' => ['required', 'string', 'max:150'],
            'short_description' => ['nullable', 'string'],
            'history' => ['nullable', 'string'],
            'vision' => ['nullable', 'string'],
            'mission' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'public_phone' => ['nullable', 'string', 'max:50'],
            'public_email' => ['nullable', 'string', 'email', 'max:100'],
        ]);

        $profile = SchoolProfile::firstOrCreate([], ['school_name' => 'SDN 003 Samarinda']);
        $profile->update(array_merge($validated, ['updated_by' => auth()->id()]));

        return back()->with('success', 'Profil sekolah berhasil diperbarui.');
    }
}
