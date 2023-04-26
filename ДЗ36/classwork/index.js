class Layer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.objects = [];
    }

    add(object) {
        this.objects.push(object);
        return object;
    }

    remove(object) {
        let i = this.objects.indexOf(object);
        if (i !== -1) {
            this.objects.splice(i, 1);
        }
    }
}


class AnimatedSprite {
    ready = false;
    rows = 0;
    cols = 0;
    r = 0;    // текущая строка в спрайт-листе
    c = 0;    // текущая колонка в спрайт-листе
    x = 0;    // текущая x координата на холсте
    y = 0;    // текущая y
    savedData = 0;
    ondestroy = () => {};
    oncollision = () => {};

    constructor(layer, src, width, height) {
        this.layer = layer;
        this.ctx = layer.ctx;
        this.spriteSheet = new Image();
        this.spriteSheet.src = src;
        this.spriteSheet.onload = this.spriteLoaded.bind(this);
        this.width = width;
        this.height = height;
    }

    destroy() {
        this.hide();
        this.layer.remove(this);
        this.ondestroy();
        delete this;
    }

    spriteLoaded(ev) {
        this.ready = true;
        this.rows = Math.trunc(ev.target.height / this.height);
        this.cols = Math.trunc(ev.target.width / this.width);
    };

    show(x,y) {
        this.x = x;
        this.y = y;
        let sourceX = this.c*this.width;
        let sourceY = this.r*this.height;
        
        this.savedData = this.ctx.getImageData(x,y, this.width, this.height);
        this.ctx.drawImage(this.spriteSheet, sourceX, sourceY, this.width,
             this.height,this.x, this.y, this.width, this.height);
    };

    hide() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        this.ctx.putImageData(this.savedData, this.x, this.y);
    };

    isCollision(other) {
        if (this.x < other.x) {
            if (this.x + this.width < other.x) return false;
        } else {
            if (other.x + other.width < this.x) return false;
        }
        if (this.y < other.y) {
            if (this.y + this.height < other.y) return false;
        } else {
            if (other.y + other.height < this.y) return false;
        }

        console.log(other);
        return true;
    }
}

class Player extends AnimatedSprite {
    animate(direction) {
        switch(direction) {
            case 'right':
                this.hide();
                this.x += 10;
                this.c++;
                if (this.c >= this.cols) this.c = 0;
                this.r = 2;
                this.show(this.x, this.y);
            break;

            case 'left':
                this.hide();
                this.x -= 10;
                this.c++;
                if(this.c >= this.cols) this.c = 0;
                this.r = 1;
                this.show(this.x, this.y);
            break;

            case 'down':
                this.hide();
                this.y += 10;
                this.c++;
                if(this.c >= this.cols) this.c = 0;
                this.r = 0;
                this.show(this.x, this.y);
            break;

            case 'up':
                this.hide();
                this.y -= 10;
                this.c++;
                if(this.c >= this.cols) this.c = 0;
                this.r = 3;
                this.show(this.x, this.y);
            break;

            default: return;
        }
    };
}

class Fireball extends AnimatedSprite {
    speedX = 0;
    speedY = 0;

    show(x,y, speedX=this.speedX, speedY=this.speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
        super.show(x,y);
        if (!this.timer) this.timer = setInterval(this.animate.bind(this), 30);
    }

    animate() {
        this.hide();
        this.x += this.speedX;
        this.y += this.speedY;

        let collided = this.layer.objects.some( (x) => {
            if (x === this) return false;
            return this.isCollision(x);
        });

        if (this.x > this.layer.canvas.width  ||
            this.y > this.layer.canvas.height ||
            collided ) {
            clearInterval(this.timer);
            this.destroy();
            return;
        }
        this.c++;
        if(this.c >= this.cols) this.c = 0;
        this.show(this.x, this.y);
    }
}


const backgroundCanvas = document.getElementById('background');
backgroundCanvas.width = window.innerWidth-5;
backgroundCanvas.height = window.innerHeight-5;

const gameplayCanvas = document.getElementById('gameplay');
gameplayCanvas.width = window.innerWidth-5;
gameplayCanvas.height = window.innerHeight-5;


const backgroundLayer = new Layer(backgroundCanvas);
const gameplayLayer   = new Layer(gameplayCanvas);


const background = new AnimatedSprite(backgroundLayer, 
                                      './resources/backg.jpg',
                                      window.innerWidth-5,
                                      window.innerHeight-5);
setTimeout( () => background.show(0,0), 20 );



let player = new Player(gameplayLayer, './resources/char_95x159.png', 95, 159);
gameplayLayer.add(player);
setTimeout( () => player.show(300,200), 20 );


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
    }
}

window.onkeyup = (ev) => {
    if(controls.hasOwnProperty(ev.code)) {
        controls[ev.code].pressed = false;
        clearInterval( controls[ev.code].timer );
    }
}


function generateFireballs() {
    let fireball = new Fireball(gameplayLayer, './resources/fireball_40x40.png', 38, 38);
    gameplayLayer.add(fireball);
    setTimeout( () => fireball.show(200,10, 5, 5), 30 );
    fireball.ondestroy = generateFireballs;    
}

generateFireballs();













