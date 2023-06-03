import { describe, expect, test } from '@jest/globals';
import { sum } from '../sum';
import * as fs from 'fs';
import * as path from 'path';
import { linearSearch } from '../linearSearch';
import { binarySearch } from '../binarySearch';

// Reading in this json file using require instead of import executes atleast 20x faster, unsure why, but makes testing a lot easier. :D 
const sortedData = require('../__tests__/file.json');
const numToFind = 283358;

describe('sum module', () => {
  test('linearSearch', () => {
    const start = performance.now();
    const { found, index } = linearSearch([...sortedData], numToFind);
    const end = performance.now();

    console.log('============== LINEAR SEARCH ==============');
    console.log('Execution Time ===', ((end - start) / 1000).toFixed(3));
    expect(found).toBe(true);
    expect(index).toBe(1605695);
    console.log('===========================================');
  });

  test('binarySearch', () => {
    const start = performance.now();
    const { found, index } = binarySearch([...sortedData], numToFind);
    const end = performance.now();

    console.log('============== BINARY SEARCH ==============');
    console.log('Execution Time ===', ((end - start) / 1000).toFixed(3));
    expect(found).toBe(true);
    expect(index).toBe(1605695);
    console.log('===========================================');
  });
});
