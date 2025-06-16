import {CommonUtils} from "../../utils/common-utils";
import {IncomeService} from "../../services/income-service";

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
        // const array = ['Депозиты', 'Зарплата', 'Сбережения', 'Инвестиции'];
        const response = await IncomeService.getIncomes();

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }



        return this.showRecords(response.incomes);
    }

    showRecords(incomes) {
        let cardElement = null;
        let cardBodyElement = null;

        for (let i = 0; i < incomes.length; i++) {
            cardElement = document.createElement("div");
            cardElement.classList.add('card');

            cardBodyElement = document.createElement("div");
            cardBodyElement.classList.add('card_body','d-flex','flex-column');

            const cardTitleElement = document.createElement("div");
            cardTitleElement.classList.add('card_title');
            cardTitleElement.innerText = incomes[i].title;

            const cardActionElement = document.createElement("div");
            cardActionElement.classList.add('card_action','d-flex');
            const buttonEditElement = document.createElement("a");
            buttonEditElement.classList.add('btn', 'btn-primary');
            buttonEditElement.innerText = "Редактировать";
            buttonEditElement.setAttribute('href', '/income/edit?id=' + incomes[i].id);  // TODO будет формироваться через id


            const buttonDeleteElement = document.createElement("a");
            buttonDeleteElement.classList.add('btn', 'btn-danger');
            buttonDeleteElement.innerText = 'Удалить';
            buttonDeleteElement.setAttribute('href', '/income/delete?id=' + incomes[i].id);

            cardActionElement.appendChild(buttonEditElement);
            cardActionElement.appendChild(buttonDeleteElement);

            cardBodyElement.appendChild(cardTitleElement);
            cardBodyElement.appendChild(cardActionElement);
            cardElement.appendChild(cardBodyElement);
            this.incomeListContentElement.appendChild(cardElement);
        }

        cardElement = document.createElement("div");
        cardElement.classList.add('card', 'card_plus');
        cardBodyElement = document.createElement("div");
        cardBodyElement.classList.add('card_body','d-flex', 'card_plus');
        let bodyPlusElement = document.createElement("a");
        bodyPlusElement.setAttribute('href', '/income/create');
        bodyPlusElement.classList.add('card_plus-text');
        bodyPlusElement.innerText = '+';
        cardBodyElement.appendChild(bodyPlusElement);
        cardElement.appendChild(cardBodyElement);
        this.incomeListContentElement.appendChild(cardElement);


    }
}