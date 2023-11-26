"use strict";
import { registers, HTML, LOGIC } from "./variables.js";

const BUTTON_EVENT_FUNCTIONS = {
    "add": function () {
        setOperator("add");
    },
    "arc": function () {
        LOGIC.arc = (LOGIC.arc == false) ? true : false;
        displayRegisters();
    },
    "cos": function () {
        immediateOperator("cos");
    },
    "clear": function () {
        clear();
    },
    "clear-entry": function () {
        registers._X_ = "";
        inputValue(0);
    },
    "decimal": function () {
        inputValue(this.dataset.value);
    },
    "deg-rad": function () {
        // LOGIC.radDegSetting = LOGIC.radDegSetting == 'rad' ? 'deg' : 'rad';
        immediateOperator('radDegInverse');
    },
    "digit": function () {
        inputValue(this.dataset.value);
    },
    "divide": function () {
        setOperator("divide");
    },
    "ee": function () { },
    "equals": function (e) {
        getResult(e);
    },
    "eRaised": function () {
        immediateOperator("eRaised");
    },
    "exchange": function () {
        if (registers._Y_) {
            let y = registers._Y_;
            registers._Y_ = registers._X_;
            registers._X_ = y;
        }
    },
    "factorial": function () {
        immediateOperator("factorial");
    },
    "hyp": function () {
        LOGIC.hyperbolic = (LOGIC.hyperbolic == false) ? true : false;
        displayRegisters();
    },
    "multiply": function () {
        setOperator("multiply");
    },
    "lnx": function () {
        immediateOperator("lnx");
    },
    "log": function () {
        immediateOperator("log");
    },
    "pi": function () {
        /**
         * THE USER MANUAL INDICATES PI IS STORED 
         * "TO 13 SIGNIFICANT DIGITS (3.141592653590)" 
         * (PAGE 6)
         */
        inputValue(Math.PI.toPrecision(13));
        LOGIC.isPiPressed = true;
    },
    "posNeg": function () {
        immediateOperator("posNeg");
    },
    "recall": function () {
        resetDisplay();
        inputValue(registers._M_);
    },
    "reciprocal": function () {
        immediateOperator("reciprocal");
    },
    "sine": function () {
        immediateOperator("sine");
        displayRegisters();
    },
    "sqrt": function () {
        immediateOperator("sqrt");
    },
    "squared": function () {
        immediateOperator("squared");
    },
    "store": function () {
        registers._M_ = registers._X_;
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
        immediateOperator("tan");
    },
    "xPower": function () {
        setOperator("xPower");
    },
    "xRoot": function () {
        setOperator("xRoot");
    }
};

class Operations {
    constructor(...term) {
        this.term1 = this.toNumber(term[0]);
        this.term2 = this.toNumber(term[1]);
        // this.lastValue = registers._X_;
    }
    add() {
        return this.term1 + this.term2;
    }
    cos() {
        let cTemp = this.term1;
        if (LOGIC.arc == true && LOGIC.hyperbolic == true) {
            if (LOGIC.radDegSetting == "deg") {
                cTemp = Math.acosh(cTemp) * (180 / Math.PI);
            } else {
                cTemp = Math.acosh(cTemp);
            }
        } else if (LOGIC.arc == true && LOGIC.hyperbolic == false) {
            if (LOGIC.radDegSetting == "deg") {
                cTemp = Math.acos(cTemp) * (180 / Math.PI);
            } else {
                cTemp = Math.acos(cTemp);
            }
        } else if (LOGIC.arc == false && LOGIC.hyperbolic == true) {
            if (LOGIC.radDegSetting == "deg") {
                cTemp = Math.cosh(cTemp) * (180 / Math.PI);
            } else {
                cTemp = Math.cosh(cTemp);
            }
        } else {
            if (LOGIC.radDegSetting == "deg") {
                cTemp = Math.cos(cTemp * (Math.PI / 180));
            } else {
                cTemp = Math.cos(cTemp);
            }
        }
        displayRegisters();
        LOGIC.arc = false;
        LOGIC.hyperbolic = false;
        return cTemp;
    }
    radDegInverse() {
        if (LOGIC.radDegSetting == "deg") {
            return registers._X_ * (180 / Math.PI);
        }
        return registers._X_ = registers._X_ * (Math.PI / 180);
    }
    divide() {
        return this.term1 / this.term2;
    }
    eRaised() {
        return Math.pow(Math.E, this.term1);
    }
    factorial() {
        let n = Math.trunc(this.term1), f = [1];
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
    hypotenuse() {
        return Math.hypot(this.term1, this.term2);
    }
    lnx() {
        return Math.log(this.term1);
    }
    log() {
        return Math.log10(this.term1);
    }
    multiply() {
        return this.term1 * this.term2;
    }
    posNeg() {
        return this.term1 * -1;
    }
    reciprocal() {
        return 1 / this.term1;
    }
    sine() {
        let sTemp = this.term1;
        if (LOGIC.arc == true && LOGIC.hyperbolic == true) {
            console.log("arc && hyp");
            if (LOGIC.radDegSetting == "deg") {
                sTemp = Math.asinh(sTemp) * (180 / Math.PI);
            } else {
                sTemp = Math.asinh(sTemp);
            }
        } else if (LOGIC.arc == true && LOGIC.hyperbolic == false) {
            console.log("arc && !hyp");
            if (LOGIC.radDegSetting == "deg") {
                sTemp = Math.asin(sTemp) * (180 / Math.PI);
            } else {
                sTemp = Math.asin(sTemp);
            }
        } else if (LOGIC.arc == false && LOGIC.hyperbolic == true) {
            console.log("!arc && hyp");
            if (LOGIC.radDegSetting == "deg") {
                sTemp = Math.sinh(sTemp);
            } else {
                sTemp = Math.sinh(sTemp) * (180 / Math.PI);
            }
        } else {
            console.log("!arc && !hyp");
            if (LOGIC.radDegSetting == "deg") {
                sTemp = Math.sin(sTemp * (Math.PI / 180));
            } else {
                sTemp = Math.sin(sTemp);
            }
        }
        displayRegisters();
        LOGIC.arc = false;
        LOGIC.hyperbolic = false;
        return sTemp;
    }
    sqrt() {
        return Math.sqrt(this.term1);
    }
    squared() {
        return Math.pow(this.term1, 2);
    }
    subtract() {
        return this.term1 - this.term2;
    }
    tan() {
        let tTemp = this.term1;
        if (LOGIC.arc == true && LOGIC.hyperbolic == true) {
            if (LOGIC.radDegSetting == "deg") {
                tTemp = Math.atanh(tTemp) * (180 / Math.PI);
            } else {
                tTemp = Math.atanh(tTemp);
            }
        } else if (LOGIC.arc == true && LOGIC.hyperbolic == false) {
            if (LOGIC.radDegSetting == "deg") {
                tTemp = Math.atan(tTemp) * (180 / Math.PI);
            } else {
                tTemp = Math.atan(tTemp);
            }
        } else if (LOGIC.arc == false && LOGIC.hyperbolic == true) {
            if (LOGIC.radDegSetting == "deg") {
                tTemp = Math.tanh(tTemp) * (180 / Math.PI);
            } else {
                tTemp = Math.tanh(tTemp);
            }
        } else {
            if (LOGIC.radDegSetting == "deg") {
                tTemp = Math.tan(tTemp * (Math.PI / 180));
            } else {
                tTemp = Math.tan(tTemp);
            }
        }
        displayRegisters();
        LOGIC.arc = false;
        LOGIC.hyperbolic = false;
        return tTemp;
    }
    toNumber(n) {
        return parseFloat(n);
    }
    xPower() {
        return Math.pow(this.term1, this.term2);
    }
    xRoot() {
        return this.term1 ** (1 / this.term2);
    }
}

/**
 * HELPER FUNCTIONS
 */
function clear() {
    clearAllRegisters();
    inputValue(0);
    LOGIC.arc = false;
    LOGIC.hyperbolic = false;
    if (HTML.radDegSwitch.classList.contains("on")) {
        LOGIC.radDegSetting = "deg";
    } else {
        LOGIC.radDegSetting = "rad";
    }
    setTimeout(function () {
        document.getElementsByClassName("result")[10].classList.add("decimal");
    }, 50);
}

// function getSign(v) {
//     return Math.sign(parseFloat(v));
// }

// function getValueStringLength() {
//     return registers._X_.length;
// }

function checkForDecimalIn_X_() {
    return registers._X_.search(/\./);
}

function scientificNotation(v) {
    if (v.length > 11 && v.search(".") < 0) {
        v = parseFloat(v).toPrecision(11);
    } else if (v.length > 11) {
        v = v.substring(0, 11);
    }
    return v;
}

function reset_M_() {
    registers._M_ = parseFloat(0);
}

function resetRadDeg() {
    LOGIC.radDegSwitch = (!document.querySelector('[data-value="rad-deg"]').classList.contains("on")) ? "rad" : "deg";
}
/**
 * HELPER FUNCTIONS END
 */

/**
 * ONBOOT LOGIC
 */
// CREATE DISPLAY BACKGROUND
function digitDisplayElement(value = "") {
    let DIV = document.createElement("DIV");
    DIV.setAttribute("class", "result");
    DIV.dataset.value = value;
    DIV.innerText = value;
    return DIV;
}

! function () {
    for (let i = 0; i < LOGIC.numberOfLEDs; i++) {
        HTML.re.insertAdjacentHTML('afterbegin', `
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
        HTML.displayLEDcontainer.insertAdjacentElement("beforeend", digitDisplayElement());
    }

    HTML.powerSwitch.addEventListener("click", function () {
        this.classList.toggle("on");
        if (this.classList.contains("on")) {
            setTimeout(powerOn, 100);
        } else {
            setTimeout(powerOff, 100);
        }
    });

    HTML.radDegSwitch.addEventListener("click", function () {
        this.classList.toggle("on");
        if (!this.classList.contains("on")) {
            LOGIC.radDegSetting = "rad";
            // registers._X_ = registers._X_ * (Math.PI / 180);
        } else {
            LOGIC.radDegSetting = "deg";
            // registers._X_ = registers._X_ * (180 * Math.PI);
        }
    });
}();
/**
 * ONBOOT LOGIC END
 */

/**
 * POWER ON / OFF
 */
function powerOn() {
    setTimeout(powerFlash, 80);
    setTimeout(() => {
        inputValue(0);
        displayBlink();
    }, 100);

    HTML.buttons.forEach((btn) => {
        btn.addEventListener("click", BUTTON_EVENT_FUNCTIONS[btn.getAttribute("name")]);
        btn.addEventListener("click", BUTTON_EVENT_FUNCTIONS[(btn.classList.contains("digit") ? "digit" : "")]);
        btn.addEventListener("click", displayBlink);
    });

    document.addEventListener('keydown', (e) => {
        keyPress(e.key);
    });
}

function keyPress(key = null) {
    let keyNames = {
        '.': 'decimal',
        '+': 'add',
        '-': 'subtract',
        '/': 'divide',
        '*': 'multiply',
        '=': 'equals',
        'Enter': 'equals'
    }
    key = (keyNames[key]) ? keyNames[key] : key;
    let btn = document.querySelector('[name="' + key + '"]');
    if (btn) document.querySelector('[name="' + key + '"]').click();
    displayBlink();
}

function powerOff() {
    // clearFlashingNines(); // TODO
    HTML.buttons.forEach((btn) => {
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS[btn.getAttribute("name")]);
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS.digit);
    });
    setTimeout(() => {
        LOGIC.arc = false;
        LOGIC.hyperbolic = false;
        clearAllRegisters();
        resetDisplay();
        powerFlash();
        reset_M_();
    }, 25);
}

function powerFlash() {
    let display = document.querySelectorAll(".result");
    display[1].innerText = "0";
    setTimeout(resetDisplay, 10);
}
/**
 * POWER ON / OFF END
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

function displayBlink() {
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

function isAllZeros(n) {
    for (let i = 0; i < n.length; i++) {
        const digit = n[i];
        if (digit != "." && digit > 0) {
            return false;
        }
    }
    return true;
}

// ONLY DISPLAY X REGISTER
function print_X_ToDisplay() {
    registers._X_ = registers._X_.toString();
    let v = scientificNotation(registers._X_);
    // if (false == isAllZeros(v) && v[v.length - 1] == "0") {
    //     v = v.slice(0, -1);
    // }
    let vIndex = v.length;
    let shift = 2;
    for (let i = LOGIC.numberOfLEDs - 1; i >= 0; i--) {
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
 * DISPLAY LOGIC END
 */

/**
 * DATA & FUNCTION ENTRY LOGIC
 */
function immediateOperator(operation) {
    let result = new Operations(registers._X_);
    registers._X_ = result[operation]();
    print_X_ToDisplay();
}

function userErrorCorrection(input = "") {
    LOGIC.errorCorrectionCurrentInput = Number.isInteger(input) ? LOGIC.errorCorrectionCurrentInput : input;
    if (LOGIC.isPiPressed == true) {
        LOGIC.isPiPressed = false;
        LOGIC.clear_X_forNewNumber = true;
    }

    if (registers._Y_ == "" && registers._Z_ == "") {
        LOGIC.isFirstOperand = true;
    } else {
        LOGIC.isFirstOperand = false;
    }
}

function inputValue(v) {
    userErrorCorrection(v);
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

    if (LOGIC.clear_X_forNewNumber == false) {
        registers._X_ += v;
    } else {
        registers._X_ = v;
        LOGIC.clear_X_forNewNumber = false;
    }
    displayRegisters();
}

function setOperator(o) {
    // TODO: COMPLETE PENDING OPERATION SOMEWHERE IN HERE
    if (registers._X_ != "" && registers._Y_ == "") {
        registers.process = "";
    }
    userErrorCorrection(o);
    // debugger;
    if (
        (o == "multiply" || o == "divide")
        && (registers.cumulative != "add" && registers.cumulative != "subtract")
    ) {
        registers.process = o;
        LOGIC.isFirstOperand = true;
        registers._Y_ = "";
        populateRegisters("y");
    } else if (
        LOGIC.processes.includes(o)
        || (
            registers.process != ""
            && (o == "add" || o == "subtract")
        )
    ) {
        if (
            registers.process != ""
            && LOGIC.isFirstOperand == false
        ) {
            getResult();
        }
        registers.process = o;
        populateRegisters("y");
    } else if (
        (o == "add" || o == "subtract")
        && (registers.process != "multiply" && registers.process != "divide")
    ) {
        getResult();
        registers.cumulative = o;
        LOGIC.isFirstOperand = true;
        registers._Z_ = "";
        populateRegisters("z");
    } else if (o == "add" || o == "subtract") {
        if (
            registers.cumulative != ""
            && LOGIC.isFirstOperand == false
            && registers._X_ != registers._Z_
        ) {
            getResult();
        }
        registers.cumulative = o;
        populateRegisters("z");
    }
}

function populateRegisters(reg) {
    if (reg == "y") {
        registers._Y_ = registers._X_;
        if (LOGIC.isFirstOperand == true) {
            registers._Z_ = "";
            registers.cumulative = "";
        }
    } else {
        registers._Z_ = registers._X_;
        if (LOGIC.isFirstOperand == true) {
            registers._Y_ = "";
            registers.process = "";
        }
    }

    (LOGIC.clear_X_forNewNumber == false) ? LOGIC.clear_X_forNewNumber = true : "";
    displayRegisters();
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

function getResult(e = "") {
    if (LOGIC.isFirstOperand == true) return;
    if (
        e != ""
        && e.target.innerText == "="
        && registers._X_ == registers._Y_
    ) {
        registers.process = "";
    }

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
    LOGIC.isFirstOperand = true;
    LOGIC.arc = false;
    LOGIC.hyperbolic = false;
    resetRadDeg();
    displayRegisters();
}

/////////////////////////////////////////////////

function displayRegisters() {
    console.log("X", registers._X_);
    console.log("Y", registers._Y_);
    console.log("Z", registers._Z_);
    console.log("M", registers._M_);
    console.log("r.process", registers.process);
    console.log("r.cumulative", registers.cumulative);
    console.log("Is First Operand?", LOGIC.isFirstOperand);
    console.log("Error Correction", LOGIC.errorCorrectionCurrentInput);
    console.log("radDegSetting:", LOGIC.radDegSetting);
    console.log("arc:", LOGIC.arc);
    console.log("hyp:", LOGIC.hyperbolic);
    console.log("-----------------");
}
