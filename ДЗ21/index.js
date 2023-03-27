const maxSaturation = 10;
const maxLightness = 10;

function hsl(hue, saturation, lightness) {
    return `hsl(${hue} ${saturation}% ${lightness}%)`
}

function changeColor(event) {
    let hue = event.target.value;
    let palette = document.getElementById('palette');
    let rows = palette.querySelectorAll('tr');

    let deltaSaturation = 100 / rows.length;
    for (let i = 0; i < rows.length; i++) {
        let rowSaturation = i * deltaSaturation;
        let cells = rows[i].querySelectorAll('td');

        let deltaLightness = 100 / cells.length;
        for (let j = 0; j < cells.length; j++) {
            let cellLightness = j * deltaLightness;
            cells[j].style.backgroundColor = hsl(hue, rowSaturation, cellLightness);
        }
    }
}

function selectColor(event) {
    let selectedColorElement = document.getElementById("selected-color");
    let color = event.target.style.backgroundColor;
    selectedColorElement.style.backgroundColor = color;
}

let table = document.getElementById('palette');
let row = "<td></td>".repeat(maxLightness);
let tableContent = `<tr>${row}</tr>`.repeat(maxSaturation)
table.innerHTML = tableContent;

let hue = document.getElementById('hue');
hue.oninput = changeColor;
table.onclick = selectColor;
