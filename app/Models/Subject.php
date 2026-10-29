<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Subject extends Model
{
    protected $fillable = [
        'term',
        'dewey_class',
    ];

    public function biblios(): BelongsToMany
    {
        return $this->belongsToMany(Biblio::class);
    }
}
