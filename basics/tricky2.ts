const loopCount = 1000;

const getArrayFromInput = (str: string) => {
    return str.split('');
}

for(let i = 0; i < loopCount; i++) {
    getArrayFromInput("Testing").map((huh)=> {
        console.log('Huh? ', huh)
    })
}