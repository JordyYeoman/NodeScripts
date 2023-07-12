
const raceIds = new Array(200).fill('hi');
const promises: any[] = [];

for (let i = 0; i < raceIds.length; i += 19) {
    console.log('i', i);
    const batch = raceIds.slice(i, i + 19);

    console.log('batch: ', batch);
    promises.push({ race_ids: batch });
}

console.log('promises: ', promises);