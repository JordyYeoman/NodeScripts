const modifyObj = (r: any) => {
    console.log('r before', r);
    r.test = 'hello';
    console.log('r after', r);
}

const testObj = {
    hello: 'what',
}

modifyObj(testObj);