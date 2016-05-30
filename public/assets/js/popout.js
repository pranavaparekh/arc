$(document).ready(function () {
    $('.wbs-switch').hide();
    var telInput = $("#slideoutMobile");
    $.get("http://ipinfo.io", function (response) {
        telInput.intlTelInput({
            defaultCountry: response.country.toLowerCase()
        });
    }, "jsonp");

    $('.wbs-switch, .wbs-close').click(function (evt) {
        // evt.preventDefault();
        $('.wbs-container').toggleClass('active');
        if (!$('.wbs-container').hasClass('active')) {
            $(this).delay(300).queue(function () {
                $.dequeue(this);
                clearStatusSlide();
                if (timer) {
                    timer = null;
                }
            });
        }
    });

    $('#slideoutCallMe').click(function () {
        slideoutMakecall();
    });

});

function clearStatusSlide() {
    $('.wbs-container').removeClass('connecting')
            .removeClass('connected')
            .removeClass('verifying')
            .removeClass('verification-success')
            .removeClass('failed')
            .removeClass('in-progress')
            .removeClass('completed')
            .removeClass('ended')
            .removeClass('agent-busy')
            .removeClass('oops')
            .removeClass('timer');
}

Waybeo.CTC.Init({
    hash: '56bd928aa3e24',
});

Waybeo.Utils.getIpCountry(function(l) {
    var _AllowedSouthAmericanCountries = ['US','MX','CA','CU'];
    if($.inArray(l.country_code, _AllowedSouthAmericanCountries) != -1) {
       $('.wbs-switch').show();
    }
});
function slideoutMakecall() {
    var _phone = $.trim($("#slideoutMobile").val()).replace('+', '').replace(' ', '');
    $('.wbs-container').addClass('connecting');
    Waybeo.CTC.MakeCall({
        'hash': '56bd928aa3e24',
        'route_hash': '56bd8379cf7b9',
        'callerid_hash': '573422281ad9d',
        'contact_number': _phone,
        'optional_params': {
            name: $('#wctcname').val(),
            email: $('#wctcemail').val(),
            url: $('#wctcurl').val()
        }
    }, slideoutEventCallBack);
}

var captcha = '', timer = '';
function slideoutEventCallBack(event, data) {
    clearStatusSlide();
    switch (event) {
        case 'CAPTCHA':
            captcha = data.code;
            $('.wbs-container').addClass('connecting');
            break;
        //case 'ORIGINATE_ERROR':
          //  $('.wbs-container').addClass('wbs-livemsg-oops');
            //break;
        case 'ORIGINATE_ERROR':
            if(data.errorCode && data.errorCode == 812) {
                $('.wbs-container').addClass('agent-busy');
            } else {
                $('.wbs-container').addClass('oops');
            }
            clearInterval(timer);
            break;
        case 'DIALING':
            $('.wbs-container').addClass('connected');
            break;
        case 'VERIFICATION_IN_PROGRESS':
            $('.wbs-container').addClass('verifying');
            $('.wbs-verificationcode').text(captcha);
            break;
        case 'VERIFIED':
            $('.wbs-container').addClass('verification-success');
            setTimeout(function () {
                $('.wbs-container').removeClass('verification-success');
                $('.wbs-container').addClass('in-progress');
            }, 1000);
            setStatusTimer();
            break;
        case 'AGENT_BUSY':
            $('.wbs-container').addClass('agent-busy');
            break;
        case 'INPROGRESS':
            $('.wbs-container').addClass('in-progress');
            setStatusTimer();
            break;
        case 'COMPLETED':
            $('.wbs-container').addClass('completed');
            clearInterval(timer);
            break;
        case 'VALIDATION_ERROR':
            if (data.errorCode && data.errorCode == 902) {
                $('.wbs-formerror').show();
            }
            clearInterval(timer);
            break;
        case 'ORIGINATE_ERROR':
            if(data.errorCode && data.errorCode == 812) {
                $('.wbs-container').addClass('agent-busy');
            } else {
                $('.wbs-container').addClass('oops');
            }
            clearInterval(timer);
            break;
        default:
            break;
    }
}

function setStatusTimer() {
    if (!timer) {
        var statusTime = 0;
        timer = setInterval(function () {
            statusTime++;
            var sec = statusTime % 60;
            var min = Math.floor(statusTime / 60);
            var hour = Math.floor(min / 60);
            min = min % 60;
            if (!Math.floor(sec / 10))
                sec = '0' + sec;
            if (!Math.floor(min / 10))
                min = '0' + min;
            if (!Math.floor(hour / 10))
                hour = '0' + hour;
            $('.timer').text(hour + ':' + min + ':' + sec)
        }, 1000);
    }
}
