// DECLARATIONS:

const main = document.querySelector('#main');
const display = document.querySelector('#display-value');
const backspaceButton = document.querySelector('#backspace-button');
const clearButton = document.querySelector('#clear-button');
const negativeButton = document.querySelector('#negative-button');
const percentButton = document.querySelector('#percent-button');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equalsButton = document.querySelector('#equals-button');

let displayValue = 0;
let num1 = '-0';
let num2 = '-0';
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
        case "/":
            num1 = divide(num1, num2);
            break;
        case "*":
            num1 = multiply(num1, num2);
            break;
        case "-":
            num1 = subtract(num1, num2);
            break;
        case "+":
            num1 = add(num1, num2);
            break;
        default:
            console.error('Default operator')
    };
    displayValue = num1;
    display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
};

function backspace() {
    function noWork() {
        backspaceButton.style.backgroundColor = "red";
        setTimeout(function() {
            backspaceButton.style.backgroundColor = "gainsboro";
        }, 500);   
    };
    function yesWork() {
        const active = document.querySelector('.active');
        let newValue = String(displayValue).slice(0,-1);
        switch (true) {
            case (active):
                console.error('This shouldn\t happen!');
                noWork();
                break;
            case (newValue === ''):
                newValue = 0;
                backspaceButton.dataset.work = 0;
                break;
            case (newValue === '-'):
                newValue = '-0';
        };
        displayValue = newValue;
        display.textContent = displayValue;
    };
    switch (true) {
        case (1 / displayValue === -Infinity): // The display was -0
            displayValue = 0;
            display.textContent = displayValue;
            break;
        case (backspaceButton.dataset.work == 0): // Backspace should not work
            noWork();
            break;
        case (backspaceButton.dataset.work == 1): // Backspace should work
            yesWork();
            break;
        default:
            console.error('This should not happen');
            yesWork();
    };
};

function allClear() {
    displayValue = 0;
    display.textContent = displayValue;
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    num1 = '-0';
    num2 = '-0';
    operator = '';
    backspaceButton.dataset.work = 0;
};

function negative() {
    const active = document.querySelector('.active');
    function reverseZero() {
        if (1 / displayValue == -Infinity) { // If display is -0
            displayValue = 0;
            display.textContent = displayValue;
            backspaceButton.dataset.work = 0;
        } else if (active || displayValue == 0) {
            displayValue = '-0';
            display.textContent = displayValue;
            backspaceButton.dataset.work = 1;
        } else {
            console.error('This isn\'t supposed to happen!');
            return;
        };
    };
    if (active) { // If there is an active operator button
        reverseZero();
    } else { // If there is no active operator button
        if (displayValue == 0 && String(displayValue).indexOf('.') == -1) { // If display value == 0 and has no decimal
            reverseZero();
        } else { // displayValue is not 0 or has a decimal
            if (String(displayValue).indexOf('-') == -1) { // If displayValue doesn't have '-' sign
                num1 *= -1;
                displayValue = '-' + displayValue;
                display.textContent = displayValue;
            } else { // If displayValue does have '-' sign
                num1 *= -1;
                displayValue = String(displayValue).replace('-','');
                display.textContent = displayValue;
            };
        };
    };
};

function percentage() {
    displayValue = Number(displayValue) * .01;
    display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
};

function operation(key=0) {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    const setOperator = () => { // Must be an arrow function for "this" functionality
        if (this == window) { // If event is from keyboard
            key.classList.toggle('active');
            operator = key.dataset.value;
        } else { // If event is from on-screen buttons
            this.classList.toggle('active');
            operator = this.dataset.value;
        };    
    };
    if (1 / num1 === -Infinity) { // If num1 is 'undefined'
        num1 = displayValue;
        backspaceButton.dataset.work = 0;
        setOperator();
    } else if (backspaceButton.dataset.work == 0) { // If num1 has a value, display is clear
        setOperator();
    } else { // If num1 has a value, and the display is not clear
        equals();
        setOperator();
    };
};

function equals () {
    const active = document.querySelector('.active');
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    if (1 / displayValue === -Infinity) { // If the display is -0
        if (num1 === '-0') {
            return;
        } else if (active) {
            num2 = 0;
            operate(operator);
        } else {
            operate(operator)
        }
    } else { // If the display is not -0
        if (active) { // If there was an active operator button
            num2 = displayValue;
        }
        if (1 / num1 === -Infinity) { // If num1 is 'undefined'
            num1 = displayValue;
        } else if (1 / num2 === -Infinity) { // If num2 isn't defined but num1 is
            num2 = displayValue;
        } else { // If num1 && num2 are defined
            num1 = displayValue;
        }
        operate(operator);
    }
}

function inputDecimal() {
    if (String(displayValue).indexOf('.') === -1) { // If the display doesn't have a decimal
        displayValue += '.';
        display.textContent = displayValue;
        backspaceButton.dataset.work = 1;
    } else { // If the display already has a decimal
        return; // Do nothing
    };
};

function inputZero() {
    if (displayValue == 0 && String(displayValue).indexOf('.') === -1) { // If the display is == 0 and has no decimal
        return; // Do nothing
    } else {
        displayValue += '0';
        display.textContent = displayValue;
    };
};

function inputNumber(input) {
    const active = document.querySelector('.active');
    switch (true) {
        case (active !== null): // There is an active operator button
            if (String(displayValue).indexOf('-') === -1) { // If there is no negative sign
                displayValue = input;
            } else { // If there is a negative sign
                displayValue = '-' + input;
                backspaceButton.dataset.work = 1;
            }
            display.textContent = displayValue;
            break;
        case (displayValue == 0):
            if (1 / displayValue === -Infinity) { // If display is -0
                if (String(displayValue).indexOf('.') === -1) { // If there is no decimal
                    displayValue = '-' + input;
                } else { // If there is a decimal
                    displayValue += input;
                };
            } else { // If the display is 0
                if (String(displayValue).indexOf('.') === -1) {
                    displayValue = input;
                } else {
                    displayValue += input;
                };
            };
            display.textContent = displayValue;
            break;
        default:
            console.log('default')
            displayValue += input;
            display.textContent = displayValue;
    };
};

function updateDisplay(e) {
    let input;
    if (e.type === 'keydown') {
        e.preventDefault();
        let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
        if (key.classList.contains('number-button')) {
            input = key.dataset.value;
        } else if (key.classList.contains('operator-button')) {
            return operation(key);
        } else if (key.classList.contains('calculator-button')) {
            return equals();
        } else if (key.classList.contains('backspace-button')) {
            return backspace();
        }
    } else { // Event type is not from keyboard
        input = this.dataset.value;
    };
    switch (input) {
        case '.':
            inputDecimal();
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
            break;
        case '0':
            inputZero();
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
            break;
        default:
            inputNumber(input);
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    };
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