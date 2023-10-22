type Node<T> = {
  value: T;
  next?: Node<T>;
  previous?: Node<T>;
};

// Least Recently Used
export default class LRU<K, V> {
  private length: number;
  private head?: Node<V>;
  private tail?: Node<V>;

  private lookup: Map<K, Node<V>>;

  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  update(key: K, value: V): void {
    // does it exist?
    // if it doesn't exist - we need to insert
    // - check capacity and evict if over
    // if it does exist, we need to update to the front of the list
    // and update the value
  }

  get(key: K): V | undefined {
    // check the cache for existence
    // update the value we found and move it to the front
    // return out the value found or undefined
  }
}
