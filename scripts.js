// DECLARATIONS:

const display = document.querySelector('#display-value');
const clearButton = document.querySelector('#clear-button');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals-button');

let displayValue = 0;
let num1 = 0;
let num2 = 0;
let operator = '';

// FUNCTIONS:

function add(num1, num2) {
    return Number(num1) + Number(num2);
};

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
};

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
};

function divide(num1, num2) {
    return Number(num1) / Number(num2);
};

function operate(operator) { // MAYBE REMOVE NUM1 NUM2
    switch (operator) {
        case "+":
            return Number(add(num1, num2));
        case "-":
            return Number(subtract(num1, num2));
        case "*":
        case "x":
        case "X":
            return Number(multiply(num1, num2));
        case "/":
            return Number(divide(num1, num2));
        default:
            return;
    };
    displayValue = Number(num1);
    display.textContent = Number(displayValue);
};

function updateDisplay() {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    displayValue += this.dataset.value;
    display.textContent = Number(displayValue);
};

function equals() {
    if (num2 === 0) {
        num2 = Number(displayValue);
        num1 = operate(operator);
        num2 = 0; // new
    } else {
        num1 = operate(operator); //MAYBE REMOVE NUM1 NUM2
        num2 = 0; // new
    }
    //displayValue = 0;

    //THESE ARE FROM OPERATE() {
    displayValue = Number(num1);
    display.textContent = Number(displayValue);
}

function operation() {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    this.classList.toggle('active');
    if (num1 === 0) {
        num1 = Number(displayValue);
    } else if (num2 === 0) {
        num2 = Number(displayValue);
        num1 = operate(operator);
            // THESE ARE FROM OPERATE() {
        displayValue = Number(num1);
        display.textContent = Number(displayValue);
        num2 = 0; // new
    }
    operator = this.dataset.value;
    displayValue = 0;
}

function allClear() {
    displayValue = 0;
    display.textContent = Number(displayValue);
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    num1 = 0;
    num2 = 0;
    operator = '';
}

// EVENTS:

clearButton.addEventListener('click', allClear);
numberButtons.forEach((numberButton) => numberButton.addEventListener('click', updateDisplay));
equalsButton.addEventListener('click', equals);
operatorButtons.forEach((operatorButton) => operatorButton.addEventListener('click', operation));