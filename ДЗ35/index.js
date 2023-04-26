const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth-5;
canvas.height = window.innerHeight-5;
ctx = canvas.getContext('2d');
ctx.fillStyle = 'darkred';

class AnimatedSprite {
    ready = false;
    rows = 0;
    cols = 0;
    r = 0;
    c = 0;
    x = 0;
    y = 0;
    savedData = 0;

    constructor(ctx, src, width, height, saveImageData = true) {
        this.spriteSheet = new Image();
        this.spriteSheet.src = src;
        this.spriteSheet.onload = this.spriteLoaded.bind(this);
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.saveImageData = saveImageData;
    }

    spriteLoaded(ev) {
        this.ready = true;
        this.rows = Math.trunc(ev.target.height / this.height);
        this.cols = Math.trunc(ev.target.width / this.width);
    };

    show(x, y) {
        this.x = x;
        this.y = y;
        let sourceX = this.c * this.width;
        let sourceY = this.r * this.height;
        this.savedData = this.ctx.getImageData(x, y, this.width, this.height);
        this.ctx.drawImage(this.spriteSheet, sourceX, sourceY, this.width,
            this.height, this.x, this.y, this.width, this.height);
    };

    hide() {
        this.ctx.clearRect(this.x, this.y, this.width, this.height);
        if (this.saveImageData) {
            this.ctx.putImageData(this.savedData, this.x, this.y);
        }
    }

    animate() {
        throw new Error('animate() must be implemented in a child class');
    }
}

class Player extends AnimatedSprite {
    animate(direction) {
        switch (direction) {
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
                if (this.c >= this.cols) this.c = 0;
                this.r = 3;
                this.show(this.x, this.y);
                break;

            case 'down':
                this.hide();
                this.y += 10;
                this.c++;
                if (this.c >= this.cols) this.c = 0;
                this.r = 0;
                this.show(this.x, this.y);
                break;

            case 'up':
                this.hide();
                this.y -= 10;
                this.c++;
                if (this.c >= this.cols) this.c = 0;
                this.r = 1;
                this.show(this.x, this.y);
                break;

            default:
                return;
        }
    }
}

class BrassBullet extends AnimatedSprite {
    constructor(ctx, src, width, height, startX, startY, direction) {
        super(ctx, src, width, height, false);
        this.x = startX;
        this.y = startY;
        this.direction = direction;
    }

    animate() {
        this.x += 10 * this.direction;
        this.show(this.x, this.y);
    }
}

class Fireball extends AnimatedSprite {
    constructor(ctx, src, width, height, startX, startY, direction) {
        super(ctx, src, width, height, false);
        this.x = startX;
        this.y = startY;
        this.direction = direction;
    }

    animate() {
        this.x += 5 * this.direction;
        this.show(this.x, this.y);
    }
}

const background = new Image();
background.src = './resources/backg.jpg';
background.crossOrigin = "Anonymous"
background.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

let animatedObjects = [];

let player = new Player(ctx, './resources/char_95x159.png', 100, 100);
animatedObjects.push(player);
setTimeout(() => player.show(300, 200), 50);

let controls = {
    'KeyA': {pressed: false, direction: 'left'},
    'KeyS': {pressed: false, direction: 'down'},
    'KeyD': {pressed: false, direction: 'right'},
    'KeyW': {pressed: false, direction: 'up'}
}

window.onkeydown = (ev) => {
    if (controls.hasOwnProperty(ev.code)) {
        if (controls[ev.code].pressed) return;
        controls[ev.code].pressed = true;
        controls[ev.code].timer = setInterval(() => {
            player.animate(controls[ev.code].direction);
        }, 75);
        player.animate(controls[ev.code].direction);
    }

    if (ev.code === 'Space') {
        let bullet = new BrassBullet(ctx, './resources/brass-bullet_105x70.png', 105, 70, player.x + 80, player.y + 20, 1);
        animatedObjects.push(bullet);
    }

    if (ev.code === 'KeyF') {
        let fireball = new Fireball(ctx, './resources/fireball_62x39.png', 62, 39, player.x + 80, player.y + player.height - 20, 1);
        animatedObjects.push(fireball);
    }
}

window.onkeyup = (ev) => {
    if (controls.hasOwnProperty(ev.code)) {
        controls[ev.code].pressed = false;
        clearInterval(controls[ev.code].timer);
    }
}

function updateBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

function animateObjects() {
    for (let i = 0; i < animatedObjects.length; i++) {
        let obj = animatedObjects[i];

        obj.animate();

        if (obj.x < 0 || obj.x > canvas.width || obj.y < 0 || obj.y > canvas.height) {
            animatedObjects.splice(i, 1);
            i--;
        }
    }
}

setInterval(animateObjects, 75);














