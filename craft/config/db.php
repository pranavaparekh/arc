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
    ),
    'stanly' => array(
        'server' => 'localhost',
        'user' => $_SERVER['ARANCA_DATABASE_USER'],
        'password' => $_SERVER['ARANCA_DATABASE_PASS'],
        'database' => $_SERVER['ARANCA_DATABASE_NAME'],
    ),
    'amite' => array(
        'server' => $_SERVER['ARANCA_REMOTE_RDS_SERVER_2'],
        'user' => $_SERVER['ARANCA_REMOTE_RDS_USER'],
        'password' => $_SERVER['ARANCA_REMOTE_RDS_DB_PASS'],
        'database' => $_SERVER['ARANCA_REMOTE_RDS_DB_NAME'],
    ),
    'staging' => array(
        'server' => $_SERVER['ARANCA_MYSQL_SERVER'],
        'user' => $_SERVER['ARANCA_MYSQL_USER'],
        'password' => $_SERVER['ARANCA_MYSQL_DB_PASS'],
        'database' => $_SERVER['ARANCA_MYSQL_DB_NAME'],
    ),
);


