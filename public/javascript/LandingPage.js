$("#landingtable .row .col").hover(function(){
    $(this).css({
        paddingTop: "0px",
        paddingBottom: "10px"
    });
    $(this).find(".wrapper").css({
        background: "rgba(2, 109, 61, 1)"
    })
    $(this).find(".icon i").css({
        transition: "transform 0.6s",
        fontSize: "4em",
        transform: "rotate(360deg)",
        color: "rgba(255, 255, 255, 1)"
    })
    $(this).find("a p").css({
        color: "rgba(255, 255, 255, 1)"
    })
    
}, function(){
    $(this).css({
        paddingTop: "10px",
        paddingBottom: "0px"
    })
    $(this).find(".wrapper").css({
        background: "rgba(0, 155, 86, 1)",
        color: "rgba(255, 255, 255, 0.8)"
    })

    $(this).find(".icon i").css({
        transition: "0s",
        fontSize: "3em",
        transform: "rotate(-360deg)",
        color: "rgba(255, 255, 255, 0.8)"
        
    })
    $(this).find("a p").css({
        color: "rgba(255, 255, 255, 0.7)"
    })
});

var $ul = $('.slideshow');
var $header = $('#landing-header');
var $navbar = $('.navbar');
var $cols = $("#landingtable .row .col");
var video = false;

var $window = $(window);

$window.on('scroll resize', check_if_in_view);

var videoPlay = function() {
  /**
   * Check if video can play, and play it
   */
  $("#my-video").on( "canplay", function() {
      video = true;
      $(this).css("display","block");
      $(this)[0].play();
  });
};

videoPlay();



function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

    var ul_height = $ul.outerHeight();
    var ul_top_position = $ul.offset().top;
    var ul_bottom_position = (ul_top_position + ul_height);
    if(ul_bottom_position-window_top_position<= 0.7*$window.height()){
        if(!video) $navbar.addClass("changeNav1");
        $ul.addClass("changeUl1");
        
    }else {
        if(!video) $navbar.removeClass("changeNav1");
        $ul.removeClass("changeUl1");
    }
    
    if(ul_bottom_position-window_top_position<= 0.45*$window.height()){
        if(!video) $navbar.addClass("changeNav2");
        $ul.addClass("changeUl2");
    }else {
        if(!video) $navbar.removeClass("changeNav2");
        $ul.removeClass("changeUl2");
    }
    
    if(ul_bottom_position-window_top_position<= "70"){
        if(!video) $navbar.addClass("changeNav3");
        $ul.addClass("changeUl3");
    }else {
        if(!video) $navbar.removeClass("changeNav3");
        $ul.removeClass("changeUl3");
    }
};

