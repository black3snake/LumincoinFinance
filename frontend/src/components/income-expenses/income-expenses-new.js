export class IncomeExpensesNew {
    constructor() {


        this.incomeExpensesNewDate = null;
        const datePikOption = {
            format: 'dd.mm.yyyy',
            autoclose: true,
            language: "ru"
        }
        $('#incomeExpensesNew_date').datepicker(datePikOption).on('changeDate', (e) => {
            this.incomeExpensesNewDate = e.date;
            console.log(this.incomeExpensesNewDate);
        });
    }

}