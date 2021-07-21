/**
 * @param {_X_} float Input register
 * @param {_Y_} float Process register
 * @param {_Z_} float Cumulative register
 * @param {_M_} float Memory register for storage
 */
var _X_ = parseFloat(0),
    _Y_ = parseFloat(0),
    _Z_ = parseFloat(0),
    _M_ = parseFloat(0);
/***/
var re = document.getElementById("result_electronics"),
    powerSwitch = document.querySelector("[data-value=\"power\"]"),
    radDegSwitch = document.querySelector("[data-value=\"rad-deg\"]");
const BUTTON_EVENT_FUNCTIONS = {
    "add": function() {
        depressOperator("add");
    },
    "arc": function() {
        depressOperator("arc");
    },
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
        depressOperator("hyperbolic");
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
