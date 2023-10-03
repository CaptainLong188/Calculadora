const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".calc-btn");

let currentResult = 0;
let bufferResult = "0";
let bufferScreen = "0";
let previousOperator;

const buttonClick = (value) => {

    if(isNaN(value))
    {
        handleSymbol(value);
    }
    else
    {
        handleNumber(value);
    }

    screen.textContent = bufferScreen;
};

const handleSymbol = (symbol) => {

    switch (symbol) {
        case 'C':

            bufferScreen = '0';
            bufferResult = bufferScreen;
            currentResult = 0;
            break;
        
        case '=':

            if(previousOperator === null)
            {
                return;
            }

            flushOperation(parseInt(bufferResult));
            previousOperator = null; // Previous operator used 

            if(isNaN(currentResult) || !isFinite(currentResult))
            {
                bufferScreen = "Syntax Error";
                alert("Press Clear Button");
            }
            else
            {
                bufferScreen = currentResult.toString(); // Output new result on the screen
            }

            bufferResult = bufferScreen;
            currentResult = 0; // Will be asignated to the number of the screen when a symbol is clicked
            break;

        case '←' :

            if(bufferScreen.length === 1 || (bufferScreen.length === 2 && bufferScreen[0] === "-"))
            {
                bufferScreen = '0';
                bufferResult = bufferScreen;
            }   
            else
            {
                const symbols = ["+", "−", "×", "÷"];

                if(symbols.includes(bufferScreen.at(-1)))
                {
                    previousOperator = null; // We are erasing the operator on the screen (only works if length(operators) is 1)
                }

                bufferScreen = bufferScreen.substring(0, bufferScreen.length - 1); // Reduce length by 1
                let positionLeft = 0;

                for(const symbol of symbols)
                {
                    if(bufferScreen.includes(symbol))
                    {
                        positionLeft = bufferScreen.lastIndexOf(symbol) + 1;
                        break;
                    }
                }
                
                bufferResult = bufferScreen.substring(positionLeft, bufferScreen.length);

            }
            break;

        case '+':
        case '−':
        case '×':     
        case '÷':
            handleSymbolMath(symbol);
            break;
    }
};

const handleSymbolMath = (symbol) => {

    if(bufferScreen === '0')
    {
        return;
    }

    const symbols = ["+", "−", "×", "÷"];
    const intBuffer = parseInt(bufferResult);

    if(symbols.includes(bufferScreen.at(-1))) // The user is entering more than one symbol
    {
        bufferScreen = bufferScreen.substring(0, bufferScreen.length - 1);
    }
    else
    {
        if(currentResult === 0)
        {
            currentResult = intBuffer;
        }
        else
        {
            flushOperation(intBuffer);
        }
    }

    previousOperator = symbol;
    bufferScreen += symbol;
    bufferResult = "0";
    
};

const flushOperation = (intBuffer) => {

    if(previousOperator === "+")
    {
        currentResult += intBuffer;
    }
    else if(previousOperator === "−")
    {
        currentResult -= intBuffer;
    }
    else if(previousOperator === "×")
    {
        currentResult *= intBuffer;
    }
    else if(previousOperator === "÷")
    {
        currentResult /= intBuffer;
    }

};

const handleNumber = (number) => {

    if(bufferScreen === "0")
    {
        bufferScreen = number;
    }
    else
    {
        bufferScreen += number;
    }

    if(bufferResult === "0")
    {
        bufferResult = number;
    }
    else
    {
        bufferResult += number;
    }

};

const init = () => {

    buttons.forEach( function(elem){

        elem.addEventListener("click", function(event){
            buttonClick(event.target.textContent.trim());  
        });

    });

};

init();