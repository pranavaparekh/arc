<?php

/*
*
* reCaptcha for Craft Main Plugin File
* Author: Aaron Berkowitz (@asberk)
* Forked By: Amit Erandole
* https://github.com/aberkie/craft-recaptcha
*
*/

namespace Craft;

class SubscriborPlugin extends BasePlugin
{
    function getName()
    {
        return Craft::t('Subscribor');
    }

    function getVersion()
    {
        return '1.0.0';
    }

    function init() {
        require CRAFT_PLUGINS_PATH.'/subscribor/vendor/autoload.php';
    }

    function getDeveloper()
    {
        return 'Amit Erandole';
    }

    function getDeveloperUrl()
    {
        return 'https://github.com/amite';
    }

    protected function defineSettings()
    {
        return array(
            
        );
    }

}
