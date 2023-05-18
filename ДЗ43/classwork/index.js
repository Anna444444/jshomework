const log = console.log;

// Итератор - это объект, у которого есть метод next()

// Патчим ВСЕ объекты JS, чтобы они стали итерируемыми (никогда так не делайте!)
Object.prototype[Symbol.iterator] = function () {
    const total = Object.keys(this).length;
    let current = 0;
    let self = this;
    // возвращаем итератор
    return {
        next: function() {
            if(current < total) {
                let key = Object.keys(self)[current];
                let val = self[key];
                current++;
                return  {done: false, value: [key, val]};
            }
            else return {done: true};
        }
    }
}

let obj = {a: 1, b: 4, c: 10, name: "ololo"};
for (let x of obj) {
    log(x);
}

// Создаём генератор - такую функцию, которая возвращает итератор
function* odd(max) {
    let i = 0;
    while(i<max) {
        yield i;
        i += 2;
    }
}

for (let x of odd(10)) {
    log(x);
}

