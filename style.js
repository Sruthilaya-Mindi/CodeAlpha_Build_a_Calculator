document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.querySelector('.toggle input[type="checkbox"]');
    var calculator = document.querySelector('.calculator');
    var head = document.getElementById('heading');
    var buttons = document.querySelectorAll('input[type="button"]');
    var display = document.querySelector('input[name="display"]');
    var lastButtonEqual = false;

    function changeCalculatorTheme() {
        if (checkbox.checked) {
            document.body.style.backgroundColor = 'white';
            calculator.style.backgroundColor = 'white';
            head.style.color = 'black';
            display.style.backgroundColor = 'white';
            display.style.color = 'black';
            buttons.forEach(function(button) {
                button.style.backgroundColor = 'white';
                button.style.color = 'black';
            });
            Array.from(buttons).forEach(function(button) {
                if (button.classList.contains('ope')) {
                    button.style.color = 'orange';
                } else if (button.classList.contains('equal')) {
                    button.style.backgroundColor = 'orange';
                }
            });
        } else {
            document.body.style.backgroundColor = 'black';
            calculator.style.backgroundColor = 'black';
            head.style.color = 'white';
            display.style.backgroundColor = 'black';
            display.style.color = 'white';
            buttons.forEach(function(button) {
                button.style.backgroundColor = 'black';
                button.style.color = 'white';
            });
            Array.from(buttons).forEach(function(button) {
                if (button.classList.contains('ope')) {
                    button.style.color = 'orange';
                } else if (button.classList.contains('equal')) {
                    button.style.backgroundColor = 'orange';
                }
            });
        }
    }

    function handleButtonClick(value) {
        if (lastButtonEqual) {
            if (['+', '-', '*', '/', '%'].includes(value)) {
                lastButtonEqual = false;
            } else {
                display.value = '';
                lastButtonEqual = false;
            }
        }
        display.value += value;
    }

    function handleEqualClick() {
        try {
            display.value = eval(display.value);
        } catch {
            display.value = 'Error';
        }
        lastButtonEqual = true;
    }

    function handleKeyPress(event) {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            handleButtonClick(key);
        } else if (['+', '-', '*', '/', '%'].includes(key)) {
            handleButtonClick(key);
        } else if (key === '.') {
            handleButtonClick('.');
        } else if (key === 'Enter') {
            handleEqualClick();
        } else if (key === 'Backspace') {
            display.value = display.value.toString().slice(0, -1);
        } else if (key === 'Escape') {
            display.value = '';
        }
    }

    checkbox.addEventListener('change', changeCalculatorTheme);
    changeCalculatorTheme();

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            var value = button.value;

            if (value === '=') {
                handleEqualClick();
            } else if (value === 'AC') {
                display.value = '';
                lastButtonEqual = false;
            } else if (value === 'DE') {
                display.value = display.value.toString().slice(0, -1);
                lastButtonEqual = false;
            } else {
                handleButtonClick(value);
            }
        });
    });

    document.addEventListener('keydown', handleKeyPress);
});
