/**********************

Custom.js
=============

Author:  Gino Aliaj
Template: Hostlink - Web Hosting HTML Template
Version: 1.0

Author URI: gnodesign.com
***************************/


(function ($) {

    "use strict";


    $(window).on('load', function () {
        /*----------------------------------------------------
          LOADING PAGE
        ----------------------------------------------------*/
        var loader = $('.loader');
        
        loader.delay(1000).fadeOut(1000);
        
    }); // end of window load function





    $(document).ready(function () {

        /*----------------------------------------------------
          STICKY HEADER
        ----------------------------------------------------*/

        // Calculating Header Height
        var header = $('header.sticky'),
            headerHeight = header.outerHeight();

        // Applying Header Height to the next Section
        header.next().css({
            'margin-top': headerHeight
        });





        /*----------------------------------------------------
           MENU
         ----------------------------------------------------*/
        var dropdown = $('.dropdown'),
            dropdownSubmenu = $('.dropdown-submenu'),
            dropdown_link = $('.dropdown > a'),
            dropdownSubmenu_link = $('.dropdown-submenu > a');

        if ($(window).width() > 992) {

            // Dropdown Function for all devices > 992px
            $(dropdown).on('mouseenter mouseleave tap', function () {
                $(this).toggleClass("open");
            });

            // Dropdown Submenu Function for all devices > 992px
            $(dropdownSubmenu).on('mouseenter mouseleave tap', function () {
                $(this).toggleClass("open");
            });

        } else {

            // Dropdown Function for all devices < 992px
            $(dropdown_link).on('click', function (e) {
                $(this).parent().siblings().removeClass('open').find('.dropdown-submenu').removeClass('open');
                $(this).parent().toggleClass('open').find('.dropdown-submenu').removeClass('open');
            });

            // Dropdown Submenu Function for all devices < 992px
            $(dropdownSubmenu_link).on('click', function (e) {
                $(this).parent().siblings().removeClass('open');
                $(this).parent().toggleClass('open');
            });

        }

        // If not enough space in right, display the submenu in the left
        function fixPositionSubmenu() {
            var menu = $('#main-nav .navbar-nav .dropdown-menu > .dropdown-submenu > .dropdown-menu');

            menu.each(function (e) {

                var leftPos = $(this).parent().offset().left + $(this).parent().width();
                if (leftPos + $(this).width() > $("body").width()) {
                    $(this).addClass("left");
                } else {
                    $(this).removeClass("left");
                }
            });
        }

        // calling the function
        fixPositionSubmenu();





        /*----------------------------------------------------
           PUSH MENU FOR DEVICES
         ----------------------------------------------------*/

        $.fn.jPushMenu = function (customOptions) {
            var o = $.extend({}, $.fn.jPushMenu.defaultOptions, customOptions);

            /* add class to the body.*/

            $('body').addClass(o.bodyClass);
            $(this).addClass('jPushMenuBtn');
            $(this).on('click', function () {
                var target = '',
                    push_direction = '';


                if ($(this).is('.' + o.showLeftClass)) {
                    target = '.cbp-spmenu-left';
                    push_direction = 'toright';
                } else if ($(this).is('.' + o.showRightClass)) {
                    target = '.cbp-spmenu-right';
                    push_direction = 'toleft';
                } else if ($(this).is('.' + o.showTopClass)) {
                    target = '.cbp-spmenu-top';
                } else if ($(this).is('.' + o.showBottomClass)) {
                    target = '.cbp-spmenu-bottom';
                }


                $(this).toggleClass(o.activeClass);
                $(target).toggleClass(o.menuOpenClass);

                if ($(this).is('.' + o.pushBodyClass)) {
                    $('body').toggleClass('cbp-spmenu-push-' + push_direction);
                }

                /* disable all other button*/
                $('.jPushMenuBtn').not($(this)).toggleClass('disabled');

                return false;
            });
            var jPushMenu = {
                close: function (o) {
                    $('.jPushMenuBtn,body,.cbp-spmenu').removeClass('disabled active cbp-spmenu-open cbp-spmenu-push-toleft cbp-spmenu-push-toright');
                }
            }

            if (o.closeOnClickOutside) {
                $(document).on('click', function () {
                    jPushMenu.close();
                });

                $(document).on('click touchstart', function () {
                    jPushMenu.close();
                });

                $('.cbp-spmenu,.toggle-menu').on('click', function (e) {
                    e.stopPropagation();
                });

                $('.cbp-spmenu,.toggle-menu').on('click touchstart', function (e) {
                    e.stopPropagation();
                });
            }

            // On Click Link
            if (o.closeOnClickLink) {
                $('.cbp-spmenu a').on('click', function () {
                    jPushMenu.close();
                });
            }
        };

        /* in case you want to customize class name,
         *  do not directly edit here, use function parameter when call jPushMenu.
         */
        $.fn.jPushMenu.defaultOptions = {
            bodyClass: 'cbp-spmenu-push',
            activeClass: 'menu-active',
            showLeftClass: 'menu-left',
            showRightClass: 'menu-right',
            showTopClass: 'menu-top',
            showBottomClass: 'menu-bottom',
            menuOpenClass: 'cbp-spmenu-open',
            pushBodyClass: 'push-body',
            closeOnClickOutside: true,
            closeOnClickInside: true,
            closeOnClickLink: false
        };

        //initilizer
        var toggleMenu = $('.toggle-menu');

        $(toggleMenu).jPushMenu({
            closeOnClickLink: true
        });
        
        
        
        
        
        /*----------------------------------------------------
          NAVIGATION SCROLL FOR ONE PAGE
        ----------------------------------------------------*/
        
        var onepage = $('#main-nav .navbar-nav.onepage-nav');
        
        $(onepage).onePageNav({
            currentClass: 'active',
            scrollThreshold: 0.5, // Adjust if Navigation highlights too early or too late
            scrollSpeed: 1000,
            changeHash: true,
            easing: 'easeInOutExpo'
        });




        /*----------------------------------------------------
           BUTTON EFFECT
         ----------------------------------------------------*/
        var button = $('.btn-effect');

        $(button).on('click', function (e) {

            // Remove any old one
            $('.ripple').remove();

            // Setup
            var posX = $(this).offset().left,
                posY = $(this).offset().top,
                buttonWidth = $(this).width(),
                buttonHeight = $(this).height();

            // Add the element
            $(this).prepend("<span class='ripple'></span>");


            // Make it round!
            if (buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }

            // Get the center of the element
            var x = e.pageX - posX - buttonWidth / 2;
            var y = e.pageY - posY - buttonHeight / 2;


            // Add the ripples CSS and start the animation
            $('.ripple').css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
        });






        /*----------------------------------------------------
          MAGNIFIC POP UP
        ----------------------------------------------------*/
        var images_popup = $('.hover-zoom'),
            video_popup = $('.popup-video');

        // pop up for images
        $(images_popup).magnificPopup({
            type: 'image',
            mainClass: 'mfp-fade',
            fixedContentPos: false,

            retina: {
                ratio: 1, // Increase this number to enable retina image support.
                replaceSrc: function (item, ratio) {
                    return item.src.replace(/\.\w+$/, function (m) {
                        return '@2x' + m;
                    });
                }
            },

            zoom: {
                enabled: false, // change to 'false' if you want to disable the zoming effect
                duration: 600, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function
                opener: function (openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }

        });


        // pop up for videos
        $(video_popup).magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',

            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                        index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                        id: 'v=', // String that splits URL in a two parts, second part should be %id%
                        // Or null - full URL will be returned
                        // Or a function that should return %id%, for example:
                        // id: function(url) { return 'parsed id'; }

                        src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }

                    // you may add here more sources

                },

                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            }
        });





        /*----------------------------------------------------
          INITIALIZE COUNT UP
        ----------------------------------------------------*/
        var countup = $('section.countup'),
            counter = $('.counter');
        
        countup.on('inview', function (event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).find(counter).each(function () {
                    var $this = $(this);
                    counter.countTo({
                        speed: 3000,
                        refreshInterval: 50
                    });
                });
                $(this).unbind('inview');
            }
        });





        /*----------------------------------------------------
          INITIALIZE OWL SLIDER
        ----------------------------------------------------*/
        var testimonial = $('.testimonials .owl-carousel'),
            post_thumbnail_slider = $('.post-thumbnail-slider');

        // Initializing Owl Slider for Testimonial Section on the Home Version 1
        $(testimonial).owlCarousel({
            items: 1,
            loop: true,
            nav: false,
            dots: true,
            autoplay: false, // set to "true" if you want to activate autoplay
            autoplaySpeed: 1200,
            
            //Responsive
            responsive: {
                0: {
                    margin: 20,
                    stagePadding: 10,
                },
                479: {
                    margin: 50,
                    stagePadding: 50,
                }
            }
        })


        // Initializing Owl Slider for Blog Post - Thumbnail
        $(post_thumbnail_slider).owlCarousel({
            items: 1,
            loop: true,
            autoplay: false,

            //Navigation
            nav: true,
            dots: false,
            navSpeed: 800,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],

        })





        /*----------------------------------------------------
          BACK TO TOP FUNCTION
        ----------------------------------------------------*/

        // window scroll after the "back to top" button is shown
        var offset = 400;

        // duration of the top scrolling animation (in ms)
        var scroll_top_duration = 600;

        // grab the "back to top" link
        var back_to_top = $('.back-top');


        //hide - show the "back to top" button
        $(window).scroll(function () {
            ($(this).scrollTop() > offset) ? back_to_top.addClass('back-top-visible'): back_to_top.removeClass('back-top-visible');
        });

        //smooth scroll to top
        back_to_top.on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration);
        });





        /*----------------------------------------------------
          MAILCHIMP
        ----------------------------------------------------*/
        var mailChimp = $('.mailchimp');

        $(mailChimp).ajaxChimp({
            callback: mailchimpFunction,
            url: "your-mailchimp-url-here" // <==== Replace this with your own mailchimp list URL.  
        });

        // Mailchimp Callback function
        function mailchimpFunction(resp) {

            if (resp.result === 'success') {
                setTimeout(function () {
                    $("form.mailchimp label").removeClass();
                }, 5000);

            } else if (resp.result === 'error') {
                setTimeout(function () {
                    $("form.mailchimp label").removeClass();
                }, 5000);
            }
        }





        /*----------------------------------------------------
          CONTACT FORM
        ----------------------------------------------------*/
        $("#contact-form").on('submit', function (e) {
            e.preventDefault();

            //Get input field values from HTML form
            var user_name = $("input[name=name]").val();
            var user_email = $("input[name=email]").val();
            var user_phone = $("input[name=phone]").val();
            var user_subject = $("input[name=subject]").val();
            var user_message = $("textarea[name=message]").val();


            //Input validation
            var proceed = true; //Set proceed as true

            //If empty set border colors red
            if (user_name === "") {
                $("input[name=name]").css('border-color', 'red');
                proceed = false;
            }

            if (user_email === "") {
                $("input[name=email]").css('border-color', 'red');
                proceed = false;
            }

            if (user_message === "") {
                $("textarea[name=message]").css('border-color', 'red');
                proceed = false;
            }

            if (user_subject === "") {
                $("input[name=subject]").css('border-color', 'red');
                proceed = false;
            }


            //Everything it's ok...
            if (proceed) {

                //Data to be sent to server
                var post_data;
                var output;
                post_data = {
                    'user_name': user_name,
                    'user_email': user_email,
                    'user_phone': user_phone,
                    'user_subject': user_subject,
                    'user_message': user_message
                };

                //Ajax post data to server
                $.post('php/email.php', post_data, function (response) {

                    //Response server message
                    if (response.type === 'error') {
                        $("#contact-result").addClass('error');
                        output = response.text;

                        // Remove any Class after 5 sec
                        setTimeout(function () {
                            $("#contact-result").removeClass();
                        }, 5000);

                    } else {
                        $("#contact-result").removeClass().addClass('valid');
                        output = response.text;

                        // Remove any Class after 5 sec
                        setTimeout(function () {
                            $("#contact-result").removeClass();
                        }, 5000);

                        // If success clear inputs
                        $("input").val('');
                        $("textarea").val('');
                    }

                    $("#contact-result").html(output);
                }, 'json');

            }
        });

        //Reset border colors
        $("input, textarea").on("change keyup", function (event) {
            $("input, textarea").css('border-color', '');
        });





        /*----------------------------------------------------
          GOOGLE MAP
        ----------------------------------------------------*/
        window.initialize = function () {
            var map;
            var bounds = new google.maps.LatLngBounds();

            // Google map Styles
            var mapOptions = {
                mapTypeId: 'roadmap',
                scrollwheel: false,
                draggable: true,
                styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
            };


            // Display a map on the page
            map = new google.maps.Map(document.getElementById("map"), mapOptions);
            map.setTilt(45);

            // Enter your Company's Latitude & Longtitude to be shown on the map
            var markers = [
                ['Hostlink', 40.710439, -74.005072],
            ];

            // Info Window Content
            var infoWindowContent = [
                ['<div class="info_content">' +
                '<h5>Hostlink</h5>' +
                '<p>Your address here</p>' + '</div>']
            ];

            // Pin Icon
            var pin = 'images/icons/pin.png';

            // Display multiple markers on a map
            var infoWindow = new google.maps.InfoWindow(),
                marker, i;

            // Loop through our array of markers & place each one on the map
            for (i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0],
                    icon: pin
                });

                // Allow each marker to have an info window
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infoWindow.setContent(infoWindowContent[i][0]);
                        infoWindow.open(map, marker);
                    }
                })(marker, i));

                // Automatically center the map fitting all markers on the screen
                map.fitBounds(bounds);
            }

            // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
            var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
                this.setZoom(15);
                google.maps.event.removeListener(boundsListener);
            });

        }





        /*----------------------------------------------------
          FAQ
        ----------------------------------------------------*/
        var topic = $('.topic .open'),
            question = $('.question'),
            liveSearch = $('.live-search-box');

        $(topic).on('click', function () {
            var container = $(this).parents(".topic");
            var answer = container.find(".answer");

            answer.slideToggle(200);

            if (container.hasClass("expanded")) {
                container.removeClass("expanded");
            } else {
                container.addClass("expanded");
            }
        });

        $(question).each(function () {
            $(this).attr('data-search-term', $(this).text().toLowerCase());

        });

        $(liveSearch).on('keyup', function () {
            var searchTerm = $(this).val().toLowerCase();

            $(question).each(function () {
                if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
                    $(this).parent().parent().show();
                } else {
                    $(this).parent().parent().hide();
                }
            });
        });





        /*----------------------------------------------------
          COUNTDOWN FUNCTION
        ----------------------------------------------------*/
        var countdown = $('.countdown');

        $(countdown).countdown({
            date: "30 december 2018 00:00:00",
            format: "on"
        });




        /*----------------------------
         ISOTOPE LISTING
        ------------------------------ */
        var blogMasonry = $('.blog-masonry .blog-grid');

        /* Initializing Isotope */
        $(blogMasonry).isotope({
            // options
            itemSelector: '.element',
            transitionDuration: '0.8s',
        });





        /*----------------------------------------------------
          SKILLBAR
        ----------------------------------------------------*/
        var skills = $('.skills'),
            skill_bar = $('.skillbar'),
            animated_bar = $('.skillbar-bar');

        $(skills).on('inview', function (event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                jQuery(skill_bar).each(function () {
                    jQuery(this).find(animated_bar).animate({
                        width: jQuery(this).attr('data-percent')
                    }, 2500);
                });
                $(this).unbind('inview');
            }
        });





        /*----------------------------
         GOOGLE ANALYTICS
        ------------------------------ */
        // Asynchronously Load Google Analytics Script on all pages

        var script = document.createElement('script');
        script.src = "js/google-analytics.js";
        document.body.appendChild(script);



    }); //end of document ready function

})(jQuery);