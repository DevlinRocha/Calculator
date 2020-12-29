// DECLARATIONS:

const display = document.querySelector('#display-value');
const clearButton = document.querySelector('#clear-button');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals-button');
const negativeButton = document.querySelector('#negative-button');
const percentButton = document.querySelector('#percent-button');

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

function operate(operator) {
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
    if (this.dataset.value === '.') {
        if (String(displayValue).indexOf('.') !== -1) {
            return;
        } else {
            displayValue += this.dataset.value;
            display.textContent = displayValue;
        }
    } else {
        displayValue += this.dataset.value;
        display.textContent = Number(displayValue);
        displayValue = Number(displayValue);
    };
};

function equals() {
    if (num2 === 0) {
        num2 = Number(displayValue);
        num1 = operate(operator);
        num2 = 0; // new
    } else {
        num1 = operate(operator);
        num2 = 0; // new
    }
    
    //THESE ARE FROM OPERATE() {
        displayValue = Number(num1);
        display.textContent = Number(displayValue);
        
        // need this?????
        displayValue = 0;
};

function operation() {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    this.classList.toggle('active');
    operator = this.dataset.value;
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

// NEW FUNCTIONS:

function negative() {
    displayValue = Number(displayValue) * -1;
    display.textContent = displayValue;
}

function percentage() {
    displayValue = Number(displayValue) * .01;
    display.textContent = displayValue;
}

// EVENTS:

clearButton.addEventListener('click', allClear);
numberButtons.forEach((numberButton) => numberButton.addEventListener('click', updateDisplay));
equalsButton.addEventListener('click', equals);
operatorButtons.forEach((operatorButton) => operatorButton.addEventListener('click', operation));
negativeButton.addEventListener('click', negative);
percentButton.addEventListener('click', percentage);