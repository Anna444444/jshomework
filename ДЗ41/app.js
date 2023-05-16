import { Discord } from "./discord.js";
import { Interface } from "./interface.js";

export class Application {
    #url = null;
    #params = null;
    #interface = null;
    #discord = null;

    constructor(url) {
        this.#url = url;
        if (this.#url.search) this.#params = Object.fromEntries(this.#url.searchParams);
        this.#interface = new Interface();
    }

    start() {
        if (this.#params) this.main().then();
        else this.login();
    }

    login() {
        let url = Discord.authUrl;
        this.#interface.showLogin(url);
    }

    async main() {
        this.#discord = new Discord();
        const myUrl = this.#url.origin + this.#url.pathname;
        let gotToken = await this.#discord.getToken(this.#params.code, myUrl);
        if (gotToken) {
            let user = await this.#discord.getUser();
            this.#interface.showMain(user);
        }
    }
}
