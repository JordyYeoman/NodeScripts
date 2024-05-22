const expiry = "2024-05-22T05:35:59.051Z";
const expiry2 = "2024-05-22T07:52:59.051Z";
const currentTime = new Date().toISOString();
console.log('===== Date to String comparison ======');
console.log('currentTime', currentTime);
console.log('Past expiry time: ', currentTime > expiry);
console.log('Past expiry time 2: ', currentTime > expiry2);
console.log('Before expiry time: ', currentTime < expiry);


// Mo money mo problems
const exp = Date.parse(expiry);
const exp2 = Date.parse(expiry2);
const currentTime2 = Date.now();
console.log('===== Date to Number comparison ======');
console.log('currentTime2', currentTime2);
console.log('Past expiry time: ', currentTime2 > exp);
console.log('Past expiry time 2: ', currentTime2 > exp2);
console.log('Before expiry time: ', currentTime2 < exp);
console.log('===========');