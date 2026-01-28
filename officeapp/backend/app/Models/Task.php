<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'auth0_user_id',
        'title',
        'description',
        'status',
        'due_date',
    ];
    protected $casts = [
        'due_date' => 'date',
    ];
}
