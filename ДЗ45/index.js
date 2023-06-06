$(document).ready(function() {
    let leftBlockVisible = true;
  
    $('#arrow-left').click(function() {
      let cont1 = $('.cont1');
      let arrow = $(this);
      if (leftBlockVisible) {
        cont1.animate({ width: '0%' }, 300);
        arrow.toggleClass('arrow-right arrow-left');
      } else {
        cont1.animate({ width: '28%' }, 300);
        arrow.toggleClass('arrow-right arrow-left');
      }
      leftBlockVisible = !leftBlockVisible;
    });
  
    const minBlockHeight = 100;
    let sliderFirstDragging = false;
    let sliderSecondDragging = false;
    let prevY;
  
    function handleMouseDown(e) {
      e.preventDefault();
      let slider = $(this);
      prevY = e.pageY;
      if (slider.hasClass('linear1')) {
        sliderFirstDragging = true;
      } else if (slider.hasClass('linear2')) {
        sliderSecondDragging = true;
      }
    }
  
    function handleMouseMove(e) {
      if (sliderFirstDragging) {
        let deltaY = e.pageY - prevY;
        let box3 = $('.box3');
        let box4 = $('.box4');
        let upperBlockHeight = box3.height();
        let lowerBlockHeight = box4.height();
  
        if (upperBlockHeight + deltaY >= minBlockHeight && lowerBlockHeight - deltaY >= minBlockHeight) {
          box3.height(upperBlockHeight + deltaY);
          box4.height(lowerBlockHeight - deltaY);
          prevY = e.pageY;
        }
      } else if (sliderSecondDragging) {
        let deltaY = e.pageY - prevY;
        let box1 = $('.box1');
        let box2 = $('.box2');
        let rightBlockHeight = box2.height();
        let leftBlockHeight = box1.height();
  
        if (leftBlockHeight + deltaY >= minBlockHeight && rightBlockHeight - deltaY >= minBlockHeight) {
          box1.height(leftBlockHeight + deltaY);
          box2.height(rightBlockHeight - deltaY);
          prevY = e.pageY;
        }
      }
    }
  
    function handleMouseUp() {
      sliderFirstDragging = false;
      sliderSecondDragging = false;
    }
  
    $('.linear1, .linear2').mousedown(handleMouseDown);
    $(document).mousemove(handleMouseMove);
    $(document).mouseup(handleMouseUp);
  });
  