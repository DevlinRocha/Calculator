// DECLARATIONS:

const display = document.querySelector('#display-value');
const backspaceButton = document.querySelector('#backspace-button');
const clearButton = document.querySelector('#clear-button');
const negativeButton = document.querySelector('#negative-button');
const percentButton = document.querySelector('#percent-button');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals-button');

let displayValue = 0;
let num1 = 0;
let num2 = 0;
let operator = '';

// FUNCTIONS:

function divide(num1, num2) {
    return Number(num1) / Number(num2);
};

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
};

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
};

function add(num1, num2) {
    return Number(num1) + Number(num2);
};

function operate(operator) {
    num1 = Number(num1);
    num2 = Number(num2);
    backspaceButton.dataset.work = 0;
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
        case "x":
        case "X":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return;
    };
    // The following code should follow this function whenever called:
    displayValue = num1;
    display.textContent = displayValue.toLocaleString();
};

function backspace() {
    if (backspaceButton.dataset.work == 0) {
        backspaceButton.style.backgroundColor = "red";
        backspaceButton.dataset.work = 0;
        setTimeout(function() {
            backspaceButton.style.backgroundColor = "gainsboro";
        }, 500);
    } else if (backspaceButton.dataset.work == 1) {
        let newValue = String(displayValue).slice(0,-1);
        if (newValue == '') {
            newValue = 0;
            backspaceButton.dataset.work = 0;
        }
        displayValue = newValue;
        display.textContent = Number(displayValue).toLocaleString();
    } else {
        backspaceButton.style.backgroundColor = "red";
        setTimeout(function() {
            backspaceButton.style.backgroundColor = "gainsboro";
        }, 500);
    };
};

function allClear() {
    displayValue = 0;
    display.textContent = displayValue;
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    num1 = 0;
    num2 = 0;
    operator = '';
    backspaceButton.dataset.work = 0;
};

function negative() {
    displayValue = Number(displayValue) * -1;
    display.textContent = displayValue.toLocaleString();
};

function percentage() {
    displayValue = Number(displayValue) * .01;
    display.textContent = displayValue.toLocaleString();
};

function operation() {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    this.classList.toggle('active');
    operator = this.dataset.value;
    if (num1 === 0) {
        num1 = displayValue;
        backspaceButton.dataset.work = 0;
    } else {
        num2 = displayValue;
    }
};

function equals() {
    if (backspaceButton.dataset.work == 0) { // If the display is clear
        if (num2 == 0) {
            num2 = displayValue;
        }
        num1 = operate(operator);
        displayValue = num1;
        display.textContent = displayValue.toLocaleString();
    } else {
        num2 = displayValue;
        num1 = operate(operator);
        displayValue = num1;
        display.textContent = displayValue.toLocaleString();
    };
};

function updateDisplay(e) {
    let updateValue;
    if (e.type === 'keydown') {
        e.preventDefault();
        let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
        if (key.classList.contains('number-button')) {
            updateValue = key.dataset.value;
        } else if (key.classList.contains('operator-button')) {
            // Below is nearly identical to operation() above, but "this" is replaced with "key"
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
            key.classList.toggle('active');
            operator = key.dataset.value;
            if (num1 === 0) {
                num1 = displayValue;
                backspaceButton.dataset.work = 0;
            } else {
                num2 = displayValue;
            }
            return;
        } else if (key.classList.contains('calculator-button')) {
            return equals();
        } else if (key.classList.contains('backspace-button')) {
            return backspace();
        }
    } else {
        updateValue = this.dataset.value;
    }
    if (updateValue === '.') {
        if (String(displayValue).indexOf('.') !== -1) { // If there is already a decimal
            return;
        } else if (backspaceButton.dataset.work == 0) { // If the display is clear
            displayValue = "0.";
            display.textContent = displayValue;
            backspaceButton.dataset.work = 1;
        } else {
            displayValue += updateValue;
            display.textContent = displayValue.toLocaleString();
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
            backspaceButton.dataset.work = 1;
        }
    } else if (updateValue == 0 && displayValue == 0) {
        if (String(displayValue).indexOf('.') !== -1) { // If there is a decimal
            displayValue += updateValue;
            display.textContent = displayValue;
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
            backspaceButton.dataset.work = 1;
            return
        } else {
            return;
        }
    } else if (backspaceButton.dataset.work == 0) { // If the display is clear
        displayValue = updateValue;
        display.textContent = displayValue;
        operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
        backspaceButton.dataset.work = 1;
    } else if (displayValue == "0") {
        displayValue = updateValue;
        display.textContent = displayValue;
        operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
        backspaceButton.dataset.work = 1;
    } else {
        displayValue += updateValue;
        display.textContent = Number(displayValue).toLocaleString();
        operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
        backspaceButton.dataset.work = 1;
    }
};

// EVENTS:

window.addEventListener('keydown', updateDisplay);
backspaceButton.addEventListener('click', backspace);
clearButton.addEventListener('click', allClear);
negativeButton.addEventListener('click', negative);
percentButton.addEventListener('click', percentage);
numberButtons.forEach((numberButton) => numberButton.addEventListener('click', updateDisplay));
operatorButtons.forEach((operatorButton) => operatorButton.addEventListener('click', operation));
equalsButton.addEventListener('click', equals);