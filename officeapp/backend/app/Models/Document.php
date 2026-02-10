<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{

    use HasFactory;
    protected $fillable = [
        'user_id',
        'type',
        'title',
        'status',
        'document_data',
        'submitted_at',
    ];

    protected $casts = [
        'document_data' => 'array',
        'submitted_at'  => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
