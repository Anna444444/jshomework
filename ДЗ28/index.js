let btn = document.getElementById('start');
let table = document.getElementById('table');

function swapDomElements(element1, element2) {
  let fakeNode = document.createElement('fake');
  element1.after(fakeNode);
  element2.replaceWith(element1);
  fakeNode.replaceWith(element2);
}

function mixElments() {
  let tr = document.querySelectorAll('tr');
  let uniqValues = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (tr[r].childNodes[c].classList.contains("empty")) continue;
      let b;
      do {
        b = getRandom(1, 16);
      }
      while (uniqValues.indexOf(b) !== -1);
      tr[r].childNodes[c].textContent = b;
      uniqValues.push(b);
    }
  }
}

function getRandom(min, max) {
  let a = Math.floor(Math.random() * (max - min) + min);
  return a;
}

function changePosition(ev) {
	let elemTar = ev.target;
	let elemRow = elemTar.parentElement;
  
	let row = elemRow.rowIndex;
	let col = elemTar.cellIndex;
	let emptyCell;
  
	if (elemTar.nextSibling && elemTar.nextSibling.classList.contains("empty")) {
	  emptyCell = elemTar.nextSibling;
	  swapDomElements(elemTar, emptyCell);
	} else if (elemTar.previousSibling && elemTar.previousSibling.classList.contains("empty")) {
	  emptyCell = elemTar.previousSibling;
	  swapDomElements(elemTar, emptyCell);
	} else if (elemRow.nextElementSibling && elemRow.nextElementSibling.children[col].classList.contains("empty")) {
	  emptyCell = elemRow.nextElementSibling.children[col];
	  swapDomElements(elemTar, emptyCell);
	} else if (elemRow.previousElementSibling && elemRow.previousElementSibling.children[col].classList.contains("empty")) {
	  emptyCell = elemRow.previousElementSibling.children[col];
	  swapDomElements(elemTar, emptyCell);
	}
	checkGameOver();
  }
  
  function checkGameOver() {
	let tr = document.querySelectorAll('tr');
	let current = 1;
	for (let r = 0; r < 4; r++) {
	  for (let c = 0; c < 4; c++) {
		if (r === 3 && c === 3) {
		  break;
		}
		if (tr[r].childNodes[c].textContent != current) {
		  return;
		}
		current++;
	  }
	}
	alert("Поздравляем! Вы выиграли!");
  }
  
  table.onclick = changePosition;
  btn.onclick = mixElments;