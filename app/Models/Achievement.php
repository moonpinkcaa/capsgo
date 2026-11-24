<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Achievement extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'student_display_name',
        'category',
        'level',
        'achievement_date',
        'description',
        'image_path',
        'publication_status',
        'verified_by',
    ];

    protected function casts(): array
    {
        return [
            'achievement_date' => 'date',
        ];
    }
}
