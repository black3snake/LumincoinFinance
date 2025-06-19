import {IncomeService} from "../../services/income-service";
import {CreateEl} from "../../utils/create-el";

export class IncomeList {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.incomeListContentElement = document.getElementById("incomeList_content");
        this.popupDeleteElement = document.getElementById("popupDelete");
        this.popupNotDeleteElement = document.getElementById("popupNotDelete");
        this.popupContainerElement = document.getElementById("popupContainer");

        this.popupDeleteElement.addEventListener("click", () => {
            this.popupContainerElement.style.display = 'none';
        })
        this.popupNotDeleteElement.addEventListener("click", () => {
            this.popupContainerElement.style.display = 'none';
        })

        this.getIncomesList().then();

        document.querySelectorAll('.card_action .btn-danger').forEach(action => {
            action.addEventListener('click', () => {
                this.popupContainerElement.style.display = 'block';
            })
        })

    }

    async getIncomesList() {
        const response = await IncomeService.getIncomes();

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.showRecords(response.incomes);
    }

    showRecords(incomes) {
        for (let i = 0; i < incomes.length; i++) {
            this.incomeListContentElement.appendChild(CreateEl.createElementsList(incomes[i], '/income'));
        }
        this.incomeListContentElement.appendChild(CreateEl.createElementNew('/income/create'));
    }
}