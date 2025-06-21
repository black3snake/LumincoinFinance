import {Chart, PieController, ArcElement, Tooltip, Legend, Title} from "chart.js";
import {AuthUtils} from "../utils/auth-utils";
import moment from "moment/moment";
import {IncomeService} from "../services/income-service";
import {ExpensesService} from "../services/expenses-service";
import {OperationsService} from "../services/operations-service";

export class Main {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.ctxLeft = document.getElementById('myPieChart-left').getContext('2d');
        this.ctxRight = document.getElementById('myPieChart-right').getContext('2d');
        this.intervalInputElement = document.getElementById('btnradio5');
        this.startDateElement = $('#startDate');
        this.endDateElement = $('#endDate');

        const than = this;
        document.querySelectorAll('.main_switch input.btn-check').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.checked) {
                    // console.log(e.target);
                    console.log(item.nextElementSibling.innerText);
                    if (!item.nextElementSibling.innerText.includes('Интервал')) {
                        than.startDateElement.val('');
                        than.endDateElement.val('');
                        // than.getIncomeExpensesList(than.funcFilter(item.nextElementSibling.innerText)).then();
                    }
                }
            })
        });

        this.periodDate = {
            period: 'year',
            dateFrom: null,
            dateTo: null,
        }


        this.startDate = null;
        this.endDate = null;
        const datePikOption = {
            format: 'dd.mm.yyyy',
            autoclose: true,
            language: "ru"
        }
        this.startDateElement.datepicker(datePikOption).on('changeDate', (e) => {
            if (this.intervalInputElement.checked) {
                this.endDateElement.datepicker('setStartDate', e.date);
                this.startDate = e.date;
                // console.log(this.startDate);
                if (this.startDate && this.endDate) {
                    this.periodDate.dateFrom = moment(this.startDate).format('YYYY-MM-DD');
                    this.periodDate.dateTo = moment(this.endDate).format('YYYY-MM-DD');
                    // this.getIncomeExpensesList(this.funcFilter('Интервал')).then();
                }
            } else {
                this.startDateElement.val('');
            }
        });

        this.endDateElement.datepicker(datePikOption).on('changeDate', (e) => {
            if (this.intervalInputElement.checked) {
                this.endDateElement.datepicker('setEndDate', e.date);
                this.endDate = e.date;
                // console.log(this.endDate.toISOString());
                if (this.startDate && this.endDate) {
                    this.periodDate.dateFrom = moment(this.startDate).format('YYYY-MM-DD');
                    this.periodDate.dateTo = moment(this.endDate).format('YYYY-MM-DD');
                    // this.getIncomeExpensesList(this.funcFilter('Интервал')).then();
                }
            } else {
                this.endDateElement.val('');
            }
        });

        // data for Chart
        this.dataForChart = {
            incomesTitle: null,
            incomesData: [],
            expensesTitle: null,
            expensesData: [],
            colors: ['Красный', 'Зеленый', 'Синий', 'Черный', 'Белый', 'Серый', 'Оранжевый', 'Желтый', 'Розовый', 'Коричневый', 'Фиолетовый', 'Пурпурный'],
            color_rgb: [
                'rgb(249,1,1)',
                'rgb(9,170,74)',
                'rgb(0,88,255)',
                'rgb(0,0,0)',
                'rgb(255,255,255)',
                'rgb(176,176,176)',
                'rgb(255,109,2)',
                'rgb(246,187,80)',
                'rgb(251,158,158)',
                'rgb(119,49,49)',
                'rgba(153, 102, 255, 0.8)',
                'rgb(255,0,255)',
            ],
            operationIncomes: null,
            operationExpenses: null,
        }

        this.init().then();


        // const DATA_COUNT = 5;
        // const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

        // const data = {
        //     labels: ['Красный', 'Синий', 'Желтый', 'Зеленый', 'Фиолетовый'],
        //     datasets: [{
        //         data: [12, 19, 3, 5, 2],
        //         backgroundColor: [
        //             'rgba(255, 99, 132, 0.8)',
        //             'rgba(54, 162, 235, 0.8)',
        //             'rgba(255, 206, 86, 0.8)',
        //             'rgba(75, 192, 192, 0.8)',
        //             'rgba(153, 102, 255, 0.8)'
        //         ],
        //         borderWidth: 1
        //     }],
        // };
        // const title = {
        //     display: true,
        //     color: '#290661',
        //     font: {
        //         family: "'Roboto Medium', sans-serif",
        //         size: 28,
        //         lineHeight: 1.2,
        //         weight: 'normal',
        //     },
        //     padding: {
        //         top: 20,
        //         bottom: 20
        //     },
        //     align: 'center', // 'start', 'center', 'end'
        //     position: 'top' // 'top', 'bottom'
        // }
        // title.text = 'Доходы';

        // const legend = {
        //     display: true,
        //     position: 'top',
        //     labels: {
        //         boxWidth: 12,
        //         boxHeight: 12,
        //         color: '#000', // цвет текста
        //         font: {
        //             size: 12, // размер шрифта
        //             family: "'Roboto Medium', sans-serif",
        //         },
        //         padding: 0,
        //     },
        //
        // }
        // const config = {
        //     type: 'pie',
        //     data: data,
        //     options: {
        //         responsive: true,
        //         plugins: {
        //             legend: legend,
        //             // title: title
        //         }
        //     },
        // };
        // Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
        // this.myPieChartL = new Chart(this.ctxLeft, config);
        // this.myPieChartR = new Chart(this.ctxRight, config);

        // this.updatePieChart([40, 30, 30]);
    }

    async init() {
        const incomeData = await this.getIncomes();
        const expenseData = await this.getExpenses();
        this.dataForChart.incomesTitle = incomeData.map(item => item.title);
        this.dataForChart.expensesTitle = expenseData.map(item => item.title);

        console.log(this.dataForChart.incomesTitle);
        console.log(this.dataForChart.expensesTitle);


        const operationData = await this.getOperations();
        this.dataForChart.operationIncomes = operationData.filter(item => item.type === 'income');
        this.dataForChart.operationExpenses = operationData.filter(item => item.type === 'expense');

        await this.funcFillData();

        console.log(this.dataForChart.incomesData);
        console.log(this.dataForChart.expensesData);

        this.showChart(this.dataForChart);
    }

    funcFillData() {

        for (let i = 0; i < this.dataForChart.incomesTitle.length; i++) {
            let item = 0;
            for (let j = 0; j < this.dataForChart.operationIncomes.length; j++) {
                if (this.dataForChart.incomesTitle[i] === this.dataForChart.operationIncomes[j].category) {
                    item += parseInt(this.dataForChart.operationIncomes[j].amount);
                }
            }
            this.dataForChart.incomesData.push(item);
        }

        for (let i = 0; i < this.dataForChart.expensesTitle.length; i++) {
            let item = 0;
            for (let j = 0; j < this.dataForChart.operationExpenses.length; j++) {
                if (this.dataForChart.expensesTitle[i] === this.dataForChart.operationExpenses[j].category) {
                    item += parseInt(this.dataForChart.operationExpenses[j].amount);
                }
            }
            this.dataForChart.expensesData.push(item);
        }
        console.log()

    }

    async getIncomes() {
        const response = await IncomeService.getIncomes();

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        return response.incomes;
    }

    async getExpenses() {
        const response = await ExpensesService.getExpenses();

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        return response.expenses;
    }

    funcFilter(action) {

        switch (action) {
            case 'Сегодня':
                this.periodDate.period = '';
                break;
            case 'Неделя':
                this.periodDate.period = 'week';
                break;
            case 'Месяц':
                this.periodDate.period = 'month';
                break;
            case 'Год':
                this.periodDate.period = 'year'
                break;
            case 'Все':
                this.periodDate.period = 'all'
                break;
            case 'Интервал':
                this.periodDate.period = 'interval';
                break;
        }
        return this.periodDate;
    }

    async getOperations(filter = this.periodDate) {
        const response = await OperationsService.getOperations(filter);
        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
        return response.operations;
    }





    showChart(objectData) {
        const dataIncomes = {
            labels: objectData.incomesTitle,
                // ['Красный', 'Синий', 'Желтый', 'Зеленый', 'Фиолетовый'],
            datasets: [{
                data: objectData.incomesData,
                backgroundColor: objectData.color_rgb.slice(0, objectData.incomesData.length),
                borderWidth: 1
            }],
        };
        const dataExpenses = {
            labels: objectData.expensesTitle,
            datasets: [{
                data: objectData.expensesData,
                backgroundColor: objectData.color_rgb.slice(0, objectData.expensesData.length),
                borderWidth: 1
            }],
        };

        const legend = {
            display: true,
            position: 'top',
            labels: {
                boxWidth: 12,
                boxHeight: 12,
                color: '#000', // цвет текста
                font: {
                    size: 12, // размер шрифта
                    family: "'Roboto Medium', sans-serif",
                },
                padding: 0,
            },

        }

        const configIncomes = {
            type: 'pie',
            data: dataIncomes,
            options: {
                responsive: true,
                plugins: {
                    legend: legend,
                    // title: title
                }
            },
        };
        const configExpenses = {
            type: 'pie',
            data: dataExpenses,
            options: {
                responsive: true,
                plugins: {
                    legend: legend,
                    // title: title
                }
            },
        };

        Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
        // this.myPieChartL =
            new Chart(this.ctxLeft, configIncomes);
        // this.myPieChartR =
            new Chart(this.ctxRight, configExpenses);
    }


    // updatePieChart(newData) {
    //     this.myPieChartL.data.datasets[0].data = newData;
    //     this.myPieChartL.update();
    // }

}