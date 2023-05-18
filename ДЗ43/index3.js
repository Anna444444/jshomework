const log = console.log;

function* cardDeck() {
    const suits = ['Пик', 'Треф', 'Бубен', 'Червей'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Валет', 'Дама', 'Король', 'Туз'];
    for (let suit of suits) {
        for (let value of values) {
            yield `${value} ${suit}`;
        }
    }
}

let deck = cardDeck();

try {
    while (true) {
        log(deck.next().value);
    }
} catch (error) {
    if (error instanceof TypeError) {
        console.log("StopIteration");
    }
}


