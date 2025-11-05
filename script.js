let currentOperand = '';
let previousOperand = '';
let operator = null;

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand += number;
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = currentOperand || '0';
}

function chooseOperator(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operator = op;
  previousOperand = currentOperand;
  currentOperand = '';
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operator) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation.toString();
  operator = null;
  previousOperand = '';
  updateDisplay();
}

function clearDisplay() {
  currentOperand = '';
  previousOperand = '';
  operator = null;
  updateDisplay();
}

// Keyboard event handling
window.addEventListener('keydown', function(event) {
  const key = event.key;

  if (!isNaN(key)) {
    // Number key pressed
    appendNumber(key);
  } else if (key === '.') {
    appendNumber(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    chooseOperator(key);
  } else if (key === 'Enter' || key === '=') {
    compute();
  } else if (key === 'Backspace') {
    // Remove last character
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
  } else if (key.toLowerCase() === 'c') {
    // Clear if C or c is pressed
    clearDisplay();
  }
});

updateDisplay(); // initialize display to 0
