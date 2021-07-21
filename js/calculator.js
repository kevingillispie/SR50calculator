/**
 * _X_ is the input register
 * _Y_ is the process register
 * _Z_ is the cumulative register
 * _M_ is the memory register for storage
 */
var _X_ = 0,
    _Y_ = 0,
    _Z_ = 0,
    _M_ = 0;
/***/
var re = document.getElementById("result_electronics"),
    powerSwitch = document.querySelector("[data-value=\"power\"]"),
    radDegSwitch = document.querySelector("[data-value=\"rad-deg\"]");

/**
 * DATA OPERATIONS
 */

/**
 * /END
 */

/**
 * ONBOOT
 */
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
 * /END
 */

/**
 * UI/UX FUNCTIONS
 */

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
        clearTerms();
        clear_M_();
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
 * /END
 */


/***************************************************************************/
/***************************************************************************/
/***************************************************************************/


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

var displayValue = "0",
    displayValueArray = [],
    newTerm = false,
    operator = "",
    result = "",
    trailingZeroCount = 0,
    flashingNines = "";

var userDisplay = document.getElementById("digits_container");
var buttons = document.querySelectorAll(".btn");
var re = document.getElementById("result_electronics");


const BUTTON_EVENT_FUNCTIONS = {
    "add": function() {
        depressOperator("add");
    },
    "arc": function() {},
    "cos": function() {
        updateDisplayValue(Math.cos(displayValue), true);
    },
    "clear": function() {
        clear(true);
    },
    "clear-entry": function() {
        clear(false);
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
        exchange(_X_, _Y_);
    },
    "factorial": function() {
        updateDisplayValue(factorial(Math.trunc(displayValue)), true);
    },
    "hyp": function() {
        depressOperator("hypotenuse");
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
    "pi": function() {
        updateDisplayValue(Math.PI.toPrecision(10), true);
    },
    "pos-neg": function() {
        displayValue = displayValue * -1;
        updateTerm(displayValue);
        updateDisplayValue(displayValue, true);
    },
    "recall": function() {
        updateDisplayValue(_M_, true);
        clearTerms();
    },
    "reciprocal": function() {
        updateDisplayValue(1 / displayValue, true);
    },
    "sin": function() {
        updateDisplayValue(Math.sin(displayValue), true);
    },
    "sqrt": function() {
        updateDisplayValue(Math.sqrt(displayValue), true);
    },
    "squared": function() {
        updateDisplayValue(Math.pow(displayValue, 2), true);
    },
    "store": function() {
        _M_ = (displayValue) ? displayValue : 0;
        displayFlash();
    },
    "subtract": function() {
        depressOperator("subtract");
    },
    "sum": function() {
        _M_ = new Operations(displayValue, ((!_M_) ? 0 : _M_))["add"]();
        updateDisplayValue(_M_, true);
        clearTerms();
        toggleNewTerm();
        updateNewTermDisplayValue();
    },
    "tan": function() {
        updateDisplayValue(Math.tan(displayValue), true);
    },
    "xpower": function() {
        depressOperator("xPower");
    },
    "xroot": function() {
        depressOperator("xRoot");
    }
};



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
    _X_ = "";
    _Y_ = "";
    newTerm = false;
    clearDisplayValue();
}

function clear_M_() {
    _M_ = 0;
}

function exchange(a, b) {
    _X_ = b;
    _Y_ = a;
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

function setOperator(o) {
    operator = o;
}

function toggleNewTerm() {
    newTerm = (newTerm) ? false : true;
}

function updateNewTermDisplayValue() {
    toggleNewTerm();
    clearDisplayValue();
}
/**
 * CALCULATIONS
 */

function factorial(n, f = [1]) {
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



function updateTerm(u) {
    if (_Y_ !== "") {
        _Y_ = parseFloat(u);
    } else {
        _X_ = parseFloat(u);
    }
}

function saveTerm(dv) {
    if (!newTerm) {
        _X_ = dv;
    } else {
        _Y_ = dv;
    }
}

function depressAnimation() {
    // todo
}

/**
 * DISPLAY-RELATED FUNCTIONS
 */

function clear(clearAll) {
    clearFlashingNines();
    clearUserDisplay();
    clearDisplayValue();
    if (clearAll) {
        clearTerms();
    } else {
        (_Y_) ? _Y_ = "": _X_ = "";
    }
    setTimeout(function() {
        resetDisplay(10, clearAll, true);
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

function resetDisplay(n, hasDecimal, erase) {
    if (erase) {
        clearUserDisplay();
    }
    resetDisplayValueArray(n, hasDecimal);
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

function depressOperator(o) {
    setOperator(o);
    if (!_X_ && _M_) {
        updateDisplayValue(_M_, true);
        updateNewTermDisplayValue();
        return;
    }
    if (_Y_) {
        getResult();
        updateNewTermDisplayValue();
        return;
    }
    updateNewTermDisplayValue();
    resetDisplay(10, false, false);
    displayFlash();
}

function getResult() {
    let result;
    if (!_X_ || !_Y_) {
        clear(false);
        resetDisplay(10, false, false);
        return;
    } else {
        result = new Operations(_X_, _Y_)[operator]();
    }

    if (result == "Infinity") {
        displayFlashingNines();
        return;
    }
    clearTerms();
    updateDisplayValue(result, true);
    removeTrailingZero = true;
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
    printToDisplay();
}

function printDisplayArray() {
    let temp = "";
    for (i = 0; i < displayValueArray.length; i++) {
        temp += displayValueArray[i];
    }
    return temp;
}
