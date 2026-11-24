<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventPhoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_event_id',
        'file_path',
        'caption',
        'sort_order',
    ];

    public function event()
    {
        return $this->belongsTo(SchoolEvent::class, 'school_event_id');
    }
}
