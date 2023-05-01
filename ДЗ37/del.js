// let dd = player.savedData.data.filter( (x,i) => {
//     return (i/4) % 95 >= 38 && (i/4) % 95 < 48;
// });

// let imgSlice = new ImageData(dd, 10, 159);


let hiddenCanvas = document.createElement('canvas');
hiddenCanvas.width = 95;
hiddenCanvas.height = 159;

let hid = hiddenCanvas.getContext('2d');
hid.drawImage(player.spriteSheet,0,0,95,159,0,0,95,159);
let hdata = hid.getImageData(0,0,95,159);

let fullMaskData = hdata.data.map( (x,i) => {
    if ((i+1) % 4) return 0;
    return x>10 ? 255 : 0;
});

let fullMask = new ImageData(fullMaskData, 95, 159);
ctx.putImageData(fullMask, 200, 200);


let alphaData = hdata.data.filter( (x,i) => (i+1) % 4 === 0 );
let alphaMask = alphaData.map( (x) => x>10 ? 255 : 0 );



