let form = document.getElementById('color-form');
let nameInput = document.getElementById('name');
let typeSelect = document.getElementById('type');
let codeInput = document.getElementById('code');
let nameError = document.getElementById('name-error');
let codeError = document.getElementById('code-error');
let colorsDiv = document.querySelector('.colors');

function validateColorName(name) {
    return /^[a-zA-Z]+$/.test(name);
}

function validateColorCode(type, code) {
    if (type === 'RGB') {
        return /^(\d{1,3},\s*){2}\d{1,3}$/.test(code) &&
            code.split(',').every(num => num >= 0 && num <= 255);
    } else if (type === 'RGBA') {
        let values = code.split(',');
        if (values.length !== 4) return false;
        for (let i = 0; i < 3; i++) {
            if (values[i] < 0 || values[i] > 255) return false;
        }
        return values[3] >= 0 && values[3] <= 1;
    } else {
        return /^#([0-9A-Fa-f]{6})$/.test(code);
    }
}

function isColorNameUnique(name) {
    let colorNames = Array.from(colorsDiv.children).map(color => color.querySelector('strong').textContent.toLowerCase());
    return !colorNames.includes(name.toLowerCase());
}

function RGBAToHex(rgba) {
    let rgbaValues = rgba.match(/\d+/g);
    let r = parseInt(rgbaValues[0]);
    let g = parseInt(rgbaValues[1]);
    let b = parseInt(rgbaValues[2]);
    let a = rgbaValues.length === 4 ? parseInt(rgbaValues[3]) : 1;

    return '#' + [r, g, b].map(x => {
        let hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

function lightenColor(color, percent) {
    let num = parseInt(color.replace('#', ''), 16);
    let amt = Math.round(2.55 * percent);
    let R = (num >> 16) + amt;
    let G = (num >> 8 & 0x00FF) + amt;
    let B = (num & 0x0000FF) + amt;
    return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
}

function addColor(name, type, code) {
    let colorDiv = document.createElement('div');
    colorDiv.className = 'color';

    let colorString;
    if (type === 'HEX') {
        colorString = code;
    } else {
        let values = code.split(',').map(value => value.trim());
        colorString = type + '(' + values.join(', ') + ')';
    }
    
    colorDiv.style.backgroundColor = colorString;

    let innerColorDiv = document.createElement('div');
    innerColorDiv.className = 'inner-color';

    let hexColor = type === 'HEX' ? colorString : RGBAToHex(colorString);
    let lighterColor = lightenColor(hexColor, 30);
    innerColorDiv.style.backgroundColor = lighterColor;

    innerColorDiv.innerHTML = `<strong>${name}</strong><br>${type}: ${code}`;
    colorDiv.appendChild(innerColorDiv);

    colorsDiv.appendChild(colorDiv);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = nameInput.value.trim();
    let type = typeSelect.value;
    let code = codeInput.value.trim();

    nameError.textContent = '';
    codeError.textContent = '';

    if (!validateColorName(name)) {
        nameError.textContent = 'Название должно содержать только буквы';
        return;
    }
    if (!validateColorCode(type, code)) {
        codeError.textContent = 'Неверный код цвета';
        return;
    }
    if (!isColorNameUnique(name)) {
        nameError.textContent = 'Название цвета должно быть уникальным';
        return;
    }

    let color = { name, type, code };
    colors.push(color);
    addColor(color.name, color.type, color.code);

    form.reset();
});

let savedColors = localStorage.getItem('colors');
let savedColorsTimestamp = localStorage.getItem('colors-timestamp');
let timePassed = savedColorsTimestamp ? (Date.now() - savedColorsTimestamp) / 1000 / 60 / 60 : null;

if (savedColors && timePassed <= 3) {
    colors = JSON.parse(savedColors);
} else {
    localStorage.removeItem('colors');
    localStorage.removeItem('colors-timestamp');
    colors = [];
}

colors.forEach(color => addColor(color.name, color.type, color.code));

window.addEventListener('beforeunload', () => {
    localStorage.setItem('colors', JSON.stringify(colors));
    localStorage.setItem('colors-timestamp', Date.now());
});