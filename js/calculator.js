/**
 *
 */
// var calculator;
var displayValue = 0;
var displayValueArray = [];
var term1 = '';
var term2 = '';
var newTerm = false;
var operator = '';
var result = '';
var storedValue = 0;
var trailingZeroCount = 0;

var display = document.getElementById('digits_container');
var buttons = document.querySelectorAll('.btn');
var re = document.getElementById('result_electronics');
var powerSwitch = document.querySelector('[data-value="power"]');
var radDegSwitch = document.querySelector('[data-value="rad-deg"]');

const BUTTON_FUNC = {
    'arc': function() {},
    'sin': function() {},
    'cos': function() {},
    'tan': function() {},
    'clear': function() {clearDisplay(true)},
    'hyp': function() {},
    'd-r': function() {},
    'lnx': function() {},
    'ex': function() {},
    'log': function() {},
    'squared': function() {},
    'sqrt': function() {},
    'inverse': function() {},
    'factorial': function() {formatNumberForDisplay(factorial(displayValue))},
    'xroot': function() {},
    'store': function() {storedValue = displayValue},
    'recall': function() {formatNumberForDisplay(storedValue)},
    'sum': function() {},
    'exchange': function() {exchange(term1, term2)},
    'xpower': function() {},
    'clear-entry': function() {
        clearDisplay(false)
        resetDisplay(10, false, false)
    },
    'ee': function() {},
    'pi': function() {formatNumberForDisplay(Math.PI.toExponential(9))},
    'divide': function() {depressOperator('divide')},
    'digit': function() {digitDepress(this.dataset.value)},
    'multiply': function() {depressOperator('multiply')},
    'subtract': function() {depressOperator('subtract')},
    'add': function() {depressOperator('add')},
    'decimal': function() {},
    'pos-neg': function() {},
    'equals': function() {getResult()},
}

class Operations {
    constructor(...term) {
        this.term1 = this.toNumber(term[0]);
        this.term2 = this.toNumber(term[1]);
        this.lastValue = displayValue;
    }
    __str__() {
        return "The current terms are: " + this.term1 + " and " + this.term2 + ".";
    }
    add() {return this.term1 + this.term2}
    divide() {return this.term1 / this.term2}
    eSquared() {return Math.E ** this.term1}
    factorial(f = []) {
        for (let i = 2; i <= this.term1; i++) {f.push(i)}
        return f.reduce(function(a, b) {return a * b});
    }
    hypotenuse() {return Math.hypot(this.term1, this.term2)}
    multiply() {return this.term1 * this.term2}
    recall() {return this.lastValue}
    squared() {

    }
    store(display) {this.lastValue = this.toNumber(display);}
    subtract() {
        return this.term1 - this.term2;
    }
    toNumber(n) {
        return new Number(parseFloat(n));
    }
}

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

powerSwitch.addEventListener('click', function() {
    this.classList.toggle('on');
    if (this.classList.contains('on')) {
        setTimeout(powerOn, 100);
    } else if (this.dataset.value == 'power') {
        setTimeout(powerOff, 100);
    }
});

radDegSwitch.addEventListener('click', function() {
    this.classList.toggle('on');
});

/**
 * HELPER FUNCTIONS
 */
function eraseDisplay() {
    display.innerHTML = '';
}

function clearTerms() {
    term1 = '';
    term2 = '';
    newTerm = false;
}

function depressOperator(o) {
    operator = o;
    newTerm = true;
    resetDisplay(10, false, false);
}

function toNumber(n) {
    return new Number(parseFloat(n));
}

function exchange(a, b) {
    term1 = b;
    term2 = a;
}

function getResult() {
    result = new Operations(term1,term2)[operator]();
    formatNumberForDisplay(result);
}
/**
 * 
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
        btn.addEventListener('click', BUTTON_FUNC[btn.getAttribute('name')]);
        btn.addEventListener('click', BUTTON_FUNC[(btn.classList.contains('digit') ? 'digit' : '')]);
    });
}

function powerOff() {
    powerFlash();
    setTimeout(() => {
        eraseDisplay();
        clearTerms();
    }, 25);
    buttons.forEach(btn => {
        btn.removeEventListener('click', BUTTON_FUNC[btn.getAttribute('name')]);
        btn.removeEventListener('click', BUTTON_FUNC['digit']);
    });
}

function powerFlash() {
    eraseDisplay();
    resetDisplayValueArray(1, false);
    printResetDisplay();
}
/**
 * 
 */

function updateDisplayValue() {
    displayValue = '';
    for (let i = 1; i < displayValueArray.length; i++) {
        displayValue += (displayValueArray[i] == '&nbsp;') ? '0' : displayValueArray[i];
    }
    displayValue = displayValue.replaceAll(',', '');
    displayValue = parseFloat(displayValue);
    saveTerm();
}

function clearDisplay(hasDecimal) {
    eraseDisplay();
    if (hasDecimal) clearTerms();
    setTimeout(function() {
        resetDisplay(10, hasDecimal, true);
    }, 10);
}

function digitDepress(digit) {
    // (newTerm === true) ? resetDisplay(10,false) : '';
    updateDisplayValue();
    formatNumberForDisplay(displayValue + digit);
}

function saveTerm() {
    if (newTerm === false) {
        term1 = displayValue
    } else {
        term2 = displayValue
    }
    console.log('T1: ', term1)
    console.log('T2: ', term2)
}

function depressAnimation() {
    // todo
}

function resetDisplayValueArray(n, hasDecimal) {
    for (let i = 0; i < 14; i++) {
        if (i == n) {
            if (hasDecimal == true) {
                displayValueArray[i] = [0, '.'];
            } else {
                displayValueArray[i] = [0, ''];
            }
        } else {
            displayValueArray[i] = ['', ''];
        }
    }
}

function resetDisplay(n, b, erase) {
    if (erase) eraseDisplay();
    resetDisplayValueArray(n, b);
    updateDisplayValue();
    if (erase) printResetDisplay();
}

function printResetDisplay() {
    for (let i = 0; i < 14; i++) {
        display.insertAdjacentHTML('beforeend', `<div class="result${((displayValueArray[i][1]) ? ' decimal' : '')}" data-value="${displayValueArray[i][0]}">${displayValueArray[i][0]}</div>`);
    }
}

function trailingZeroTally(z = 0) {
    (z == 'reset') ? trailingZeroCount = 0: trailingZeroCount++;
}

function removeTrailingZeros() {
    for (let i = 0; i < trailingZeroCount; i++) {
        displayValueArray.pop();
    }
    for (let j = 0; j < trailingZeroCount - 4; j++) {
        displayValueArray.splice(1, 0, '&nbsp;');
    }
}

function truncateNumberForDisplay(n, p) {
    let sign = Math.sign(n);
    let ee = n.toString().indexOf('e');
    if (ee >= 0) {
        return '+' + Number.parseFloat(n).toPrecision(10);
    } else {
        if (n.toString().length > 10) return ((sign > 0) ? '+' : '') + Number.parseFloat(n).toExponential(9);
        return (sign >= 0) ? '+' + Number.parseFloat(n).toFixed(p) : Number.parseFloat(n).toFixed(p);
    }
}

function printToDisplay() {
    eraseDisplay();
    for (i = 0; i < displayValueArray.length; i++) {
        if (displayValueArray[i] == '.' || displayValueArray[i] == 'e') continue;
        if (displayValueArray[i] == '+') displayValueArray[i] = '&nbsp;';
        display.insertAdjacentHTML('beforeend', `<div class="result${((displayValueArray[i+1] == '.') ? ' decimal' : '')}" data-value="${displayValueArray[i]}">${displayValueArray[i]}</div>`);
    }
}

function formatNumberForDisplay(result) {
    console.log(result)
    let placeholdingZeros = 0;
    let decimalIndex = result.toString().indexOf('.');
    let trunc = truncateNumberForDisplay(result, 10 - decimalIndex);
    if (decimalIndex) {
        for (let i = decimalIndex + 1; i < trunc.length; i++) {
            if (trunc[i] !== '0') break;
            placeholdingZeros++;
        }
    }
    for (let i = 0; i < 16; i++) {
        displayValueArray[i] = (trunc[i]) ? trunc[i] : '0';
        (displayValueArray[i] == '0' && trunc.indexOf('e') < 0) ? trailingZeroTally(): trailingZeroTally('reset');
    }
    // console.log(displayValueArray);
    removeTrailingZeros();
    updateDisplayValue();
    // console.log(displayValueArray);
    printToDisplay();
};

function formatNumberForDisplay2(result) {

}

function factorial(n, f = []) {
    for (let i = 2; i <= n; i++) {
        f.push(i)
    }
    return f.reduce(function(a, b) {
        return a * b
    });
}