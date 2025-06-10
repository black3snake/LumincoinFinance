// import DataTable from 'datatables.net-bs5';
import DataTable from 'datatables.net-dt';
import {CommonUtils} from "../../utils/common-utils";

export class IncomeExpensesList {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.createIncomeElement = document.getElementById('createIncome');
        this.createExpenseElement = document.getElementById('createExpense');

        this.startDate = null;
        this.endDate = null;
        const datePikOption = {
            format: 'dd.mm.yyyy',
            autoclose: true,
            language: "ru",

        }
        $('#startDate').datepicker(datePikOption).on('changeDate', (e) => {
            $('#endDate').datepicker('setStartDate', e.date);
            this.startDate = e.date;
            console.log(this.startDate);
        });

        $('#endDate').datepicker(datePikOption).on('changeDate', (e) => {
            $('#startDate').datepicker('setEndDate', e.date);
            this.endDate = e.date;
            console.log(this.endDate.toISOString());
        });


        this.getIncomeExpensesList() //.then();

       this.createIncomeElement.addEventListener('click', (e) => {
           this.openNewRoute('/income-expenses/new');
       })
    }

    getIncomeExpensesList() {
        const response = [
            {
                "id": 1,
                "user_id": 1,
                "category_expense_id": null,
                "category_income_id": "зарплата",
                "type": "income",
                "amount": 50000,
                "date": "2022-09-11",
                "comment": "ЗП"
            },
            {
                "id": 2,
                "user_id": 1,
                "category_expense_id": "жилье",
                "category_income_id": null,
                "type": "expense",
                "amount": 2500,
                "date": "2022-09-12",
                "comment": "Оплата квартиры"
            },
        ]

        this.showRecords(response);
    }

    showRecords(incomeExpenses) {
        const recordsElement = document.getElementById('records');
        for (let i = 0; i < incomeExpenses.length; i++) {
            const trElement = document.createElement('tr');
            trElement.insertCell().innerText = incomeExpenses[i].id;
            if (incomeExpenses[i].type === 'income') {
                let cellEl = trElement.insertCell()
                cellEl.style.color = 'green'
                cellEl.textContent = incomeExpenses[i].type;
            } else {
                let cellEl = trElement.insertCell()
                cellEl.style.color = 'red'
                cellEl.textContent = incomeExpenses[i].type;
            }
            trElement.insertCell().innerText = incomeExpenses[i].category_expense_id ? incomeExpenses[i].category_expense_id : incomeExpenses[i].category_income_id;
            trElement.insertCell().innerText = incomeExpenses[i].amount + '$';
            trElement.insertCell().innerText = incomeExpenses[i].date;
            trElement.insertCell().innerText = incomeExpenses[i].comment;

            trElement.insertCell().innerHTML = CommonUtils.generateGridToolsColumn('incomeExpenses', incomeExpenses[i].id)

            recordsElement.appendChild(trElement);
        }


        new DataTable('#data-table', {
            // Включение/отключение компонентов
            dom: 'rt', // Расположение элементов
            // Дополнительные стилевые настройки
            // style: 'width: 100%',
            // Автоматическая ширина столбцов
            autoWidth: false,
            // Растягивание таблицы по ширине контейнера
            // responsive: true,
            columnDefs: [
                {
                    targets: [0, 1, 2, 3, 4], // индексы столбцов (начиная с 0)
                    className: 'dt-center' // встроенный класс DataTables для центрирования
                }
            ],
            language: {
                "paginate": {
                    "next": "Вперед",
                    "previous": "Назад"
                },
            }
        });


        // Применяем обработчик к ссылке
        const than = this; // сохраним контекст
        document.querySelectorAll('a.trash').forEach(link => {
            link.addEventListener('click', async function (e) {
                e.preventDefault();
                try {
                    const confirmed = await CommonUtils.showConfirmationDialog('Вы действительно хотите удалить операцию?');
                    if (confirmed) {
                        console.log("Переход удался")
                        console.log(`this..href ${this.href}`)
                        than.openNewRoute(this.href);
                    }
                } catch (error) {
                    console.log('Пользователь отменил переход');
                }
            });
        });

    }

}