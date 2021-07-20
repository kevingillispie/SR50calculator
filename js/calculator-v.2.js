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
