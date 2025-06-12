import {ValidationUtils} from "../../utils/validation-utils";

export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.findElements();
        this.processButtonElement.addEventListener('click', this.login.bind(this));

        this.validations = [
            {element: this.emailElement, options: {pattern: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/}, elementAppend: this.emailAppendElement},
            {element: this.passwordElement, elementAppend: this.passwordAppendElement}
        ]
    }
    findElements() {
        this.processButtonElement = document.getElementById('process-button');
        this.emailElement = document.getElementById('email');
        this.emailAppendElement = document.getElementById('emailAppend');
        this.passwordElement = document.getElementById('password');
        this.passwordAppendElement = document.getElementById('passwordAppend');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');
    }

    async login() {
        this.commonErrorElement.style.display = 'none';
        if (ValidationUtils.validationForm(this.validations)) {
            // request

            // const loginResult = await AuthService.logIn({
            //     email: this.emailElement.value,
            //     password: this.passwordElement.value,
            //     rememberMe: this.rememberMeElement.checked,
            // });
            //
            // if (loginResult) {
            //     AuthUtils.setAuthInfo(loginResult.accessToken, loginResult.refreshToken, {
            //         id: loginResult.id,
            //         name: loginResult.name,
            //     });
            //     return this.openNewRoute('/');
            // }

            this.commonErrorElement.style.display = 'block';

        }
    }

}