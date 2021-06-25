/**
 *
 */
var calculator;
var display = document.getElementById('digits_container');
var displayValue = [];
var trailingZeroCount = 0;

var buttons = document.querySelectorAll('.btn');
var re = document.getElementById('result_electronics');
var powerSwitch = document.querySelector('[data-value="power"]');
var radDegSwitch = document.querySelector('[data-value="rad-deg"]');

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

function eraseDisplay() {
    display.innerHTML = '';
}

function clearBtn() {
    eraseDisplay();
    setTimeout(function() {
        resetDisplay(10, true);
    }, 10);
}

function clearEntryBtn() {
    eraseDisplay();
    setTimeout(function() {
        resetDisplay(10, false);
    }, 10);
}

function powerOn() {
    setTimeout(powerFlash, 80);
    setTimeout(function() {
        resetDisplay(10, false);
    }, 100);
    buttons.forEach((btn) => {
        btn.addEventListener('click', clickEvent);
    });
    document.getElementsByClassName('clear')[0].addEventListener('click', clearBtn);
    document.getElementsByClassName('clear-entry')[0].addEventListener('click', clearEntryBtn);
}

function powerOff() {
    powerFlash();
    setTimeout(function() {
        eraseDisplay();
    }, 25);
    buttons.forEach(btn => {
        btn.removeEventListener('click', clickEvent);
    });
    document.getElementsByClassName('clear')[0].removeEventListener('click', clearBtn);
}

function powerFlash() {
    eraseDisplay();
    resetDigitArray(1, false);
    printResetDisplay();
}

function toNumber(n) {
    return new Number(parseFloat(n));
}

function clickEvent() {
    if (this.classList.contains('digit')) printInput(this.dataset.value);
}

function depressAnimation() {
    // todo
}

function resetDigitArray(n, b) {
    for (let i = 0; i < 14; i++) {
        if (i == n) {
            if (b == true) {
                displayValue[i] = [0, '.'];
            } else {
                displayValue[i] = [0, ''];
            }
        } else {
            displayValue[i] = ['', ''];
        }
    }
}

function resetDisplay(n, b) {
    eraseDisplay();
    resetDigitArray(n, b);
    printResetDisplay();
}

function printResetDisplay() {
    for (let i = 0; i < 14; i++) {
        display.insertAdjacentHTML('beforeend', `<div class="result${((displayValue[i][1]) ? ' decimal' : '')}" data-value="${displayValue[i][0]}">${displayValue[i][0]}</div>`);
    }
}

function printInput(num) {
    console.log(display);
    if (num == '.') {
        let num = display.children[10].innerText;
        // if (num == undefined) return;
        display.children[10].remove();
        display.children[10].outerHTML = `<div class="result decimal" data-value="${num}">${num}</div>`;
    } else {
        let tempArray = new Array(14);
        display.childNodes.forEach((digit, i) => {
            if (i > 0) tempArray[i - 1] = displayValue[i];
        });
        tempArray[10] = [num, ''];
        eraseDisplay();
        for (i = 0; i < 14; i++) {
            displayValue[i] = tempArray[i];
            display.insertAdjacentHTML('beforeend', `<div class="result${((displayValue[i][1]) ? ' decimal' : '')}" data-value="${displayValue[i][0]}">${displayValue[i][0]}</div>`);
        }
    }
}

function printToDisplay() {
    for (i = 0; i < displayValue.length; i++) {
        if (displayValue[i] == '.' || displayValue[i] == 'e') continue;
        if (displayValue[i] == '+') displayValue[i] = '&nbsp;';
        display.insertAdjacentHTML('beforeend', `<div class="result${((displayValue[i+1] == '.') ? ' decimal' : '')}" data-value="${displayValue[i]}">${displayValue[i]}</div>`);
    }
}

function trailingZeroTally(z = 0) {
    (z == 'reset') ? trailingZeroCount = 0: trailingZeroCount++;
}

function removeTrailingZeros() {
    for (let i = 0; i < trailingZeroCount; i++) {
        displayValue.pop();
    }
    for (let j = 0; j < trailingZeroCount - 4; j++) {
        displayValue.splice(1, 0, '&nbsp;');
    }
}

function truncateNumberForDisplay(n, p) {
    let sign = Math.sign(n);
    let ee = n.toString().indexOf('e');
    if (ee >= 0) {
        // if (ee > 10) {
        //     return Number.parseFloat(n).toExponential(10)
        // }
        return '+' + Number.parseFloat(n).toPrecision(10);
    } else {
        if (n.toString().length > 10) return ((sign >+ 0) ? '+' : '') + Number.parseFloat(n).toExponential(9);
        return (sign >= 0) ? '+' + Number.parseFloat(n).toFixed(p) : Number.parseFloat(n).toFixed(p);
    }
}

! function formatNumberForDisplay(result = (-247.97 + 34.96**2)) {
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
        displayValue[i] = (trunc[i]) ? trunc[i] : '0';
        (displayValue[i] == '0') ? trailingZeroTally(): trailingZeroTally('reset');
    }
    removeTrailingZeros();
    printToDisplay();
}();

function factorial(n, f = []) {
    for (let i = 2; i <= n; i++) {
        f.push(i)
    }
    return f.reduce(function(a, b) {
        return a * b
    });
}

/**
 *
 */
class Calculator {
    constructor(...term) {
        this.term1 = this.toNumber(term[0]);
        this.term2 = this.toNumber(term[1]);
        this.displayValue = new Array(14);
        this.lastValue;
    }
    __str__() {
        return "The current terms are: " + this.term1 + " and " + this.term2 + ".";
    }
    add() {
        return this.term1 + this.term2;
    }
    divide() {
        return this.term1 / this.term2;
    }
    eSquared() {
        return Math.E ** this.term1;
    }
    hypotenuse() {
        return Math.hypot(this.term1, this.term2);
    }
    multiply() {
        return this.term1 * this.term2;
    }
    recall() {
        return this.lastValue;
    }
    store(display) {
        this.lastValue = this.toNumber(display);
    }
    subtract() {
        return this.term1 - this.term2;
    }
    toNumber(n) {
        return new Number(parseFloat(n));
    }
    update(...newTerm) {
        this.term1 = this.toNumber(newTerm[0]) || this.term1;
        this.term2 = this.toNumber(newTerm[1]) || this.term2;
    }
}

// var calc = new Calculator(2.1, 3);
// var calc2 = new Calculator(4, 5);

// console.log(calc.__str__());
// console.log(calc2.__str__());

// calc.update(100, .8);

// console.log(calc.__str__());
// console.log(calc.eSquared());

// console.log(Math.round(2.123456734).toFixed(9));