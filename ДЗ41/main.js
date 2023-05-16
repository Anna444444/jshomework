import { Application } from "./app.js";

window.onload = () => {
    let url = new URL(window.location.href);
    let app = new Application(url);
    app.start();
}
