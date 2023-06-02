import { describe, expect, test } from '@jest/globals';
import { sum } from '../sum';
import * as fs from 'fs';
import * as path from 'path';
import { linearSearch } from '../linearSearch';

let data = fs.readFileSync(path.resolve(__dirname, 'testData.txt'));
const numToFind = 93;

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('linearSearch', () => {
    const start = performance.now();
    const { found, index } = linearSearch([...data], numToFind);
    const end = performance.now();

    console.log('============== LINEAR SEARCH ==============');
    console.log('Execution Time ===', ((end - start) / 1000).toFixed(3));
    expect(found).toBe(true);
    expect(index).toBe(48890065);
    console.log('===========================================');
  });
});
