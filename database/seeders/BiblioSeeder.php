<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Biblio;
use App\Models\Copy;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class BiblioSeeder extends Seeder
{
    /**
     * Seed the bibliographic catalog.
     */
    public function run(): void
    {
        $authors = collect([
            ['id' => 'a001', 'name' => 'Doe, John'],
            ['id' => 'a002', 'name' => 'Smith, Jane'],
            ['id' => 'a003', 'name' => 'Johnson, Robert'],
            ['id' => 'a004', 'name' => 'Williams, Emily'],
            ['id' => 'a005', 'name' => 'Brown, Michael'],
            ['id' => 'a006', 'name' => 'Davis, Sarah'],
            ['id' => 'a007', 'name' => 'Miller, David'],
            ['id' => 'a008', 'name' => 'Wilson, Lisa'],
        ])->mapWithKeys(fn (array $author) => [
            $author['id'] => Author::create(['name' => $author['name']]),
        ]);

        $subjects = collect([
            ['id' => 's001', 'term' => 'Computer Science', 'dewey_class' => '004'],
            ['id' => 's002', 'term' => 'Programming', 'dewey_class' => '005'],
            ['id' => 's003', 'term' => 'Databases', 'dewey_class' => '006'],
            ['id' => 's004', 'term' => 'Web Development', 'dewey_class' => '006'],
            ['id' => 's005', 'term' => 'Artificial Intelligence', 'dewey_class' => '006'],
            ['id' => 's006', 'term' => 'Networking', 'dewey_class' => '004'],
            ['id' => 's007', 'term' => 'Operating Systems', 'dewey_class' => '004'],
            ['id' => 's008', 'term' => 'Software Engineering', 'dewey_class' => '005'],
            ['id' => 's009', 'term' => 'Mathematics', 'dewey_class' => '510'],
            ['id' => 's010', 'term' => 'Physics', 'dewey_class' => '530'],
        ])->mapWithKeys(fn (array $subject) => [
            $subject['id'] => Subject::create([
                'term' => $subject['term'],
                'dewey_class' => $subject['dewey_class'],
            ]),
        ]);

        $biblios = [
            [
                'title' => 'Modern Web Development with React',
                'edition' => '2nd ed.',
                'isbn' => '978-0-123456-78-9',
                'publisher' => 'TechPress',
                'publish_year' => 2023,
                'pages' => 542,
                'dimensions' => '24cm',
                'series' => 'Developer Series',
                'cover_image' => 'https://placehold.co/200x300/1e293b/white?text=Modern+Web+Dev',
                'collection_type' => 'Textbook',
                'classification' => '005.13',
                'location' => 'Main Library',
                'room' => 'Room 101',
                'short_synopsis' => 'A comprehensive guide to building modern web applications using React and related technologies.',
                'authors' => [['a001', 'author'], ['a002', 'author']],
                'subjects' => ['s001', 's002'],
                'copies' => [
                    ['Circulation Desk', '005.13 DOE', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.13 DOE', Copy::STATUS_BORROWED, '2024-06-15'],
                    ['Circulation Desk', '005.13 DOE', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.13 DOE', Copy::STATUS_RESERVED, null],
                    ['Circulation Desk', '005.13 DOE', Copy::STATUS_AVAILABLE, null],
                ],
            ],
            [
                'title' => 'The Art of Computer Programming',
                'edition' => '3rd ed.',
                'isbn' => '978-0-20103801-4',
                'publisher' => 'Addison-Wesley',
                'publish_year' => 2019,
                'pages' => 784,
                'dimensions' => '24cm',
                'series' => null,
                'cover_image' => 'https://placehold.co/200x300/1e293b/white?text=Art+of+Comp+Prog',
                'collection_type' => 'Reference',
                'classification' => '004.07',
                'location' => 'Main Library',
                'room' => 'Room 102',
                'short_synopsis' => 'The definitive reference on programming techniques and algorithms.',
                'authors' => [['a003', 'author']],
                'subjects' => ['s001'],
                'copies' => [
                    ['Reference Desk', '004.07 JOH', Copy::STATUS_AVAILABLE, null],
                    ['Reference Desk', '004.07 JOH', Copy::STATUS_BORROWED, '2024-07-01'],
                    ['Reference Desk', '004.07 JOH', Copy::STATUS_BORROWED, '2024-06-20'],
                ],
            ],
            [
                'title' => 'Database Design for Mere Mortals',
                'edition' => '1st ed.',
                'isbn' => '978-0-20169849-4',
                'publisher' => 'HarperCollins',
                'publish_year' => 2020,
                'pages' => 496,
                'dimensions' => '23cm',
                'series' => null,
                'cover_image' => 'https://placehold.co/200x300/1e293b/white?text=Database+Design',
                'collection_type' => 'Textbook',
                'classification' => '005.75',
                'location' => 'Main Library',
                'room' => 'Room 101',
                'short_synopsis' => 'An accessible introduction to database design principles and best practices.',
                'authors' => [['a004', 'author']],
                'subjects' => ['s003'],
                'copies' => [
                    ['Circulation Desk', '005.75 WIL', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.75 WIL', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.75 WIL', Copy::STATUS_BORROWED, '2024-06-10'],
                    ['Circulation Desk', '005.75 WIL', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.75 WIL', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.75 WIL', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.75 WIL', Copy::STATUS_LOST, null],
                ],
            ],
            [
                'title' => 'Machine Learning Yearning',
                'edition' => null,
                'isbn' => '978-0-000000-00-0',
                'publisher' => 'Self-Published',
                'publish_year' => 2021,
                'pages' => 212,
                'dimensions' => '23cm',
                'series' => null,
                'cover_image' => 'https://placehold.co/200x300/1e293b/white?text=ML+Yearning',
                'collection_type' => 'Monograph',
                'classification' => '006.3',
                'location' => 'Main Library',
                'room' => 'Room 201',
                'short_synopsis' => 'Practical guidance on building machine learning systems and avoiding common pitfalls.',
                'authors' => [['a005', 'author']],
                'subjects' => ['s005'],
                'copies' => [
                    ['Study Area', '006.3 BRO', Copy::STATUS_AVAILABLE, null],
                    ['Study Area', '006.3 BRO', Copy::STATUS_BORROWED, '2024-07-05'],
                    ['Study Area', '006.3 BRO', Copy::STATUS_AVAILABLE, null],
                    ['Study Area', '006.3 BRO', Copy::STATUS_BORROWED, '2024-06-25'],
                ],
            ],
            [
                'title' => 'Clean Code: A Handbook of Agile Software Craftsmanship',
                'edition' => '1st ed.',
                'isbn' => '978-0-13235088-4',
                'publisher' => 'Prentice Hall',
                'publish_year' => 2008,
                'pages' => 464,
                'dimensions' => '24cm',
                'series' => null,
                'cover_image' => 'https://placehold.co/200x300/1e293b/white?text=Clean+Code',
                'collection_type' => 'Textbook',
                'classification' => '005.1',
                'location' => 'Main Library',
                'room' => 'Room 101',
                'short_synopsis' => 'A handbook of best practices for writing clean, maintainable code.',
                'authors' => [['a006', 'author']],
                'subjects' => ['s002', 's008'],
                'copies' => [
                    ['Circulation Desk', '005.1 DAV', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.1 DAV', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.1 DAV', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.1 DAV', Copy::STATUS_BORROWED, '2024-06-18'],
                    ['Circulation Desk', '005.1 DAV', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.1 DAV', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.1 DAV', Copy::STATUS_AVAILABLE, null],
                    ['Circulation Desk', '005.1 DAV', Copy::STATUS_RESERVED, null],
                ],
            ],
            [
                'title' => 'Introduction to Algorithms',
                'edition' => '4th ed.',
                'isbn' => '978-0-26204630-5',
                'publisher' => 'MIT Press',
                'publish_year' => 2022,
                'pages' => 1296,
                'dimensions' => '25cm',
                'series' => null,
                'cover_image' => 'https://placehold.co/200x300/1e293b/white?text=Intro+to+Algorithms',
                'collection_type' => 'Reference',
                'classification' => '004.07',
                'location' => 'Main Library',
                'room' => 'Room 102',
                'short_synopsis' => 'A comprehensive introduction to algorithms and data structures.',
                'authors' => [['a007', 'author'], ['a008', 'author']],
                'subjects' => ['s001', 's009'],
                'copies' => [
                    ['Reference Desk', '004.07 MIL', Copy::STATUS_AVAILABLE, null],
                    ['Reference Desk', '004.07 MIL', Copy::STATUS_BORROWED, '2024-06-22'],
                    ['Reference Desk', '004.07 MIL', Copy::STATUS_AVAILABLE, null],
                    ['Reference Desk', '004.07 MIL', Copy::STATUS_BORROWED, '2024-07-10'],
                    ['Reference Desk', '004.07 MIL', Copy::STATUS_BORROWED, '2024-06-30'],
                    ['Reference Desk', '004.07 MIL', Copy::STATUS_AVAILABLE, null],
                ],
            ],
        ];

        foreach ($biblios as $data) {
            $biblio = Biblio::create([
                'title' => $data['title'],
                'edition' => $data['edition'],
                'isbn' => $data['isbn'],
                'issn' => null,
                'publisher' => $data['publisher'],
                'publish_year' => $data['publish_year'],
                'pages' => $data['pages'],
                'dimensions' => $data['dimensions'],
                'series' => $data['series'],
                'language' => 'en',
                'cover_image' => $data['cover_image'],
                'gmd' => 'Book',
                'collection_type' => $data['collection_type'],
                'classification' => $data['classification'],
                'location' => $data['location'],
                'room' => $data['room'],
                'short_synopsis' => $data['short_synopsis'],
            ]);

            foreach ($data['authors'] as [$authorId, $role]) {
                $biblio->authors()->attach($authors[$authorId], ['role' => $role]);
            }

            $biblio->subjects()->attach(
                collect($data['subjects'])->map(fn (string $subjectId) => $subjects[$subjectId])->all()
            );

            foreach ($data['copies'] as [$location, $callNumber, $status, $dueDate]) {
                $biblio->copies()->create([
                    'location' => $location,
                    'call_number' => $callNumber,
                    'status' => $status,
                    'due_date' => $dueDate,
                ]);
            }
        }
    }
}
