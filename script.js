class Calculator {
    constructor(previousOut, currentOut) {
        this.previousTextOut = previousOut;
        this.currentTextOut = currentOut;
        this.clear();
    }

    clear() {
        this.previousOut = ''
        this.currentOut = ''
        this.currentOperand = NaN
        this.updateDisplay();
    }

    setOperand(operand) {
        this.currentOperand = operand;
        this.previousOut = this.currentOut + " " + this.currentOperand
        console.log("previous: " + this.previousOut);
        this.currentOut = ''
        this.updateDisplay();
    }

    updateDisplay() {
        this.previousTextOut.innerText = this.previousOut
        this.currentTextOut.innerText = this.currentOut
    }

    appendNumber(number) {
        this.currentOut += number;
        this.updateDisplay();
    }

    backspaceNumber() {
        this.currentOut = this.currentOut.toString().slice(0, -1)
        this.updateDisplay()
    }

    computeResult() {

        let handleValues = ['+', '-', '*', '/', NaN]

        let bValue = 0
        let aValue = 0

        if (!(handleValues.includes(this.currentOut.toString().trim()))) {
            bValue = parseInt(this.currentOut)
        }

        if (!(handleValues.includes(this.previousOut.toString().trim()))) {
            aValue = parseInt(this.previousOut)
        }

        if (this.currentOut.toString().length === 0) {
            bValue = 0
        }

        console.log(this.currentOut);
        console.log(this.previousOut);

        let result = 0
        switch (this.currentOperand) {
            case '+':
                result = aValue + bValue;
                break;
            case '*':
                result = aValue * bValue;
                break;
            case '-':
                result = aValue - bValue;
                break;
            case '/':
                if (bValue === 0) {
                    result = "Invalid"
                    alert("Cannot divide by 0")
                }
                else {
                    result = aValue / bValue;
                    result = result.toFixed(5)
                }
                break;
        }

        this.currentOut = result
        this.previousOut = ''
        console.log("Result: " + result);
        this.updateDisplay();

    }

}


const numberButtons = document.querySelectorAll('[data-number]')
const operandButtons = document.querySelectorAll('[data-operand]')
const equalsButton = document.querySelector('[data-equals]')
const backspaceButton = document.querySelector('[data-backspace]')
const clearButton = document.querySelector('[data-all-clear]')
const previousTextOut = document.querySelector('[data-previous]')
const currentTextOut = document.querySelector('[data-current]')

const calculator = new Calculator(previousTextOut, currentTextOut);

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    }
    )
})

clearButton.addEventListener('click', () => {
    calculator.clear();
})

equalsButton.addEventListener('click', () => {
    calculator.computeResult();
})

operandButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.setOperand(button.innerText);
    })
})

backspaceButton.addEventListener('click', () => {
    calculator.backspaceNumber();
})