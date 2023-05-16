import { Cdn } from "./cdn.js";
export class Interface {
    #cdn = null;
    constructor () {
        this.#cdn = new Cdn();
    }

    showLogin (loginUrl) {
        let link = document.querySelector('#login a');
        link.href = loginUrl;
        let area = link.parentElement;
        area.style.display = 'block';
    }

    showMain (user) {
        let main = document.querySelector('#main');
        main.style.display = 'block';
        
        const avatarUrl = this.#cdn.getAvatar(user.id, user.avatar);
        let avatar = document.querySelector('.user-info > img');
        avatar.setAttribute('src', avatarUrl);

        let userName = document.querySelector('.username');
        userName.textContent = user.username;

        let userId = document.querySelector('.user-id');
        userId.textContent = user.id;
    }
}
