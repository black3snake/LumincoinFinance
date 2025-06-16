import {Main} from "./components/main";
import {FileUtils} from "./utils/file-utils";
import {IncomeList} from "./components/income/income-list";
import {IncomeCreate} from "./components/income/income-create";
import {ExpensesList} from "./components/expenses/expenses-list";
import {ExpensesCreate} from "./components/expenses/expenses-create";
import {ExpensesEdit} from "./components/expenses/expenses-edit";
import {IncomeEdit} from "./components/income/income-edit";
import {IncomeExpensesList} from "./components/income-expenses/income-expenses-list";
import {IncomeExpensesNew} from "./components/income-expenses/income-expenses-new";
import {IncomeExpensesEdit} from "./components/income-expenses/income-expenses-edit";
import {Login} from "./components/auth/login";
import {SignUp} from "./components/auth/sign-up";
import {AuthUtils} from "./utils/auth-utils";
import {Logout} from "./components/auth/logout";
import {IncomeDelete} from "./components/income/income-delete";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.bootstrapStyleElement = document.getElementById('bootstrap_style');

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Main(this.openNewRoute.bind(this));
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
                    document.body.classList.add('login-page');
                    document.body.style.height = '100vh';
                    new Login(this.openNewRoute.bind(this));
                },
                unload: () => {
                    document.body.classList.remove('login-page');
                    document.body.style.height = 'auto';
                },
                styles: ['icheck-bootstrap.min.css']
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                }

            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/sign-up.html',
                useLayout: false,
                load: () => {
                    document.body.classList.add('signup-page');
                    document.body.style.height = '100vh';
                    new SignUp(this.openNewRoute.bind(this));
                },
                unload: () => {
                    document.body.classList.remove('signup-page');
                    document.body.style.height = 'auto';
                }
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/income/list.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeList(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income/create',
                title: 'Создание категории доходов',
                filePathTemplate: '/templates/pages/income/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeCreate(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income/edit',
                title: 'Редактирование категории доходов',
                filePathTemplate: '/templates/pages/income/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeEdit(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/income/delete',
                load: () => {
                    new IncomeDelete(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/expenses',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expenses/list.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpensesList(this.openNewRoute.bind(this));
                },
                // styles: [''],
                // scripts: ['']
            },
            {
                route: '/expenses/create',
                title: 'Создание категории расходов',
                filePathTemplate: '/templates/pages/expenses/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpensesCreate(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/expenses/edit',
                title: 'Редактирование категории расходов',
                filePathTemplate: '/templates/pages/expenses/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpensesEdit(this.openNewRoute.bind(this));
                },
                // styles: [''],
                // scripts: ['']
            },
            {
                route: '/income-expenses',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/income-expenses/list.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeExpensesList(this.openNewRoute.bind(this));
                },
                styles: ['bootstrap-datepicker.css'],
                scripts: ['bootstrap-datepicker.js', 'bootstrap-datepicker.ru.min.js']
            },
            {
                route: '/income-expenses/new',
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/income-expenses/new.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeExpensesNew(this.openNewRoute.bind(this));
                },
                styles: ['bootstrap-datepicker.css'],
                scripts: ['bootstrap-datepicker.js', 'bootstrap-datepicker.ru.min.js']
            },
            {
                route: '/income-expenses/edit',
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/income-expenses/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeExpensesEdit(this.openNewRoute.bind(this));
                },
                styles: ['bootstrap-datepicker.css'],
                scripts: ['bootstrap-datepicker.js', 'bootstrap-datepicker.ru.min.js']
            },

        ];

        this.initEvents();
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);

    }

    async clickHandler(e) {

        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }
        if (element) {
            e.preventDefault();

            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }

            await this.openNewRoute(url);
        }
    }

    async activateRoute(e, oldRoute = null) {
        if (oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);
            if (currentRoute.styles && currentRoute.styles.length > 0) {
                currentRoute.styles.forEach(style => {
                    document.querySelector(`link[href='/css/${style}']`).remove();
                })
            }
            if (currentRoute.scripts && currentRoute.scripts.length > 0) {
                currentRoute.scripts.forEach(script => {
                    document.querySelector(`script[src='/js/${script}']`).remove();
                })
            }
            // console.log(currentRoute);
            if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                currentRoute.unload();
            }
        }


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
                    if (!this.userName) {
                        const userInfo = AuthUtils.getAuthInfo(AuthUtils.userinfoTokenKey) ? JSON.parse(AuthUtils.getAuthInfo(AuthUtils.userinfoTokenKey)) : '';
                        if (userInfo && userInfo.name) {
                            this.userName = userInfo.name;
                        }
                    }
                    this.profileNameElement.innerText = this.userName;

                    this.activateMenuItem(newRoute);
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

    activateMenuItem(route) {
        const menuCategoryElement = document.getElementById('menu_category');

        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
            const href = item.getAttribute('href');
            if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
                if ((route.route.includes(href) && href !== '/income') || (route.route === '/income' && href === '/income')) {
                    item.classList.add('active');
                    if (['/income', '/expenses'].includes(href)) {
                        menuCategoryElement.classList.remove('collapsed')
                        menuCategoryElement.setAttribute('aria-expanded', true);
                        let showMenu = menuCategoryElement.nextElementSibling;
                        showMenu.classList.add('show');
                    }
                }
            } else {
                item.classList.remove('active');
            }
        })
    }

}