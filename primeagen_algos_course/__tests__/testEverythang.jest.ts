import { describe, expect, test } from '@jest/globals';
import { sum } from '../sum';
import * as fs from 'fs';
import * as path from 'path';
import { linearSearch } from '../linearSearch';
import { binarySearch } from '../binarySearch';

let data = fs.readFileSync(path.resolve(__dirname, 'testData.txt'));
let sortedData = fs.readFileSync(path.resolve(__dirname, 'sortedTestData.txt'));
const numToFind = 93;

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('linearSearch', () => {
    const start = performance.now();
    console.log('sortedData', [...sortedData]);
    const { found, index } = linearSearch([...sortedData], numToFind);
    const end = performance.now();

    console.log('============== LINEAR SEARCH ==============');
    console.log('Execution Time ===', ((end - start) / 1000).toFixed(3));
    expect(found).toBe(true);
    expect(index).toBe(78888890);
    console.log('===========================================');
  });

  // test('binarySearch', () => {
  //   const start = performance.now();
  //   const { found, index } = binarySearch([...sortedData], numToFind);
  //   const end = performance.now();

  //   console.log('============== LINEAR SEARCH ==============');
  //   console.log('Execution Time ===', ((end - start) / 1000).toFixed(3));
  //   expect(found).toBe(true);
  //   expect(index).toBe(78888890);
  //   console.log('===========================================');
  //   expect(true).toBe(true);
  // });
});
