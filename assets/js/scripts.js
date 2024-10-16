const calculate = () => {
    const num1 = document.getElementById('num1').value.trim();
    const num2 = document.getElementById('num2').value.trim();
    const result = document.getElementById('result');

    const operation = document.querySelector('input[name="operation"]:checked');

    if (!operation) {
        showError('Vui lòng chọn một phép toán');
        return;
    }
    if (isEmptyInput(num1)) {
        showError('Bạn chưa nhập số thứ nhất');
        return;
    }

    if (isEmptyInput(num2)) {
        showError('Bạn chưa nhập số thứ hai');
        return;
    }

    if (!isValidNumber(num1)) {
        showError('Số thứ nhất không hợp lệ !');
        return;
    }
    if (!isValidNumber(num2)) {
        showError('Số thứ hai không hợp lệ !');
        return;
    }

    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);
    let calcResult;

    switch (operation.value) {
        case 'add':
            calcResult = number1 + number2;
            break;
        case 'subtract':
            calcResult = number1 - number2;
            break;
        case 'multiply':
            calcResult = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                showError('Không thể chia cho 0');
                return;
            }
            calcResult = number1 / number2;
            break;
        default:
            showError('An error occurred');
            return;
    }

    result.value = calcResult;
};

const isValidNumber = (value) => {
    return !isNaN(value) && value !== '';
}

const isEmptyInput = (value) => {
    return value === '';
}

const showError = (message) => {
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorModal.classList.add('active');
};

const closeModal = () => {
    const errorModal = document.getElementById('errorModal');
    errorModal.classList.remove('active');
};
