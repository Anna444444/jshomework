$(document).ready(function() {
    var leftBlockVisible = true;
  
    $('.arrow').click(function() {
      if (leftBlockVisible) {
        $('.left-block').animate({ width: '0' }, 300);
        $(this).toggleClass('arrow-right arrow-left');
      } else {
        $('.left-block').animate({ width: '100%' }, 300);
        $(this).toggleClass('arrow-right arrow-left');
      }
      leftBlockVisible = !leftBlockVisible;
    });
  
    var containerHeight = $('.display').height();
    var minBlockHeight = 100;
    var sliderDragging = false;
    var prevY;
  
    $('.slider').mousedown(function(e) {
      e.preventDefault();
      sliderDragging = true;
      prevY = e.pageY;
    });
  
    $(document).mousemove(function(e) {
      if (sliderDragging) {
        var deltaY = e.pageY - prevY;
        var upperBlockHeight = $('.upper-block').height();
        var lowerBlockHeight = $('.lower-block').height();
        var rightBlockHeight = $('.right-block').height();
        var leftBlockHeight = $('.left-block').height();
  
        if (upperBlockHeight + deltaY >= minBlockHeight && lowerBlockHeight - deltaY >= minBlockHeight) {
          $('.upper-block').height(upperBlockHeight + deltaY);
          $('.lower-block').height(lowerBlockHeight - deltaY);
          $('.right-block').height(rightBlockHeight + deltaY);
          $('.left-block').height(leftBlockHeight - deltaY);
          prevY = e.pageY;
        }
      }
    });
  
    $(document).mouseup(function() {
      sliderDragging = false;
    });
  });
  