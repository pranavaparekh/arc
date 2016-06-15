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
   'media-room' => 'layouts/media-center/index',
   'press-releases' => 'layouts/press-releases/index',
   'press-releases/practices/(?P<category>\w+\-?\w+?)' => 'layouts/press-releases/_category',
   'press-releases/regions/(?P<category>\w+\-?\w+?)' => 'layouts/press-releases/_category',
   'business-research' => 'layouts/services/br/_redirect',
   'investment-research' => 'layouts/services/ir/_redirect',
   'intellectual-property-research' => 'layouts/services/ip/_redirect',
   'ip' => 'layouts/services/ip/_redirect',
   'procurement-research' => 'layouts/services/procurement/_redirect',
   'knowledge-library' => 'layouts/kc/index',
   'knowledge-library/blogs-and-opinions' => 'layouts/blogs/index',
   'knowledge-library/infographics' => 'layouts/infographics/index',
   'knowledge-library/articles' => 'layouts/articles/index',
   'knowledge-library/special-reports' => 'layouts/special-reports/index',
   'knowledge-library/videos' => 'layouts/kc/index',
   'knowledge-library/(?P<ctype>\w+(\-?\w+?)*)/practices/(?P<category>\w+\-?\w+?)' => 'layouts/kc/_category',
   'knowledge-library/(?P<ctype>\w+(\-?\w+?)*)/tags/(?P<tag>\w+\-?\w+?)' => 'layouts/kc/_tag',
   'knowledge-library/(?P<ctype>\w+(\-?\w+?)*)/authors/(?P<author>\w+\-?\w+?)' => 'layouts/kc/_author',
   'knowledge-library/(?P<ctype>\w+(\-?\w+?)*)/archives/(?P<year>\d{4})-(?P<month>\d{2})' => 'layouts/kc/_archive',

   'special-reports/pp-form' => 'layouts/special-reports/pp-form',

   'search/results' => 'layouts/search/results',

   'thankyou-(?P<practiceType>\w+\-?\w+?\-?\w+?)' => 'layouts/thank-you/_entry',

   'valuation-and-advisory' => 'layouts/services/va/_redirects',
   'valuation-and-advisory/us-gaap-reporting/goodwill-impairment-asc350' => 'layouts/services/va/_redirects',
   'valuation-and-advisory/us-gaap-reporting/purchase-price-allocation-asc805' => 'layouts/services/va/_redirects',
   'valuation-and-advisory/us-tax-compliance/carry-forward-of-nols-irc382' => 'layouts/services/va/_redirects',
   'valuation-and-advisory/us-tax-compliance/s-corp-election-irc1374' => 'layouts/services/va/_redirects',
   'valuation-and-advisory/transaction-support/fairness-opinions' => 'layouts/services/va/_redirects',
   'valuation-and-advisory/us-tax-compliance/irc409a-valuation' => 'layouts/services/va/_redirects',
   'valuation-and-advisory/us-gaap-reporting' => 'layouts/services/va/_redirects',
   'valuation-and-advisory/us-tax-compliance' => 'layouts/services/va/_redirects',
   'valuation-and-advisory/transaction-support' => 'layouts/services/va/_redirects',
   'knowledge/download-center' => 'layouts/kc/_redirect'
);
