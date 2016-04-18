//Init Form fields
$(document).ready(function () {
	$('.clickme').hide();
	$('.wbf-screen').hide();
	$('.wbf-container').hide();
    var telInput = $("#normalMobile");
    $.get("http://ipinfo.io", function (response) {
        telInput.intlTelInput({
            defaultCountry: response.country.toLowerCase()
        });
    }, "jsonp");
    $('.themeselector').change(function () {
        $('.themeselector option').each(function () {
            $('.wbf-container').removeClass($(this).val());
        });
        $('.wbf-container').addClass($(this).val());
    }).trigger("change");
    $('.clickme').click(function () {
		showNormalPopup();
    });
    $('#normalCallMe').click(function () {
        var _phone = $.trim($("#normalMobile").val()).replace('+', '').replace(' ', '');
        makecall(_phone);
        $('.wbf-container').addClass('connecting');
    });
    $('.wbf-close').click(function () {
        $('.wbf-screen').removeClass('active');
        $('.wbf-container').removeClass('active').delay('400').queue(function () {
            $.dequeue(this);
            clearStatus();
            if (timer) {
                timer = null;
            }
        });
    });
});

var showNormalPopup = function() {
	$('.wbf-screen').addClass('active');
	$('.wbf-container').addClass('active');

}
//Init CTC
var _routeHash='56bd928aa3e24';
Waybeo.CTC.Init({
    hash: '56bd928aa3e24',
	exitIntent: {
		aggressive: true,
		timer: 5,
		trigger: showNormalPopup
	}
});
Waybeo.Utils.getIPCountry(function(l) {
    var _SA = ['US','MX','CA','CU','IN'];
    for(i in _SA) {
       $('.clickme').show();
       $('.wbf-screen').show();
       $('.wbf-container').show();
    }
});
//makeCall
function makecall(_phone) {
    //Initiate CTC Call
    Waybeo.CTC.MakeCall({
        'hash': '56bd928aa3e24',
        'route_hash': _routeHash,
        'callerid_hash': '56bd928aaaa39',
        'contact_number': _phone
    }, eventCallBack);
}

//Form reset
function clearStatus() {
    $('.wbf-container').removeClass('connecting')
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

//Callback handler
var captcha = '', timer = '';
function eventCallBack(event, data) {
    clearStatus();
    switch (event) {
        case 'CAPTCHA':
            captcha = data.code;
            $('.wbf-container').addClass('connecting');
            break;
        case 'ORIGINATE_ERROR':
            $('.wbf-container').addClass('wbf-livemsg-oops');
            break;
        case 'DIALING':
            $('.wbf-container').addClass('connected');
            break;
        case 'VERIFICATION_IN_PROGRESS':
            $('.wbf-container').addClass('verifying');
            $('.wbf-verificationcode').text(captcha);
            break;
        case 'VERIFIED':
            $('.wbf-container').addClass('verification-success');
            setTimeout(function () {
                $('.wbf-container').removeClass('verification-success');
                $('.wbf-container').addClass('in-progress');
            }, 1000);
            setStatusTimer();
            break;
        case 'AGENT_BUSY':
            $('.wbf-container').addClass('agent-busy');
            break;
        case 'INPROGRESS':
            $('.wbf-container').addClass('in-progress');
            setStatusTimer();
            break;
        case 'COMPLETED':
            $('.wbf-container').addClass('completed');
            clearInterval(timer);
            break;
        case 'VALIDATION_ERROR':
            if (data.errorCode && data.errorCode == 902) {
                $('.wbf-formerror').show();
            }
            clearInterval(timer);
            break;
        case 'ORIGINATE_ERROR':
            $('.wbf-container').addClass('oops');
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
