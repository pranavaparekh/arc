<?php

/**
 * Dynamic Site Routes
 *
 * If you’d prefer to set up your site routes in a file as opposed to Settings > Routes in the CP,
 * you can define them here.  Craft will check both places for dynamic site routes.
 *
 * Each route will take up one element in the array returned by this file.
 * The array keys are your URL patterns, and the values are the templates that should get loaded.
 *
 * The URL patterns are regular expressions. If you want to capture portions of the URL and
 * make them available to your template, use named subpatterns. For example:
 *
 *     'blog/archive/(?P<year>\d{4})' => 'blog/_archive',
 *
 * That example would match URIs such as "blog/archive/2012", and pass the request along to
 * the blog/_archive template, providing it a ‘year’ variable set to the value “2012”.
 */

return array(
    // match url => load template
   'media-center' => 'layouts/media-center/index',
   'press-releases' => 'layouts/press-releases/index',
   'press-releases/practices/(?P<category>\w+\-?\w+?)' => 'layouts/press-releases/_category',
   'press-releases/regions/(?P<category>\w+\-?\w+?)' => 'layouts/press-releases/_category',
   'knowledge-center' => 'layouts/kc/index',
   'knowledge-center/blogs' => 'layouts/kc/index',
   'knowledge-center/infographics' => 'layouts/kc/index',
   'knowledge-center/articles-and-opinions' => 'layouts/kc/index',
   'knowledge-center/special-reports' => 'layouts/kc/index',
   'knowledge-center/videos' => 'layouts/kc/index',
   'knowledge-center/(?P<ctype>\w+(\-?\w+?)*)/practices/(?P<category>\w+\-?\w+?)' => 'layouts/kc/_category',
   'knowledge-center/(?P<ctype>\w+(\-?\w+?)*)/tags/(?P<tag>\w+\-?\w+?)' => 'layouts/kc/_tag',
   'knowledge-center/(?P<ctype>\w+(\-?\w+?)*)/authors/(?P<author>\w+\-?\w+?)' => 'layouts/kc/_author',
   'knowledge-center/(?P<ctype>\w+(\-?\w+?)*)/archives/(?P<year>\d{4})-(?P<month>\d{2})' => 'layouts/kc/_archive',

);
