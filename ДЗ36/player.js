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