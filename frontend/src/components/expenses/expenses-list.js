import {CreateEl} from "../../utils/create-el";

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


        this.getExpensesList();

        document.querySelectorAll('.card_action .btn-danger').forEach(action => {
            action.addEventListener('click', () => {
                this.popupContainerElement.style.display = 'block';
            })
        })

    }

    getExpensesList() {
        const array = [
            'Еда', 'Жилье', 'Здоровье',
            'Кафе', 'Авто', 'Одежда',
            'Развлечения', 'Счета', 'Спорт'
        ]

        return this.showRecords(array);
    }

    showRecords(expenses) {

        for (let i = 0; i < expenses.length; i++) {
            let cardElement = CreateEl.createElementsList(expenses[i], '/expenses/edit');
            this.expensesListContentElement.appendChild(cardElement);
        }
        this.expensesListContentElement.appendChild(CreateEl.createElementNew('/expenses/create'));
    }
}