import { quickSort } from "../sort/quickSort";

describe("QuickSort Algo Test", () => {
  it("Should quickly sort through the array of numbers", () => {
    const t1 = [9, 4, 3, 5, 7, 5, 2, 8];
    // const arr = [9, 3, 4, 1, 9, 8, 6, 32, 1, 1, 6, 55, 43, 235, 2365, 66, 433];

    quickSort(t1);
    expect(t1).toEqual([2, 3, 4, 5, 7, 8, 9]);
  });
});
