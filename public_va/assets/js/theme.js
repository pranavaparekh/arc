/* ========================================================================
 * Omega: theme.js
 * Main Theme Javascript file
 * ========================================================================
 * Copyright 2014 Oxygenna LTD
 * ======================================================================== */

'use strict';

// ignore camel case because it breaks jshint for vars from php localisation
/* jshint camelcase: false */

/* global jQuery: false, skrollr: false, Odometer: false, paceOptions: false, Pace: false, Waypoint: false */

// If script is not localized apply defaults

var oxyThemeData = oxyThemeData || {
    navbarHeight : 100,
    navbarScrolled : 70,
    navbarScrolledPoint : 200,
    menuClose : 'off',
    scrollFinishedMessage : 'No more items to load.',
    hoverMenu : {
        hoverActive : false,
        hoverDelay : 1,
        hoverFadeDelay : 200
    },
    siteLoader: 'on'
};

window.paceOptions = {
    startOnPageLoad: oxyThemeData.siteLoader === 'on',
    restartOnRequestAfter: false
};
// // Loading Slabtext on window load to make sure fonts are loaded
// jQuery(window).on('load', function () {
//     jQuery( '.bigtext' ).bigtext(
//         {
//             minfontsize: 16
//         });
// });

jQuery(document).ready(function( $ ) {
    // Parallax Scrolling - on desktops only
    // ======================
    if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
        // skrollr.init({
        //     forceHeight: false
        // });
    } else {
        // Assign the 'oxy-agent' class when not assigned by PHP - for the html Version
        // ======================
        $('body:not([class*="oxy-agent-"])').addClass('oxy-agent-');
        if((/iPhone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
            $('body').not('.oxy-agent-iphone').addClass('oxy-agent-iphone');
        }
        if((/iPad/i).test(navigator.userAgent || navigator.vendor || window.opera)){
            $('body').not('.oxy-agent-ipad').addClass('oxy-agent-ipad');
        }
    }

    var isMobile = !$('body:not([class*="oxy-agent-"])').length;

    // Flexslider Init
    // ======================

    function flexInit( element ) {
        // We use data atributes on the flexslider items to control the behaviour of the slideshow
        var slider = $(element),

        //data-slideshow: defines if the slider will start automatically (true) or not
        sliderShow = slider.attr('data-flex-slideshow') === 'false' ? false : true,

        //data-flex-animation: defines the animation type, slide (default) or fade
        sliderAnimation = !slider.attr('data-flex-animation') ? 'slide' : slider.attr('data-flex-animation'),

        //data-flex-speed: defines the animation speed, 7000 (default) or any number
        sliderSpeed = !slider.attr('data-flex-speed') ? 7000 : slider.attr('data-flex-speed'),

        //data-flex-sliderdirection: defines the slide direction
        direction = !slider.attr('data-flex-sliderdirection') ? 'horizontal' : slider.attr('data-flex-sliderdirection'),

        //data-flex-duration: defines the transition speed in milliseconds
        sliderDuration = !slider.attr('data-flex-duration') ? 600 : slider.attr('data-flex-duration'),

        //data-flex-directions: defines the visibillity of the nanigation arrows, hide (default) or show
        sliderDirections = slider.attr('data-flex-directions') === 'hide' ? false : true,

        //data-flex-controls: defines the visibillity of the nanigation controls, hide (default) or show
        sliderControls = slider.attr('data-flex-controls') === 'thumbnails' ? 'thumbnails' : slider.attr('data-flex-controls') === 'hide' ? false : true,

        //data-flex-controlsposition: defines the positioning of the controls, inside (default) absolute positioning on the slideshow, or outside
        sliderControlsPosition = slider.attr('data-flex-controlsposition') === 'inside' ? 'flex-controls-inside' : 'flex-controls-outside',

        //data-flex-controlsalign: defines the alignment of the controls, center (default) left or right
        sliderControlsAlign = !slider.attr('data-flex-controlsalign') ? 'flex-controls-center' : 'flex-controls-' + slider.attr('data-flex-controlsalign'),

        //data-flex-controlsalign: defines the alignment of the controls, center (default) left or right
        sliderControlsVericalAlign = !slider.attr('data-flex-controlsvertical') ? '' : 'flex-controls-' + slider.attr('data-flex-controlsvertical'),

        //data-flex-itemwidth: the width of each item in case of a multiitem carousel, 0 (default for 100%) or a nymber representing pixels
        sliderItemWidth = !slider.attr('data-flex-itemwidth') ? 0 : parseInt(slider.attr('data-flex-itemwidth'), 10),

        //data-flex-itemmax: the max number of items in a carousel
        sliderItemMax = !slider.attr('data-flex-itemmax') ? 0 : parseInt(slider.attr('data-flex-itemmax'), 0),

        //data-flex-itemmin: the max number of items in a carousel
        sliderItemMin = !slider.attr('data-flex-itemmin') ? 0 : parseInt(slider.attr('data-flex-itemmin'), 0),

            //data-flex-captionvertical: defines the horizontal positioning of the captions, left or right or alternate
        sliderCaptionsHorizontal = slider.attr('data-flex-captionhorizontal') === 'alternate' ? 'flex-caption-alternate' : 'flex-caption-' + slider.attr('data-flex-captionhorizontal');

        slider.addClass(sliderControlsPosition).addClass(sliderControlsAlign).addClass(sliderControlsVericalAlign).addClass(sliderCaptionsHorizontal);

        slider.flexslider({
            slideshow: sliderShow,
            animation: sliderAnimation,
            direction: direction,
            slideshowSpeed: parseInt(sliderSpeed),
            animationSpeed: parseInt(sliderDuration),
            itemWidth: sliderItemWidth,
            minItems: sliderItemMin,
            maxItems: sliderItemMax,
            controlNav: sliderControls,
            directionNav: sliderDirections,
            prevText: '',
            nextText: '',
            smoothHeight: true,
            useCSS : false
        });
    }

    // Flexslider Init
    $( '.flexslider[id]' ).each(function() {
        var that = this;
        $(this).imagesLoaded().done( function( instance ) {
            flexInit(that);
        });
    });

    // Portfolio Isotope
    // ======================

    function isotopeInit() {
        $('.masonry').each( function( index, element ) {
            var $container = $(element);
            var $items = $container.find( '.masonry-item' );
            var padding = $container.attr( 'data-padding' );
            var isFullWidth = $container.parents( '.container-fullwidth' ).length > 0;
            // On fullscreen portfolio add negative margin on left and right and add 4pixel upon that for the loss after rounding
            var containerPadding = -padding / 2;

            $container.css({
                margin: '0 ' + containerPadding + 'px'
            });
            $container.imagesLoaded().always( function( loadedContainer ) {
                setTimeout( function() {
                    var columns = 3;
                    var screenWidth = $(window).width();

                    var wideColumns = 2;

                    if( screenWidth < 768 ) {
                        columns = $container.attr( 'data-col-xs' );
                        wideColumns = 1;
                    }
                    else if( screenWidth < 992 ) {
                        columns = $container.attr( 'data-col-sm' );
                        wideColumns =  1;
                    }
                    else if( screenWidth < 1200 ) {
                        columns = $container.attr( 'data-col-md' );
                        wideColumns =  2 ;
                    }
                    else if( screenWidth > 1200 ) {
                        columns = $container.attr( 'data-col-lg' );
                        wideColumns =  2 ;
                    }

                    // calculate item width and paddings
                    var itemWidth;
                    if ( $container.hasClass( 'use-masonry' ) ) {
                        $items.each(function() {
                            // Set the masonry column width
                            itemWidth = Math.floor( $container.width() / columns );

                            var item  = $(this);
                            if( item.hasClass( 'masonry-wide' ) ) {
                                item.css( 'width', itemWidth * wideColumns );
                            }
                            else {
                                item.css( 'width', itemWidth );
                            }
                        });
                    }
                    else {
                        itemWidth = Math.floor( $container.width() / columns );
                        $items.css( 'width', itemWidth );
                    }

                    $items.find('.figure,.post-masonry-inner').css( 'padding', padding / 2 + 'px' );

                    // wait for possible flexsliders to render before rendering isotope
                    $container.isotope( {
                        itemSelector: '.masonry-item',
                        getSortData : {
                            default: function ( $elem ) {
                                return parseInt( $elem.attr( 'data-menu-order' ) );
                            },
                            title: function ( $elem ) {
                                return $elem.attr( 'data-title' );
                            },
                            date: function ( $elem ) {
                                return Date.parse( $elem.attr( 'data-date' ) );
                            },
                            comments: function( $elem ) {
                                return parseInt( $elem.attr( 'data-comments') );
                            }
                        },
                        sortBy: 'default',
                        layoutMode: $container.attr( 'data-layout' ),
                        resizable: false,
                        masonry: {
                            columnWidth: itemWidth,
                            gutter: padding
                        }
                    }, function(){
                        // refresh waypoints after layout
                        Waypoint.refreshAll();
                        $container.removeClass( 'no-transition' );
                        onScrollInit( $items.find( '.portfolio-os-animation' ), $container );
                        onScrollInit( $items.find( '.blog-os-animation' ), $container );
                    });
                },200);
            });
        });
    }

    // Re initialise isotope on window resize
    $(window).smartresize(function(){
        isotopeInit();
    });

    // Init the isotope
    isotopeInit();

    // Portfolio Filters
    // ======================

    $('.portfolio-filter').click( function() {
        var $button = $(this);
        var filter = $button.attr( 'data-filter' );
        var $filtersRow = $button.parents('div.row');
        $filtersRow.find( '.portfolio-title span' ).text( $button.text() );
        var $portfolio = $filtersRow.next();
        $portfolio.isotope( { filter: filter } );
    });

    $('.portfolio-order').click( function() {
        var $button = $(this);
        var order = $button.attr( 'data-value' );
        var $portfolio = $button.parents( 'div.row' ).next();
        $portfolio.isotope( { sortAscending: order === 'true' } );
    });

    $('.portfolio-sort').click( function() {
        var $button = $(this);
        var sort = $button.attr( 'data-sort' );
        var $portfolio = $button.parents('div.row').next();
        $portfolio.isotope( { sortBy: sort } );
    });

    // Theme Sections
    // ======================

    // Adjust full height sections on IOS
    $('[class*="oxy-agent-"] .section-fullheight').removeClass('section-fullheight').css('min-height', $(window).height()).find('.container, .container-fullwidth, .container > .row, .container-fullwidth > .row ').css('min-height', $(window).height()).find('.row, [class*="col-md"]').css('position', 'static');

    // fix placeholders for IE 8 & 9
    $('html.ie9').find('input, textarea').placeholder();

    // Setiing responsive videos
    $( '.video-wrapper' ).fitVids();

     // Play videos & audio
    $('audio').mediaelementplayer({
        pauseOtherPlayers: false,
        enableAutosize: false,
        setDimensions:false,
    });

    $('.section-background-video').mediaelementplayer({
        pauseOtherPlayers: false,
        enableAutosize: false,
        setDimensions:false,
        success: function(mediaElement, node, player) {
            // video tag is initially hidden ( in order to hide the poster and display the cover bg only )
            var attr = $(mediaElement).attr('poster');
            if(typeof attr !== typeof undefined && attr !== false) {
                $(mediaElement).parent().css('background-image','url(\'' + $(mediaElement).attr('poster') + '\')');
            }
            var $section = $(mediaElement).closest('section');

            // loadded data event does not trigger on ios, its dektop only
            mediaElement.addEventListener('loadeddata', function () {
                // player arg has media property filled only after loadeddata even triggers ( first frame loaded! )
                var containerHeight    = $section.outerHeight();
                var containerWidth     = $section.outerWidth();
                var playerHeight       = player.media.videoHeight;
                var playerWidth        = player.media.videoWidth;
                var aspectRatio        = ( playerHeight / playerWidth * 100 ) + '%';
                var scaleFactor        = containerWidth /playerWidth;
                var playerActualHeight = playerHeight * scaleFactor;

                $(mediaElement).parent().css('padding-bottom', aspectRatio);
                if( playerActualHeight >= containerHeight ){
                    $(mediaElement).css('top', ( containerHeight - (playerHeight * scaleFactor) )/2 );
                }
                else {
                    $(mediaElement).css('background-image', '');
                }

                $(mediaElement).show();

                $(window).smartresize(function(){
                        containerHeight    = $section.outerHeight();
                        containerWidth     = $section.outerWidth();
                        scaleFactor        = containerWidth /playerWidth;
                        playerActualHeight = playerHeight * scaleFactor;
                    if( playerActualHeight >= containerHeight ){
                        $(mediaElement).css('top', ( containerHeight - (playerHeight * scaleFactor) )/2 );
                    }
                    else {
                        $(mediaElement).css('background-image', '');
                    }
                });
            });

            if( isMobile ) {
                // if mobile show video immediately ( no loadeddata event here )
                $(mediaElement).show();
            }
            // ipad safari needs a javascript controller for the video
            if( $('body').hasClass('oxy-agent-ipad') ) {
                $section.on('click', function (e) {
                    if(mediaElement.paused) {
                        mediaElement.play();
                    }
                    else {
                        mediaElement.pause();
                    }
                });
            }
        }
    });

    // Feature List Shortcode
    // ======================

    // Feature list lines
    $('ul.features-connected').each(function() {
        var element = $(this);
        var div = $('<div class="features-connected-line"></div>').css('border-color' , element.attr('data-linecolor'));
        element.find('li').append( div );
    });

    // Countdown Shortcode
    // ======================

    $('.countdown').each(function() {
        var countdown = $(this);
        var date = countdown.attr('data-date' );
        countdown.countdown( date ).on('update.countdown', function(event) {
            $(this).find('.counter-days').html( event.offset.totalDays );
            $(this).find('.counter-hours').html( event.offset.hours );
            $(this).find('.counter-minutes').html( event.offset.minutes );
            $(this).find('.counter-seconds').html( event.offset.seconds );
        });
    });

    $('.counter').each(function() {
        var $counter = $(this);
        var $odometer = $counter.find('.odometer-counter');
        if($odometer.length > 0 ) {
            var od = new Odometer({
                el: $odometer[0],
                value: $odometer.text(),
                format: $counter.attr('data-format')
            });
            $counter.waypoint(function() {
                window.setTimeout(function() {
                    $odometer.html( $counter.attr( 'data-count' ) );
                }, 500);
            },{
                triggerOnce: true,
                offset: 'bottom-in-view'
            });
        }
    });

    // Theme Forms
    // ======================

    // Add wrapper to select boxes
    $('select').not('.country_to_state, #billing_state, #shipping_state, #calc_shipping_state').wrap('<div class="select-wrap">');


    // Bullet navigation
    // ======================
    var menu = $('#masthead');
    var menuInitOffset = $('#masthead').position();
    menuInitOffset = menuInitOffset === undefined ? 0 : menuInitOffset.top;

    var menuItems = $('.menu').find('a');
    var scrollMenuItems = menuItems.map(function(){
        var item = this.hash;
        if (item && $(item).length ) {
            return item;
        }
    });

    var bulletNav = $('article .bullet-nav');
    if( bulletNav.length || scrollMenuItems.length ) {
        var sections = [];
        $('article').find('section').each( function() {
            // if section has an id
            if( this.id ) {
                sections.push(this);
            }
        });
        if( sections.length ) {
            if( scrollMenuItems.length ) {
                menuItems.parent().removeClass('active current-menu-item');
            }
            $.each( sections, function( index, section) {
                var $section = $(section);
                // create bullet nav
                if( bulletNav.length ){
                    var list = bulletNav.find('ul');
                    var tooltipAtts = '';
                    if( 'on' === bulletNav.attr( 'data-show-tooltips' ) ) {
                         tooltipAtts = 'data-toggle="tooltip" data-placement="left" title="' + $section.attr('data-label') + '"';
                    }
                    list.append('<li><a href="#' + section.id + '" ' + tooltipAtts + '>' + section.id + '</a>');
                }
                // set all section up waypoints
                $section.waypoint({
                    offset: function() {
                        return sectionWaypointOffset( $section, 'up', menu );
                    },
                    handler: function(direction) {
                        if( 'up' === direction ) {
                            sectionWaypointHandler( scrollMenuItems, menuItems, bulletNav, section );
                        }
                    }
                });
                // set all section down waypoints
                $section.waypoint({
                    offset: function() {
                        return sectionWaypointOffset( $section, 'down', menu );
                    },
                    handler: function(direction) {
                        if( 'down' === direction ) {
                            sectionWaypointHandler( scrollMenuItems, menuItems, bulletNav, section );
                        }
                    }
                });
            });
            // show the bullets if we have any
            if( bulletNav.length ){
                bulletNav.show();
                bulletNav.css('top', ( $(window).height() - bulletNav.height() )/ 2 );
            }
        }
    }

    function sectionWaypointOffset( $section, direction, menu ) {
        // if we are going up start from -1 to make sure event triggers
        var offset = direction === 'up' ? -($section.height() / 2) : 0;
        var menuHeight = parseInt(oxyThemeData.navbarHeight);
        if( menu.length && menu.hasClass('navbar-sticky') && menu.hasClass('navbar-scrolled') ){
            menuHeight = parseInt(oxyThemeData.navbarScrolled);
        }
        var sectionOffset = $section.offset().top;
        var menuOffset = menu.length? menu.position().top : 0;
        if( menu.length && menu.hasClass('navbar-sticky') && (  (menuOffset + menuHeight)  <= sectionOffset ) && !isMobile ){
            offset += menuHeight;
        }
        return offset;
    }

    function sectionWaypointHandler( scrollMenuItems, menuItems, bulletNav, section ) {
        if( scrollMenuItems.length ) {
            menuItems.parent().removeClass('active current-menu-item').end().filter('[href$="' + section.id + '"]').parent().addClass('active current-menu-item');
        }
        if( bulletNav.length ) {
            bulletNav.find('a').removeClass('active').filter('[href$="' + section.id + '"]').addClass('active');
        }
    }

    // Scroll To Section
    // ======================

    $('.menu a, a.scroll-to-id, .bullet-nav a').on('click', function(e) {
        var target = this.hash;
        var offset = 0;

        if(target && $(target).length){
            e.preventDefault();

            var targetOffset = $(target).offset().top;
            var menuHeight = parseInt(oxyThemeData.navbarHeight);

            if(menu !== undefined && menu.hasClass('navbar-sticky') && ( menuInitOffset + menuHeight <= targetOffset) && !isMobile){
                var scrollPoint = parseInt( oxyThemeData.navbarScrolledPoint );
                var navHeightBeforeScrollPoint = parseInt( oxyThemeData.navbarHeight );
                var navHeightAfterScrollPoint = parseInt( oxyThemeData.navbarScrolled );

                offset = scrollPoint <= targetOffset ? navHeightAfterScrollPoint : navHeightBeforeScrollPoint;
            }

            $.scrollTo( $(target), 800, {
                axis: 'y',
                offset: -offset + 1
            } );
        }
    });

    // Calendar Widget
    // ======================

    // make WP calendar use boostrap table class
    $('#wp-calendar').addClass( 'table' );


    // Search Widget in Navbar
    // ======================

    // Add top bar functionallity
    $('.top-bar, #masthead').find('.widget_search form').wrap('<div class="top-search">');
    $('.top-search').append('<a class="search-trigger"></a><b class="search-close"></b>');
    $('body').on('click', '.top-search:not(.active) .search-trigger', function() {
        $('.top-search').toggleClass('active');
        $('#content').addClass('fade-content');
        if( $('.top-search').closest('.top-bar').length > 0 ) {
            $('#masthead').addClass('fade-content');
        }
        $('#masthead').toggleClass('search-active');
        $('.top-search').find('form').fadeToggle(300).find('input').focus();

    });
    $('body').on('click', '.top-search.active .search-trigger', function() {
        $('.top-search').toggleClass('active');
        $('#content, #masthead').removeClass('fade-content');
        $('.top-search').find('form').fadeToggle(300);
        $('#masthead').toggleClass('search-active');
    });

    // Scrolling Events
    // ======================

    // header menu changes
    var header = $('body').find('.navbar-sticky');
    if(header.length > 0) {
        // stop navbar when at top of the page
        var sticky = new Waypoint.Sticky({
            element: header[0],
            stuckClass: 'navbar-stuck'
        });
    }

    // fix for menus in content
    $('#masthead').parents('.section').css({
        'overflow': 'visible',
        'position': 'relative',
        'z-index': '1100'
    });

    // trigger the waypoint only for fixed position navbar
    var menuContainer = $('#masthead.navbar-sticky');
    if(menuContainer.length && menuContainer.hasClass('navbar-sticky')){
        // calculate menu offset in case menu is placed inside the page
        var menuOffset =  menuContainer.position().top;
        $('body').waypoint({
            offset: -( parseInt( oxyThemeData.navbarScrolledPoint ) + menuOffset ),
            handler: function(direction) {
                // add / remove scrolled class
                menuContainer.toggleClass('navbar-scrolled');
                // remove swatch class
                var prefix = 'swatch-';
                var classes = menuContainer[0].className.split(' ').filter(function(c) {
                    return c.lastIndexOf(prefix, 0) !== 0;
                });
                menuContainer[0].className = classes.join(' ');
                // add back swatch class depending on direction above / below scroll point
                // menuContainer.addClass(oxyThemeData.navbarScrolledSwatches[direction]);

                menuContainer.one('MSTransitionEnd webkitTransitionEnd oTransitionEnd transitionend', function(){
                    // refresh waypoints only once transition ends in order to get correct offsets for sections.
                    if( !menuContainer.hasClass( 'refreshing' ) ) {
                        Waypoint.refreshAll();
                    }
                    menuContainer.toggleClass('refreshing');
                });
            }
        });
    }

    $('body').waypoint({
        offset: -200,
        handler: function(direction) {
            if(direction === 'down'){
                $('.go-top').css('bottom', '12px').css('opacity', '1');
            }
            else{
                $('.go-top').css('bottom', '-44px').css('opacity', '0');
            }
        }
    });

    // Init On scroll animations
    function onScrollInit( items, trigger ) {
        items.each( function() {
            var osElement = $(this),
                osAnimationClass = osElement.attr('data-os-animation'),
                osAnimationDelay = osElement.attr('data-os-animation-delay');

            osElement.css({
                '-webkit-animation-delay':  osAnimationDelay,
                '-moz-animation-delay':     osAnimationDelay,
                'animation-delay':          osAnimationDelay
            });

            var osTrigger = ( trigger ) ? trigger : osElement;

            osTrigger.waypoint(function() {
                osElement.addClass('animated').addClass(osAnimationClass);
            },{
                triggerOnce: true,
                offset: '90%'
            });
        });
    }

    function initialisePageScrollAnimations() {
        onScrollInit( $('.os-animation') );
        onScrollInit( $( '.staff-os-animation' ), $('.staff-list-container') );
        onScrollInit( $( '.recent-simple-os-animation' ), $('.recent-simple-os-container') );
    }


    // if we have page loader on wait for it to finish before init animations
    if(oxyThemeData.siteLoader === 'on') {
        Pace.on('done', function() {
            setTimeout(function() {
                initialisePageScrollAnimations();
            }, 500);
        });
    }
    else {
        initialisePageScrollAnimations();
    }

    // Goto top button
    // ======================

    // Animate the scroll to top
    $('.go-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 300);
    });


    // Bootstrap Tooltips
    // ======================

    // Function to init bootstrap's tooltip
    $('[data-toggle="tooltip"]').tooltip();


    // Bootstrap Carousel
    // ======================

    $('.carousel').carousel({
        interval: 7000
    });

    // Bootstrap Accordion Arrows
    // ======================

    // Function to fix accordion arrows
    $('.accordion-body').on('hide', function () {
        $(this).parent('.accordion-group').find('.accordion-toggle').addClass('collapsed');
    });

    // Side Menu
    $('body').on('show.bs.collapse', function () {
        if($(this).hasClass('slide-menu')) {
            $(this).addClass('slide-on');
        }
        $('.navbar-toggle').removeClass('collapsed');
    });
    $('body').on('hide.bs.collapse', function () {
        if($(this).hasClass('slide-menu')) {
            $(this).removeClass('slide-on');
        }
        $('.navbar-toggle').addClass('collapsed');
    });

    if(oxyThemeData.menuClose === 'on') {
        $('body.slide-menu').on('click', function() {
            if($(this).hasClass('slide-on')) {
                $('#navbar-slide').collapse('hide');
            }
        });
    }

    // PIE Chart
    // ======================

    $('.chart').each( function() {
        var $chart = $(this);
        $chart.waypoint(function() {
            $chart.easyPieChart({
                barColor: $chart.attr('data-bar-color'),
                trackColor: $chart.attr('data-track-color'),
                lineWidth: $chart.attr('data-line-width'),
                scaleColor: false,
                animate: 1000,
                size: $chart.attr('data-size'),
                lineCap: 'square'
            });
        },{
            triggerOnce: true,
            offset: 'bottom-in-view'
        });

        $chart.css('left', '50%');
        $chart.css('margin-left', - $chart.attr('data-size') / 2 );
    });


    // Fix for embedded videos
    // ======================

    var frames = document.getElementsByTagName( 'iframe' );
    for( var i = 0; i < frames.length; i++ ) {
        if( frames[i].src.indexOf('?') === -1 ) {
            frames[i].src += '?wmode=opaque';
        }
        else{
            frames[i].src += '&wmode=opaque';
        }
    }

    // Icon Animations
    // ======================

    $('[data-animation]').each(function(){
        var element         = $(this);

        element.on('mouseenter', function(){
            if( element.attr('data-animation') !== 'none' ){
                element.addClass('animated ' + element.attr('data-animation'));
            }
        });

        element.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
            element.removeClass('animated ' + element.attr('data-animation'));
        });

    });


    // Isotope Infinite Scroll
    // ======================

    var $container = $('div.blog-masonry.isotope');
    if($container.length > 0){
        $container.infinitescroll({
            navSelector  : 'div.infinite-scroll',    // selector for the paged navigation
            nextSelector : 'div.infinite-scroll a',  // selector for the NEXT link (to page 2)
            itemSelector : '.masonry-item',     // selector for all items you'll retrieve
            loading: {
                finishedMsg: oxyThemeData.scrollFinishedMessage,
            },
            prefill:true
        },
            // call Isotope as a callback
            function( newElements ) {
                $(newElements).each(function(index, element){

                    // Set the masonry column width
                    var columns = 3;
                    var screenWidth = $(window).width();
                    var wideColumns = 2;
                    var padding = $container.attr( 'data-padding' );

                    if( screenWidth < 768 ) {
                        columns = $container.attr( 'data-col-xs' );
                        wideColumns = 1;
                    }
                    else if( screenWidth < 992 ) {
                        columns = $container.attr( 'data-col-sm' );
                        wideColumns =  1;
                    }
                    else if( screenWidth < 1200 ) {
                        columns = $container.attr( 'data-col-md' );
                        wideColumns =  2 ;
                    }
                    else if( screenWidth > 1200 ) {
                        columns = $container.attr( 'data-col-lg' );
                        wideColumns =  2 ;
                    }

                    var itemWidth = Math.floor( $container.width() / columns );

                    var item  = $(this);
                    if( item.hasClass( 'masonry-wide' ) ) {
                        item.css( 'width', itemWidth * wideColumns );
                    }
                    else {
                        item.css( 'width', itemWidth );
                    }
                    item.find('.post-masonry-inner').css( 'padding', padding / 2 + 'px' );
                });
                $container.isotope( 'appended', $( newElements ), function(){
                    $container.isotope( 'reLayout', function() {
                        Waypoint.refreshAll();
                    });
                });
            }
        );
    }

    // Magnific Image Popup
    // ======================

    $('.magnific').magnificPopup({
        type:'image',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });

    // Magnific Video Popup
    // ======================

    $('.magnific-youtube, .magnific-vimeo, .magnific-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        preloader: false,
        fixedContentPos: false
    });

    // Magnific Gallery Popup
    // ======================

    $('.magnific-gallery').each(function(index , value){
        var gallery = $(this);
        var galleryImages = $(this).data('links').split(',');
        var items = [];
        for(var i=0;i<galleryImages.length; i++){
            items.push({
                src:galleryImages[i],
                title:''
            });
        }
        gallery.magnificPopup({
            mainClass: 'mfp-fade',
            items:items,
            gallery:{
                enabled:true,
                tPrev: $(this).data('prev-text'),
                tNext: $(this).data('next-text')
            },
            type: 'image'
        });
    });

    $('.magnific-all').each(function() {
        var $portfolio = $(this);
        var $imageLinks = $portfolio.find('.figure-image');

        var items = [];
        $imageLinks.each(function() {
            var $item = $(this);
            var type = 'image';
            if ($item.hasClass('magnific-youtube') || $item.hasClass('magnific-vimeo')) {
                type = 'iframe';
            }
            var magItem = {
                src: $item.attr('href'),
                type: type
            };
            var title = $item.find('.figure-caption-title');
            if (title.length > 0) {
                magItem.title = $(title).text();
            }
            items.push(magItem);
        });

        $imageLinks.magnificPopup({
            mainClass: 'mfp-fade',
            items: items,
            gallery:{
                enabled:true,
                tPrev: $(this).data('prev-text'),
                tNext: $(this).data('next-text')
            },
            type: 'image',
            callbacks: {
                beforeOpen: function() {
                    var index = $imageLinks.index(this.st.el);
                    if (-1 !== index) {
                        this.goTo(index);
                    }
                }
            }
        });
    });

    // Magnific Product Popup
    // ======================

    $('.product-gallery').magnificPopup({
        delegate: 'li figcaption a',
        type: 'image',
        mainClass: 'mfp-fade',
        gallery:{
            enabled:true,
            navigateByImgClick:true
        }
    });


    // Social Icons Hover Colours
    // ======================

    $('[data-iconcolor]').each(function(){
        var element         = $(this);
        var originalColor  = $(element).css('background-color');
        var originalTextColor  = $(element).find('i').css('color');
        element.on('mouseenter', function(){
            element.css('background-color' , element.attr('data-iconcolor'));
            element.find('i').css('color' , '#ffffff');
            if (element.parents('.social-icons').hasClass('social-simple')) {
                element.find('i').css('color' , element.attr('data-iconcolor'));
            }
        });
        element.on('mouseleave', function(){
            element.css('background-color' ,originalColor);
            element.find('i').css('color' , originalTextColor);
            if (element.parents('.social-icons').hasClass('social-simple')) {
                element.find('i').css('color' , originalTextColor);
            }
        });

    });

    // Hover menu
    // ======================
    if (oxyThemeData.hoverMenu.hoverActive === true) {
        $('.navbar .dropdown').hover(function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(oxyThemeData.hoverMenu.hoverDelay).fadeIn(parseInt(oxyThemeData.hoverMenu.hoverFadeDelay));
        }, function() {
            $(this).find('.dropdown-menu').first().stop(true, true).delay(oxyThemeData.hoverMenu.hoverDelay).fadeOut(parseInt(oxyThemeData.hoverMenu.hoverFadeDelay));
        });

        $('#masthead .nav li.dropdown a').on('click', function(){
            var $dropdown = $(this);
            if($dropdown.parent().hasClass('open') && ($dropdown.attr('data-link') !== undefined) ) {
                window.location = $dropdown.attr('data-link');
            }
        });
    }

    // woocommerce

    // if country changed and js injects text input make sure it has a form-control class
    $('body').on( 'country_to_state_changed', function(e, data) {
        $('.input-text').addClass('form-control');
        $('#calc_shipping_state').addClass('form-control');
    });
});
(function() {
  var AjaxMonitor, Bar, DocumentMonitor, ElementMonitor, ElementTracker, EventLagMonitor, Evented, Events, NoTargetError, Pace, RequestIntercept, SOURCE_KEYS, Scaler, SocketRequestTracker, XHRRequestTracker, animation, avgAmplitude, bar, cancelAnimation, cancelAnimationFrame, defaultOptions, extend, extendNative, getFromDOM, getIntercept, handlePushState, ignoreStack, init, now, options, requestAnimationFrame, result, runAnimation, scalers, shouldIgnoreURL, shouldTrack, source, sources, uniScaler, _WebSocket, _XDomainRequest, _XMLHttpRequest, _i, _intercept, _len, _pushState, _ref, _ref1, _replaceState,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  defaultOptions = {
    catchupTime: 100,
    initialRate: .03,
    minTime: 250,
    ghostTime: 100,
    maxProgressPerFrame: 20,
    easeFactor: 1.25,
    startOnPageLoad: true,
    restartOnPushState: true,
    restartOnRequestAfter: 500,
    target: 'body',
    elements: {
      checkInterval: 100,
      selectors: ['body']
    },
    eventLag: {
      minSamples: 10,
      sampleCount: 3,
      lagThreshold: 3
    },
    ajax: {
      trackMethods: ['GET'],
      trackWebSockets: true,
      ignoreURLs: []
    }
  };

  now = function() {
    var _ref;
    return (_ref = typeof performance !== "undefined" && performance !== null ? typeof performance.now === "function" ? performance.now() : void 0 : void 0) != null ? _ref : +(new Date);
  };

  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

  if (requestAnimationFrame == null) {
    requestAnimationFrame = function(fn) {
      return setTimeout(fn, 50);
    };
    cancelAnimationFrame = function(id) {
      return clearTimeout(id);
    };
  }

  runAnimation = function(fn) {
    var last, tick;
    last = now();
    tick = function() {
      var diff;
      diff = now() - last;
      if (diff >= 33) {
        last = now();
        return fn(diff, function() {
          return requestAnimationFrame(tick);
        });
      } else {
        return setTimeout(tick, 33 - diff);
      }
    };
    return tick();
  };

  result = function() {
    var args, key, obj;
    obj = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (typeof obj[key] === 'function') {
      return obj[key].apply(obj, args);
    } else {
      return obj[key];
    }
  };

  extend = function() {
    var key, out, source, sources, val, _i, _len;
    out = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = sources.length; _i < _len; _i++) {
      source = sources[_i];
      if (source) {
        for (key in source) {
          if (!__hasProp.call(source, key)) continue;
          val = source[key];
          if ((out[key] != null) && typeof out[key] === 'object' && (val != null) && typeof val === 'object') {
            extend(out[key], val);
          } else {
            out[key] = val;
          }
        }
      }
    }
    return out;
  };

  avgAmplitude = function(arr) {
    var count, sum, v, _i, _len;
    sum = count = 0;
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      v = arr[_i];
      sum += Math.abs(v);
      count++;
    }
    return sum / count;
  };

  getFromDOM = function(key, json) {
    var data, e, el;
    if (key == null) {
      key = 'options';
    }
    if (json == null) {
      json = true;
    }
    el = document.querySelector("[data-pace-" + key + "]");
    if (!el) {
      return;
    }
    data = el.getAttribute("data-pace-" + key);
    if (!json) {
      return data;
    }
    try {
      return JSON.parse(data);
    } catch (_error) {
      e = _error;
      return typeof console !== "undefined" && console !== null ? console.error("Error parsing inline pace options", e) : void 0;
    }
  };

  Evented = (function() {
    function Evented() {}

    Evented.prototype.on = function(event, handler, ctx, once) {
      var _base;
      if (once == null) {
        once = false;
      }
      if (this.bindings == null) {
        this.bindings = {};
      }
      if ((_base = this.bindings)[event] == null) {
        _base[event] = [];
      }
      return this.bindings[event].push({
        handler: handler,
        ctx: ctx,
        once: once
      });
    };

    Evented.prototype.once = function(event, handler, ctx) {
      return this.on(event, handler, ctx, true);
    };

    Evented.prototype.off = function(event, handler) {
      var i, _ref, _results;
      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
        return;
      }
      if (handler == null) {
        return delete this.bindings[event];
      } else {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    Evented.prototype.trigger = function() {
      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
          handler.apply(ctx != null ? ctx : this, args);
          if (once) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    return Evented;

  })();

  Pace = window.Pace || {};

  window.Pace = Pace;

  extend(Pace, Evented.prototype);

  options = Pace.options = extend({}, defaultOptions, window.paceOptions, getFromDOM());

  _ref = ['ajax', 'document', 'eventLag', 'elements'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    source = _ref[_i];
    if (options[source] === true) {
      options[source] = defaultOptions[source];
    }
  }

  NoTargetError = (function(_super) {
    __extends(NoTargetError, _super);

    function NoTargetError() {
      _ref1 = NoTargetError.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return NoTargetError;

  })(Error);

  Bar = (function() {
    function Bar() {
      this.progress = 0;
    }

    Bar.prototype.getElement = function() {
      var targetElement;
      if (this.el == null) {
        targetElement = document.querySelector(options.target);
        if (!targetElement) {
          throw new NoTargetError;
        }
        this.el = document.createElement('div');
        this.el.className = "pace pace-active";
        document.body.className = document.body.className.replace(/pace-done/g, '');
        document.body.className += ' pace-running';
        this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>';
        if (targetElement.firstChild != null) {
          targetElement.insertBefore(this.el, targetElement.firstChild);
        } else {
          targetElement.appendChild(this.el);
        }
      }
      return this.el;
    };

    Bar.prototype.finish = function() {
      var el;
      el = this.getElement();
      el.className = el.className.replace('pace-active', '');
      el.className += ' pace-inactive';
      document.body.className = document.body.className.replace('pace-running', '');
      return document.body.className += ' pace-done';
    };

    Bar.prototype.update = function(prog) {
      this.progress = prog;
      return this.render();
    };

    Bar.prototype.destroy = function() {
      try {
        this.getElement().parentNode.removeChild(this.getElement());
      } catch (_error) {
        NoTargetError = _error;
      }
      return this.el = void 0;
    };

    Bar.prototype.render = function() {
      var el, key, progressStr, transform, _j, _len1, _ref2;
      if (document.querySelector(options.target) == null) {
        return false;
      }
      el = this.getElement();
      transform = "translate3d(" + this.progress + "%, 0, 0)";
      _ref2 = ['webkitTransform', 'msTransform', 'transform'];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        key = _ref2[_j];
        el.children[0].style[key] = transform;
      }
      if (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) {
        el.children[0].setAttribute('data-progress-text', "" + (this.progress | 0) + "%");
        if (this.progress >= 100) {
          progressStr = '99';
        } else {
          progressStr = this.progress < 10 ? "0" : "";
          progressStr += this.progress | 0;
        }
        el.children[0].setAttribute('data-progress', "" + progressStr);
      }
      return this.lastRenderedProgress = this.progress;
    };

    Bar.prototype.done = function() {
      return this.progress >= 100;
    };

    return Bar;

  })();

  Events = (function() {
    function Events() {
      this.bindings = {};
    }

    Events.prototype.trigger = function(name, val) {
      var binding, _j, _len1, _ref2, _results;
      if (this.bindings[name] != null) {
        _ref2 = this.bindings[name];
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          binding = _ref2[_j];
          _results.push(binding.call(this, val));
        }
        return _results;
      }
    };

    Events.prototype.on = function(name, fn) {
      var _base;
      if ((_base = this.bindings)[name] == null) {
        _base[name] = [];
      }
      return this.bindings[name].push(fn);
    };

    return Events;

  })();

  _XMLHttpRequest = window.XMLHttpRequest;

  _XDomainRequest = window.XDomainRequest;

  _WebSocket = window.WebSocket;

  extendNative = function(to, from) {
    var e, key, _results;
    _results = [];
    for (key in from.prototype) {
      try {
        if ((to[key] == null) && typeof from[key] !== 'function') {
          if (typeof Object.defineProperty === 'function') {
            _results.push(Object.defineProperty(to, key, {
              get: function() {
                return from.prototype[key];
              },
              configurable: true,
              enumerable: true
            }));
          } else {
            _results.push(to[key] = from.prototype[key]);
          }
        } else {
          _results.push(void 0);
        }
      } catch (_error) {
        e = _error;
      }
    }
    return _results;
  };

  ignoreStack = [];

  Pace.ignore = function() {
    var args, fn, ret;
    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    ignoreStack.unshift('ignore');
    ret = fn.apply(null, args);
    ignoreStack.shift();
    return ret;
  };

  Pace.track = function() {
    var args, fn, ret;
    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    ignoreStack.unshift('track');
    ret = fn.apply(null, args);
    ignoreStack.shift();
    return ret;
  };

  shouldTrack = function(method) {
    var _ref2;
    if (method == null) {
      method = 'GET';
    }
    if (ignoreStack[0] === 'track') {
      return 'force';
    }
    if (!ignoreStack.length && options.ajax) {
      if (method === 'socket' && options.ajax.trackWebSockets) {
        return true;
      } else if (_ref2 = method.toUpperCase(), __indexOf.call(options.ajax.trackMethods, _ref2) >= 0) {
        return true;
      }
    }
    return false;
  };

  RequestIntercept = (function(_super) {
    __extends(RequestIntercept, _super);

    function RequestIntercept() {
      var monitorXHR,
        _this = this;
      RequestIntercept.__super__.constructor.apply(this, arguments);
      monitorXHR = function(req) {
        var _open;
        _open = req.open;
        return req.open = function(type, url, async) {
          if (shouldTrack(type)) {
            _this.trigger('request', {
              type: type,
              url: url,
              request: req
            });
          }
          return _open.apply(req, arguments);
        };
      };
      window.XMLHttpRequest = function(flags) {
        var req;
        req = new _XMLHttpRequest(flags);
        monitorXHR(req);
        return req;
      };
      try {
        extendNative(window.XMLHttpRequest, _XMLHttpRequest);
      } catch (_error) {}
      if (_XDomainRequest != null) {
        window.XDomainRequest = function() {
          var req;
          req = new _XDomainRequest;
          monitorXHR(req);
          return req;
        };
        try {
          extendNative(window.XDomainRequest, _XDomainRequest);
        } catch (_error) {}
      }
      if ((_WebSocket != null) && options.ajax.trackWebSockets) {
        window.WebSocket = function(url, protocols) {
          var req;
          if (protocols != null) {
            req = new _WebSocket(url, protocols);
          } else {
            req = new _WebSocket(url);
          }
          if (shouldTrack('socket')) {
            _this.trigger('request', {
              type: 'socket',
              url: url,
              protocols: protocols,
              request: req
            });
          }
          return req;
        };
        try {
          extendNative(window.WebSocket, _WebSocket);
        } catch (_error) {}
      }
    }

    return RequestIntercept;

  })(Events);

  _intercept = null;

  getIntercept = function() {
    if (_intercept == null) {
      _intercept = new RequestIntercept;
    }
    return _intercept;
  };

  shouldIgnoreURL = function(url) {
    var pattern, _j, _len1, _ref2;
    _ref2 = options.ajax.ignoreURLs;
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      pattern = _ref2[_j];
      if (typeof pattern === 'string') {
        if (url.indexOf(pattern) !== -1) {
          return true;
        }
      } else {
        if (pattern.test(url)) {
          return true;
        }
      }
    }
    return false;
  };

  getIntercept().on('request', function(_arg) {
    var after, args, request, type, url;
    type = _arg.type, request = _arg.request, url = _arg.url;
    if (shouldIgnoreURL(url)) {
      return;
    }
    if (!Pace.running && (options.restartOnRequestAfter !== false || shouldTrack(type) === 'force')) {
      args = arguments;
      after = options.restartOnRequestAfter || 0;
      if (typeof after === 'boolean') {
        after = 0;
      }
      return setTimeout(function() {
        var stillActive, _j, _len1, _ref2, _ref3, _results;
        if (type === 'socket') {
          stillActive = request.readyState < 2;
        } else {
          stillActive = (0 < (_ref2 = request.readyState) && _ref2 < 4);
        }
        if (stillActive) {
          Pace.restart();
          _ref3 = Pace.sources;
          _results = [];
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            source = _ref3[_j];
            if (source instanceof AjaxMonitor) {
              source.watch.apply(source, args);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      }, after);
    }
  });

  AjaxMonitor = (function() {
    function AjaxMonitor() {
      var _this = this;
      this.elements = [];
      getIntercept().on('request', function() {
        return _this.watch.apply(_this, arguments);
      });
    }

    AjaxMonitor.prototype.watch = function(_arg) {
      var request, tracker, type, url;
      type = _arg.type, request = _arg.request, url = _arg.url;
      if (shouldIgnoreURL(url)) {
        return;
      }
      if (type === 'socket') {
        tracker = new SocketRequestTracker(request);
      } else {
        tracker = new XHRRequestTracker(request);
      }
      return this.elements.push(tracker);
    };

    return AjaxMonitor;

  })();

  XHRRequestTracker = (function() {
    function XHRRequestTracker(request) {
      var event, size, _j, _len1, _onreadystatechange, _ref2,
        _this = this;
      this.progress = 0;
      if (window.ProgressEvent != null) {
        size = null;
        request.addEventListener('progress', function(evt) {
          if (evt.lengthComputable) {
            return _this.progress = 100 * evt.loaded / evt.total;
          } else {
            return _this.progress = _this.progress + (100 - _this.progress) / 2;
          }
        }, false);
        _ref2 = ['load', 'abort', 'timeout', 'error'];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          event = _ref2[_j];
          request.addEventListener(event, function() {
            return _this.progress = 100;
          }, false);
        }
      } else {
        _onreadystatechange = request.onreadystatechange;
        request.onreadystatechange = function() {
          var _ref3;
          if ((_ref3 = request.readyState) === 0 || _ref3 === 4) {
            _this.progress = 100;
          } else if (request.readyState === 3) {
            _this.progress = 50;
          }
          return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
        };
      }
    }

    return XHRRequestTracker;

  })();

  SocketRequestTracker = (function() {
    function SocketRequestTracker(request) {
      var event, _j, _len1, _ref2,
        _this = this;
      this.progress = 0;
      _ref2 = ['error', 'open'];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        event = _ref2[_j];
        request.addEventListener(event, function() {
          return _this.progress = 100;
        }, false);
      }
    }

    return SocketRequestTracker;

  })();

  ElementMonitor = (function() {
    function ElementMonitor(options) {
      var selector, _j, _len1, _ref2;
      if (options == null) {
        options = {};
      }
      this.elements = [];
      if (options.selectors == null) {
        options.selectors = [];
      }
      _ref2 = options.selectors;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        selector = _ref2[_j];
        this.elements.push(new ElementTracker(selector));
      }
    }

    return ElementMonitor;

  })();

  ElementTracker = (function() {
    function ElementTracker(selector) {
      this.selector = selector;
      this.progress = 0;
      this.check();
    }

    ElementTracker.prototype.check = function() {
      var _this = this;
      if (document.querySelector(this.selector)) {
        return this.done();
      } else {
        return setTimeout((function() {
          return _this.check();
        }), options.elements.checkInterval);
      }
    };

    ElementTracker.prototype.done = function() {
      return this.progress = 100;
    };

    return ElementTracker;

  })();

  DocumentMonitor = (function() {
    DocumentMonitor.prototype.states = {
      loading: 0,
      interactive: 50,
      complete: 100
    };

    function DocumentMonitor() {
      var _onreadystatechange, _ref2,
        _this = this;
      this.progress = (_ref2 = this.states[document.readyState]) != null ? _ref2 : 100;
      _onreadystatechange = document.onreadystatechange;
      document.onreadystatechange = function() {
        if (_this.states[document.readyState] != null) {
          _this.progress = _this.states[document.readyState];
        }
        return typeof _onreadystatechange === "function" ? _onreadystatechange.apply(null, arguments) : void 0;
      };
    }

    return DocumentMonitor;

  })();

  EventLagMonitor = (function() {
    function EventLagMonitor() {
      var avg, interval, last, points, samples,
        _this = this;
      this.progress = 0;
      avg = 0;
      samples = [];
      points = 0;
      last = now();
      interval = setInterval(function() {
        var diff;
        diff = now() - last - 50;
        last = now();
        samples.push(diff);
        if (samples.length > options.eventLag.sampleCount) {
          samples.shift();
        }
        avg = avgAmplitude(samples);
        if (++points >= options.eventLag.minSamples && avg < options.eventLag.lagThreshold) {
          _this.progress = 100;
          return clearInterval(interval);
        } else {
          return _this.progress = 100 * (3 / (avg + 3));
        }
      }, 50);
    }

    return EventLagMonitor;

  })();

  Scaler = (function() {
    function Scaler(source) {
      this.source = source;
      this.last = this.sinceLastUpdate = 0;
      this.rate = options.initialRate;
      this.catchup = 0;
      this.progress = this.lastProgress = 0;
      if (this.source != null) {
        this.progress = result(this.source, 'progress');
      }
    }

    Scaler.prototype.tick = function(frameTime, val) {
      var scaling;
      if (val == null) {
        val = result(this.source, 'progress');
      }
      if (val >= 100) {
        this.done = true;
      }
      if (val === this.last) {
        this.sinceLastUpdate += frameTime;
      } else {
        if (this.sinceLastUpdate) {
          this.rate = (val - this.last) / this.sinceLastUpdate;
        }
        this.catchup = (val - this.progress) / options.catchupTime;
        this.sinceLastUpdate = 0;
        this.last = val;
      }
      if (val > this.progress) {
        this.progress += this.catchup * frameTime;
      }
      scaling = 1 - Math.pow(this.progress / 100, options.easeFactor);
      this.progress += scaling * this.rate * frameTime;
      this.progress = Math.min(this.lastProgress + options.maxProgressPerFrame, this.progress);
      this.progress = Math.max(0, this.progress);
      this.progress = Math.min(100, this.progress);
      this.lastProgress = this.progress;
      return this.progress;
    };

    return Scaler;

  })();

  sources = null;

  scalers = null;

  bar = null;

  uniScaler = null;

  animation = null;

  cancelAnimation = null;

  Pace.running = false;

  handlePushState = function() {
    if (options.restartOnPushState) {
      return Pace.restart();
    }
  };

  if (window.history.pushState != null) {
    _pushState = window.history.pushState;
    window.history.pushState = function() {
      handlePushState();
      return _pushState.apply(window.history, arguments);
    };
  }

  if (window.history.replaceState != null) {
    _replaceState = window.history.replaceState;
    window.history.replaceState = function() {
      handlePushState();
      return _replaceState.apply(window.history, arguments);
    };
  }

  SOURCE_KEYS = {
    ajax: AjaxMonitor,
    elements: ElementMonitor,
    document: DocumentMonitor,
    eventLag: EventLagMonitor
  };

  (init = function() {
    var type, _j, _k, _len1, _len2, _ref2, _ref3, _ref4;
    Pace.sources = sources = [];
    _ref2 = ['ajax', 'elements', 'document', 'eventLag'];
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      type = _ref2[_j];
      if (options[type] !== false) {
        sources.push(new SOURCE_KEYS[type](options[type]));
      }
    }
    _ref4 = (_ref3 = options.extraSources) != null ? _ref3 : [];
    for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
      source = _ref4[_k];
      sources.push(new source(options));
    }
    Pace.bar = bar = new Bar;
    scalers = [];
    return uniScaler = new Scaler;
  })();

  Pace.stop = function() {
    Pace.trigger('stop');
    Pace.running = false;
    bar.destroy();
    cancelAnimation = true;
    if (animation != null) {
      if (typeof cancelAnimationFrame === "function") {
        cancelAnimationFrame(animation);
      }
      animation = null;
    }
    return init();
  };

  Pace.restart = function() {
    Pace.trigger('restart');
    Pace.stop();
    return Pace.start();
  };

  Pace.go = function() {
    var start;
    Pace.running = true;
    bar.render();
    start = now();
    cancelAnimation = false;
    return animation = runAnimation(function(frameTime, enqueueNextFrame) {
      var avg, count, done, element, elements, i, j, remaining, scaler, scalerList, sum, _j, _k, _len1, _len2, _ref2;
      remaining = 100 - bar.progress;
      count = sum = 0;
      done = true;
      for (i = _j = 0, _len1 = sources.length; _j < _len1; i = ++_j) {
        source = sources[i];
        scalerList = scalers[i] != null ? scalers[i] : scalers[i] = [];
        elements = (_ref2 = source.elements) != null ? _ref2 : [source];
        for (j = _k = 0, _len2 = elements.length; _k < _len2; j = ++_k) {
          element = elements[j];
          scaler = scalerList[j] != null ? scalerList[j] : scalerList[j] = new Scaler(element);
          done &= scaler.done;
          if (scaler.done) {
            continue;
          }
          count++;
          sum += scaler.tick(frameTime);
        }
      }
      avg = sum / count;
      bar.update(uniScaler.tick(frameTime, avg));
      if (bar.done() || done || cancelAnimation) {
        bar.update(100);
        Pace.trigger('done');
        return setTimeout(function() {
          bar.finish();
          Pace.running = false;
          return Pace.trigger('hide');
        }, Math.max(options.ghostTime, Math.max(options.minTime - (now() - start), 0)));
      } else {
        return enqueueNextFrame();
      }
    });
  };

  Pace.start = function(_options) {
    extend(options, _options);
    Pace.running = true;
    try {
      bar.render();
    } catch (_error) {
      NoTargetError = _error;
    }
    if (!document.querySelector('.pace')) {
      return setTimeout(Pace.start, 50);
    } else {
      Pace.trigger('start');
      return Pace.go();
    }
  };

  if (typeof define === 'function' && define.amd) {
    define(['pace'], function() {
      return Pace;
    });
  } else if (typeof exports === 'object') {
    module.exports = Pace;
  } else {
    if (options.startOnPageLoad) {
      Pace.start();
    }
  }

}).call(this);
