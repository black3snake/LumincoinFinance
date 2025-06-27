import {HttpUtils} from "../utils/http-utils";

export class OperationsService {
    static async getOperations(filter) {
        const returnObject = {
            error: false,
            redirect: null,
            operations: null
        };

        const {period, dateFrom, dateTo} = filter;
        const result = await HttpUtils.request(  dateFrom && dateTo ? `/operations?period=${period}&dateFrom=${dateFrom}&dateTo=${dateTo}` :
            `/operations?period=${period}`);

        if (result.redirect || result.error || !result.response) {
            // (result.response && (result.response.error || !result.response.message || result.response.message))) {
            returnObject.error = 'Возникла ошибка при запросе операций';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        returnObject.operations = result.response;
        return returnObject;
    }

    static async createOperation(data) {
        const returnObject = {
            error: false,
            redirect: null,
            id: null
        };

        const result = await HttpUtils.request('/operations', 'POST', true, data);

        if (result.redirect || result.error || !result.response ) {
            returnObject.error = 'Возникла ошибка при добавлении операции';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        returnObject.id = result.response.id;
        return returnObject;
    }

    static async getOperation(id) {
        const returnObject = {
            error: false,
            redirect: null,
            operations: null
        };

        const result = await HttpUtils.request('/operations/' + id);

        if (result.redirect || result.error || !result.response) {
            returnObject.error = 'Возникла ошибка при запросе операции';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        returnObject.operations = result.response;
        return returnObject;
    }

    static async updateOperation(id, data) {
        const returnObject = {
            error: false,
            redirect: null
        };

        const result = await HttpUtils.request('/operations/' + id, 'PUT', true, data);
        if (result.redirect || result.error || !result.response ) {
            returnObject.error = 'Возникла ошибка при редактировании операции';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        return returnObject;
    }

    static async deleteOperation(id) {
        const returnObject = {
            error: false,
            redirect: null,
        };

        const result = await HttpUtils.request('/operations/' + id, 'DELETE');

        if (result.redirect || result.error || !result.response ) {
            returnObject.error = 'Возникла ошибка при удалении операции';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        return returnObject;
    }
}