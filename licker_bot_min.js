// const BUTTONS = {
//     Z: 16,
//     X: 32
// }

// const COLORS = {
//     BACKGROUND: "29,43,83,255",
//     RED: "255,0,77,255",
//     ORANGE: "255,163,0,255"
// }

eC = document.querySelector("#e_canvas");
eCx = eC.getContext("2d");

let fZP = 0;

const nR = () => {

    if (pico8_buttons[0] === 16) {

        fZP++;

        if(fZP === 2) {

            fZP = 0;

            pico8_buttons[0] = 0;
        }
    }
    // 61, 7 seems to miss less than 60, 8
    const d = eCx.getImageData(61, 42, 7, 86).data;

    const c = [];
    let v = [];
    let c1 = 0;

    for (let i = 0; i <= d.length; i++) {

        v[c1] = d[i];

        if (c1 === 3) {

            const cS = v.join(",");

            if (cS === "255,0,77,255") return;

            if (cS !== "29,43,83,255") {

                c.push(cS);
            }
            c1 = 0;
        }
        else {
            c1++;
        }
    }

    if (c.includes("255,163,0,255")) {
        pico8_buttons[0] = 16;
    }
}

c2 = 0;

oR = Browser.mainLoop.runner;

Browser.mainLoop.runner = () => {
    c2++;
    if (c2 === 1) {
        c2 = 0;
        nR();
    }
	oR();
}

// var b=document.querySelector("#e_canvas").getContext("2d"),c=0,h=0,k=Browser.mainLoop.runner;Browser.mainLoop.runner=function(){h++;if(1===h)a:{h=0,16===pico8_buttons[0]&&(c++,2===c&&(c=0,pico8_buttons[0]=0));for(var e=b.getImageData(61,42,7,86).data,f=[],g=[],a=0,d=0;d<=e.length;d++)if(g[a]=e[d],3===a){a=g.join(",");if("255,0,77,255"===a)break a;"29,43,83,255"!==a&&f.push(a);a=0}else a++;f.includes("255,163,0,255")&&(pico8_buttons[0]=16)}k()};