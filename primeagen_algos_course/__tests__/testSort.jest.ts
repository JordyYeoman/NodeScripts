import { describe, expect, test } from '@jest/globals';
import { sum } from '../sum';
import * as fs from 'fs';
import * as path from 'path';
import { linearSearch } from '../linearSearch';
import { binarySearch } from '../binarySearch';
import { twoCrystalBalls } from '../magicBalls';
import { bubbleSort } from '../bubbleSort';

// Reading in this json file using require instead of import executes atleast 20x faster, unsure why, but makes testing a lot easier. :D 
const randomData = require('../__tests__/randomData.json');

const timeframes = {
  bubbleSort: '',
}

describe('Search Algos', () => {
  afterAll(()=> {
    // Return execution times
    console.log('Execution time: ', timeframes)
  });

  test('linearSearch', () => {
    const start = performance.now();
    const sortedArr = bubbleSort([...randomData]);
    const end = performance.now();

    console.log('============== LINEAR SEARCH ==============');
    const executionTime = ((end - start) / 1000).toFixed(5);
    timeframes.bubbleSort = executionTime;
    console.log('Execution Time ===', executionTime);
    expect(sortedArr[92]).toBe(9);
    expect(sortedArr[508]).toBe(63);
    expect(sortedArr[4800]).toBe(904);
    console.log('===========================================');
  });
});
