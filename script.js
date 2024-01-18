let displayValue = '';
let history = [];
let historyIndex = -1;

function appendToDisplay(value) {
    history.splice(historyIndex + 1);
    history.push(displayValue);
    historyIndex++;

    displayValue += value;
    updateDisplay();
}

function clearDisplay() {
    history.splice(historyIndex + 1);
    history.push(displayValue);
    historyIndex++;

    displayValue = '';
    updateDisplay();
}

function backspace() {
    history.splice(historyIndex + 1);
    history.push(displayValue);
    historyIndex++;

    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function calculate() {
    try {
        history.splice(historyIndex + 1);
        history.push(displayValue);
        historyIndex++;

        displayValue = eval(displayValue);
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        updateDisplay();
    }
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        displayValue = history[historyIndex];
        updateDisplay();
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        displayValue = history[historyIndex];
        updateDisplay();
    }
}

function copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.value = displayValue;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function updateDisplay() {
    document.getElementById('display').value = displayValue;
}

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Z' && (event.ctrlKey || event.metaKey)) {
        undo();
    } else if (key === 'Y' && (event.ctrlKey || event.metaKey)) {
        redo();
    } else if (key === 'C' && (event.ctrlKey || event.metaKey)) {
        copyToClipboard();
    }
});
