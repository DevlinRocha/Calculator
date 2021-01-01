// DECLARATIONS:

const display = document.querySelector('#display-value');
const clearButton = document.querySelector('#clear-button');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals-button');
const negativeButton = document.querySelector('#negative-button');
const percentButton = document.querySelector('#percent-button');
const backspaceButton = document.querySelector('#backspace-button');

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
    backspaceButton.dataset.work = 0;
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

function updateDisplay(e) {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    let updateValue;
    if (e.type === 'keydown') {
        e.preventDefault();
        let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
        if (key.classList.contains('number-button')) {
            updateValue = key.dataset.value;
            backspaceButton.dataset.work = 1;
        } else if (key.classList.contains('operator-button')) {
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
            key.classList.toggle('active');
            operator = key.dataset.value;
            if (num1 === 0) {
                num1 = Number(displayValue);
            } else if (num2 === 0) {
                num2 = Number(displayValue);
                num1 = operate(operator);
                displayValue = Number(num1);
                return display.textContent = Number(displayValue);
                //return num2 = 0;
            }
            return displayValue = 0;
        } else if (key.classList.contains('calculator-button')) {
            return equals();
        } else if (key.classList.contains('backspace-button')) {
            return backspace();
        }
    } else {
        updateValue = this.dataset.value;
    }
    if (updateValue === '.') {
        if (String(displayValue).indexOf('.') !== -1) {
            return;
        } else {
            displayValue += updateValue;
            display.textContent = displayValue;
        }
    } else {
        displayValue += updateValue;
        display.textContent = Number(displayValue);
        displayValue = Number(displayValue);
    };
};

function equals() {
    //if (num1 === 0) {
        //    num1 = Number(displayValue);
        //} else if (num2 === 0) {
            //    num2 = Number(displayValue);
            //};
    num2 = Number(displayValue);
    num1 = operate(operator);
    displayValue = Number(num1);
    display.textContent = Number(displayValue);
    //displayValue = 0;
    //num2 = 0;
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
        displayValue = Number(num1);
        display.textContent = Number(displayValue);
        //num2 = 0;
        }
    //displayValue = 0;
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

function backspace() {
    if (backspaceButton.dataset.work > 0) {
        let newValue = String(displayValue).slice(0,-1);
        displayValue = Number(newValue);
        display.textContent = displayValue;
    }
}

// EVENTS:

window.addEventListener('keydown', updateDisplay);
backspaceButton.addEventListener('click', backspace);
clearButton.addEventListener('click', allClear);
numberButtons.forEach((numberButton) => numberButton.addEventListener('click', updateDisplay));
equalsButton.addEventListener('click', equals);
operatorButtons.forEach((operatorButton) => operatorButton.addEventListener('click', operation));
negativeButton.addEventListener('click', negative);
percentButton.addEventListener('click', percentage);