const hueLevels = 360;

function hsl(hue, saturation, lightness) {
  return `hsl(${hue} ${saturation}% ${lightness}%)`;
}

function updatePalette() {
  let saturation = document.getElementById("saturation").value;
  let lightness = document.getElementById("lightness").value;

  let palette = document.getElementById("palette");
  let cells = palette.getElementsByTagName("td");

  let deltaHue = 360 / cells.length;
  for (let i = 0; i < cells.length; i++) {
    let cellHue = i * deltaHue;
    cells[i].style.backgroundColor = hsl(cellHue, saturation, lightness);
  }
}

function selectColor(event) {
  let selectedColor = event.target.style.backgroundColor;
  document.getElementById("selectedColor").style.backgroundColor = selectedColor;
}

let table = document.getElementById("palette");
let tableContent = `<tr>${"<td></td>".repeat(hueLevels)}</tr>`;
table.innerHTML = tableContent;

let saturation = document.getElementById("saturation");
let lightness = document.getElementById("lightness");

hue.oninput = updatePalette;
saturation.oninput = updatePalette;
lightness.oninput = updatePalette;

let cells = table.getElementsByTagName("td");
for (let cell of cells) {
  cell.addEventListener("click", selectColor);
}

updatePalette();





