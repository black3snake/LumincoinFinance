import {ValidationUtils} from "../../utils/validation-utils";
import {ExpensesService} from "../../services/expenses-service";

export class ExpensesCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('expenseCreateBtn').addEventListener('click', this.createExpense.bind(this));
        this.expenseCreateInputElement = document.getElementById('expenseCreate_input');

        this.validations = [
            {element: this.expenseCreateInputElement}
        ]
    }

    async createExpense(e) {
        e.preventDefault();

        if (ValidationUtils.validationForm(this.validations)) {
            const createData = {
                title: this.expenseCreateInputElement.value,
            }

            const response = await ExpensesService.createExpense(createData);

            if (response.error) {
                alert(response.error);
                return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            return this.openNewRoute('/expenses');
        }
    }
}