const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allclearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const currentoperandTextElement = document.querySelector('[data-current-operand]');
const previousoperandTextElement = document.querySelector('[data-previous-operand]');
const squareButton = document.querySelector('[data-square]');
const cubeButton = document.querySelector('[data-cube]');
const squarerootButton = document.querySelector('[data-squareroot]');
const factorialButton = document.querySelector('[data-factorial]');

class Calculator{
    constructor(previousoperandTextElement, currentoperandTextElement){
        this.previousoperandTextElement = previousoperandTextElement;
        this.currentoperandTextElement = currentoperandTextElement;
        this.clear();
    }
    clear(){
        this.currentoperand = ''
        this.previousoperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentoperand = this.currentoperand.toString().slice(0, -1);
    }
    appendNumber(number){
        if(number === '.' && this.currentoperand.includes('.')) return
        this.currentoperand = this.currentoperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if (this.currentoperand === '') return
        if(this.previousoperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousoperand = this.currentoperand
        this.currentoperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousoperand)
        const current = parseFloat(this.currentoperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return                    
        }
        this.currentoperand = computation
        this.operation = undefined
        this.previousoperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

      square(){
        const current = parseFloat(this.currentoperand);
        if (!isNaN(current)) {
          this.currentoperand = (current ** 2).toString();
          this.operation = undefined;
          this.previousoperand = '';
          this.updateDisplay();
        }
      }

      cube() {
        const current = parseFloat(this.currentoperand);
        if (!isNaN(current)) {
            this.currentoperand = (current ** 3).toString();
            this.operation = undefined;
            this.previousoperand = '';
            this.updateDisplay();
        }
    }
    
    root() {
      const current = parseFloat(this.currentoperand);
      if (!isNaN(current)) {
          if (current >= 0) {
              this.currentoperand = Math.sqrt(current).toString();
          } 
      } else {
          this.currentoperand = 'Error';
          this.operation = undefined;
          this.previousoperand = '';
          this.updateDisplay();
      }
  }

    factorial(){
      const current = parseFloat(this.currentoperand);
      if (!isNaN(current) && current >= 0 && Number.isInteger(current)) {
        let result = 1;

        for (let i = 2; i <= current; i++) {
            result *= i;
        }

        this.currentoperand = result.toString();
      }else{
        this.currentoperand = 'Error';
        this.operation = undefined;
        this.previousoperand = '' ;
        this.updateDisplay();
      }
    }
    
    updateDisplay() {
      this.currentoperandTextElement.innerText =
        this.getDisplayNumber(this.currentoperand)
      if (this.operation != null) {
        this.previousoperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousoperand)} ${this.operation}`
      } else {
        this.previousoperandTextElement.innerText = ''
      }
    }
  }
  
const calculator = new Calculator(previousoperandTextElement, currentoperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});


equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});


allclearButton.addEventListener('click', () =>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click',  () =>{
    calculator.delete();
    calculator.updateDisplay();
});

squareButton.addEventListener('click', () => {
  calculator.square();
  calculator.updateDisplay();
});

cubeButton.addEventListener('click', () => {
  calculator.cube();
  calculator.updateDisplay();
});

squarerootButton.addEventListener('click', ()=>{
  calculator.root();
  calculator.updateDisplay();
});

factorialButton.addEventListener('click', ()=>{
  calculator.factorial();
  calculator.updateDisplay();
});