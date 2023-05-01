import {StaticSprite} from './static_sprite.js';

export class AnimatedSprite extends StaticSprite {
    rows = 0;
    cols = 0;
    r = 0;    // текущая строка в спрайт-листе
    c = 0;    // текущая колонка в спрайт-листе
    savedData = 0;
    oncollision = () => {}; // пустой обработчик события
    collisionMasks = [];
    health = undefined;  // по умолчанию у объекта нет здоровья
    damage = 0;

    constructor(layer, src, width, height) {
        super(layer, src);
        this.width = width;
        this.height = height;
    }

    makeCollisionMask(canvas, row, col) {
        let sourceX = col*this.width;
        let sourceY = row*this.height;

        // рисуем изображение на скрытом холсте, чтобы вытащить ImageData
        let hctx = canvas.getContext('2d');
        hctx.drawImage(this.spriteSheet, sourceX, sourceY, this.width,
            this.height, 0, 0, this.width, this.height);

        // вытаскиваем ImageData
        let maskData = hctx.getImageData(0,0, this.width, this.height);
        hctx.clearRect(0,0, this.width, this.height);

        // устанавливаем все байты rgb в 0, а байты альфа-канала в 255
        maskData = maskData.data.map( (x, i) => {
            if ((i+1) % 4) return 0;
            return (x>10) ? 255 : 0;
        } );

        // чистая маска состоит только из байтов альфа-канала
        return maskData.filter( (x,i) => (i+1) % 4 === 0 );
    }


    spriteLoaded(ev) {
        super.spriteLoaded(ev);
        this.rows = Math.trunc(ev.target.height / this.height);
        this.cols = Math.trunc(ev.target.width / this.width);

        // создаём скрытый холст
        let hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = this.width;
        hiddenCanvas.height = this.height;

        // для каждого спрайта в нашем изображении создаём маску
        for (let r=0; r<this.rows; r++) {
            this.collisionMasks[r] = [];
            for (let c=0; c<this.cols; c++)
                // в итоге получаем таблицу масок - по количеству видов анимации (rows)
                // и числу шагов анимации (cols)
                this.collisionMasks[r][c] = this.makeCollisionMask(hiddenCanvas, r, c);
        }
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
        super.hide()
        this.ctx.putImageData(this.savedData, this.x, this.y);
    };

    get currentMask() {
        return this.collisionMasks[this.r][this.c];
    }

    isPrecizeCollision(other) {
        let w = 0;    // ширина и высота общего прямоугольника
        let h = 0;    // в котором пересекаются две маски
        if (other.x>this.x) w = this.width - (other.x-this.x);
        else                w = other.width - (this.x-other.x);
        
        if (other.y>this.y) h = this.height - (other.y-this.y);
        else                h = other.height - (this.y-other.y);

        // получаем из своей маски только те пиксели, которые в зоне пересечения
        let myMask   = this.currentMask.filter( (x,i) => {
            let dx, dy;
            if (other.x>this.x) dx = other.x - this.x;
            else dx = 0;
    
            if (other.y>this.y) dy = other.y - this.y;
            else dy = 0;

            return ( i % this.width >= dx && i%this.width < dx+w &&
                Math.trunc(i/this.width) >= dy &&
                Math.trunc(i/this.width) < dy+h );
        });

        // получаем из чужой маски только те пиксели, которые в зоне пересечения
        let yourMask = other.currentMask.filter( (x,i) => {
            let dx, dy;
            if (this.x>other.x) dx = this.x - other.x;
            else dx = 0;
    
            if (this.y>other.y) dy = this.y - other.y;
            else dy = 0;
            
            return ( i % other.width >= dx && i%other.width < dx+w &&
                Math.trunc(i/other.width) >= dy &&
                Math.trunc(i/other.width) < dy+h );
        });

        // пробегаем по пикселям своей маски и узнаём, накладываются ли они
        // на те же пиксели из чужой маски - с помощью побитового И  (only 1 & 1 = 1)
        for (let i in myMask) {
            let collision = myMask[i] & yourMask[i];
            // нет смысла проверять остальные пиксели, если хотя бы один наложился
            if (collision) return true;
        }

        // если мы здесь - значит, ни один пиксель не наложился, коллизии нет
        return false;
    }

    isCollision(other) {
        // условия, гарантирующие, что нет прямоугольной коллизии между объектами
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

        // если мы здесь, значит есть пересечение спрайтов, и коллизию
        // надо определить с помощью масок
        if (this.isPrecizeCollision(other)) {
            // есть коллизия!
            other.hit(this.damage);
            return true;
        }
    }

    die() {};

    hit(damage) {
        if (this.health !== undefined) {
            this.health -= damage;
            if (this.health < 0) {
                this.die();
            }
        }
    }

}