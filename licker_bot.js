const BUTTONS = {
    Z: 16,
    X: 32
}

const COLORS = {
    BACKGROUND: "29,43,83,255",
    RED: "255,0,77,255",
    ORANGE: "255,163,0,255"
}

const e_canvas = document.querySelector("#e_canvas");
const e_ctx = e_canvas.getContext("2d");

let framesZPressed = 0;

const getColors = () => {

    if (pico8_buttons[0] === BUTTONS.Z) {

        framesZPressed++;

        if(framesZPressed === 2) {

            framesZPressed = 0;

            pico8_buttons[0] = 0;
        }
    }

    // const data = e_ctx.getImageData(64, 42, 1, 86).data;
    const data = e_ctx.getImageData(60, 42, 8, 86).data;

    const colors = [];
    let vals = [];
    let counter = 0;

    // try a slice version here too if this isn't performant

    for (let i = 0; i <= data.length; i++) {
        // debugger;
        vals[counter] = data[i];

        if (counter === 3) {

            const color_str = vals.join(",");

            if (color_str === COLORS.RED) return;

            if (color_str !== COLORS.BACKGROUND) {

                colors.push(color_str);
            }
            counter = 0;
        }
        else {
            counter++;
        }
    }

    if (colors.includes(COLORS.ORANGE)) {
        pico8_buttons[0] = BUTTONS.Z;
    }
}

let count = 0;

const oldRunner = Browser.mainLoop.runner;

Browser.mainLoop.runner = () => {
    count++;
    if (count === 1) {
        count = 0;
        getColors();
    }
	oldRunner();
}

