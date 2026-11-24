<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SchoolEvent extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'event_date',
        'category',
        'description',
        'cover_image_path',
        'publication_status',
        'created_by',
    ];

    protected $casts = [
        'event_date' => 'date',
    ];

    public function photos()
    {
        return $this->hasMany(EventPhoto.class, 'school_event_id')->orderBy('sort_order', 'asc');
    }

    public function scopePublished($query)
    {
        return $query->where('publication_status', 'terbit');
    }
}
