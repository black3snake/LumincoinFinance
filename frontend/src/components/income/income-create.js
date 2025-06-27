import {UrlUtils} from "../../utils/url-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import {IncomeService} from "../../services/income-service";

export class IncomeCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('incomeCreateBtn').addEventListener('click', this.createIncome.bind(this));
        this.incomeCreateInputElement = document.getElementById('incomeCreate_input');

        this.validations = [
            {element: this.incomeCreateInputElement}
        ]

    }

    async createIncome(e) {
        e.preventDefault();

        if (ValidationUtils.validationForm(this.validations)) {
            const createData = {
                title: this.incomeCreateInputElement.value,
            }

            const response = await IncomeService.createIncome(createData);

            if (response.error) {
                // alert(response.error);
                console.log(response.error);
                return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            return this.openNewRoute('/income');
        }
    }

}