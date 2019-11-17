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
    // 61, 7 seems to miss less than 60, 8
    const data = e_ctx.getImageData(61, 42, 7, 86).data;

    const colors = [];
    let vals = [];
    let counter = 0;

    for (let i = 0; i <= data.length; i++) {

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

// var b=document.querySelector("#e_canvas").getContext("2d"),c=0,h=0,k=Browser.mainLoop.runner;Browser.mainLoop.runner=function(){h++;if(1===h)a:{h=0,16===pico8_buttons[0]&&(c++,2===c&&(c=0,pico8_buttons[0]=0));for(var e=b.getImageData(61,42,7,86).data,f=[],g=[],a=0,d=0;d<=e.length;d++)if(g[a]=e[d],3===a){a=g.join(",");if("255,0,77,255"===a)break a;"29,43,83,255"!==a&&f.push(a);a=0}else a++;f.includes("255,163,0,255")&&(pico8_buttons[0]=16)}k()};