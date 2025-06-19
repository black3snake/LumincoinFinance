import {UrlUtils} from "../../utils/url-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import {IncomeService} from "../../services/income-service";
import {ExpensesService} from "../../services/expenses-service";
import {OperationsService} from "../../services/operations-service";
import moment from "moment";

export class IncomeExpensesNew {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const path = UrlUtils.getUrlParam('path');
        if (!path) {
            return this.openNewRoute('/income-expenses');
        }

        this.typeSelectElement = document.getElementById('incomeExpensesNew_typeSelect');
        this.categorySelectElement = document.getElementById('incomeExpensesNew_categorySelect');
        this.amountElement = document.getElementById('incomeExpensesNew_amount');
        this.dateElement = document.getElementById('incomeExpensesNew_date');
        this.commentElement = document.getElementById('incomeExpensesNew_comment');

        this.validations = [
            {element: this.categorySelectElement},
            {element: this.amountElement},
            {element: this.dateElement},
            {element: this.commentElement},
        ]

        this.incomeExpensesNewDate = null;
        const datePikOption = {
            format: 'dd.mm.yyyy',
            autoclose: true,
            language: "ru"
        }
        $('#incomeExpensesNew_date').datepicker(datePikOption).on('changeDate', (e) => {
            this.incomeExpensesNewDate = moment(e.date).format('YYYY-MM-DD');
            console.log(this.incomeExpensesNewDate);
        });


        this.init(path);

        document.getElementById('incomeExpensesNewCreateBtn').addEventListener('click', this.saveOperation.bind(this));

    }

    init(path) {
        // отключим первый select
        ['click', 'mousedown', 'keydown', 'focus'].forEach(evt => {
            this.typeSelectElement.addEventListener(evt, e => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // заполним поля
        for (let i = 0; i < this.typeSelectElement.options.length; i++) {
            if (this.typeSelectElement.options[i].value === path) {
                this.typeSelectElement.selectedIndex = i;
            }
        }
        if (path.includes('income')) {
            this.getIncomes().then();
        } else {
            this.getExpenses().then();
        }
    }

    async getIncomes() {
        const response = await IncomeService.getIncomes();

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        const option0 = new Option("Категория...", "", true, true);
        option0.hidden = true;
        option0.disabled = true;
        this.categorySelectElement.insertBefore(option0, this.categorySelectElement.firstChild);

        for (let i = 0; i < response.incomes.length; i++) {
            const option = document.createElement("option");
            option.value = response.incomes[i].id;
            option.innerText = response.incomes[i].title;
            this.categorySelectElement.appendChild(option);
        }
    }

    async getExpenses() {
        const response = await ExpensesService.getExpenses();

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        const option0 = new Option("Категория...", "", true, true);
        option0.hidden = true;
        option0.disabled = true;
        this.categorySelectElement.insertBefore(option0, this.categorySelectElement.firstChild);

        for (let i = 0; i < response.expenses.length; i++) {
            const option = document.createElement("option");
            option.value = response.expenses[i].id;
            option.innerText = response.expenses[i].title;
            this.categorySelectElement.appendChild(option);
        }
    }


    async saveOperation(e) {
        e.preventDefault();

        if (ValidationUtils.validationForm(this.validations)) {
            const createData = {
                type: this.typeSelectElement.value,
                amount: this.amountElement.value,
                date: this.incomeExpensesNewDate,
                comment: this.commentElement.value,
                category_id: parseInt(this.categorySelectElement.value)
            };

            const response = await OperationsService.createIncome(createData);

            if (response.error) {
                alert(response.error);
                return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            return this.openNewRoute('/income-expenses');

        }
    }

}