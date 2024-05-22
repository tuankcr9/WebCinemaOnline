// When the user scrolls down 20px from the top of the document, show the button
				window.onscroll = function () {
					scrollFunction()
				};

				function scrollFunction() {
					if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
						document.getElementById("movetop").style.display = "block";
					} else {
						document.getElementById("movetop").style.display = "none";
					}
				}

				// When the user clicks on the button, scroll to the top of the document
				function topFunction() {
					document.body.scrollTop = 0;
					document.documentElement.scrollTop = 0;
				}

                $(document).ready(function () {
                    //Horizontal Tab
                    $('#parentHorizontalTab').easyResponsiveTabs({
                        type: 'default', //Types: default, vertical, accordion
                        width: 'auto', //auto or any width like 600px
                        fit: true, // 100% fit in a container
                        tabidentify: 'hor_1', // The tab groups identifier
                        activate: function (event) { // Callback function if tab is switched
                            var $tab = $(this);
                            var $info = $('#nested-tabInfo');
                            var $name = $('span', $info);
                            $name.text($tab.text());
                            $info.show();
                        }
                    });

                    $('.owl-one').owlCarousel({
                        stagePadding: 280,
                        loop: true,
                        margin: 20,
                        nav: true,
                        responsiveClass: true,
                        autoplay: true,
                        autoplayTimeout: 5000,
                        autoplaySpeed: 1000,
                        autoplayHoverPause: false,
                        responsive: {
                            0: {
                                items: 1,
                                stagePadding: 40,
                                nav: false
                            },
                            480: {
                                items: 1,
                                stagePadding: 60,
                                nav: true
                            },
                            667: {
                                items: 1,
                                stagePadding: 80,
                                nav: true
                            },
                            1000: {
                                items: 1,
                                nav: true
                            }
                        }
                    })

                    $('.owl-three').owlCarousel({
                        loop: true,
                        margin: 20,
                        nav: false,
                        responsiveClass: true,
                        autoplay: true,
                        autoplayTimeout: 5000,
                        autoplaySpeed: 1000,
                        autoplayHoverPause: false,
                        responsive: {
                            0: {
                                items: 2,
                                nav: false
                            },
                            480: {
                                items: 2,
                                nav: true
                            },
                            667: {
                                items: 3,
                                nav: true
                            },
                            1000: {
                                items: 5,
                                nav: true
                            }
                        }
                    })
                    //script for banner slider
                    $('.owl-mid').owlCarousel({
                        loop: true,
                        margin: 0,
                        nav: false,
                        responsiveClass: true,
                        autoplay: true,
                        autoplayTimeout: 5000,
                        autoplaySpeed: 1000,
                        autoplayHoverPause: false,
                        responsive: {
                            0: {
                                items: 1,
                                nav: false
                            },
                            480: {
                                items: 1,
                                nav: false
                            },
                            667: {
                                items: 1,
                                nav: true
                            },
                            1000: {
                                items: 1,
                                nav: true
                            }
                        }
                    })

                    //script for owlcarousel
                    $('.popup-with-zoom-anim').magnificPopup({
                        type: 'inline',
            
                        fixedContentPos: false,
                        fixedBgPos: true,
            
                        overflowY: 'auto',
            
                        closeBtnInside: true,
                        preloader: false,
            
                        midClick: true,
                        removalDelay: 300,
                        mainClass: 'my-mfp-zoom-in'
                    });
            
                    $('.popup-with-move-anim').magnificPopup({
                        type: 'inline',
            
                        fixedContentPos: false,
                        fixedBgPos: true,
            
                        overflowY: 'auto',
            
                        closeBtnInside: true,
                        preloader: false,
            
                        midClick: true,
                        removalDelay: 300,
                        mainClass: 'my-mfp-slide-bottom'
                    });

                    //disable body scroll which navbar is in active
                    $(function () {
                        $('.navbar-toggler').click(function () {
                            $('body').toggleClass('noscroll');
                        })
                    });

                    var scroll = $(window).scrollTop();

                    if (scroll >= 80) {
                        $("#site-header").addClass("nav-fixed");
                    } else {
                        $("#site-header").removeClass("nav-fixed");
                    }

                    $(window).on("scroll", function () {
                        var scroll = $(window).scrollTop();
                
                        if (scroll >= 80) {
                            $("#site-header").addClass("nav-fixed");
                        } else {
                            $("#site-header").removeClass("nav-fixed");
                        }
                    });
                
                    //Main navigation Active Class Add Remove
                    $(".navbar-toggler").on("click", function () {
                        $("header").toggleClass("active");
                    });

                    if ($(window).width() > 991) {
                        $("header").removeClass("active");
                    }
                    $(window).on("resize", function () {
                        if ($(window).width() > 991) {
                            $("header").removeClass("active");
                        }
                    });
                });

                // $('.dropdown-hover').hover(
                //     function() {
                //         $(this).addClass('show');
                //         $(this).find('.dropdown-menu').addClass('show');
                //     },
                //     function() {
                //         $(this).removeClass('show');
                //         $(this).find('.dropdown-menu').removeClass('show');
                //     }
                // );

                $(document).ready(function() {
                    $('.nav-item.dropdown.dropdown-hover').hover(
                      function() {
                        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(0);
                      }, 
                      function() {
                        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(0);
                      }
                    );
                  });

               
