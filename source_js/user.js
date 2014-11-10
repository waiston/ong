var wh = window.innerHeight;
var ww = window.innerWidth;

var contentTopPos = [
      $("#concept").offset().top,
      $("#function").offset().top,
      $("#movie").offset().top,
      $("#specs").offset().top,
      $("#download").offset().top
    ];
var isFloatingNaviShown = false;

$(function() {
  
  // --- global-nav, fixed-nav
  $("#fn-title").click(function() { return goInternalLink(0);});
  $("#gn-concept, #fn-concept").click(function() { return goInternalLink(contentTopPos[0]-60);});
  $("#gn-function, #fn-function").click(function() { return goInternalLink(contentTopPos[1]-60); });
  $("#gn-movie, #fn-movie").click(function() { return goInternalLink(contentTopPos[2]-60); });
  $("#gn-specs, #fn-specs").click(function() { return goInternalLink(contentTopPos[3]-60); });
  $("#gn-download, #fn-download").click(function() { return goInternalLink(contentTopPos[4]-60); });
  $("#popup-shade, #popup-close-button").click(function() { closePopupMovie(); });
  $("#popup-movie-link").click(function() { return openPopupMovie(); });

  popupMovieSetup();

  function popupMovieSetup() {
    console.log("ww:"+ww+", wh:"+wh);
    $(".popup-box").css({
      "top": (wh-450)/2,
      "left": (ww-600)/2
    });
  }
  function closePopupMovie() {
    $(".popup-movie").fadeOut(300);
  }
  function openPopupMovie() {
    $(".popup-movie").fadeIn(300);
    return false;
  }

  function goInternalLink(scrlTop) {
    $('html,body').animate({'scrollTop': scrlTop}, {duration: 500});
    return false;
  }

  $(window).scroll(function() {
    scrl = $(this).scrollTop();
    scrollEvent(300);
  });

  function scrollEvent(scrlTime) {
    if(scrl >= contentTopPos[0]-60) {
      if(!isFloatingNaviShown) { showFloatingNavi(); }
    } else {
      if(isFloatingNaviShown) { hideFloatingNavi(); }
    }
  }

  function showFloatingNavi() {
    isFloatingNaviShown = true;
    $("#floating-nav").animate({"top":0},{duration:200});
  }
  function hideFloatingNavi() {
    isFloatingNaviShown = false;
    $("#floating-nav").animate({"top":-62},{duration:200}); 
  }

});
