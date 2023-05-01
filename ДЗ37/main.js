import {Layer} from './layer.js';
import {StaticSprite} from './static_sprite.js';
import {Player} from './player.js';
import {Fireball} from './fireball.js';

const backgroundCanvas = document.getElementById('background');
backgroundCanvas.width = window.innerWidth-2;
backgroundCanvas.height = window.innerHeight-2;
const gameplayCanvas = document.getElementById('gameplay');
gameplayCanvas.width = window.innerWidth-2;
gameplayCanvas.height = window.innerHeight-2;
const interfaceCanvas = document.getElementById('interface');
interfaceCanvas.width = window.innerWidth-2;
interfaceCanvas.height = window.innerHeight-2;

const backgroundLayer = new Layer(backgroundCanvas);
const gameplayLayer   = new Layer(gameplayCanvas);
const interfaceLayer = new Layer(interfaceCanvas);

const background = new StaticSprite(backgroundLayer, './resources/backg.jpg');
setTimeout( () => background.show(0,0), 20 );

const player = new Player(gameplayLayer, './resources/char_95x159.png', 95, 159);
setTimeout( () => player.show(300,200), 20 );

player.health = 5;
player.updateHealth = function() {
    interfaceLayer.ctx.clearRect(0, 0, interfaceLayer.canvas.width, interfaceLayer.canvas.height);
    interfaceLayer.ctx.font = "40px 'Comic Sans MS', cursive, sans-serif";
    interfaceLayer.ctx.fillStyle = "pink";
    interfaceLayer.ctx.fillText(`Здоровье: ${this.health}`, 10, 50);
};
player.updateHealth();


let controls = {
    'KeyA': {pressed: false, direction: 'left'},
    'KeyS': {pressed: false, direction: 'down'},
    'KeyD': {pressed: false, direction: 'right'},
    'KeyW': {pressed: false, direction: 'up'}
}

window.onkeydown = (ev) => {
    if(controls.hasOwnProperty(ev.code)) {
        if (controls[ev.code].pressed) return;
        controls[ev.code].pressed = true;
        controls[ev.code].timer = setInterval(()=>{
            player.animate(controls[ev.code].direction);
        }, 75);
        player.animate(controls[ev.code].direction);
    } else if (ev.code === "Space"){
        // let maskData = player.collisionMasks[1][1];
        // console.log(maskData);
        // let maskImage = new ImageData(maskData, player.savedData.width, player.savedData.height);
        // let ctx = backgroundCanvas.getContext('2d');
        // ctx.putImageData(maskImage, 200, 200);  
    }
}

window.onkeyup = (ev) => {
    if(controls.hasOwnProperty(ev.code)) {
        controls[ev.code].pressed = false;
        clearInterval( controls[ev.code].timer );
    }
}

function checkCollision(player, fireball) {
    return player.x < fireball.x + fireball.width &&
           player.x + player.width > fireball.x &&
           player.y < fireball.y + fireball.height &&
           player.y + player.height > fireball.y;
}

function checkPlayerHealth() {
    if (player.health <= 0) {
        player.die();
    }
}

function generateFireballs() {
    let fireball = new Fireball(gameplayLayer, './resources/fireball_40x40.png', 40, 40);
    setTimeout( () => fireball.show(200,10, 5, 5), 20 );
    fireball.ondestroy = function() {
        if (checkCollision(player, fireball)) {
            player.health--;
            player.updateHealth();
            checkPlayerHealth();
        }
        generateFireballs();
    };
}
generateFireballs();





