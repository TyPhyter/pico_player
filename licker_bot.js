const BUTTONS = {
    Z: 16,
    X: 32
}

const COLORS = {

}

const e_canvas = document.querySelector("#e_canvas");
const e_ctx = e_canvas.getContext("2d");

const getColors = () => {

    const data = e_ctx.getImageData(64, 42, 1, 86).data;

    const colors = [];
    let vals = [];
    let counter = 0;

    // try a slice version here too if this isn't performant

    for (let i = 0; i <= data.length; i++) {

        vals[counter] = data[i];

        if (counter === 3) {
            colors.push(vals);
            counter = 0;
        }
        else {
            counter++;
        }
    }
}

let count = 0;

const oldRunner = Browser.mainLoop.runner;

Browser.mainLoop.runner = () => {
    count++;
    if (count === 59) {
        count = 0;
        getColors();
        pico8_buttons[0] = BUTTONS.Z;
    }
    else if (count === 29) {
        pico8_buttons[0] = BUTTONS.X;
    }
	oldRunner();
}

