export class Layer {
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
