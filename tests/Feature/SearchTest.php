<?php

use App\Models\User;
use Database\Seeders\BiblioSeeder;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page', function () {
    $this->get(route('search'))->assertRedirect(route('login'));
});

test('authenticated users can browse the catalog', function () {
    $this->seed(BiblioSeeder::class);
    $this->actingAs(User::factory()->create());

    $this->get(route('search'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('search')
            ->has('biblios', 6)
            ->where('meta.total', 6)
            ->has('facets.authors')
            ->has('facets.subjects')
            ->has('facets.years'));
});

test('search filters by keyword across fields', function () {
    $this->seed(BiblioSeeder::class);
    $this->actingAs(User::factory()->create());

    $this->get(route('search', ['q' => 'React']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('search')
            ->has('biblios', 1)
            ->where('biblios.0.title', 'Modern Web Development with React')
            ->where('meta.total', 1));
});

test('search filters by author facet', function () {
    $this->seed(BiblioSeeder::class);
    $this->actingAs(User::factory()->create());

    $this->get(route('search', ['authors' => ['Doe, John']]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('search')
            ->has('biblios', 1)
            ->where('biblios.0.title', 'Modern Web Development with React'));
});

test('search sorts by title', function () {
    $this->seed(BiblioSeeder::class);
    $this->actingAs(User::factory()->create());

    $this->get(route('search', ['sort' => 'title']))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('search')
            ->where('biblios.0.title', 'Clean Code: A Handbook of Agile Software Craftsmanship'));
});

test('search paginates results', function () {
    $this->seed(BiblioSeeder::class);
    $this->actingAs(User::factory()->create());

    $this->get(route('search', ['page' => 2]))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('search')
            ->has('biblios', 0)
            ->where('meta.currentPage', 2)
            ->where('meta.lastPage', 1));
});
