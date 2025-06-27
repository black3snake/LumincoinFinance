import {HttpUtils} from "../utils/http-utils";

export class ExpensesService {
    static async getExpenses() {
        const returnObject = {
            error: false,
            redirect: null,
            expenses: null
        };

        const result = await HttpUtils.request('/categories/expense');

        if (result.redirect || result.error || !result.response) {
            returnObject.error = 'Возникла ошибка при запросе расходов';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        returnObject.expenses = result.response;
        return returnObject;
    }

    static async getExpense(id) {
        const returnObject = {
            error: false,
            redirect: null,
            expenses: null
        };

        const result = await HttpUtils.request('/categories/expense/' + id);

        if (result.redirect || result.error || !result.response) {
            returnObject.error = 'Возникла ошибка при запросе расхода';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        returnObject.expenses = result.response;
        return returnObject;
    }

    static async updateExpense(id, data) {
        const returnObject = {
            error: false,
            redirect: null
        };

        const result = await HttpUtils.request('/categories/expense/' + id, 'PUT', true, data);
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при редактировании дохода';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        return returnObject;
    }

    static async createExpense(data) {
        const returnObject = {
            error: false,
            redirect: null,
            id: null
        };

        const result = await HttpUtils.request('/categories/expense', 'POST', true, data);

        if (result.redirect || result.error || !result.response ) {
            returnObject.error = 'Возникла ошибка при добавлении дохода';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        returnObject.id = result.response.id;
        return returnObject;
    }

    static async deleteExpense(id) {
        const returnObject = {
            error: false,
            redirect: null,
        };

        const result = await HttpUtils.request('/categories/expense/' + id, 'DELETE');

        if (result.redirect || result.error || !result.response ) {
            returnObject.error = 'Возникла ошибка при удалении заказа';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        return returnObject;
    }
}