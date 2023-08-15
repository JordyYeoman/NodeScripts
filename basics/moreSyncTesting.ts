function doMagix() {
    console.log('Send it');
}

function doStuff() {
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            // Do magic? 
            doMagix();
        }, i * 1000);
    }
}

doStuff();