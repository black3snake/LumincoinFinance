import {Chart, PieController, ArcElement, Tooltip, Legend, Title} from "chart.js";

export class Main {
    constructor() {

        this.ctxLeft = document.getElementById('myPieChart-left').getContext('2d');
        this.ctxRight = document.getElementById('myPieChart-right').getContext('2d');

        this.startDate = null;
        this.endDate = null;
        const datePikOption = {
            format: 'dd.mm.yyyy',
            autoclose: true,
            language: "ru"
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

        const DATA_COUNT = 5;
        const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

        const data = {
            labels: ['Красный', 'Синий', 'Желтый', 'Зеленый', 'Фиолетовый'],
            datasets: [{
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderWidth: 1
            }],
        };
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
        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: legend,
                    // title: title
                }
            },
        };
        Chart.register(PieController, ArcElement, Tooltip, Legend, Title);
        this.myPieChartL = new Chart(this.ctxLeft, config);
        this.myPieChartR = new Chart(this.ctxRight, config);

        // this.updatePieChart([40, 30, 30]);
    }

    updatePieChart(newData) {
        this.myPieChartL.data.datasets[0].data = newData;
        this.myPieChartL.update();
    }

}