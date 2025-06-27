import moment from "moment/moment";
import {UrlUtils} from "../../utils/url-utils";
import {IncomeService} from "../../services/income-service";
import {ExpensesService} from "../../services/expenses-service";
import {OperationsService} from "../../services/operations-service";
import {ValidationUtils} from "../../utils/validation-utils";

export class IncomeExpensesEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/income-expenses');
        }

        this.incomeExpensesEditDate = null;
        this.calendarElement = $('#incomeExpensesEdit_date');
        const datePikOption = {
            format: 'dd.mm.yyyy',
            autoclose: true,
            language: "ru"
        }
        this.calendarElement.datepicker(datePikOption).on('changeDate', (e) => {
            this.incomeExpensesEditDate = moment(e.date).format('YYYY-MM-DD');
            console.log(this.incomeExpensesEditDate);
        });

        this.typeSelectElement = document.getElementById('incomeExpensesEdit_typeSelect');
        this.categorySelectElement = document.getElementById('incomeExpensesEdit_categorySelect');
        this.amountElement = document.getElementById('incomeExpensesEdit_amount');
        this.dateElement = document.getElementById('incomeExpensesEdit_date');
        this.commentElement = document.getElementById('incomeExpensesEdit_comment');

        this.validations = [
            {element: this.categorySelectElement},
            {element: this.amountElement},
            {element: this.dateElement},
            {element: this.commentElement},
        ]

        this.init(id).then();
        document.getElementById('incomeExpensesEditSaveBtn').addEventListener('click', this.updateOperation.bind(this));

    }

    async init(id) {
        // отключим первый select
        ['click', 'mousedown', 'keydown', 'focus'].forEach(evt => {
            this.typeSelectElement.addEventListener(evt, e => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        this.operation = await this.getOperation(id);

        // заполним поля
        for (let i = 0; i < this.typeSelectElement.options.length; i++) {
            if (this.typeSelectElement.options[i].value === this.operation.type) {
                this.typeSelectElement.selectedIndex = i;
            }
        }
        if (this.operation.type.includes('income')) {
            await this.getIncomes().then();
        } else {
            await this.getExpenses().then();
        }

        for (let i = 0; i < this.categorySelectElement.options.length; i++) {
            if (this.categorySelectElement.options[i].innerText === this.operation.category) {
                this.categorySelectElement.selectedIndex = i;
            }
        }

        this.amountElement.value = this.operation.amount;
        this.commentElement.value = this.operation.comment;
        this.calendarElement.datepicker('setDate', new Date(this.operation.date));
    }

    async getIncomes() {
        const response = await IncomeService.getIncomes();

        if (response.error) {
            // alert(response.error);
            console.log(response.error);
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
            // alert(response.error);
            console.log(response.error);
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

    async getOperation(id) {
        const response = await OperationsService.getOperation(id);

        if (response.error) {
            // alert(response.error);
            console.log(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        return response.operations;
    }

    async updateOperation(e) {
        e.preventDefault();

        if (ValidationUtils.validationForm(this.validations)) {
            const changedData = {
                type: this.operation.type,
                amount: parseInt(this.operation.amount),
                date: this.incomeExpensesEditDate,
                comment: this.operation.comment,
                category_id: parseInt(this.categorySelectElement.value)
            };

            // select
            if (this.typeSelectElement.value !== this.operation.type) {
                changedData.type = this.typeSelectElement.value;
            }
            if (this.categorySelectElement.options[this.categorySelectElement.selectedIndex].innerText !== this.operation.category) {
                changedData.category_id = parseInt(this.categorySelectElement.value);
            }
            // amount
            if (parseInt(this.amountElement.value) !== parseInt(this.operation.amount)) {
                changedData.amount = parseInt(this.amountElement.value);
            }
            // calendar  new Date(this.operation.date)
            if (this.incomeExpensesEditDate) {
                changedData.date = this.incomeExpensesEditDate;
            }
            // comment
            if (this.commentElement.value !== this.operation.comment) {
                changedData.comment = this.commentElement.value;
            }

            if (Object.keys(changedData).length > 0) {
                const response = await OperationsService.updateOperation(this.operation.id, changedData);

                if (response.error) {
                    // alert(response.error);
                    console.log(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }

                return this.openNewRoute('/income-expenses');
            }
        }
    }
}