import {AnimatedSprite} from './animated_sprite.js';

export class Fireball extends AnimatedSprite {
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
