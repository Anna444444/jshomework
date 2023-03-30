let moveBall = (ev) => {
	let ball = document.getElementById('ball');

	let newX = ev.clientX - ball.width/2;
	let newY = ev.clientY - ball.height/2;


	ball.style.top = newY+'px';
	ball.style.left = newX+'px';
}

// let player1 = (ev) => {
// 	let player1 = document.getElementById('football1');

// 	let newX = ev.clientX - player1.width/2;
// 	let newY = ev.clientY - player1.height/2;


// 	player1.style.top = newY+'px';
// 	player1.style.left = newX+'px';
// }

let field = document.getElementById('field');
field.ondragstart = (ev) => ev.preventDefault();

field.onclick = moveBall;
// field.onclick = player1;


// function movePlayer1(e){
     
//     var player1 = document.getElementById("football1");
//     var cs = window.getComputedStyle(player1);
     
//     var left = parseInt(cs.marginLeft);
//     var top = parseInt(cs.marginTop);
     
//     switch(e.key){
// 		case "ArrowLeft":  // если нажата клавиша влево
//         if(left>-244)
//         player1.style.marginLeft = left - 150 + "px";
//         break;
//         case "ArrowUp":   // если нажата клавиша вверх
//         if(top >- 450)
//         player1.style.marginTop = top - 150 + "px";
//         break;
//         case "ArrowRight":   // если нажата клавиша вправо
//         // alert(left)
//         if(left < 1400)
//         player1.style.marginLeft = left + 200 + "px";
//         break;
//         case "ArrowDown":   // если нажата клавиша вниз
//             if(top < 450)
//                 player1.style.marginTop = top + 150 + "px";
//             break;
//     }
// }


// function movePlayer2(e){
     
//     var player2 = document.getElementById("football2");
//     // получаем стиль для blueRect
//     var cs = window.getComputedStyle(player2);
     
//     var left = parseInt(cs.marginLeft);
//     var top = parseInt(cs.marginTop);
//     // alert(e.key)
//     switch(e.key){
// 		case "a": 
//         if (left > 50)
//         // если нажата клавиша влево
//         player2.style.marginLeft = left - 50 + "px";
//         break;
//         case "w": 
//         // если нажата клавиша вверх
//         player2.style.marginTop = top - 50 + "px";
//         break;
//         case "d":   // если нажата клавиша вправо
//         player2.style.marginLeft = left + 50 + "px";
//         break;
//         case "s":  // если нажата клавиша вниз
//             // alert(top)
//             // if (top > - 100)
//                 player2.style.marginTop = top + 50 + "px";
//             break;
//     }
// }



 
// addEventListener("keydown", movePlayer1);
// addEventListener("keydown", movePlayer2);

