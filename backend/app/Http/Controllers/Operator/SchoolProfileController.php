<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SchoolProfileController extends Controller
{
    public function index(): Response
    {
        $profile = SchoolProfile::firstOrCreate(
            ['id' => 1],
            [
                'school_name' => 'SDN 003 Samarinda',
                'short_description' => 'SDN 003 Samarinda berdedikasi menghasilkan generasi berkarakter, cerdas, dan berprestasi.',
            ]
        );

        return Inertia::render('Operator/Content/SchoolProfile/Index', [
            'profile' => $profile,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'school_name' => 'required|string|max:150',
            'short_description' => 'nullable|string|max:1000',
            'history' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'public_phone' => 'nullable|string|max:50',
            'public_email' => 'nullable|email|max:150',
            'logo' => 'nullable|image|max:2048', // max 2MB
            'cover' => 'nullable|image|max:4096', // max 4MB
        ]);

        $profile = SchoolProfile::firstOrCreate(['id' => 1]);

        if ($request->hasFile('logo')) {
            if ($profile->logo_path) {
                Storage::disk('public')->delete($profile->logo_path);
            }
            $validated['logo_path'] = $request->file('logo')->store('school', 'public');
        }

        if ($request->hasFile('cover')) {
            if ($profile->cover_path) {
                Storage::disk('public')->delete($profile->cover_path);
            }
            $validated['cover_path'] = $request->file('cover')->store('school', 'public');
        }

        $validated['updated_by'] = $request->user()?->id;

        $profile->update($validated);

        return back()->with('success', 'Profil sekolah berhasil diperbarui.');
    }
}
