import {ValidationUtils} from "../../utils/validation-utils";
import {AuthUtils} from "../../utils/auth-utils";
import {AuthService} from "../../services/auth-service";

export class SignUp {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;


        this.findElements();

        this.validations = [
            {element:this.nameElement ,elementAppend: this.nameAppendElement},
            {element:this.lastNameElement, elementAppend: this.lastNameAppendElement},
            {element: this.emailElement, options: {pattern: /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/}, elementAppend: this.emailAppendElement},
            {element: this.passwordElement, options: {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/}, elementAppend: this.passwordAppendElement},
            {element: this.passwordRepeatElement, options: {compareTo: this.passwordElement.value }, elementAppend: this.passwordRepeatAppendElement},
        ];

        this.processButtonElement.addEventListener('click', this.signUp.bind(this));

    }

    findElements() {
        this.nameElement = document.getElementById('name');
        this.nameAppendElement = document.getElementById('nameAppend');

        this.lastNameElement = document.getElementById('lastname');
        this.lastNameAppendElement = document.getElementById('lastnameAppend');

        this.emailElement = document.getElementById('email');
        this.emailAppendElement = document.getElementById('emailAppend');

        this.passwordElement = document.getElementById('password');
        this.passwordAppendElement = document.getElementById('passwordAppend');

        this.passwordRepeatElement = document.getElementById('repassword');
        this.passwordRepeatAppendElement = document.getElementById('repasswordAppend');

        this.commonErrorElement = document.getElementById('common-error');
        this.processButtonElement = document.getElementById('process-button');
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';
        this.validations.forEach(validation => {
            if (validation.element === this.passwordRepeatElement) {
                validation.options.compareTo = this.passwordElement.value;
            }
        })

        if (ValidationUtils.validationForm(this.validations)) {
            // request
            const signUpResult = await AuthService.signUp({
                name: this.nameElement.value,
                lastName: this.lastNameElement.value,
                email: this.emailElement.value,
                password: this.passwordElement.value,
                passwordRepeat: this.passwordRepeatElement.value
            })

            if (signUpResult) {
                const loginResult = await AuthService.logIn({
                    email: signUpResult.user.email,
                    password: signUpResult.user.password,
                    rememberMe: false
                });
                if (loginResult) {
                    AuthUtils.setAuthInfo(loginResult.tokens.accessToken, loginResult.tokens.refreshToken, {
                        id: loginResult.user.id,
                        name: loginResult.user.name + ' ' + loginResult.user.lastName,
                    });
                    return this.openNewRoute('/');
                }
            }

            this.commonErrorElement.style.display = 'block';

        }
    }

}