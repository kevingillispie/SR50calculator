class Operations {
    constructor(...term) {
        this.term1 = this.toNumber(term[0]);
        this.term2 = this.toNumber(term[1]);
        // this.lastValue = registers._X_;
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
 * @param {registers._X_} string  Input register
 * @param {registers._Y_} string  Process register
 * @param {registers._Z_} string  Cumulative register
 * @param {registers._M_} float   Memory register for storage
 * @param {registers.process} string 
 * @param {registers.cumulative} string 
 */
var registers = {
    _X_: "",
    _Y_: "",
    _Z_: "",
    _M_: parseFloat(0),
    process: "",
    cumulative: ""
};
/***/
var re = document.getElementById("result_electronics"),
    powerSwitch = document.querySelector("[data-value=\"power\"]"),
    radDegSwitch = document.querySelector("[data-value=\"rad-deg\"]"),
    buttons = document.querySelectorAll(".btn"),
    displayLEDcontainer = document.getElementById("digits_container"),
    displayLEDs = displayLEDcontainer.children,
    numberOfLEDs = 14,
    clear_X_forNewNumber = false,
    isFirstOperand = true;

const BUTTON_EVENT_FUNCTIONS = {
    "add": function () {
        setOperator("add");
    },
    "arc": function () {
        setOperator("arc");
    },
    "cos": function () {
        console.log(Math.cos(registers._X_), true);
    },
    "clear": function () {
        clear();
    },
    "clear-entry": function () {
        registers._X_ = "";
        inputValue(0);
    },
    "d-r": function () { },
    "decimal": function () {
        inputValue(this.dataset.value);
    },
    "digit": function () {
        inputValue(this.dataset.value);
    },
    "divide": function () {
        setOperator("divide");
    },
    "ee": function () { },
    "equals": function () {
        getResult();
    },
    "ex": function () {
        let exponent = registers._X_;
        clearAllRegisters();
        inputValue(Math.pow(Math.E, exponent));
    },
    "exchange": function () {
        if (registers._Y_) {
            let y = registers._Y_;
            registers._Y_ = registers._X_;
            registers._X_ = y;
        }
    },
    "factorial": function () {
        let factor = Math.trunc(registers._X_);
        clearAllRegisters();
        inputValue(factorial(factor));
        function factorial(n, f = [1]) {
            if (Math.sign(n) == -1) {
                return n;
            }
            for (let i = 2; i <= n; i++) {
                f.push(i);
            }
            return f.reduce(function (a, b) {
                return a * b;
            });
        }
    },
    "hyp": function () {
        setOperator("hyperbolic");
    },
    "multiply": function () {
        setOperator("multiply");
    },
    "lnx": function () {
        registers._X_ = Math.log(registers._X_);
        print_X_ToDisplay();
        displayFlash();
    },
    "log": function () {
        registers._X_ = Math.log10(registers._X_);
        print_X_ToDisplay();
        displayFlash();
    },
    "pi": function () {
        /**
         * THE MANUAL INDICATES PI IS STORED 
         * "TO 13 SIGNIFICANT DIGITS (3.141592653590)" 
         * (PAGE 6)
         */
        inputValue(Math.PI.toPrecision(13));
    },
    "pos-neg": function () {
        registers._X_ = registers._X_ * -1;
        print_X_ToDisplay();
        displayFlash();
    },
    "recall": function () {
        resetDisplay();
        inputValue(registers._M_);
    },
    "reciprocal": function () {
        registers._X_ = 1 / registers._X_;
        print_X_ToDisplay();
        displayFlash();
    },
    "sin": function () {
        console.log(Math.sin(registers._X_), true);
    },
    "sqrt": function () {
        console.log(Math.sqrt(registers._X_), true);
    },
    "squared": function () {
        registers._X_ = Math.pow(registers._X_);
        print_X_ToDisplay();
        displayFlash();
    },
    "store": function () {
        registers._M_ = registers._X_;
        displayFlash();
    },
    "subtract": function () {
        setOperator("subtract");
    },
    "sum": function () {
        // setregisters._M_(registers._X_ + registers._M_);
        console.log(registers._M_, true);
        // clearTerms();
        // toggleNewTerm();
        // updateNewTermregisters._X_();
    },
    "tan": function () {
        console.log(Math.tan(registers._X_), true);
    },
    "xpower": function () {
        setOperator("xPower");
    },
    "xroot": function () {
        setOperator("xRoot");
    }
};
/**
 * HELPER FUNCTIONs
 */
function clear() {
    clearAllRegisters();
    inputValue(0);
    displayFlash();
}

function getSign(v) {
    return Math.sign(parseFloat(v));
}

function getValueStringLength() {
    return registers._X_.length;
}

function checkForDecimalIn_X_() {
    return registers._X_.search(/\./);
}

function scientificNotation(v) {
    if (v.length >= 10) {
        v = parseFloat(v).toPrecision(10);
    }
    return v;
}

function reset_M_() {
    registers._M_ = parseFloat(0);
}
/**
 * 
 */

/**
 * ONBOOT LOGIC
 */
/* CREATE DISPLAY BACKGROUND */
function digitDisplayElement(value = "") {
    let DIV = document.createElement("DIV");
    DIV.setAttribute("class", "result");
    DIV.dataset.value = value;
    DIV.innerText = value;
    return DIV;
}

! function () {
    for (let i = 0; i < numberOfLEDs; i++) {
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
        displayLEDcontainer.insertAdjacentElement("beforeend", digitDisplayElement());
    }

    powerSwitch.addEventListener("click", function () {
        this.classList.toggle("on");
        if (this.classList.contains("on")) {
            setTimeout(powerOn, 100);
        } else {
            setTimeout(powerOff, 100);
        }
    });

    radDegSwitch.addEventListener("click", function () {
        this.classList.toggle("on");
    });
}();
/**
 * /END
 */

/**
 * POWER ON / OFF
 */
function powerOn() {
    setTimeout(powerFlash, 80);
    setTimeout(() => {
        inputValue(0);
    }, 100);
    buttons.forEach((btn) => {
        btn.addEventListener("click", BUTTON_EVENT_FUNCTIONS[btn.getAttribute("name")]);
        btn.addEventListener("click", BUTTON_EVENT_FUNCTIONS[(btn.classList.contains("digit") ? "digit" : "")]);
    });
}

function powerOff() {
    // clearFlashingNines();
    buttons.forEach((btn) => {
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS[btn.getAttribute("name")]);
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS.digit);
    });
    setTimeout(() => {
        clearAllRegisters();
        resetDisplay();
        reset_M_();
    }, 25);
}

function powerFlash() {

}
/**
 * /END
 */

/**
 * DISPLAY LOGIC
 */

function resetDisplay() {
    let leds = document.querySelectorAll(".result");
    for (const LED of leds) {
        LED.classList.remove("decimal");
        LED.innerText = "";
    }

}

function displayFlash() {
    resetDisplay();
    setTimeout(function () {
        print_X_ToDisplay();
    }, 50);
}

function setNegativeSign() {
    let resultDigits = document.querySelectorAll(".result");
    resultDigits.forEach(digit => {
        if (digit.innerText == "-") {
            resultDigits[0].innerText = digit.innerText;
            digit.innerText = "";
            return;
        }
    })
}

// ONLY DISPLAY X REGISTER
function print_X_ToDisplay() {
    registers._X_ = registers._X_.toString();
    let v = scientificNotation(registers._X_);
    let vIndex = v.length;
    let shift = 2;
    for (let i = numberOfLEDs - 1; i >= 0; i--) {
        if (v[vIndex] == ".") {
            document.querySelectorAll(".result")[i - 2].classList.add("decimal");
            shift = 1;
        } else if (v[vIndex] && v.search("e") == -1) {
            document.querySelectorAll(".result")[i - shift].innerText = v[vIndex];
        }
        vIndex--;
    }
    setNegativeSign();
}
/**
 * 
 */

/**
 * DATA & FUNCTION ENTRY LOGIC
 */

function inputValue(v) {
    /**
     * DECIMAL CHECK
     */
    if (v == "." && checkForDecimalIn_X_() > -1) {
        return;
    }

    /**
     * REMOVE PLACEHOLDER ZERO IF EXISTS
     */
    if (v != ".") {
        removeLeadingZero();
    }
    /**
     * 
     */

    if (clear_X_forNewNumber == false) {
        registers._X_ += v;
    } else {
        registers._X_ = v;
        clear_X_forNewNumber = false;
    }
    if (registers._Y_ == "" && registers._Z_ == "") {
        isFirstOperand = true;
    } else {
        isFirstOperand = false;
    }
    // print_X_ToDisplay();
    displayFlash();
    displayRegisters();
}

function setOperator(o) {
    // TODO: COMPLETE PENDING OPERATION SOMEWHERE IN HERE
    if (registers._X_ != "" && registers._Y_ != "") {
        getResult();
        // return;
    }
    if (o == "multiply" || o == "divide") {
        if (registers.process != "" && isFirstOperand == false) {
            getResult();
        }
        registers.process = o;
        populateRegisters("y");
    } else if (o == "add" || o == "subtract") {
        if (registers.cumulative != "" && isFirstOperand == false) {
            getResult();
        }
        registers.cumulative = o;
        populateRegisters("z");
    }
    // print_X_ToDisplay();
    displayFlash();
    displayRegisters();
}

// function userErrorCorrectionForOperators(o) {
//     if ((o == "add" || o == "subtract")) {
//         registers._Z_ = registers._X_;
//         // registers.process = "";
//     } else if ((o == "multiply" || o == "divide")) {
//         registers._Y_ = registers._X_;
//         // registers.cumulative = "";
//     }
// }

function populateRegisters(reg) {
    if (reg == "y") {
        registers._Y_ = registers._X_;
        if (isFirstOperand == true) {
            registers._Z_ = "";
            registers.cumulative = "";
        }
    } else {
        registers._Z_ = registers._X_;
        if (isFirstOperand == true) {
            registers._Y_ = "";
            registers.process = "";
        }
    }

    (clear_X_forNewNumber == false) ? clear_X_forNewNumber = true : "";
}

function clearAllRegisters() {
    for (let reg in registers) {
        if (reg == "_M_") { continue; }
        registers[reg] = "";
    }
}

function removeLeadingZero() {
    for (let reg in registers) {
        if (reg != "_M_" && registers[reg][0] == "0" && registers[reg][1] != ".") {
            registers[reg] = registers[reg][0].substr(1);
        }
    }
}

function getResult() {
    displayFlash();
    if (isFirstOperand == true) { return }
    let result, operation;
    if (registers.process) {
        operation = registers.process;
        result = new Operations(registers._Y_, registers._X_);
        registers.process = "";
        registers._Y_ = "";
        registers._X_ = "";
        inputValue(result[operation]());
    }
    if (registers.cumulative) {
        operation = registers.cumulative;
        result = new Operations(registers._Z_, registers._X_);
        registers.cumulative = "";
        registers._Z_ = "";
        registers._X_ = "";
        inputValue(result[operation]());
    }
    isFirstOperand = false;
}

/////////////////////////////////////////////////

function displayRegisters() {
    console.log("X", registers._X_);
    console.log("Y", registers._Y_);
    console.log("Z", registers._Z_);
    console.log("M", registers._M_);
    console.log("process", registers.process);
    console.log("cumulative", registers.cumulative);
    console.log("First Operand", isFirstOperand);
    console.log("-----------------");
}
