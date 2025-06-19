import {CreateEl} from "../../utils/create-el";
import {ExpensesService} from "../../services/expenses-service";

export class ExpensesList {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.expensesListContentElement = document.getElementById("expensesList_content");
        this.popupDeleteElement = document.getElementById("popupDelete");
        this.popupNotDeleteElement = document.getElementById("popupNotDelete");
        this.popupContainerElement = document.getElementById("popupContainer");

        this.popupDeleteElement.addEventListener("click", () => {
            this.popupContainerElement.style.display = 'none';
        })
        this.popupNotDeleteElement.addEventListener("click", () => {
            this.popupContainerElement.style.display = 'none';
        })


        this.getExpensesList().then();

        document.querySelectorAll('.card_action .btn-danger').forEach(action => {
            action.addEventListener('click', () => {
                this.popupContainerElement.style.display = 'block';
            })
        })

    }

    async getExpensesList() {
        // const array = [
        //     'Еда', 'Жилье', 'Здоровье',
        //     'Кафе', 'Авто', 'Одежда',
        //     'Развлечения', 'Счета', 'Спорт'
        // ]
        const response = await ExpensesService.getExpenses();

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        return this.showRecords(response.expenses);
    }

    showRecords(expenses) {
        for (let i = 0; i < expenses.length; i++) {
            this.expensesListContentElement.appendChild(CreateEl.createElementsList(expenses[i], '/expenses'));
        }
        this.expensesListContentElement.appendChild(CreateEl.createElementNew('/expenses/create'));
    }
}