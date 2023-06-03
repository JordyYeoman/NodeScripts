import { describe, expect, test } from '@jest/globals';
import { sum } from '../sum';
import * as fs from 'fs';
import * as path from 'path';
import { linearSearch } from '../linearSearch';
import { binarySearch } from '../binarySearch';

import sortedData from '../__tests__/file.json';
const testData = sortedData as Array<number>;
const numToFind = 283358;

describe('sum module', () => {
  test('linearSearch', () => {
    const start = performance.now();
    const { found, index } = linearSearch(testData, numToFind);
    const end = performance.now();

    console.log('============== LINEAR SEARCH ==============');
    console.log('Execution Time ===', ((end - start) / 1000).toFixed(3));
    expect(found).toBe(true);
    expect(index).toBe(1605695);
    console.log('===========================================');
  });

  test('binarySearch', () => {
    const start = performance.now();
    const { found, index } = binarySearch(testData, numToFind);
    const end = performance.now();

    console.log('============== BINARY SEARCH ==============');
    console.log('Execution Time ===', ((end - start) / 1000).toFixed(3));
    expect(found).toBe(true);
    expect(index).toBe(1605695);
    console.log('===========================================');
  });
});
