$(function(){

    $('.header').data('size','big');

    var pageBody = $('body').get(0);

    $('a[data-target]').on('click', function (event) {
      var anchorTarget = '#' + $(this).data('target');
      var anchorOffset = $(this).data('offset');
      var anchorPosition = $(anchorTarget).offset().top - anchorOffset;
      naturalScroll.scrollTop(pageBody, anchorPosition);
    });

  });

  $(window).scroll(function(){
      var originalHeight   = "80px";
      var animateHeightTo = "65px";
      var classesToAddAndRemove = "fixed box-shadow";

      if($(document).scrollTop() > 0)
      {
        if($('.header').data('size') == 'big')
        {
            $('.header').addClass(classesToAddAndRemove);
            $(".header .brand-logo, .header .simp-nav__item").css("line-height", animateHeightTo);
            $('.header').data('size','small');
            $('.header').stop().animate({
                height: animateHeightTo
            },600);
        }
      }
      else
      {
        if($('.header').data('size') == 'small')
        {
            $('.header').removeClass(classesToAddAndRemove);
            $(".header .brand-logo, .header .simp-nav__item").css("line-height", originalHeight);
            $('.header').data('size','big');
            $('.header').stop().animate({
                height: originalHeight
            },600);
        }
      }
  });
