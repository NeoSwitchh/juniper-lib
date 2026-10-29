<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Copy extends Model
{
    public const STATUS_AVAILABLE = 'available';

    public const STATUS_BORROWED = 'borrowed';

    public const STATUS_RESERVED = 'reserved';

    public const STATUS_LOST = 'lost';

    public const STATUSES = [
        self::STATUS_AVAILABLE,
        self::STATUS_BORROWED,
        self::STATUS_RESERVED,
        self::STATUS_LOST,
    ];

    protected $fillable = [
        'biblio_id',
        'location',
        'call_number',
        'status',
        'due_date',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date',
        ];
    }

    public function biblio(): BelongsTo
    {
        return $this->belongsTo(Biblio::class);
    }
}
