var _firstName = document.getElementById("_firstName");
var _lastName = document.getElementById("_lastName");
var _email = document.getElementById("_email");
var _collegeStatus = document.getElementById("_collegeStatus");
var _aadharNumber = document.getElementById("_aadharNumber");
var _phoneNumber = document.getElementById("_phoneNumber");
var _mainEvent = document.getElementById("_mainEvent");
var _SubEvent = document.getElementById("_SubEvent");

jQuery(document).ready(function ($) {
  let timer_id = 0;
  const conft = document.getElementById("__confetti");
  const LetsCelebImage = document.getElementById("__LetsCelebrate");
  const timerContainer = document.querySelector(".timer__container");
  const _Day = document.querySelector(".day");
  const _Hour = document.querySelector(".hour");
  const _Min = document.querySelector(".min");
  const _Sec = document.querySelector(".sec");

  // since we are using the same function for both the timer and the confetti
  if (conft) {
    conft.style.display = "none";
  }

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $("#intro").css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $(".venobox").venobox({
    bgcolor: "",
    overlayColor: "rgba(6, 12, 34, 0.85)",
    closeBackground: "",
    closeColor: "#fff",
  });

  // Initiate superfish on nav menu
  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-fixed")) {
            top_space = top_space - 20;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this).closest("li").addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: { items: 1 },
      768: { items: 3 },
      992: { items: 4 },
      1200: { items: 5 },
    },
  });

  // Buy tickets select the ticket type on click
  $("#buy-ticket-modal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data("ticket-type");
    var modal = $(this);
    modal.find("#ticket-type").val(ticketType);
  });

  // custom code
  const countDown = () => {
    const countDate = new Date("February 23, 2023 00:00:00").getTime();
    // const countDate = new Date("February 07, 2023 15:13:00").getTime();
    const currentTime = new Date().getTime();
    const gap = countDate - currentTime;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    if (currentTime >= countDate) {
      clearInterval(timer_id);
      LetsCelebImage.style.display = "block";
      timerContainer.style.display = "none";

      if (currentTime - countDate <= 5 * 60 * 1000) {
        console.log(conft);
        conft.style.display = "block";

        setTimeout(() => {
          conft.style.height = "0px";
        }, 5000);
      }
      return;
    }

    // since we are using the same timer for multiple elements, we are using the id of the element to get the element and set the value
    // if the element is not present, we are returning from the function
    if (!_Day || !_Hour || !_Min || !_Sec) return;

    //calculating the values for days, hours, minutes and seconds
    let textDay = Math.floor(gap / day);
    let textHour = Math.floor((gap % day) / hour);
    let textMinute = Math.floor((gap % hour) / minute);
    let textSecond = Math.floor((gap % minute) / second);

    textDay = textDay < 10 ? "0" + textDay : textDay;
    textHour = textHour < 10 ? "0" + textHour : textHour;
    textMinute = textMinute < 10 ? "0" + textMinute : textMinute;
    textSecond = textSecond < 10 ? "0" + textSecond : textSecond;

    //setting the values to the timer per second
    _Day.innerText = textDay;
    _Hour.innerText = textHour;
    _Min.innerText = textMinute;
    _Sec.innerText = textSecond;
  };

  timer_id = setInterval(countDown, 1000);
});
