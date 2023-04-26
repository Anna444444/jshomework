class StaticSprite {
    constructor(layer, src) {
        this.layer = layer;
        this.ctx = layer.ctx;
        this.spriteSheet = new Image();
        this.spriteSheet.src = src;
        this.spriteSheet.onload = this.spriteLoaded.bind(this);
    }

    spriteLoaded(ev) {
        this.ready = true;
        this.width = ev.target.width;
        this.height = ev.target.height;
    }
    
    show(x, y) {
        this.ctx.drawImage(this.spriteSheet, x, y, this.width, this.height);
    }
}






