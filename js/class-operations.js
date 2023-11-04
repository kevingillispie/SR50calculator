export class Operations {
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
        if (arc == true && hyperbolic == true) {
            if (radDeg == "deg") {
                cTemp = Math.acosh(cTemp) * (180 / Math.PI);
            } else {
                cTemp = Math.acosh(cTemp);
            }
        } else if (arc == true && hyperbolic == false) {
            if (radDeg == "deg") {
                cTemp = Math.acos(cTemp) * (180 / Math.PI);
            } else {
                cTemp = Math.acos(cTemp);
            }
        } else if (arc == false && hyperbolic == true) {
            if (radDeg == "deg") {
                cTemp = Math.cosh(cTemp) * (180 / Math.PI);
            } else {
                cTemp = Math.cosh(cTemp);
            }
        } else {
            if (radDeg == "deg") {
                cTemp = Math.cos(cTemp * (Math.PI / 180));
            } else {
                cTemp = Math.cos(cTemp);
            }
        }
        arc = false;
        hyperbolic = false;
        return cTemp;
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
    // hypotenuse() {
    //     return Math.hypot(this.term1, this.term2);
    // }
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
        if (arc == true && hyperbolic == true) {
            console.log("arc && hyp");
            if (radDeg == "deg") {
                sTemp = Math.asinh(sTemp) * (180 / Math.PI);
            } else {
                sTemp = Math.asinh(sTemp);
            }
        } else if (arc == true && hyperbolic == false) {
            console.log("arc && !hyp");
            if (radDeg == "deg") {
                sTemp = Math.asin(sTemp) * (180 / Math.PI);
            } else {
                sTemp = Math.asin(sTemp);
            }
        } else if (arc == false && hyperbolic == true) {
            console.log("!arc && hyp");
            if (radDeg == "deg") {
                sTemp = Math.sinh(sTemp) * (180 / Math.PI);
            } else {
                sTemp = Math.sinh(sTemp);
            }
        } else {
            console.log("!arc && !hyp");
            if (radDeg == "deg") {
                sTemp = Math.sin(sTemp * (Math.PI / 180));
            } else {
                sTemp = Math.sin(sTemp);
            }
        }
        arc = false;
        hyperbolic = false;
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
        if (arc == true && hyperbolic == true) {
            if (radDeg == "deg") {
                tTemp = Math.atanh(tTemp) * (180 / Math.PI);
            } else {
                tTemp = Math.atanh(tTemp);
            }
        } else if (arc == true && hyperbolic == false) {
            if (radDeg == "deg") {
                tTemp = Math.atan(tTemp) * (180 / Math.PI);
            } else {
                tTemp = Math.atan(tTemp);
            }
        } else if (arc == false && hyperbolic == true) {
            if (radDeg == "deg") {
                tTemp = Math.tanh(tTemp) * (180 / Math.PI);
            } else {
                tTemp = Math.tanh(tTemp);
            }
        } else {
            if (radDeg == "deg") {
                tTemp = Math.tan(tTemp * (Math.PI / 180));
            } else {
                tTemp = Math.tan(tTemp);
            }
        }
        arc = false;
        hyperbolic = false;
        return tTemp;
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

export default Operations;