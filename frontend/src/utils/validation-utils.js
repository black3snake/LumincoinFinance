export class ValidationUtils {

    static validationForm(validations) {
        let isValid = true;

        for (let i = 0; i < validations.length; i++) {
            if (!ValidationUtils.validateFields(validations[i].element, validations[i].options, validations[i].elementAppend)) {
                isValid = false;
            }
        }
        return isValid;
    }

    static validateFields(element, options, elementAppend=null) {
        let condition = element.value;
        if (options) {
            if (options.hasOwnProperty('pattern')) {
                condition = element.value && element.value.match(options.pattern);
            } else if (options.hasOwnProperty('compareTo')) {
                condition = element.value && element.value === options.compareTo;
            } else if (options.hasOwnProperty('checkProperty')) {
                condition = options.checkProperty;
            } else if (options.hasOwnProperty('checked')) {
                condition = element.checked;
            }
        }


        if (condition) {
            element.classList.remove('is-invalid');
            if (elementAppend) {
                elementAppend.style.borderColor = '#dee2e6';
            }
            return true;
        } else {
            element.classList.add('is-invalid');
            if (elementAppend) {
                element.style.borderLeft = '1px solid #dee2e6';
                elementAppend.style.border = '1px solid red';
            }
            return false;
        }

    }
}