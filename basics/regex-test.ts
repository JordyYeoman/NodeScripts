const eventType = 'sport';
const header = 'hawks vs pies';
const h2 = 'eagles v dockers';
const h3 = 'lakers & knicks';

const sportEventRegex = /(?:\bv\b|\bvs\b)/i;
if (eventType === 'sport' && sportEventRegex.test(header)) {
    console.log('[DEBUG] evaluation matched!')
}

if (eventType === 'sport' && sportEventRegex.test(h2)) {
    console.log('[DEBUG] evaluation matched!')
}

if (eventType === 'sport' && sportEventRegex.test(h3)) {
    console.log('[DEBUG] evaluation matched!')
}