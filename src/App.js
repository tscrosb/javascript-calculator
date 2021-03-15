import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");

  const handleInput = char => {
    const handleDecimal = () => {
      const lastNumHasDecimalRegex = /([\d]*\.[\d]*)$/;
      const endsWithSymbolRegex = /[+\-*/]$/;
      if (input === "0") {
        setInput("0.");
        return;
      } else if (lastNumHasDecimalRegex.test(input)) {
        return;
      } else if (endsWithSymbolRegex.test(input)) {
        appendChar(`0.`);
      } else {
        appendChar(char);
      }
    };

    const handleSymbol = () => {
      handleClosingParen();
      const endsWithSymbol = /[+\-*/]$/g;
      const endsWithNegSymbol = /\(-$/g;

      if (endsWithNegSymbol.test(input)) {
        deleteLastChar(3);
        appendChar(`${char}`);
        return;
      } else if (endsWithSymbol.test(input)) {
        if (char === "-") {
          appendChar("(-");
        } else {
          deleteLastChar();
          appendChar(char);
        }
      } else if (input === "0") {
        appendChar(`0${char}`);
      } else {
        appendChar(char);
      }
    };

    switch (char) {
      case ".":
        handleDecimal();
        break;
      case "+":
      case "/":
      case "*":
      case "-":
        handleSymbol();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        appendChar(char);
        break;
      default:
        console.log(`Non-Standard Character Entered`);
    }
  };

  const appendChar = newChar => {
    if (input === "0") {
      setInput(newChar);
      return;
    }
    if (input === "Infinity") {
      setInput(newChar);
    } else {
      setInput(prevInput => prevInput + newChar);
    }
  };

  const handleClosingParen = () => {
    const missingClosingParenRegex = /(\(-[\d.*]+)$/g;
    if (missingClosingParenRegex.test(input)) {
      appendChar(")");
    }
  };

  const deleteLastChar = (num = 1) => {
    if (input.length === 1) {
      setInput("0");
      return;
    }
    const endsWithNegSymbol = /\(-$/g;
    if (endsWithNegSymbol.test(input) && num === 1) {
      setInput(prevState => prevState.toString().slice(0, -2));
      return;
    } else {
      setInput(prevState => prevState.toString().slice(0, -num));
    }
  };

  const calculateInput = () => {
    const missingClosingParenRegex = /(\(-[\d.*]+)$/g;
    const endsWithSymbolRegex = /[+\-*/]$/g;
    if (missingClosingParenRegex.test(input)) {
      setInput(eval(`${input})`));
    } else if (endsWithSymbolRegex.test(input)) {
      setInput(eval(input.slice(0, -1)));
    } else {
      setInput(eval(input));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Javascript Calculator</h1>
        <div className="calculator-app">
          <h2 id="display" className="calcInput">
            {input}
          </h2>
          <div className="calcBtnContainer">
            <button
              id="clear"
              className="functionBtn"
              onClick={() => setInput("0")}
            >
              AC
            </button>
            <button
              id="deleteBtn"
              className="functionBtn"
              onClick={() => deleteLastChar()}
            >
              DEL
            </button>
            <button
              id="divide"
              className="symbolBtn"
              onClick={() => handleInput("/")}
            >
              /
            </button>
            <button
              id="multiply"
              className="symbolBtn"
              onClick={() => handleInput("*")}
            >
              *
            </button>
            <button
              id="seven"
              className="numberBtn"
              onClick={() => handleInput("7")}
            >
              7
            </button>
            <button
              id="eight"
              className="numberBtn"
              onClick={() => handleInput("8")}
            >
              8
            </button>
            <button
              id="nine"
              className="numberBtn"
              onClick={() => handleInput("9")}
            >
              9
            </button>
            <button
              id="subtract"
              className="symbolBtn"
              onClick={() => handleInput("-")}
            >
              -
            </button>
            <button
              id="four"
              className="numberBtn"
              onClick={() => handleInput("4")}
            >
              4
            </button>
            <button
              id="five"
              className="numberBtn"
              onClick={() => handleInput("5")}
            >
              5
            </button>
            <button
              id="six"
              className="numberBtn"
              onClick={() => handleInput("6")}
            >
              6
            </button>
            <button
              id="add"
              className="symbolBtn"
              onClick={() => handleInput("+")}
            >
              +
            </button>
            <button
              id="one"
              className="numberBtn"
              onClick={() => handleInput("1")}
            >
              1
            </button>
            <button
              id="two"
              className="numberBtn"
              onClick={() => handleInput("2")}
            >
              2
            </button>
            <button
              id="three"
              className="numberBtn"
              onClick={() => handleInput("3")}
            >
              3
            </button>
            <button
              id="equals"
              className="functionBtn"
              onClick={() => calculateInput()}
            >
              =
            </button>
            <button
              id="zero"
              className="numberBtn"
              onClick={() => handleInput("0")}
            >
              0
            </button>
            <button
              id="decimal"
              className="numberBtn"
              onClick={() => handleInput(".")}
            >
              .
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
