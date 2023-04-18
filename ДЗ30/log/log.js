logLevel = 1;
function _log(level, args) {
    if (logLevel >= level) {
        let logInfo = [...arguments].slice(1);
        console.log(...logInfo);
    }
}


function logE(args) {
    _log(0, ...arguments);
}

function logI(args) {
    _log(1, ...arguments);
}

function logW(args) {
    _log(2, ...arguments);
}

function logD(args) {
    _log(3, ...arguments);
}

function logT(args) {
    _log(4, ...arguments);
}



let btn = document.getElementById('button');

btn.onclick = ev => {
    logI(ev.target);
    let newColor = prompt('Введите цвет');
    logD(newColor);
    let myList = document.querySelectorAll('li');
    logD(myList);
    for (let i=0; i<myList.length; i++) {
        logT(i, myList[i]);
        myList[i].style.backgroundColor = newColor;
    }

};