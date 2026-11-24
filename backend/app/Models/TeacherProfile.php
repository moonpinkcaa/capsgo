<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeacherProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'full_name',
        'position',
        'photo_path',
        'public_bio',
        'is_published',
        'is_active',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function scopePublished($query)
    {
        return $query->where('is_published', true)->where('is_active', true);
    }
}
