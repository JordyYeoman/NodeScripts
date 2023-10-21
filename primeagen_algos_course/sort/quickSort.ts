function qs(arr: number[], lo: number, hi: number): void {
  // When lo and hi meet, bad time :D
  if (lo >= hi) {
    // We have finished sorting array
    return;
  }

  const pivotIdx = partition(arr, lo, hi);

  qs(arr, lo, pivotIdx - 1);
  qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];

  let idx = lo - 1;

  // Loop from start of sub array to end of sub array.
  for (let i = lo; i < hi; i++) {
    // While number at current arr position is less or equal to pivot, it is still sorted
    if (arr[i] <= pivot) {
      idx++;
      const tmp = arr[i];
      // Swap the pivot
      arr[i] = arr[idx];
      arr[idx] = tmp;
    }
  }

  idx++;
  arr[hi] = arr[idx];
  arr[idx] = pivot;

  return idx;
}

// Sort in place, so original arr will be modified
export function quickSort(arr: number[]): void {
  qs(arr, 0, arr.length - 1);
}
