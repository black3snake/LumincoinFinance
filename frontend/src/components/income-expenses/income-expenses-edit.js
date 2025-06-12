export class IncomeExpensesEdit {
    constructor() {


        this.incomeExpensesEditDate = null;
        const datePikOption = {
            format: 'dd.mm.yyyy',
            autoclose: true,
            language: "ru"
        }
        $('#incomeExpensesNew_date').datepicker(datePikOption).on('changeDate', (e) => {
            this.incomeExpensesEditDate = e.date;
            console.log(this.incomeExpensesEditDate);
        });
    }

}