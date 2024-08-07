window.addEventListener('scroll', function () {
  var scrollMessage = document.getElementById('scrollMessage');
  scrollMessage.style.opacity = '0';
});


$(window).scroll(function () {
  var winScroll = $(this).scrollTop();
  // console.log(winScroll);
  $('.bg').css({
    'transform': 'translate(0,' + winScroll / 14 + '%)'
  });
  $('.bg2').css({
    'transform': 'translate(0,' + winScroll / 20 + '%)'
  });
  $('.bg3').css({
    'transform': 'translate(0,' + winScroll / 35 + '%)'
  });
  $('.bg4').css({
    'transform': 'translate(0,' + winScroll / 70 + '%)'
  });
  $('.bg5').css({
    'transform': 'translate(0,' + winScroll / 700 + '%)'
  });
});

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

