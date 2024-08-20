// script.js
let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('btn'));

let currentInput = '';
let operator = '';
let previousInput = '';
let calculation = ''; // To track the entire calculation string

buttons.map(button => {
  button.addEventListener('click', (e) => {
    let value = e.target.innerText;

    if (value === 'C') {
      currentInput = '';
      previousInput = '';
      operator = '';
      calculation = '';
      display.innerText = '0';
    } else if (value === '=') {
      if (operator && previousInput !== '') {
        calculation += ` ${currentInput}`;
        try {
          currentInput = eval(`${previousInput} ${operator} ${currentInput}`);
          display.innerText = `${calculation} = ${currentInput}`;
          operator = '';
          previousInput = '';
          calculation = ''; // Reset after showing the result
        } catch (error) {
          display.innerText = "Error";
          currentInput = '';
          previousInput = '';
          operator = '';
          calculation = ''; // Reset after error
        }
      }
    } else if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput) {
        if (calculation) {
          calculation += ` ${currentInput} ${value}`;
        } else {
          calculation = `${currentInput} ${value}`;
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
        display.innerText = calculation;
      }
    } else {
      currentInput += value;
      display.innerText = calculation + ` ${currentInput}`;
    }
  });
});
