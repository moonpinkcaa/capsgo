<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_name',
        'short_description',
        'history',
        'vision',
        'mission',
        'address',
        'public_phone',
        'public_email',
        'logo_path',
        'cover_path',
        'updated_by',
    ];
}
