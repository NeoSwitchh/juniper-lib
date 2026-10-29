<?php

namespace App\Models;

use Database\Factories\BiblioFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Biblio extends Model
{
    /** @use HasFactory<BiblioFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'edition',
        'isbn',
        'issn',
        'publisher',
        'publish_year',
        'pages',
        'dimensions',
        'series',
        'language',
        'cover_image',
        'gmd',
        'collection_type',
        'classification',
        'location',
        'room',
        'short_synopsis',
    ];

    protected function casts(): array
    {
        return [
            'publish_year' => 'integer',
            'pages' => 'integer',
        ];
    }

    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class)->withPivot('role');
    }

    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class);
    }

    public function copies(): HasMany
    {
        return $this->hasMany(Copy::class);
    }

    /**
     * Total number of physical copies.
     */
    public function getTotalCopiesAttribute(): int
    {
        return $this->copies->count();
    }

    /**
     * Number of copies currently available for borrowing.
     */
    public function getAvailableCopiesAttribute(): int
    {
        return $this->copies->where('status', Copy::STATUS_AVAILABLE)->count();
    }

    /**
     * Transform into the shape consumed by the React search page.
     *
     * @return array<string, mixed>
     */
    public function toSearchResult(): array
    {
        return [
            'id' => (string) $this->id,
            'title' => $this->title,
            'edition' => (string) ($this->edition ?? ''),
            'isbn' => (string) ($this->isbn ?? ''),
            'issn' => (string) ($this->issn ?? ''),
            'publisher' => $this->publisher,
            'publishYear' => $this->publish_year,
            'pages' => (int) ($this->pages ?? 0),
            'dimensions' => (string) ($this->dimensions ?? ''),
            'series' => (string) ($this->series ?? ''),
            'language' => $this->language,
            'coverImage' => (string) ($this->cover_image ?? ''),
            'gmd' => $this->gmd,
            'subjects' => $this->subjects
                ->map(fn (Subject $subject) => [
                    'id' => (string) $subject->id,
                    'term' => $subject->term,
                    'deweyClass' => $subject->dewey_class,
                ])
                ->values()
                ->all(),
            'authors' => $this->authors
                ->map(fn (Author $author) => [
                    'id' => (string) $author->id,
                    'name' => $author->name,
                    'role' => (string) $author->pivot->role,
                ])
                ->values()
                ->all(),
            'isbiblios' => true,
            'totalCopies' => $this->copies->count(),
            'availableCopies' => $this->copies->where('status', Copy::STATUS_AVAILABLE)->count(),
            'availability' => $this->copies
                ->map(fn (Copy $copy) => [
                    'copyId' => (string) $copy->id,
                    'location' => $copy->location,
                    'callNumber' => $copy->call_number,
                    'status' => $copy->status,
                    'dueDate' => $copy->due_date?->toDateString(),
                ])
                ->values()
                ->all(),
            'collectionType' => (string) ($this->collection_type ?? ''),
            'classification' => (string) ($this->classification ?? ''),
            'location' => [
                'name' => (string) ($this->location ?? ''),
                'room' => (string) ($this->room ?? ''),
            ],
            'shortSynopsis' => (string) ($this->short_synopsis ?? ''),
            'listDisplayMode' => 'grid',
        ];
    }
}
