const btn = document.getElementsByTagName('button')[0];
btn.onclick = checkEmail;

function checkEmail(ev) {
    const inp = document.getElementsByTagName('input')[0];
    const out = document.getElementsByTagName('label')[1];

/*
    87079874433
    +77079874433
    8(707)9874433
    8-707-987-44-33
    8-707-987-4433
    +7 707 987 4433
    +7 (707) 987 4433
*/
//const regexp = /^[8(+7)][\s\(\-]?\d{3}[\s\)\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
const regexp = /^(8|(\+7))[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
if (!regexp.test(inp.value)) {
    out.textContent = "Неправильный номер!";
} else {
    out.textContent = "Номер правильный!";
}


    // something.so33met_hing.fdsfds@something.somet_hi56ng.fd65sfds.ru
    /*
    const regexp = /^([\w\d_]+(\.?[\w\d_])*)+@([\w\d_]+(\.?[\w\d_])*)+\.\w{1,3}$/;

    if (!regexp.test(inp.value)) {
        out.textContent = "Неправильный email!";
    } else {
        out.textContent = "email правильный!";
    }
    */
}

