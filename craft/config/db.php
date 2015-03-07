<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(
    '*' => array(
        'tablePrefix' => 'craft',
        'user' => $_SERVER['ARANCA_DATABASE_USER'],
        'password' => $_SERVER['ARANCA_DATABASE_PASS'],
        'database' => $_SERVER['ARANCA_DATABASE_NAME'],
    ),
    'stanly' => array(
        'server' => 'localhost',
    ),
    'amite' => array(
        'server' => 'localhost',
    ),
);
