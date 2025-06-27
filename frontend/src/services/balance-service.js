import {HttpUtils} from "../utils/http-utils";

export class BalanceService {
    static async getBalance() {
        const returnObject = {
            error: false,
            redirect: null,
            balance: null,
        };
        const result = await HttpUtils.request('/balance');

        if (result.redirect || result.error || !result.response) {
            returnObject.error = 'Возникла ошибка при запросе баланса';
            if (result.redirect) {
                returnObject.redirect = result.redirect;  // перевод пользователя на другую страницу
            }
            return returnObject;
        }
        returnObject.balance = result.response.balance;
        return returnObject;
    }
}