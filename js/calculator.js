class Operations {
    constructor(...term) {
        this.term1 = this.toNumber(term[0]);
        this.term2 = this.toNumber(term[1]);
        this.lastValue = displayValue;
    }
    add() {
        return this.term1 + this.term2;
    }
    divide() {
        return this.term1 / this.term2;
    }
    eRaised() {
        return Math.pow(Math.E, this.term1);
    }
    hypotenuse() {
        return Math.hypot(this.term1, this.term2);
    }
    multiply() {
        return this.term1 * this.term2;
    }
    subtract() {
        return this.term1 - this.term2;
    }
    toNumber(n) {
        return parseFloat(n);
    }
    xPower() {
        return Math.pow(this.term2, this.term1);
    }
    xRoot() {
        return this.term2 ** (1 / this.term1);
    }
}
/**
 *
 */
var displayValue = "0",
    displayValueArray = [],
    term1 = "",
    term2 = "",
    newTerm = false,
    operator = "",
    result = "",
    storedValue = 0,
    trailingZeroCount = 0,
    flashingNines = "";

var userDisplay = document.getElementById("digits_container");
var buttons = document.querySelectorAll(".btn");
var re = document.getElementById("result_electronics");
var powerSwitch = document.querySelector("[data-value=\"power\"]");
var radDegSwitch = document.querySelector("[data-value=\"rad-deg\"]");

const BUTTON_EVENT_FUNCTIONS = {
    "add": function() {
        depressOperator("add");
    },
    "arc": function() {},
    "cos": function() {},
    "clear": function() {
        clearDisplay(true);
    },
    "clear-entry": function() {
        clearDisplay(false);
    },
    "d-r": function() {},
    "decimal": function() {
        if (displayValue.indexOf(".") == -1) {
            updateDisplayValue(this.dataset.value, false);
        } else {
            displayFlash();
        }
    },
    "digit": function() {
        updateDisplayValue(this.dataset.value, false);
    },
    "divide": function() {
        depressOperator("divide");
    },
    "ee": function() {},
    "equals": function() {
        getResult();
    },
    "ex": function() {
        updateDisplayValue(Math.pow(Math.E, displayValue), true);
    },
    "exchange": function() {
        exchange(term1, term2);
    },
    "factorial": function() {
        updateDisplayValue(factorial(Math.trunc(displayValue)), true);
    },
    "hyp": function() {
        depressOperator("hypotenuse");
    },
    "inverse": function() {
        updateDisplayValue(1 / displayValue, true);
    },
    "multiply": function() {
        depressOperator("multiply");
    },
    "lnx": function() {
        updateDisplayValue(Math.log(displayValue), true);
    },
    "log": function() {
        updateDisplayValue(Math.log10(displayValue), true);
    },
    "recall": function() {
        updateDisplayValue(storedValue, true);
    },
    "pi": function() {
        updateDisplayValue(Math.PI.toPrecision(10), true);
    },
    "pos-neg": function() {
        displayValue = displayValue * -1;
        updateTerm(displayValue);
        updateDisplayValue(displayValue, true);
    },
    "sin": function() {},
    "sqrt": function() {
        updateDisplayValue(Math.sqrt(displayValue), true);
    },
    "squared": function() {
        updateDisplayValue(Math.pow(displayValue, 2), true);
    },
    "store": function() {
        storedValue = displayValue;
    },
    "subtract": function() {
        depressOperator("subtract");
    },
    "sum": function() {},
    "tan": function() {},
    "xpower": function() {
        depressOperator("xPower");
    },
    "xroot": function() {
        depressOperator("xRoot");
    }
};

for (let i = 0; i < 14; i++) {
    re.insertAdjacentHTML('afterbegin', `
        <div class="digit-bg">
            <div class="top">
                <div class="lead-container">
                    <div class="lead"></div>
                    <div class="lead"></div>
                </div>
                <div class="btm-element"></div>
            </div>
            <div class="bottom">
                <div class="lead"></div>
                <div class="lead"></div>
                <div class="lead"></div>
            </div>
        </div>
    `);
}

powerSwitch.addEventListener("click", function() {
    this.classList.toggle("on");
    if (this.classList.contains("on")) {
        setTimeout(powerOn, 100);
    } else if (this.dataset.value == "power") {
        setTimeout(powerOff, 100);
    }
});

radDegSwitch.addEventListener("click", function() {
    this.classList.toggle("on");
});

/**
 * HELPER FUNCTIONS
 */
function clearUserDisplay() {
    userDisplay.innerHTML = "";
}

function clearDisplayValue() {
    displayValue = "";
}

function clearTerms() {
    term1 = "";
    term2 = "";
    newTerm = false;
    clearDisplayValue();
}

function clearStoredValue() {
    storedValue = 0;
}

function depressOperator(o) {
    operator = o;
    newTerm = true;
    resetDisplay(10, false, false);
    clearDisplayValue();
    displayFlash();
}

function exchange(a, b) {
    term1 = b;
    term2 = a;
}

function getResult() {
    if (!term1 || !term2) {
        clearDisplay(false);
        resetDisplay(10, false, false);
        return;
    }
    let result = new Operations(term1, term2)[operator]();
    if (result == "Infinity") {
        displayFlashingNines();
        return;
    }
    clearTerms();
    updateDisplayValue(result, true);
    term1 = result;
    removeTrailingZero = true;
    operator = "";
}

function displayFlash() {
    let tempUD = userDisplay.innerHTML;
    clearUserDisplay();
    setTimeout(function() {
        userDisplay.innerHTML = tempUD;
    }, 10);
}

function displayFlashingNines() {
    let showNines = true;
    flashingNines = setInterval((displayValue = "+9.999999999e+99") => {
        if (showNines) {
            updateDisplayValue(displayValue, true);
            showNines = false;
        } else {
            clearUserDisplay();
            showNines = true;
        }
    }, 150);
}

function clearFlashingNines() {
    clearInterval(flashingNines);
    resetDisplayValueArray();
}

/**
 * CALCULATIONS
 */

function factorial(n, f = []) {
    if (Math.sign(n) == -1) {
        return n;
    }
    for (let i = 2; i <= n; i++) {
        f.push(i);
    }
    return f.reduce(function(a, b) {
        return a * b;
    });
}

/**
 * POWER ON / OFF
 */
function powerOn() {
    setTimeout(powerFlash, 80);
    setTimeout(() => {
        resetDisplay(10, false, true);
    }, 100);
    buttons.forEach((btn) => {
        btn.addEventListener("click", BUTTON_EVENT_FUNCTIONS[btn.getAttribute("name")]);
        btn.addEventListener("click", BUTTON_EVENT_FUNCTIONS[(btn.classList.contains("digit") ? "digit" : '')]);
    });
}

function powerOff() {
    clearFlashingNines();
    powerFlash();
    setTimeout(() => {
        clearUserDisplay();
        clearDisplayValue();
        clearTerms();
        clearStoredValue();
    }, 25);
    buttons.forEach((btn) => {
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS[btn.getAttribute("name")]);
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS.digit);
    });
}

function powerFlash() {
    clearUserDisplay();
    resetDisplayValueArray(1, false);
    printResetDisplay();
}
/**
 * 
 */

function updateTerm(u) {
    if (term2 !== "") {
        term2 = parseFloat(u);
    } else {
        term1 = parseFloat(u);
    }
}

function saveTerm(dv) {
    if (newTerm === false) {
        term1 = dv;
    } else {
        term2 = dv;
    }
}

function depressAnimation() {
    // todo
}

/**
 * DISPLAY-RELATED FUNCTIONS
 */

function clearDisplay(hasDecimal) {
    clearFlashingNines();
    clearUserDisplay();
    clearDisplayValue();
    if (hasDecimal) {
        clearTerms();
    }
    setTimeout(function() {
        resetDisplay(10, hasDecimal, true);
    }, 10);
}

function resetDisplayValueArray(n, hasDecimal) {
    for (let i = 0; i < 16; i++) {
        if (i == n) {
            if (hasDecimal == true) {
                displayValueArray[i] = [0, "."];
            } else {
                displayValueArray[i] = [0, ""];
            }
        } else {
            displayValueArray[i] = ["", ""];
        }
    }
}

function updateDisplayValueArray(trunc) {
    for (let i = 0; i < 16; i++) {
        displayValueArray[i] = (trunc[i]) ? trunc[i] : "0";
        if (displayValueArray[i] == "0" && trunc.indexOf("e") < 0) {
            trailingZeroTally();
        } else {
            trailingZeroTally("reset");
        }
    }
}

function resetDisplay(n, b, erase) {
    if (erase) {
        clearUserDisplay();
    }
    resetDisplayValueArray(n, b);
    if (erase) {
        printResetDisplay();
    }
}

function printResetDisplay() {
    for (let i = 0; i < 14; i++) {
        userDisplay.insertAdjacentHTML("beforeend", `<div class="result${((displayValueArray[i][1]) ? " decimal" : "")}" data-value="${displayValueArray[i][0]}">${displayValueArray[i][0]}</div>`);
    }
}

function trailingZeroTally(z) {
    if (z == "reset") {
        trailingZeroCount = 0;
    } else {
        trailingZeroCount++;
    }
}

function removeTrailingZeros(digit) {
    for (let i = 0; i < trailingZeroCount; i++) {
        displayValueArray.pop();
    }
    for (let j = 0; j < trailingZeroCount - 4; j++) {
        displayValueArray.splice(1, 0, "&nbsp;");
    }
}

function truncateNumberForDisplay(n) {
    if (n == "+9.999999999e+99") {
        return n;
    }
    let p = 10 - parseInt(n.indexOf("."));
    let ee = n.indexOf("e");
    if (ee >= 0 && Math.sign(n) !== -1) {
        return "+" + parseFloat(n).toPrecision(10);
    } else if (ee >= 0 && Math.sign(n) == -1) {
        return parseFloat(n).toPrecision(10);
    } else {
        if (n.length > 10 && p > 10) {
            return parseFloat(n).toExponential(9);
        } else if (p < 0) {
            return parseFloat(n);
        }
        return (Math.sign(n) >= 0) ? "+" + parseFloat(n).toFixed(p) : parseFloat(n).toFixed(p + 1);
    }
}

function printToDisplay() {
    clearUserDisplay();
    for (let i = 0; i < displayValueArray.length; i++) {
        if (displayValueArray[i] == "." || displayValueArray[i] == "e") {
            continue;
        }
        if (displayValueArray[i] == "+") {
            displayValueArray[i] = "&nbsp;";
        }
        userDisplay.insertAdjacentHTML("beforeend", `<div class="result${((displayValueArray[i + 1] == ".") ? " decimal" : "")}" data-value="${displayValueArray[i]}">${displayValueArray[i]}</div>`);
    }
    displayFlash();
}

/**
 * 1.
 * @param {string} digit 
 * @param {bool} clear 
 */
function updateDisplayValue(digit, clear) {
    if (clear === true) {
        clearDisplayValue();
    }
    /**
     * REMOVE LEADING ZERO IF EXISTS
     */
    displayValue = displayValue.toString() + ((digit) ? digit : "");
    /**
     * 
     */
    if (displayValue == ".") {
        displayValue = "0.";
    }
    updateDisplayValueArray(truncateNumberForDisplay(displayValue));
    saveTerm(displayValue);
    removeTrailingZeros(digit);

    /**
     * Display inputted zeros after decimal point.
     */
    // console.log(digit,displayValue,displayValue.indexOf("."),displayValue[displayValue.length - 1]);
    if (digit == "0" && displayValue.indexOf(".") !== -1) {
        let tempArray = displayValueArray;
        tempArray.push("0");
        tempArray.shift();
        displayValueArray = tempArray;
        tempArray = [];
    }
    /**
     * 
     */
    // console.log("DV:",displayValue,"\n",printDisplayArray(),"\n",term1,"\n",term2,"\n","new term",newTerm,"\n","Operation",operator,"\n",result,"\n",storedValue,"\n",trailingZeroCount);
    printToDisplay();
}

function printDisplayArray() {
    let temp = "";
    for (i = 0; i < displayValueArray.length; i++) {
        temp += displayValueArray[i];
    }
    return temp;
}
