const backgroundCanvas = document.getElementById('background');
backgroundCanvas.width = window.innerWidth-5;
backgroundCanvas.height = window.innerHeight-5;

const gameplayCanvas = document.getElementById('gameplay');
gameplayCanvas.width = window.innerWidth-5;
gameplayCanvas.height = window.innerHeight-5;


const backgroundLayer = new Layer(backgroundCanvas);
const gameplayLayer   = new Layer(gameplayCanvas);


const background = new StaticSprite(backgroundLayer, './resources/backg.jpg');
setTimeout( () => background.show(0,0), 20 );



let player = new Player(gameplayLayer, './resources/char_95x159.png', 95, 159);
gameplayLayer.add(player);
setTimeout( () => player.show(300, 200), 20 );

let controls = {
    'KeyA': {pressed: false, direction: 'left'},
    'KeyS': {pressed: false, direction: 'down'},
    'KeyD': {pressed: false, direction: 'right'},
    'KeyW': {pressed: false, direction: 'up'}
};

window.onkeydown = (ev) => {
    if(controls.hasOwnProperty(ev.code)) {
        if (controls[ev.code].pressed) return;
        controls[ev.code].pressed = true;
        controls[ev.code].timer = setInterval(()=>{
            player.animate(controls[ev.code].direction);
        }, 75);
        player.animate(controls[ev.code].direction);
    }
};

window.onkeyup = (ev) => {
    if(controls.hasOwnProperty(ev.code)) {
        controls[ev.code].pressed = false;
        clearInterval(controls[ev.code].timer);
    }
};

function generateFireballs() {
    let fireball = new Fireball(gameplayLayer, './resources/fireball_40x40.png', 38, 38);
    gameplayLayer.add(fireball);
    setTimeout( () => fireball.show(200, 10, 5, 5), 30 );
    fireball.ondestroy = generateFireballs;
}

generateFireballs();













