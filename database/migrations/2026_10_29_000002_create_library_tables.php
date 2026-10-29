<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('term');
            $table->string('dewey_class');
            $table->timestamps();
        });

        Schema::create('biblios', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('edition')->nullable();
            $table->string('isbn')->nullable();
            $table->string('issn')->nullable();
            $table->string('publisher');
            $table->unsignedSmallInteger('publish_year');
            $table->unsignedInteger('pages')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('series')->nullable();
            $table->string('language')->default('en');
            $table->string('cover_image')->nullable();
            $table->string('gmd')->default('Book');
            $table->string('collection_type')->nullable();
            $table->string('classification')->nullable();
            $table->string('location')->nullable();
            $table->string('room')->nullable();
            $table->text('short_synopsis')->nullable();
            $table->timestamps();
        });

        Schema::create('author_biblio', function (Blueprint $table) {
            $table->foreignId('author_id')->constrained()->cascadeOnDelete();
            $table->foreignId('biblio_id')->constrained()->cascadeOnDelete();
            $table->string('role')->default('author');
            $table->primary(['author_id', 'biblio_id']);
        });

        Schema::create('biblio_subject', function (Blueprint $table) {
            $table->foreignId('biblio_id')->constrained()->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained()->cascadeOnDelete();
            $table->primary(['biblio_id', 'subject_id']);
        });

        Schema::create('copies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('biblio_id')->constrained()->cascadeOnDelete();
            $table->string('location');
            $table->string('call_number');
            $table->string('status')->default('available');
            $table->date('due_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('copies');
        Schema::dropIfExists('biblio_subject');
        Schema::dropIfExists('author_biblio');
        Schema::dropIfExists('biblios');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('authors');
    }
};
