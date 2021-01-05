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
let num1 = -0;
let num2 = -0;
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
            return divide(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "+":
            return add(num1, num2);
        default:
            return num1;
    };
    // The following code should follow this function whenever called:
    displayValue = num1;
    display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
};

function backspace() {
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
        }
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
    num1 = 0;
    num2 = 0;
    operator = '';
    backspaceButton.dataset.work = 0;
};

function negative() { // This needs more work when being used on a solution to previous problem
    if (backspaceButton.dataset.work == 0) { // If the display is clear
        if (1 / displayValue === -Infinity) { // If the display is already -0
            displayValue = 0;
            display.textContent = displayValue;
        } else {
            displayValue *= -1;
            display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
        }
    } else {
        num1 = Number(displayValue) * -1;
        displayValue = num1;
        display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
    };
};

//function negative() {
//    if (backspaceButton.dataset.work == 0 && displayValue == 0) { // If the display is clear
//        if (1 / displayValue === -Infinity) { // If the display is already -0
//            displayValue = 0;
//            display.textContent = displayValue;
//        } else {
//            displayValue = -0;
//            display.textContent = displayValue.toLocaleString(undefined, { maximumSignificantDigits: 9 });
//        }
//    } else {
//        displayValue = Number(displayValue) * -1;
//        display.textContent = displayValue.toLocaleString(undefined, { maximumSignificantDigits: 9 });
//    };
//};

function percentage() {
    displayValue = Number(displayValue) * .01;
    display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
};

function operation() {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    this.classList.toggle('active');
    operator = this.dataset.value;
    if (1 / num1 == -Infinity) { // If num1 is 'undefined'
        num1 = displayValue;
        backspaceButton.dataset.work = 0;
    } else if (backspaceButton.dataset.work == 0) { // If num1 has a value, display is clear \\ Needs work here !be sure to update below too
        console.log('happens now')
        num2 = displayValue;
    } else { // If num1 has a value, and the display is not clear
        console.log('this')
        equals();
        this.classList.toggle('active');
    };
};

function equals() {
    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    if (backspaceButton.dataset.work == 0) { // If the display is clear
        console.log('display clear')
        console.log(num1, num2);
        if (1 / num1 == -Infinity) { // If num1 is 'undefined'
            num1 = displayValue;
        } else if (1 / num2 == -Infinity) { // If num1 has a value but num2 doesn't
            num2 = displayValue;
        //if (num2 == 0) {
        //    num2 = displayValue;
        };
        num1 = operate(operator);
        displayValue = num1;
        display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
    } else { // Mistake is made in here
        console.log('display not clear')
        console.log(num1, num2);
        if (1 / num1 == -Infinity) { // If num1 is 'undefined'
            num1 = displayValue;
        } else { // If num1 has a value
            num2 = displayValue;
        //if (num2 == 0) {
        //    num2 = displayValue;
        };
        num1 = operate(operator);
        displayValue = num1;
        display.textContent = displayValue.toLocaleString(undefined, { maximumFractionDigits: 8 });
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
            if (1 / num1 == -Infinity) { // If num1 is 'undefined'
                num1 = displayValue;
                backspaceButton.dataset.work = 0;
            } else if (backspaceButton.dataset.work == 0) { // If num1 has a value, display is clear \\ Needs work here !be sure to update below too
                console.log('happens now')
                num2 = displayValue;
            } else { // If num1 has a value, and the display is not clear
                console.log('this')
                equals();
                key.classList.toggle('active');
            };
            return;
        } else if (key.classList.contains('calculator-button')) {
            return equals();
        } else if (key.classList.contains('backspace-button')) {
            return backspace();
        }
    } else { // Event type is not from keyboard
        updateValue = this.dataset.value;
    };
    if (updateValue === '.') {
        if (backspaceButton.dataset.work == 0) { // If the display is clear
            displayValue = "0.";
            display.textContent = displayValue;
            backspaceButton.dataset.work = 1;
        } else if (String(displayValue).indexOf('.') !== -1 || displayValue.length == 9) { // If there is already a decimal or the display is too long
            return;
        } else { // updateValue is a decimal, display is not clear
            let pseudoValue = Number(displayValue).toLocaleString();
            pseudoValue += updateValue;
            display.textContent = pseudoValue;
            displayValue += updateValue;
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
        };
    } else if (updateValue == 0 && displayValue == 0) {
        if (String(displayValue).indexOf('.') !== -1 && displayValue.length < 9) { // If there is a decimal
            displayValue += updateValue;
            display.textContent = displayValue;
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
            backspaceButton.dataset.work = 1;
            return
        } else { // If there is no decimal
            return; // Then do nothing
        };
    } else if (backspaceButton.dataset.work == 0) { // If the display is clear, updateValue is a non-zero number
        displayValue = updateValue;
        display.textContent = displayValue;
        operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
        backspaceButton.dataset.work = 1;
    //} else if (displayValue == "0") { // BROKE
    //    displayValue = updateValue;
    //    display.textContent = displayValue;
    //    operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
    //    backspaceButton.dataset.work = 1;
    } else { // updateValue is a non-zero number, display is not clear
        if (String(displayValue).indexOf('.') !== -1) { // If there is a decimal
            if (displayValue.length < 10) { // If display isn't too long
            displayValue += updateValue;
            display.textContent = Number(displayValue).toLocaleString(undefined, { maximumFractionDigits: 8 });
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
            backspaceButton.dataset.work = 1;
            } else { // If display is too long
                return; // Do nothing
            };
        } else { // If there is no decimal
            if (displayValue.length < 9) { // If the display isn't too long
            displayValue += updateValue;
            display.textContent = Number(displayValue).toLocaleString(undefined, { maximumFractionDigits: 8 });
            operatorButtons.forEach((operatorButton) => operatorButton.classList.remove('active'));
            backspaceButton.dataset.work = 1;
            } else { // If the display is too long
                return; // Do nothing
            };
        };
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