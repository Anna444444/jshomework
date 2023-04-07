let ball = document.getElementById("ball");
let player1 = document.getElementById("football1");
let player2 = document.getElementById("football2");

function handleCollisions() {
    if (ball.offsetLeft + ball.clientWidth > player1.offsetLeft && ball.offsetLeft < player1.offsetLeft + player1.clientWidth && ball.offsetTop + ball.clientHeight > player1.offsetTop && ball.offsetTop < player1.offsetTop + player1.clientHeight) {
      let ballCenterX = ball.offsetLeft + ball.clientWidth / 2;
      let ballCenterY = ball.offsetTop + ball.clientHeight / 2;
      let playerCenterX = player1.offsetLeft + player1.clientWidth / 2;
      let playerCenterY = player1.offsetTop + player1.clientHeight / 2;
      let dx = ballCenterX - playerCenterX;
      let dy = ballCenterY - playerCenterY;
      let angle = Math.atan2(dy, dx);
      const farce = 200;
      ball.style.left = (playerCenterX + Math.cos(angle) * farce - ball.clientWidth / 2) + "px";
      ball.style.top = (playerCenterY + Math.sin(angle) * farce - ball.clientHeight / 2) + "px";
    }
    if (ball.offsetLeft + ball.clientWidth > player2.offsetLeft && ball.offsetLeft < player2.offsetLeft + player2.clientWidth && ball.offsetTop + ball.clientHeight > player2.offsetTop && ball.offsetTop < player2.offsetTop + player2.clientHeight) {
      let ballCenterX = ball.offsetLeft + ball.clientWidth / 2;
      let ballCenterY = ball.offsetTop + ball.clientHeight / 2;
      let playerCenterX = player2.offsetLeft + player2.clientWidth / 2;
      let playerCenterY = player2.offsetTop + player2.clientHeight / 2;
      let dx = ballCenterX - playerCenterX;
      let dy = ballCenterY - playerCenterY;
      let angle = Math.atan2(dy, dx);
      const farce = 200;
      ball.style.left = (playerCenterX + Math.cos(angle) * farce - ball.clientWidth / 2) + "px";
      ball.style.top = (playerCenterY + Math.sin(angle) * farce - ball.clientHeight / 2) + "px";
    }
  }

function update() {
  handleCollisions();
}

function animate() {
  update();
  requestAnimationFrame(animate);
}

animate();

let moveBall = (ev) => {
	let ball = document.getElementById('ball');

	let newX = ev.clientX - ball.width/2;
	let newY = ev.clientY - ball.height/2;

	ball.style.top = newY+'px';
	ball.style.left = newX+'px';
}

function movePlayer1(e){
    const screenHeight = window.screen.height 
    var player1 = document.getElementById("football1");
    var cs = window.getComputedStyle(player1);
    // alert(screenHeight)
    var left = parseInt(cs.marginLeft);
    var top = parseInt(cs.marginTop);
    // var bottom = parseInt(cs.marginBottom); 

    switch(e.key){
		case "ArrowLeft":
        if(left>-244)
        player1.style.marginLeft = left - 50 + "px";
        break;
        case "ArrowUp":
        if(top >- 450)
        player1.style.marginTop = top - 50 + "px";
        break;
        case "ArrowRight":
        // alert(left)
        if(left < 1400)
        player1.style.marginLeft = left + 50 + "px";
        break;
        case "ArrowDown":
            // if(top <= screenHeight)
                player1.style.marginTop = top + 50 + "px";
            break;
    }
}

function movePlayer2(e){
     
    var player2 = document.getElementById("football2");
    var cs = window.getComputedStyle(player2);
    var left = parseInt(cs.marginLeft);
    var top = parseInt(cs.marginTop);
    // alert(e.key)
    switch(e.key){
		case "a": 
        if (left > 50)
        player2.style.marginLeft = left - 50 + "px";
        break;
        case "w": 
        player2.style.marginTop = top - 50 + "px";
        break;
        case "d":
        player2.style.marginLeft = left + 50 + "px";
        break;
        case "s":
            // alert(top)
            // if (top > - 100)
                player2.style.marginTop = top + 50 + "px";
            break;
    }
}

let field = document.getElementById('field');
field.ondragstart = (ev) => ev.preventDefault();

field.onclick = moveBall;
addEventListener("keydown", movePlayer1);
addEventListener("keydown", movePlayer2);