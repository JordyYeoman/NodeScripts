import LRUCache from "../cache/LRU";

describe("LRU Cache", () => {
  it("should add and get items correctly", () => {
    const cache = new LRUCache(3);
    cache.update(1, "one");
    cache.update(2, "two");
    cache.update(3, "three");

    expect(cache.get(1)).toBe("one");
    expect(cache.get(2)).toBe("two");
    expect(cache.get(3)).toBe("three");
  });

  it("should return null for non-existent keys", () => {
    const cache = new LRUCache(3);
    cache.update(1, "one");

    expect(cache.get(2)).toBeUndefined();
  });

  it("should update the order when getting an item", () => {
    const cache = new LRUCache(3);
    cache.update(1, "one");
    cache.update(2, "two");
    cache.update(3, "three");

    // Accessing key 1 should make 2 the least recently used item.
    cache.get(1);
    cache.update(4, "four"); // This should evict 2.

    expect(cache.get(2)).toBeUndefined();
  });

  it("should update the order when putting an existing item", () => {
    const cache = new LRUCache(3);
    cache.update(1, "one");
    cache.update(2, "two");
    cache.update(3, "three");

    // Updating key 1 again should make 3 the least recently used item.
    cache.update(1, "new-one");

    expect(cache.get(2)).toBe("two");
    expect(cache.get(3)).toBe("three");
  });

  it("should handle cache overflow", () => {
    const cache = new LRUCache(2);
    cache.update(1, "one");
    cache.update(2, "two");

    // Adding one more item should evict the least recently used item, which is 1.
    cache.update(3, "three");

    expect(cache.get(1)).toBeUndefined();
  });

  it("should clear the cache", () => {
    const cache = new LRUCache(3);
    cache.update(1, "one");
    cache.update(2, "two");

    cache.clear();

    expect(cache.get(1)).toBeUndefined();
    expect(cache.get(2)).toBeUndefined();
  });
});
