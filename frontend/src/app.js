import "./styles/styles.scss";
import {Router} from "./router.js";


class App {
    constructor() {
        console.log('App.js loaded');
        new Router();
    }
}

(new App());
