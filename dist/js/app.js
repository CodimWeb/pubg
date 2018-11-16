$(document).ready(function(){

    $('[data-toggle="slide-collapse"]').on('click', function() {
        
       $('.navbar-collapse').animate({
            'width': 'toggle'
        }, 258);
    });

// $("#toplivedrop").dragend("left");

// Select
$('#single_select').multiselect({
    templates: {
        li: '<li><a href="javascript:void(0);"><label class="pl-2"></label></a></li>'
    },
    buttonClass: 'btn btn-outline-primary',
    selectedClass: 'bg-light',
    onInitialized: function(select, container) {
        // hide radio
        container.find('input[type=radio]').addClass('d-none');
    }
});

$( ".dropdown-menu-head" ).click(function(e) {
    e.preventDefault();
    $( ".header__menu .dropdown-menu" ).addClass('show');
    $( this ).click(function(e) {
        $( ".header__menu .dropdown-menu" ).removeClass('show');
    });
});
$( ".dropdown-menu-head" ).click(function(e) {
    e.preventDefault();
    $( ".header__menu .dropdown-menu" ).addClass('show');
    $( this ).click(function(e) {
        $( ".header__menu .dropdown-menu" ).removeClass('show');
    });
});

// Info Coin Case
$( ".coin__case-info, .bonus-info" ).click(function(e) {
    e.preventDefault();
  $( ".bonus-info__content" ).slideToggle( "slow" );
});

// Carousel
$('#main-slider').carousel({
  interval: 5000,
  swipe: 30
});

$('#reviews-slider').carousel({
  interval: false,
  swipe: 30
});

// Back to top
	$(window).scroll(function () {
	      if ($(this).scrollTop() > 50) {
	          $('#back-to-top').fadeIn();
	      } else {
	          $('#back-to-top').fadeOut();
	      }
	  });
	  $('#back-to-top').click(function () {
	      // $('#back-to-top').tooltip('hide');
	      $('body,html').animate({
	          scrollTop: 0
	      }, 800);
	      return false;
	  });
	  // $('#back-to-top').tooltip('show');


// Header banner Fixed
    $(window).scroll(function () {
          if ($(this).scrollTop() > 50) {
              $('.header__banner').css('top', 130);
          } else {
              $('.header__banner').css('top',   210);
          }
      });

/* Crop long text*/
$("#reviews-slider .name, .casewin .name").text(function(i, text) {

  if (text.length >= 22) {
    text = text.substring(0, 22);
    var lastIndex = text.lastIndexOf(" ");       // позиция последнего пробела
    text = text.substring(0, 22) + ' ...'; // обрезаем до последнего слова
  }
  
  $(this).text(text);
  
});
    /* Crop long text*/
    $(".header__profile-username ").text(function(i, text) {

        if (text.length >= 10) {
            text = text.substring(0, 10);
            var lastIndex = text.lastIndexOf(" ");       // позиция последнего пробела
            text = text.substring(0, 10) + '...'; // обрезаем до последнего слова
        }

        $(this).text(text);

    });
	 
// case Page responsive
if ($(window).width() < 1300) {
    var scrollerHeight = $('.card-case').height() + 40;
    $('.case-wrap #scrollerContainer').css('top', scrollerHeight );
    $('.case-wrap .btns__opencase').css('margin-top', 260 );
}
else {
    $('.case-wrap #scrollerContainer').css('top', 0 );
    $('.case-wrap .btns__opencase').css('margin-top', 0 );
}

$(window).resize(function() {
    if ($(window).width() < 1300) {
        var scrollerHeight = $('.card-case').height() + 40;
        $('.case-wrap #scrollerContainer').css('top', scrollerHeight );
        $('.case-wrap .btns__opencase').css('margin-top', 260 );

    }
    else {
        $('.case-wrap #scrollerContainer').css('top', 0 );
        $('.case-wrap .btns__opencase').css('margin-top', 0 );
    }
});

// Pay
	$('#pay .paybag__pay').click(function () {
        window.location.href = '/payment/pay?sum=' + $('#paysum').val();
        var url = location.href;
        var paycase = $(this).attr('data-case');
        setCookie('paycase', paycase, 1800);
        setCookie('payurl', url, 1800);
        $("#paysum").val(500);
    });
    
    $(".paybag__promocode-active").hide();
    $(".paybag__promocode-activated").hide();
    $(".paybag__promocode-inactive .promoinact").click(function( event ) {
        event.preventDefault();
         $(".paybag__promocode-inactive").hide();
         $(".paybag__promocode-active").css('display', 'flex');
     });

    $(".paybag__promocode-activated .promoactivated").click(function( event ) {
        event.preventDefault();
        $(".paybag__promocode-activated").hide();            
        $(".paybag__promocode-active").css('display', 'flex');
    });

    $("#paysum").keyup(function () {
		var paysum = $(this).val();
        var tasty_promo_test = ($("#bpercent").val() * paysum / 100).toFixed(0);
        $('#paybag__get-promo').html(tasty_promo_test);
        var bonus = 0;

		if (paysum >= 5000 )
            bonus = ($('#paysum').val() * 15) /100;
        else if (paysum >= 3000 )
            bonus = ($('#paysum').val() * 10) /100;
        else if (paysum >= 1000)
            bonus = ($('#paysum').val() * 5) /100;
        
		$('#payget').html( (parseFloat(bonus) + parseFloat(paysum) + parseFloat(tasty_promo_test)).toFixed(0));  
        $('#paybag__get-bonus').html( bonus.toFixed(0) );
        
    });

    $('.menu1 .refilla').click(function () {
       window.location.href = '/payment/pay?sum=' + $('#paysum').val();
        var url = location.href;
        var paycase = $(this).attr('data-case');
        setCookie('paycase', paycase, 1800);
        setCookie('payurl', url, 1800);
    });
    $('#pay .paybag__skins').click(function () {
        window.location.href = '/payment/sp';
    });
    $('.skins .payskin').click(function () {
        window.location.href = '/payment/sp';
    });


/* Items Tabs */
!function ($) {

    "use strict";

    // TABCOLLAPSE CLASS DEFINITION
    // ======================

    var TabCollapse = function (el, options) {
        this.options   = options;
        this.$tabs  = $(el);

        this._accordionVisible = false; //content is attached to tabs at first
        this._initAccordion();
        this._checkStateOnResize();


        // checkState() has gone to setTimeout for making it possible to attach listeners to
        // shown-accordion.bs.tabcollapse event on page load.
        // See https://github.com/flatlogic/bootstrap-tabcollapse/issues/23
        var that = this;
        setTimeout(function() {
          that.checkState();
        }, 0);
    };

    TabCollapse.DEFAULTS = {
        accordionClass: 'visible-xs',
        tabsClass: 'hidden-xs',
        accordionTemplate: function(heading, groupId, parentId, active) {
            return  '<div class="panel panel-default">' +
                    '   <div class="panel-heading">' +
                    '      <h4 class="panel-title">' +
                    '      </h4>' +
                    '   </div>' +
                    '   <div id="' + groupId + '" class="panel-collapse collapse ' + (active ? 'in' : '') + '">' +
                    '       <div class="panel-body js-tabcollapse-panel-body">' +
                    '       </div>' +
                    '   </div>' +
                    '</div>'

        }
    };

    TabCollapse.prototype.checkState = function(){
        if (this.$tabs.is(':visible') && this._accordionVisible){
            this.showTabs();
            this._accordionVisible = false;
        } else if (this.$accordion.is(':visible') && !this._accordionVisible){
            this.showAccordion();
            this._accordionVisible = true;
        }
    };

    TabCollapse.prototype.showTabs = function(){
        var view = this;
        this.$tabs.trigger($.Event('show-tabs.bs.tabcollapse'));

        var $panelHeadings = this.$accordion.find('.js-tabcollapse-panel-heading').detach();

        $panelHeadings.each(function() {
            var $panelHeading = $(this),
            $parentLi = $panelHeading.data('bs.tabcollapse.parentLi');

            var $oldHeading = view._panelHeadingToTabHeading($panelHeading);

            $parentLi.removeClass('active');
            if ($parentLi.parent().hasClass('dropdown-menu') && !$parentLi.siblings('li').hasClass('active')) {
                $parentLi.parent().parent().removeClass('active');
            }

            if (!$oldHeading.hasClass('collapsed')) {
                $parentLi.addClass('active');
                if ($parentLi.parent().hasClass('dropdown-menu')) {
                    $parentLi.parent().parent().addClass('active');
                }
            } else {
                $oldHeading.removeClass('collapsed');
            }

            $parentLi.append($panelHeading);
        });

        if (!$('li').hasClass('active')) {
            $('li').first().addClass('active')
        }

        var $panelBodies = this.$accordion.find('.js-tabcollapse-panel-body');
        $panelBodies.each(function(){
            var $panelBody = $(this),
                $tabPane = $panelBody.data('bs.tabcollapse.tabpane');
            $tabPane.append($panelBody.contents().detach());
        });
        this.$accordion.html('');

        if(this.options.updateLinks) {
            var $tabContents = this.getTabContentElement();
            $tabContents.find('[data-toggle-was="tab"], [data-toggle-was="pill"]').each(function() {
                var $el = $(this);
                var href = $el.attr('href').replace(/-collapse$/g, '');
                $el.attr({
                    'data-toggle': $el.attr('data-toggle-was'),
                    'data-toggle-was': '',
                    'data-parent': '',
                    href: href
                });
            });
        }

        this.$tabs.trigger($.Event('shown-tabs.bs.tabcollapse'));
    };

    TabCollapse.prototype.getTabContentElement = function(){
        var $tabContents = $(this.options.tabContentSelector);
        if($tabContents.length === 0) {
            $tabContents = this.$tabs.siblings('.tab-content');
        }
        return $tabContents;
    };

    TabCollapse.prototype.showAccordion = function(){
        this.$tabs.trigger($.Event('show-accordion.bs.tabcollapse'));

        var $headings = this.$tabs.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]'),
            view = this;
        $headings.each(function(){
            var $heading = $(this),
                $parentLi = $heading.parent();
            $heading.data('bs.tabcollapse.parentLi', $parentLi);
            view.$accordion.append(view._createAccordionGroup(view.$accordion.attr('id'), $heading.detach()));
        });

        if(this.options.updateLinks) {
            var parentId = this.$accordion.attr('id');
            var $selector = this.$accordion.find('.js-tabcollapse-panel-body');
            $selector.find('[data-toggle="tab"], [data-toggle="pill"]').each(function() {
                var $el = $(this);
                var href = $el.attr('href') + '-collapse';
                $el.attr({
                    'data-toggle-was': $el.attr('data-toggle'),
                    'data-toggle': 'collapse',
                    'data-parent': '#' + parentId,
                    href: href
                });
            });
        }

        this.$tabs.trigger($.Event('shown-accordion.bs.tabcollapse'));
    };

    TabCollapse.prototype._panelHeadingToTabHeading = function($heading) {
        var href = $heading.attr('href').replace(/-collapse$/g, '');
        $heading.attr({
            'data-toggle': 'tab',
            'href': href,
            'data-parent': ''
        });
        return $heading;
    };

    TabCollapse.prototype._tabHeadingToPanelHeading = function($heading, groupId, parentId, active) {
        $heading.addClass('js-tabcollapse-panel-heading ' + (active ? '' : 'collapsed'));
        $heading.attr({
            'data-toggle': 'collapse',
            'data-parent': '#' + parentId,
            'href': '#' + groupId
        });
        return $heading;
    };

    TabCollapse.prototype._checkStateOnResize = function(){
        var view = this;
        $(window).resize(function(){
            clearTimeout(view._resizeTimeout);
            view._resizeTimeout = setTimeout(function(){
                view.checkState();
            }, 100);
        });
    };


    TabCollapse.prototype._initAccordion = function(){
        var randomString = function() {
            var result = "",
                possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ ) {
                result += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return result;
        };

        var srcId = this.$tabs.attr('id'),
            accordionId = (srcId ? srcId : randomString()) + '-accordion';

        this.$accordion = $('<div class="panel-group ' + this.options.accordionClass + '" id="' + accordionId +'"></div>');
        this.$tabs.after(this.$accordion);
        this.$tabs.addClass(this.options.tabsClass);
        this.getTabContentElement().addClass(this.options.tabsClass);
    };

    TabCollapse.prototype._createAccordionGroup = function(parentId, $heading){
        var tabSelector = $heading.attr('data-target'),
            active = $heading.data('bs.tabcollapse.parentLi').is('.active');

        if (!tabSelector) {
            tabSelector = $heading.attr('href');
            tabSelector = tabSelector && tabSelector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
        }

        var $tabPane = $(tabSelector),
            groupId = $tabPane.attr('id') + '-collapse',
            $panel = $(this.options.accordionTemplate($heading, groupId, parentId, active));
        $panel.find('.panel-heading > .panel-title').append(this._tabHeadingToPanelHeading($heading, groupId, parentId, active));
        $panel.find('.panel-body').append($tabPane.contents().detach())
            .data('bs.tabcollapse.tabpane', $tabPane);

        return $panel;
    };



    // TABCOLLAPSE PLUGIN DEFINITION
    // =======================

    $.fn.tabCollapse = function (option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bs.tabcollapse');
            var options = $.extend({}, TabCollapse.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) $this.data('bs.tabcollapse', new TabCollapse(this, options));
        });
    };

    $.fn.tabCollapse.Constructor = TabCollapse;


}(window.jQuery);


$('#profile__item-tabs').tabCollapse();


      $(function() {

        function Toast(type, css, msg) {
            this.type = type;
            this.css = css;
            this.msg = 'This is positioned in the ' + msg + '. You can also style the icon any way you like.';
        }

        var toasts = [
            new Toast('error', 'toast-bottom-full-width', 'This is positioned in the bottom full width. You can also style the icon any way you like.'),
            new Toast('info', 'toast-top-full-width', 'top full width'),
            new Toast('warning', 'toast-top-left', 'This is positioned in the top left. You can also style the icon any way you like.'),
            new Toast('success', 'toast-top-right', 'top right'),
            new Toast('warning', 'toast-bottom-right', 'bottom right'),
            new Toast('error', 'toast-bottom-left', 'bottom left')
        ];

        toastr.options.positionClass = 'toast-top-full-width';
        toastr.options.extendedTimeOut = 0; //1000;
        toastr.options.timeOut = 1000;
        toastr.options.fadeOut = 250;
        toastr.options.fadeIn = 250;

        var i = 0;

        $('#tryMe').click(function () {
            $('#tryMe').prop('disabled', true);
            delayToasts();
        });

        function delayToasts() {
            if (i === toasts.length) { return; }
            var delay = i === 0 ? 0 : 2100;
            window.setTimeout(function () { showToast(); }, delay);

            // re-enable the button        
            if (i === toasts.length-1) {
                window.setTimeout(function () {
                    $('#tryMe').prop('disabled', false);
                    i = 0;
                }, delay + 1000);
            }
        }

        function showToast() {
            var t = toasts[i];
            toastr.options.positionClass = t.css;
            toastr[t.type](t.msg);
            i++;
            delayToasts();
        }
    })

// Send Gift friends
$('#btn-gift').click(function () {
    $('.send-gift__content').show();
    $('.casewin__review').hide();
    $('.casewin__btns-sell').hide();
    $('.try-again').hide();
});
$('#gift-sendfoff').click(function () {
    $('.send-gift__content').hide();
    $('.casewin__review').show();
    $('.casewin__btns-sell').show();
    $('.try-again').show();
});

/* Menu */
window.onresize = navigationResize;
navigationResize();

    function navigationResize() {
      $('.header__menu-responsive li.more').before($('#overflow > li'));

     var headerResult;
     if ($(window).width() < 1533 ) {
        headerResult = $(window).width() - ($('.header__banner').width() + $('.header__profile').width() + $('.logo').width() + 200);
     } 
     else if  ($(window).width() < 1460) {
        headerResult = $(window).width() - ($('.header__banner').width() + $('.header__profile').width() + $('.logo').width() + 32);        
     } 
     else {
        headerResult = $(window).width() - ($('.header__banner').width() + $('.header__profile').width() + $('.logo').width() + 480);        
     }

      var $navItemMore = $('.header__menu-responsive > li.more'),
          $navItems = $('.header__menu-responsive > li:not(.more)'),
          navItemMoreWidth = navItemWidth = $navItemMore.width(),
          headerWidth = headerResult,
          navItemMoreLeft, offset, navOverflowWidth

      $navItems.each(function() {
        navItemWidth += $(this).width();
      });



      navItemWidth > headerWidth ? $navItemMore.show() : $navItemMore.hide();

    var count = 0;

      while (navItemWidth > headerWidth) {
        count++;
        navItemWidth -= $navItems.last().width();
        $navItems.last().prependTo('#overflow');
        $navItems.splice(-1,1);
        if($navItems.length < 4) {
           break;
        }
      }

      // navItemMoreLeft = $('.header__menu-responsive .more').offset().left;
      navOverflowWidth = $('#overflow').width();
      offset = navItemMoreLeft + navItemMoreWidth - navOverflowWidth;

      // $('#overflow').css({
      //   'left': $navItems.length
      // });
    }

// Header banner Fixed

$(window).resize(function() {
    if ($(window).width() < 992) {
        $('.header__menu').removeClass('header__menu-responsive');
        $('.header__menu .more').css('display', 'none');
    } else {
        $('.header__menu').addClass('header__menu-responsive');
    }
});

var historyImgW = $('.item-history img').width();
$('.item-history rarity').css('min-width', historyImgW)


// if ($(window).width() < 1024) {
//     $('.header__banner').remove();
//     $( "main" ).append( $( ".header__banner" ) );
// } 
// else {
//     $( "header" ).append( $( ".header__banner" ) );
// }
});