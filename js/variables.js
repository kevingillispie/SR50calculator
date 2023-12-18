/**
 * @param {registers._X_}           string  Input register
 * @param {registers._Y_}           string  Process register
 * @param {registers._Z_}           string  Cumulative register
 * @param {registers._M_}           float   Memory register for storage
 * @param {registers.process}       string 
 * @param {registers.cumulative}    string 
 */
export var registers = {
    _X_: "",
    _Y_: "",
    _Z_: "",
    _M_: parseFloat(0),
    process: "",
    cumulative: ""
};

/***/
export var HTML = {
    re: document.getElementById("result_electronics"),
    powerSwitch: document.querySelector('[data-value="power"]'),
    radDegSwitch: document.querySelector('[data-value="rad-deg"]'),
    buttons: document.querySelectorAll(".btn"),
    displayLEDcontainer: document.getElementById("digits_container"),
    // displayLEDs: HTML.displayLEDcontainer.children,
};
export var LOGIC = {
    numberOfLEDs: 14,
    clear_X_forNewNumber: false,
    isFirstOperand: true,
    errorCorrectionCurrentInput: "",
    isPiPressed: false,
    processes: ["multiply", "divide", "xPower", "xRoot"],
    radDegSetting: "rad",
    arc: false,
    hyperbolic: false,
    isOperandCountEven: true,
    isEE: false
};

export default { registers, HTML, LOGIC }