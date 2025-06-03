import {Main} from "./components/main";
import {FileUtils} from "./utils/file-utils";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.bootstrapStyleElement = document.getElementById('bootstrap_style');

        this.routes = [
            {
                route: '/',
                title: 'Main',
                filePathTemplate: '/templates/pages/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Main();
                },
                styles: ['bootstrap-datepicker.css'],
                scripts: ['chart.umd.js', 'bootstrap-datepicker.js', 'bootstrap-datepicker.ru.min.js']
            },
            {
                route: '/404',
                title: 'Страница не найдена',
                filePathTemplate: '/templates/pages/404.html',
                useLayout: false
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    // document.body.classList.add('login-page');
                    // document.body.style.height = '100vh';
                    // new Login(this.openNewRoute.bind(this));
                },
                unload: () => {
                    // document.body.classList.remove('login-page');
                    // document.body.style.height = 'auto';
                },
                styles: ['']
            },

        ];

        this.initEvents();
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        // document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);

    }

    async activateRoute(e, oldRoute = null) {

        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);
        if (newRoute) {
            if (newRoute.styles && newRoute.styles.length > 0) {
                newRoute.styles.forEach(style => {
                    FileUtils.loadPageStyle('/css/' + style, this.bootstrapStyleElement);
                });
            }
            if (newRoute.scripts && newRoute.scripts.length > 0) {
                for (const script of newRoute.scripts) {
                    await FileUtils.loadPageScript('/js/' + script);
                }

            }

            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | LumincoinFinance';
                console.log(newRoute.title);
            }

            if (newRoute.filePathTemplate) {
                // document.body.className = '';
                let contentBlock = this.contentPageElement;
                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML =
                        await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
                    // document.body.classList.add('sidebar-mini');
                    // document.body.classList.add('layout-fixed');

                    this.profileNameElement = document.getElementById('profile-name');
                    // if (!this.userName) {
                    //     const userInfo = AuthUtils.getAuthInfo(AuthUtils.userinfoTokenKey) ? JSON.parse(AuthUtils.getAuthInfo(AuthUtils.userinfoTokenKey)) : '';
                    //     if (userInfo && userInfo.name) {
                    //         this.userName = userInfo.name;
                    //     }
                    // }
                    // this.profileNameElement.innerText = this.userName;

                    // this.activateMenuItem(newRoute);
                } else {
                    document.body.classList.remove('sidebar-mini');
                    document.body.classList.remove('layout-fixed');
                }
                contentBlock.innerHTML =
                    await fetch(newRoute.filePathTemplate).then(response => response.text());


            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }

        } else {
            console.log('No route found!');
            history.pushState(null, '', '/404');
            await this.activateRoute(null);
        }


    }
}