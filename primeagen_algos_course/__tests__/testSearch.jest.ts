import { describe, expect, test } from '@jest/globals';
import { sum } from '../search/sum';
import * as fs from 'fs';
import * as path from 'path';
import { linearSearch } from '../search/linearSearch';
import { binarySearch } from '../search/binarySearch';
import { twoCrystalBalls } from '../search/magicBalls';

// Reading in this json file using require instead of import executes atleast 20x faster, unsure why, but makes testing a lot easier. :D 
const sortedData = require('../__tests__/file.json');
const boolArr = require('../__tests__/boolArr.json');

const numToFind = 383359;
const timeframes = {
  linear: '',
  binary: '',
  sqrRoot: '',
}

describe('Search Algos', () => {
  afterAll(()=> {
    // Return execution times
    console.log('Execution time: ', timeframes)
  });

  test('linearSearch', () => {
    const start = performance.now();
    const { found, index } = linearSearch([...sortedData], numToFind);
    const end = performance.now();

    console.log('============== LINEAR SEARCH ==============');
    const executionTime = ((end - start) / 1000).toFixed(5);
    timeframes.linear = executionTime;
    console.log('Execution Time ===', executionTime);
    expect(found).toBe(true);
    expect(index).toBe(2172372);
    console.log('===========================================');
  });

  test('binarySearch', () => {
    const start = performance.now();
    const { found, index } = binarySearch([...sortedData], numToFind);
    const end = performance.now();

    console.log('============== BINARY SEARCH ==============');
    const executionTime = ((end - start) / 1000).toFixed(5);
    timeframes.binary = executionTime;
    console.log('Execution Time ===', executionTime);
    expect(found).toBe(true);
    expect(index).toBe(2172372);
    console.log('===========================================');
  });

  test('SQRrootSearch', () => {
    const start = performance.now();
    const index = twoCrystalBalls(boolArr);
    const end = performance.now();

    console.log('============== SQUARE ROOT SEARCH ==============');
    const executionTime = ((end - start) / 1000).toFixed(5);
    timeframes.sqrRoot = executionTime;
    console.log('Execution Time ===', executionTime);
    expect(index).toBe(7600001);
    console.log('===========================================');
  });
});
