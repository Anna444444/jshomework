const log = console.log;

function* fib(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

for (let num of fib(10)) {
    log(num); 
}