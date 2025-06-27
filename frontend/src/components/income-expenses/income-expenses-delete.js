import {UrlUtils} from "../../utils/url-utils";
import {OperationsService} from "../../services/operations-service";

export class IncomeExpensesDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        this.deleteOperation(id).then();
    }

    async deleteOperation(id) {
        const response = await OperationsService.deleteOperation(id);

        if (response.error) {
            // alert(response.error);
            console.log(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute('/income-expenses');
    }
}