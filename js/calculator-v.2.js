/**
 * @param {_X_} object  Input register
 * @param {_Y_} object  Process register
 * @param {_Z_} object  Cumulative register
 * @param {_M_} float   Memory register for storage
 */
var _X_ = {
        "x": "",
        "y": "",
        "z": "",
        "operation": ""
    },
    _Y_ = {
        "x": "",
        "y": "",
        "operation": ""
    },
    _Z_ = {
        "x": "",
        "z": "",
        "operation": ""
    },
    _M_ = "";
/***/
var re = document.getElementById("result_electronics"),
    powerSwitch = document.querySelector("[data-value=\"power\"]"),
    radDegSwitch = document.querySelector("[data-value=\"rad-deg\"]"),
    userDisplay = document.getElementById("digits_container"),
    buttons = document.querySelectorAll(".btn");
const BUTTON_EVENT_FUNCTIONS = {
    "add": function() {
        setOperand("add");
    },
    "arc": function() {
        setOperand("arc");
    },
    "cos": function() {
        console.log(Math.cos(_X_["x"]), true);
    },
    "clear": function() {
        // clear(true);
    },
    "clear-entry": function() {
        _X_["x"] = "";
    },
    "d-r": function() {},
    "decimal": function() {
        if (_X_["x"].indexOf(".") == -1) {
            console.log(this.dataset.value, false);
        } else {
            // displayFlash();
        }
    },
    "digit": function() {
        inputValue(this.dataset.value);
    },
    "divide": function() {
        setOperand("divide");
    },
    "ee": function() {},
    "equals": function() {
        // getResult();
    },
    "ex": function() {
        console.log(Math.pow(Math.E, _X_["x"]), true);
    },
    "exchange": function() {
        if (_Y_["y"]) {
            let y = _Y_["y"];
            _Y_["y"] = _X_["x"];
            _X_["x"] = y;
        }
    },
    "factorial": function() {
        console.log(factorial(Math.trunc(_X_["x"])), true);
    },
    "hyp": function() {
        setOperand("hyperbolic");
    },
    "multiply": function() {
        setOperand("multiply");
    },
    "lnx": function() {
        console.log(Math.log(_X_["x"]), true);
    },
    "log": function() {
        console.log(Math.log10(_X_["x"]), true);
    },
    "pi": function() {
        console.log(Math.PI.toPrecision(10), true);
    },
    "pos-neg": function() {
        _X_["x"] = _X_["x"] * -1;
        // updateTerm(_X_["x"]);
        console.log(_X_["x"], true);
    },
    "recall": function() {
        console.log(_M_, true);
        // clearTerms();
    },
    "reciprocal": function() {
        console.log(1 / _X_["x"], true);
    },
    "sin": function() {
        console.log(Math.sin(_X_["x"]), true);
    },
    "sqrt": function() {
        console.log(Math.sqrt(_X_["x"]), true);
    },
    "squared": function() {
        console.log(Math.pow(_X_["x"], 2), true);
    },
    "store": function() {
        (_X_) ? set_M_(_X_): set_M_("");
        displayFlash();
    },
    "subtract": function() {
        setOperand("subtract");
    },
    "sum": function() {
        set_M_(_X_["x"] + _M_);
        console.log(_M_, true);
        // clearTerms();
        // toggleNewTerm();
        // updateNewTerm_X_();
    },
    "tan": function() {
        console.log(Math.tan(_X_["x"]), true);
    },
    "xpower": function() {
        setOperand("xPower");
    },
    "xroot": function() {
        setOperand("xRoot");
    }
};
/**
 * HELPER FUNCTIONs
 */
function getSign(v) {
    return Math.sign(parseFloat(v));
}

function set_M_(value = "") {
    _M_ = parseFloat(value);
}

function getValueStringLength() {
    return _X_["x"].length;
}

function scientificNotation(v) {
    console.log("Length:", v.length);
    console.log("X:", _X_["x"]);
    if (v > 10**10) {
        console.log("EE9:", parseFloat(v).toExponential(9));
        console.log("P9", parseFloat(v).toPrecision(10));
    }
}
/**
 * 
 */

/**
 * ONBOOT LOGIC
 */
/* CREATE DISPLAY BACKGROUND */
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
 * POWER ON / OFF
 */
function powerOn() {
    setTimeout(powerFlash, 80);
    setTimeout(() => {
        // resetDisplay(10, false, true);
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
        set_M_("");
    }, 25);
    buttons.forEach((btn) => {
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS[btn.getAttribute("name")]);
        btn.removeEventListener("click", BUTTON_EVENT_FUNCTIONS.digit);
    });
}

function powerFlash() {
    // clearUserDisplay();
    // reset_X_Array(1, false);
    // printResetDisplay();
}
/**
 * /END
 */

/**
 * DISPLAY LOGIC
 */
function digitDisplayElement(value = "") {
    let DIV = document.createElement("DIV");
    DIV.setAttribute("class", "result");
    DIV.dataset.value = value;
    DIV.innerText = value;
    return DIV;
}

function formatValueForDisplay(v) {

}

function printValueToDisplay(v) {
    let sign = (getSign(v) > -1) ? "+" : "-";
    for (let i = 0; i < 14; i++) {
        console.log(digitDisplayElement(v));
    }
}
/**
 * 
 */

/**
 * DATA & FUNCTION ENTRY LOGIC
 */

function inputValue(v) {
    _X_["x"] += v;
    scientificNotation(_X_["x"]);
}

function setOperand(o) {
    _X_["operation"] = o;
    if (o === "add" || o === "subtract") {
        _Z_["operation"] = o;
    } else {
        _Y_["operation"] = o;
    }
    console.log(_X_["operation"], _Y_["operation"], _Z_["operation"]);
}
