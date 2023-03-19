function changeBodyColor() {
      let color = prompt('Введите цвет для фона страницы', '');
      document.body.style.backgroundColor = color;
  }

function changeHeaderColor() {
    let color = prompt('Введите цвет для заголовка', '');
    let header = document.getElementsByTagName('h1')[0];
    header.style.color = color;
}

function changeFontSize() {
    let size = prompt('Введите размер шрифта', '');
    let text = document.getElementsByTagName('p')[0];
    text.style.fontSize = size + 'px';
}

function addItemToList() {
    let item = prompt('Введите текст для нового элемента списка', '');
    let list = document.getElementsByTagName('ul')[0];
    let listItem = document.createElement('li');
    listItem.textContent = item;
    list.appendChild(listItem);
}

let button1 = document.getElementById('touchBc');
button1.addEventListener('click', changeBodyColor);

let button2 = document.getElementById('touchHc');
button2.addEventListener('click', changeHeaderColor);

let button3 = document.getElementById('touchFs');
button3.addEventListener('click', changeFontSize);

let button4 = document.getElementById('touchItl');
button4.addEventListener('click', addItemToList);

