const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let memory = 0;

buttons.forEach(button => {
  button.addEventListener('click', event => {
    const buttonText = event.target.textContent;
    switch (buttonText) {
      case 'C':
        display.value = '';
        break;
      case '⇦':
        display.value = display.value.slice(0, -1);
        break;
      case 'M+':
        memory += parseFloat(display.value);
        display.value = '';
        break;
      case 'M–':
        memory -= parseFloat(display.value);
        display.value = '';
        break;
      case 'MR':
        display.value = memory.toString();
        break;
      case 'MC':
        memory = 0;
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        display.value += ` ${buttonText} `;
        break;
      case '=':
        const expression = display.value;
        res = obrezat(expression)
        chislo1 = res[0]
        chislo2 = res[1]
        znak = res[2]
        const result = plusMinusDelUmn(chislo1,chislo2,znak);
        display.value = result.toString();
        break;
      default:
        display.value += buttonText;
    }
  });
});

function plusMinusDelUmn(chislo1,chislo2,znak){
  if (znak == '+'){
    return(Number(chislo1) + Number(chislo2))
  }
  if (znak == '*'){
    return(Number(chislo1) * Number(chislo2))
  }
  if (znak == '/'){
    return(Number(chislo1) / Number(chislo2))
  }
  if (znak == '-'){
    return(Number(chislo1) - Number(chislo2))
  }
}

function obrezat(slovo){
  chislo1 = ''
  chislo2 = ''
  znak = ''
  for (i in slovo){
    if (slovo[i] == '+'){
      chislo1 = slovo.split('+')[0]
      chislo2 = slovo.split('+')[1]
      znak = '+'
    }
    if (slovo[i] == '-'){
      chislo1 = slovo.split('-')[0]
      chislo2 = slovo.split('-')[1]
      znak = '-'
    }
    if (slovo[i] == '*'){
      chislo1 = slovo.split('*')[0]
      chislo2 = slovo.split('*')[1]
      znak = '*'
    }
    if (slovo[i] == '/'){
      chislo1 = slovo.split('/')[0]
      chislo2 = slovo.split('/')[1]
      znak = '/'
    }
  }
  mas = [chislo1,chislo2,znak]
  return mas
  
}