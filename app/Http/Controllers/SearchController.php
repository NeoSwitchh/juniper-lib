<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Biblio;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Show the bibliographic search results page.
     */
    public function index(Request $request): Response
    {
        $validated = $request->validate([
            'q' => ['nullable', 'string'],
            'searchBy' => ['nullable', 'in:all,title,author,subject,isbn'],
            'title' => ['nullable', 'string'],
            'author' => ['nullable', 'string'],
            'subject' => ['nullable', 'string'],
            'isbn' => ['nullable', 'string'],
            'year' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'location' => ['nullable', 'string'],
            'gmd' => ['nullable', 'array'],
            'gmd.*' => ['string'],
            'authors' => ['nullable', 'array'],
            'authors.*' => ['string'],
            'subjects' => ['nullable', 'array'],
            'subjects.*' => ['string'],
            'sort' => ['nullable', 'in:relevance,title,year,newest'],
        ]);

        $sort = $validated['sort'] ?? 'relevance';

        $query = Biblio::query()->with(['authors', 'subjects', 'copies']);

        $this->applyKeyword($query, $validated);
        $this->applyFilters($query, $validated);

        match ($sort) {
            'title' => $query->orderBy('title'),
            'year' => $query->orderByDesc('publish_year')->orderBy('title'),
            'newest' => $query->orderByDesc('id'),
            default => $query->orderBy('id'),
        };

        $results = $query->paginate(6)->withQueryString();

        return inertia('search', [
            'biblios' => $results->getCollection()
                ->map(fn (Biblio $biblio) => $biblio->toSearchResult())
                ->values(),
            'meta' => [
                'currentPage' => $results->currentPage(),
                'lastPage' => $results->lastPage(),
                'total' => $results->total(),
            ],
            'filters' => [
                'q' => $validated['q'] ?? '',
                'searchBy' => $validated['searchBy'] ?? 'all',
                'title' => $validated['title'] ?? '',
                'author' => $validated['author'] ?? '',
                'subject' => $validated['subject'] ?? '',
                'isbn' => $validated['isbn'] ?? '',
                'year' => isset($validated['year']) ? (string) $validated['year'] : '',
                'location' => $validated['location'] ?? '',
                'gmd' => $validated['gmd'] ?? [],
                'authors' => $validated['authors'] ?? [],
                'subjects' => $validated['subjects'] ?? [],
            ],
            'sort' => $sort,
            'facets' => [
                'authors' => Author::orderBy('name')->pluck('name')->values(),
                'subjects' => Subject::orderBy('term')->pluck('term')->values(),
                'years' => Biblio::query()->distinct()->orderByDesc('publish_year')->pluck('publish_year')->values(),
                'locations' => Biblio::query()->distinct()->orderBy('location')->pluck('location')->values(),
                'gmds' => Biblio::query()->distinct()->orderBy('gmd')->pluck('gmd')->values(),
            ],
        ]);
    }

    /**
     * Apply the keyword input based on the selected search field.
     *
     * @param  array<string, mixed>  $validated
     */
    private function applyKeyword(Builder $query, array $validated): void
    {
        $keyword = trim($validated['q'] ?? '');

        if ($keyword === '') {
            return;
        }

        $like = '%'.$keyword.'%';

        match ($validated['searchBy'] ?? 'all') {
            'title' => $query->where('title', 'like', $like),
            'author' => $query->whereHas('authors', fn ($q) => $q->where('name', 'like', $like)),
            'subject' => $query->whereHas('subjects', fn ($q) => $q->where('term', 'like', $like)),
            'isbn' => $query
                ->where('isbn', 'like', $like)
                ->orWhere('issn', 'like', $like),
            default => $query->where(function ($q) use ($like) {
                $q->where('title', 'like', $like)
                    ->orWhere('isbn', 'like', $like)
                    ->orWhere('issn', 'like', $like)
                    ->orWhereHas('authors', fn ($aq) => $aq->where('name', 'like', $like))
                    ->orWhereHas('subjects', fn ($sq) => $sq->where('term', 'like', $like));
            }),
        };
    }

    /**
     * Apply advanced search fields and facet filters.
     *
     * @param  array<string, mixed>  $validated
     */
    private function applyFilters(Builder $query, array $validated): void
    {
        if ($title = trim($validated['title'] ?? '')) {
            $query->where('title', 'like', '%'.$title.'%');
        }

        if ($author = trim($validated['author'] ?? '')) {
            $query->whereHas('authors', fn ($q) => $q->where('name', 'like', '%'.$author.'%'));
        }

        if ($subject = trim($validated['subject'] ?? '')) {
            $query->whereHas('subjects', fn ($q) => $q->where('term', 'like', '%'.$subject.'%'));
        }

        if ($isbn = trim($validated['isbn'] ?? '')) {
            $query->where(function ($q) use ($isbn) {
                $q->where('isbn', 'like', '%'.$isbn.'%')
                    ->orWhere('issn', 'like', '%'.$isbn.'%');
            });
        }

        if (isset($validated['year'])) {
            $query->where('publish_year', (int) $validated['year']);
        }

        if ($location = trim($validated['location'] ?? '')) {
            $query->where('location', $location);
        }

        if (($validated['gmd'] ?? []) !== []) {
            $query->whereIn('gmd', $validated['gmd']);
        }

        if (($validated['authors'] ?? []) !== []) {
            $query->whereHas('authors', fn ($q) => $q->whereIn('name', $validated['authors']));
        }

        if (($validated['subjects'] ?? []) !== []) {
            $query->whereHas('subjects', fn ($q) => $q->whereIn('term', $validated['subjects']));
        }
    }
}
