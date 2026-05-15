import { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '*': return prev * current;
      case '/': return current === 0 ? 0 : prev / current;
      default: return current;
    }
  };

  const handleEqual = () => {
    const inputValue = parseFloat(display);

    if (operator && prevValue !== null) {
      const newValue = calculate(prevValue, inputValue, operator);
      setDisplay(String(newValue));
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{display}</div>
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <button className="calculator-key key-clear" onClick={display === '0' ? clearAll : clearDisplay}>
              {display === '0' ? 'AC' : 'C'}
            </button>
            <button className="calculator-key key-sign" onClick={toggleSign}>±</button>
            <button className="calculator-key key-percent" onClick={inputPercent}>%</button>
          </div>
          <div className="digit-keys">
            <button className="calculator-key key-0" onClick={() => inputDigit('0')}>0</button>
            <button className="calculator-key key-dot" onClick={inputDot}>●</button>
            <button className="calculator-key key-1" onClick={() => inputDigit('1')}>1</button>
            <button className="calculator-key key-2" onClick={() => inputDigit('2')}>2</button>
            <button className="calculator-key key-3" onClick={() => inputDigit('3')}>3</button>
            <button className="calculator-key key-4" onClick={() => inputDigit('4')}>4</button>
            <button className="calculator-key key-5" onClick={() => inputDigit('5')}>5</button>
            <button className="calculator-key key-6" onClick={() => inputDigit('6')}>6</button>
            <button className="calculator-key key-7" onClick={() => inputDigit('7')}>7</button>
            <button className="calculator-key key-8" onClick={() => inputDigit('8')}>8</button>
            <button className="calculator-key key-9" onClick={() => inputDigit('9')}>9</button>
          </div>
        </div>
        <div className="operator-keys">
          <button className="calculator-key key-divide" onClick={() => performOperation('/')}>÷</button>
          <button className="calculator-key key-multiply" onClick={() => performOperation('*')}>×</button>
          <button className="calculator-key key-subtract" onClick={() => performOperation('-')}>−</button>
          <button className="calculator-key key-add" onClick={() => performOperation('+')}>+</button>
          <button className="calculator-key key-equals" onClick={handleEqual}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
