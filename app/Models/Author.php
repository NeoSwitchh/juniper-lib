<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Author extends Model
{
    protected $fillable = [
        'name',
    ];

    public function biblios(): BelongsToMany
    {
        return $this->belongsToMany(Biblio::class)->withPivot('role');
    }
}
