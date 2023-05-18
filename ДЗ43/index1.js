const log = console.log;

function* infinite(list, tries) {
    let currentTry = 0;
    while (currentTry < tries) {
        for (let item of list) {
            yield item;
            currentTry++;
            if (currentTry >= tries) {
                return;
            }
        }
    }
}

let result = '';
let list = ['a', 'b'];

for (let item of infinite(list, 3)) {
    result += item;
}

log(result);


