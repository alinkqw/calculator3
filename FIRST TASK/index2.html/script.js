const display = document.querySelector('.result');
const memoryDisplay = document.querySelector('.memory');
let currentInput = '0';
let memory = 0;
let operator = null;
let previousValue = null;

document.querySelector('.buttons').addEventListener('click', (event) => {
  const button = event.target;
  const action = button.dataset.action;
  const value = button.textContent;

  if (button.tagName !== 'BUTTON') return;

  if (!action) {
    // Handle numbers
    if (currentInput === '0') {
      currentInput = value;
    } else {
      currentInput += value;
    }
    updateDisplay();
    return;
  }

  if (action === 'AC') {
    currentInput = '0';
    operator = null;
    previousValue = null;
    updateDisplay();
    return;
  }

  if (action === '+/-') {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
    return;
  }

  if (action === 'percent') {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
    return;
  }

  if (action === 'sqrt') {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay();
    return;
  }

  if (action === 'equals') {
    if (operator && previousValue !== null) {
      currentInput = calculate(previousValue, operator, parseFloat(currentInput)).toString();
      operator = null;
      previousValue = null;
      updateDisplay();
    }
    return;
  }

  if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
    if (operator && previousValue !== null) {
      currentInput = calculate(previousValue, operator, parseFloat(currentInput)).toString();
    }
    operator = action;
    previousValue = parseFloat(currentInput);
    currentInput = '0';
    updateDisplay();
    return;
  }

  if (action.startsWith('M')) {
    handleMemory(action);
  }
});

function calculate(a, operator, b) {
  switch (operator) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return a / b;
  }
}

function handleMemory(action) {
  const value = parseFloat(currentInput);
  if (action === 'MC') memory = 0;
  if (action === 'MR') currentInput = memory.toString();
  if (action === 'M+') memory += value;
  if (action === 'M-') memory -= value;
  memoryDisplay.textContent = `M1: ${memory}`;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput;
}
