// const log = console.log;
// const getUrl  = 'https://reqres.in/api/users/';
// const postUrl = 'https://reqres.in/api/users';
// // fetch(url)
// // .then( data => data.json() )
// // .then( log )
// // .catch( console.warn );

// let id=749;

// document.forms[0].onsubmit = (ev) => {
//     ev.preventDefault();

//     let data = {
//         first_name: ev.target[0].value,
//         last_name: ev.target[1].value,
//         email: ev.target[2].value,
//         avatar: ev.target[3].value
//     }
    
//     fetch(postUrl, {
//         method: 'post',
//         headers: {'Content-Type': 'application/json;charset=utf-8'},
//         body: JSON.stringify(data)
//     })
//       .then( response => response.json() )
//       //.then( log )
//       .then( (user) => {
//             id = user.id;
//             return console.log(id);
//          } )
//       .catch( log );
// }


// document.querySelector('#get').onclick = () => {
//     fetch(getUrl+id)
//       .then( response => response.json() )
//       .then( log )
//       .catch( log );
// }

const log = console.log;
const getUrl  = 'https://reqres.in/api/users/';
const postUrl = 'https://reqres.in/api/users';

let id = 749;

document.forms[0].onsubmit = async (ev) => {
    ev.preventDefault();

    let data = {
        first_name: ev.target[0].value,
        last_name: ev.target[1].value,
        email: ev.target[2].value,
        avatar: ev.target[3].value
    }

    try {
        const response = await fetch(postUrl, {
            method: 'post',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(data)
        });
        const user = await response.json();
        id = user.id;
        console.log(id);
    } catch (error) {
        log(error);
    }
};

document.querySelector('#get').onclick = async () => {
    try {
        const response = await fetch(getUrl + id);
        const data = await response.json();
        document.getElementById("user_avatar").src = data.data.avatar;
        document.getElementById("user_data").textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        log(error);
    }
};
