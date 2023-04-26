class AnimatedSprite extends StaticSprite {
    ready = false;
    rows = 0;
    cols = 0;
    r = 0;
    c = 0;
    x = 0;
    y = 0;
    savedData = 0;
    ondestroy = () => {};
    oncollision = () => {};

    constructor(layer, src, width, height) {
        super(layer, src);
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