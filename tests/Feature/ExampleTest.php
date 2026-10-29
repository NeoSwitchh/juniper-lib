<?php

test('redirects home to the search page', function () {
    $response = $this->get(route('home'));

    $response->assertRedirect('/search');
});
