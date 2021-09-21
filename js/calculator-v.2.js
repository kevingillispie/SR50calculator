/**
 * @param {registers._X_} object  Input register
 * @param {registers._Y_} object  Process register
 * @param {registers._Z_} object  Cumulative register
 * @param {registers._M_} float   Memory register for storage
 */
var registers = {
    _X_: {
        "x": "",
        "y": "",
        "z": "",
        "operator": ""
    },
    _Y_: {
        "x": "",
        "y": "",
        "operator": ""
    },
    _Z_: {
        "x": "",
        "z": "",
        "operator": ""
    },
    _M_: parseFloat(0)
};
/***/
var re = document.getElementById("result_electronics"),
    powerSwitch = document.querySelector("[data-value=\"power\"]"),
    radDegSwitch = document.querySelector("[data-value=\"rad-deg\"]"),
    buttons = document.querySelectorAll(".btn"),
    displayLEDcontainer = document.getElementById("digits_container"),
    displayLEDs = displayLEDcontainer.children,
    numberOfLEDs = 14;
const BUTTON_EVENT_FUNCTIONS = {
    "add": function() {
        setOperator("add");
    },
    "arc": function() {
        setOperator("arc");
    },
    "cos": function() {
        console.log(Math.cos(registers._X_["x"]), true);
    },
    "clear": function() {
        // clear(true);
    },
    "clear-entry": function() {
        registers._X_["x"] = "";
    },
    "d-r": function() {},
    "decimal": function() {
        inputValue(this.dataset.value);
    },
    "digit": function() {
        inputValue(this.dataset.value);
    },
    "divide": function() {
        setOperator("divide");
    },
    "ee": function() {},
    "equals": function() {
        // getResult();
    },
    "ex": function() {
        console.log(Math.pow(Math.E, registers._X_["x"]), true);
    },
    "exchange": function() {
        if (registers._Y_["y"]) {
            let y = registers._Y_["y"];
            registers._Y_["y"] = registers._X_["x"];
            registers._X_["x"] = y;
        }
    },
    "factorial": function() {
        console.log(factorial(Math.trunc(registers._X_["x"])), true);
    },
    "hyp": function() {
        setOperator("hyperbolic");
    },
    "multiply": function() {
        setOperator("multiply");
    },
    "lnx": function() {
        console.log(Math.log(registers._X_["x"]), true);
    },
    "log": function() {
        console.log(Math.log10(registers._X_["x"]), true);
    },
    "pi": function() {
        /**
         * MANUAL INDICATES PI IS STORED 
         * "TO 13 SIGNIFICANT DIGITS (3.141592653590)" 
         * (PAGE 6)
         */
        // inputValue(Math.PI.toPrecision(13));
        console.log(Math.PI.toPrecision(13));
    },
    "pos-neg": function() {
        registers._X_["x"] = registers._X_["x"] * -1;
        // updateTerm(registers._X_["x"]);
        console.log(registers._X_["x"]);
    },
    "recall": function() {
        console.log(registers._M_);
        // clearTerms();
    },
    "reciprocal": function() {
        console.log(1 / registers._X_["x"], true);
    },
    "sin": function() {
        console.log(Math.sin(registers._X_["x"]), true);
    },
    "sqrt": function() {
        console.log(Math.sqrt(registers._X_["x"]), true);
    },
    "squared": function() {
        console.log(Math.pow(registers._X_["x"], 2), true);
    },
    "store": function() {
        (registers._X_) ? setregisters._M_(registers._X_): setregisters._M_("");
        displayFlash();
    },
    "subtract": function() {
        setOperator("subtract");
    },
    "sum": function() {
        setregisters._M_(registers._X_["x"] + registers._M_);
        console.log(registers._M_, true);
        // clearTerms();
        // toggleNewTerm();
        // updateNewTermregisters._X_();
    },
    "tan": function() {
        console.log(Math.tan(registers._X_["x"]), true);
    },
    "xpower": function() {
        setOperator("xPower");
    },
    "xroot": function() {
        setOperator("xRoot");
    }
};
/**
 * HELPER FUNCTIONs
 */
function getSign(v) {
    return Math.sign(parseFloat(v));
}

function set_M_(value = "") {
    registers._M_ = parseFloat(value);
}

function getValueStringLength() {
    return registers._X_["x"].length;
}

function checkForDecimalIn_X_() {
    return registers._X_["x"].search(/\./);
}

function scientificNotation(v) {
    // console.log("Length:", v.length);
    // console.log("X:", registers._X_["x"]);
    if (v > 10 ** 10) {
        console.log("EE9:", parseFloat(v).toExponential(9));
        console.log("P9", parseFloat(v).toPrecision(10));
    }
    return v;
}
/**
 * 
 */

/**
 * ONBOOT LOGIC
 */
/* CREATE DISPLAY BACKGROUND */
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

function digitDisplayElement(value = "") {
    let DIV = document.createElement("DIV");
    DIV.setAttribute("class", "result");
    DIV.dataset.value = value;
    DIV.innerText = value;
    return DIV;
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
    powerFlash();
    setTimeout(() => {
        // clearUserDisplay();
        // clearTerms();
        setregisters._M_("");
    }, 25);
    buttons.forEach((btn) => {
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS[btn.getAttribute("name")]);
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS.digit);
    });
}

function powerFlash() {
    // clearUserDisplay();
    // resetregisters._X_Array(1, false);
    // printResetDisplay();
}
/**
 * /END
 */

/**
 * DISPLAY LOGIC
 */

function resetDisplay() {
    for (const LED of displayLEDs) {
        LED.classList.remove("decimal");
        LED.innerText = "";
    }
}

function displayFlash() {
    let tempUD = displayLEDs;
    resetDisplay();
    setTimeout(function() {
        displayLEDs = tempUD;
    }, 10);
}

function print_X_ToDisplay(v) {
    resetDisplay();
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
    if (v == "." && checkForDecimalInregisters._X_() > -1) {
        return;
    } else if (v == "." && checkForDecimalInregisters._X_() == -1) {
        // document.querySelectorAll(".result")[]
    }
    /**
     * 
     */
    registers._X_["x"] += v;
    /**
     * UPDATE OTHER REGISTERS IF OPERAND EXISTS
     */
    if (registers._X_["operator"]) {
        let o = registers._X_["operator"];
        let reg = (o == "add" || o == "subtract") ? "z" : "y";
        populateRegisters(reg);
    }
    /**
     * 
     */
    // scientificNotation(registers._X_["x"]);
    print_X_ToDisplay(scientificNotation(registers._X_["x"]));

    displayRegsiters();
}

function setOperator(o) {
    registers._X_["operator"] = o;
    if (o === "add" || o === "subtract") {
        registers._Z_["operator"] = o;
        populateRegisters("z");
    } else {
        registers._Y_["operator"] = o;
        populateRegisters("y");
    }
    displayRegsiters();
}

function populateRegisters(reg) {
    if (reg == "y") {
        registers._X_[reg] = registers._X_["x"];
        registers._Y_["x"] = registers._X_["x"];
        registers._Y_["y"] = registers._X_["y"];
    } else {
        registers._X_[reg] = registers._X_["x"];
        registers._Z_["x"] = registers._X_["x"];
        registers._Z_["z"] = registers._X_["z"];
    }
    registers._X_["x"] = "";
    displayRegsiters();
}

function removeInitialZero() {
    for (const REG in registers) {
        console.log(registers[REG]["x"]);
    }
}

function displayRegsiters() {
    console.log("X", registers._X_);
    console.log("Y", registers._Y_);
    console.log("Z", registers._Z_);
    console.log("M", registers._M_);
    removeInitialZero();
}