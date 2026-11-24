<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Extracurricular extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'schedule_text',
        'supervisor_name',
        'image_path',
        'publication_status',
        'created_by',
    ];

    public function scopePublished($query)
    {
        return $query->where('publication_status', 'terbit');
    }
}
