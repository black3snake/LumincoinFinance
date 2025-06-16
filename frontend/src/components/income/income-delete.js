import {UrlUtils} from "../../utils/url-utils";
import {IncomeService} from "../../services/income-service";

export class IncomeDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        this.deleteIncome(id).then();
    }

    async deleteIncome(id) {
        const response = await IncomeService.deleteIncome(id);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute('/income');
    }
}