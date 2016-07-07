<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */
// Ensure our urls have the right scheme
define('URI_SCHEME', ( isset($_SERVER['HTTPS'] ) ) ? "https://" : "http://" );
// The site url
define('SITE_URL', URI_SCHEME . $_SERVER['SERVER_NAME'] . '/');
define('SITE_URL_ABS', URI_SCHEME . $_SERVER['SERVER_NAME']);
// The site basepath
define('BASEPATH', realpath(CRAFT_BASE_PATH . '/../') . '/');
return array(
  '*' => array(
    'omitScriptNameInUrls' => true,
    'siteUrlAbs'  => SITE_URL_ABS,
    'siteUrl'  => array(
      'en' => SITE_URL,
      'de' => SITE_URL . 'de',
    ),
    'environmentVariables' => array(
      'basePath' => BASEPATH,
      'assetsBaseUrl' => '/assets/uploads',
      'assetsBasePath' => './assets/uploads',
    ),
    'backupDbOnUpdate' => false,
  ),
  'valuation.aranca.dev/' => array(
    'environmentVariables' => array(
        'siteUrl' => 'http://valuation.aranca.dev/'
    )
  ),
  'cacheBustValue' => '20121017',
  // Create a custom variable that we can use for an environment conditional
  // We set the environment in index.php: live, dev, or local
  // This setting assumes we set the environment name in our index.php file
  // {% if craft.config.env == 'live' %} ... {% endif %}
  'env' => CRAFT_ENVIRONMENT,
  // Triggers
  // If you wish to access the control panel via a different URL
  // or change your page trigger for pagination, you can do so here.
  // 'cpTrigger'       => 'arancadmin',
  'sandy' => array(
    'devMode' => true,
    'assetsCssUrl' => '/assets/css',
    'assetsJsUrl' => '/assets/js',
    'assetsImagesUrl' => '/assets/images',
  ),
  'amite' => array(
    'devMode' => true,
    'cache' => true,
    'assetsCssUrl' => '/assets/css',
    'assetsJsUrl' => '/assets/js',
    'assetsImagesUrl' => '/assets/images',
  ),
  'staging' => array(
    'devMode' => true,
    'cache' => true,
    'assetsCssUrl' => '/assets/css',
    'assetsJsUrl' => '/assets/js',
    'assetsImagesUrl' => '/assets/images',
  ),
);
