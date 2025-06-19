import {UrlUtils} from "../../utils/url-utils";
import {ExpensesService} from "../../services/expenses-service";
import {ValidationUtils} from "../../utils/validation-utils";

export class ExpensesEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('expenseEditSaveBtn').addEventListener('click', this.updateExpense.bind(this));
        this.expenseEditInputElement = document.getElementById('expenseEdit_input');

        this.validations = [
            {element: this.expenseEditInputElement}
        ]
        this.init(id).then();
    }

    async init(id) {
        const expenseData = await this.getExpense(id);
        if (expenseData) {
            this.showExpense(expenseData);
        }
    }

    async getExpense(id) {
        const response = await ExpensesService.getExpense(id);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.expenseOriginalData = response.expenses;
        return response.expenses;
    }

    showExpense(expense) {
        this.expenseEditInputElement.value = expense.title;
    }

    async updateExpense(e) {
        e.preventDefault();

        if (ValidationUtils.validationForm(this.validations)) {
            const changedData = {};

            if (this.expenseEditInputElement.value !== this.expenseOriginalData.title) {
                changedData.title = this.expenseEditInputElement.value;
            }

            if (Object.keys(changedData).length > 0) {
                const response = await ExpensesService.updateExpense(this.expenseOriginalData.id, changedData);

                if (response.error) {
                    alert(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }

                return this.openNewRoute('/expenses');
            }
        }
    }

}