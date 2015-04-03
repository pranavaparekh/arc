<?php

// Path to your craft/ folder
$craftPath = '../../craft';
 // var_dump($_SERVER['APP_ENV']); exit();
define('CRAFT_LOCALE', 'de');

switch ($_SERVER['APP_ENV'])
{
    // If the SERVER_NAME variable matches our case,
    // assign the CRAFT_ENVIRONMENT variable a keyword
    // that identifies this environment that we can
    // use in our multi-environment config

    case 'amite' :
        define('CRAFT_ENVIRONMENT', 'amite');
        break;

    case 'local' :
        define('CRAFT_ENVIRONMENT', 'stanly');
        break;

    case 'staging' :
        define('CRAFT_ENVIRONMENT', 'staging');
        break;

    case 'aranca.com' :
        define('CRAFT_ENVIRONMENT', 'live');
        break;

}

// Do not edit below this line
$path = rtrim($craftPath, '/').'/app/index.php';

if (!is_file($path))
{
  if (function_exists('http_response_code'))
  {
    http_response_code(503);
  }

  exit('Could not find your craft/ folder. Please ensure that <strong><code>$craftPath</code></strong> is set correctly in '.__FILE__);
}

require_once $path;
