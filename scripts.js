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
let num1 = "-0";
let num2 = "-0";
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
            console.log('default')
            console.log(num1, num2)
    };
    displayValue = num1;
    display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
};

function backspace() {
    if (1 / displayValue == -Infinity) { // If the display is -0
        displayValue = 0;
        display.textContent = displayValue;
        return;
    }
    if (backspaceButton.dataset.work == 0) {
        backspaceButton.style.backgroundColor = "red";
        setTimeout(function() {
            backspaceButton.style.backgroundColor = "gainsboro";
        }, 500);
    } else if (backspaceButton.dataset.work == 1) {
        let newValue = String(displayValue).slice(0,-1);
        if (newValue == '') {
            newValue = 0;
            backspaceButton.dataset.work = 0;
        } else if (newValue == '-') {
            newValue = -0;
        };
        displayValue = newValue;
        display.textContent = Number(displayValue).toLocaleString(undefined, { maximumFractionDigits: 8 });
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
    num1 = "-0";
    num2 = "-0";
    operator = '';
    backspaceButton.dataset.work = 0;
};

function negative() {
    const active = document.querySelector('.active');
    function reverseZero() {
        if (1 / displayValue == -Infinity) { // If display is -0
            displayValue = 0;
            display.textContent = displayValue;
        } else {
            displayValue = "-0";
            display.textContent = displayValue;
        };
    };
    if (active) { // If there is an active operator button
        operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
        reverseZero();
    } else { // If there is no active operator button
        if (displayValue == 0 && String(displayValue).indexOf('.') == -1) { // If display value == 0 and has no decimal
            console.log('poop')
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
    if (1 / num1 !== -Infinity && backspaceButton.dataset.work == 0) {
        // If num1 is defined && the display is not clear
        console.log('poop')
        equals();
    };
    console.log('um')
    if (this == window) { // If event is from keyboard
        key.classList.toggle('active');
        operator = key.dataset.value;
    } else { // If event is from on-screen buttons
        this.classList.toggle('active');
        operator = this.dataset.value;
    };

    if (1 / num1 === -Infinity) { // If num1 is 'undefined'
        num1 = displayValue;
        backspaceButton.dataset.work = 0;
    } else if (backspaceButton.dataset.work == 0) { // If num1 has a value, display is clear
        return;
    } else { // If num1 has a value, and the display is not clear
        console.log('equals from operation')
        console.log(num1, num2)
        equals();
    };
};

function equals() {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    if (backspaceButton.dataset.work == 0) { // If the display is clear
        console.log('display clear')
        if (1 / displayValue == -Infinity) { // If displayValue is -0
            num1 = operate(operator);
            displayValue = num1;
            display.textContent = displayValue;
            //operator = '';
            return;
        }
        if (1 / num1 == -Infinity) { // If num1 is 'undefined'
            num1 = displayValue;
        } else if (1 / num2 == -Infinity) { // If num1 has a value but num2 doesn't
            num2 = displayValue;
        };
        num1 = operate(operator);
        displayValue = num1;
        display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
    } else { // If the display is not clear
        console.log('display not clear')
        if (1 / num1 == -Infinity) { // If num1 is 'undefined'
            num1 = displayValue;
        } else if (1 / num2 == -Infinity) { // If num1 has a value but num2 doesn't
            num2 = displayValue;
        } else { // If neither num1 or num2 is 'undefined'
        console.log('hre')
            num1 = displayValue; // hee
        }
        num1 = operate(operator);
        displayValue = num1;
        display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
    };
    console.log('huh')
};

function equals () {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    if (1 / displayValue === -Infinity) { // If the display is -0
        if (num1 === '-0') {
            console.log('finished')
            return;
        } else {
            operate(operator)
        }
    } else { // If the display is not -0
        console.log('display is not clear')
        if (1 / num1 === -Infinity) { // If num1 is 'undefined'
            num1 = displayValue;
        } else if (1 / num2 === -Infinity) { // If num2 isn't defined but num1 is
            num2 = displayValue;
        } else { // If num1 && num2 are defined
            num1 = displayValue;
        }
        console.log(num1, operator, num2)
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
    switch (true) {
        case (1 / displayValue === -Infinity):
        case (displayValue == 0):
        case (backspaceButton.dataset.work == 0):
            displayValue = input;
            display.textContent = displayValue;
            backspaceButton.dataset.work = 1;
            break;
        default:
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
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    switch (input) {
        case '.':
            return inputDecimal();
        case '0':
            return inputZero();
        default:
            return inputNumber(input);
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