import {UrlUtils} from "../../utils/url-utils";
import {ExpensesService} from "../../services/expenses-service";

export class ExpensesDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        this.deleteExpense(id).then();
    }

    async deleteExpense(id) {
        const response = await ExpensesService.deleteExpense(id);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute('/expenses');
    }
}