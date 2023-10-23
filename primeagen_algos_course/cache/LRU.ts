type Node<T> = {
  value: T;
  next?: Node<T>;
  previous?: Node<T>;
};

type V = any; // TOOD: Fix this typing

function createNode(value: V): Node<V> {
  return { value };
}

// Least Recently Used
export default class LRU<K, V> {
  private length: number;
  private head?: Node<V>;
  private tail?: Node<V>;

  private lookup: Map<K, Node<V>>;
  private reverseLookup: Map<Node<V>, K>;

  constructor(private capacity: number = 10) {
    this.length = 0;
    this.head = this.tail = undefined;
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  update(key: K, value: V): void {
    // does it exist?
    let node = this.lookup.get(key);
    if (!node) {
      // if it doesn't exist - we need to insert
      node = createNode(value);
      this.length++;
      this.prepend(node);
      this.trimCache();

      this.lookup.set(key, node);
      this.reverseLookup.set(node, key);
    } else {
      this.detach(node);
      this.prepend(node);
      node.value = value;
    }
  }

  get(key: K): V | undefined {
    // check the cache for existence
    const node = this.lookup.get(key);
    if (!node) {
      return undefined;
    }

    // update the value we found and move it to the front
    this.detach(node);
    this.prepend(node);

    return node.value;
  }

  clear() {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  private detach(node: Node<V>) {
    if (node.previous) {
      node.previous.next = node.next;
    }

    if (node.next) {
      node.next.previous = node.previous;
    }

    // Move the head of the linked list forward one, so when we break the connections,
    // we don't discombobulate ourselves.
    if (this.head === node) {
      this.head = this.head.next;
    }

    if (this.tail === node) {
      this.tail = this.tail.previous;
    }

    node.next = undefined;
    node.previous = undefined;
  }

  private prepend(node: Node<V>) {
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.previous = node;
    this.head = node;
  }

  private trimCache(): void {
    if (this.length <= this.capacity) {
      return;
    }

    const tail = this.tail as Node<V>;
    // Remove the tail from the linked list
    this.detach(this.tail as Node<V>);

    const key = this.reverseLookup.get(tail) as K;
    // delete the key from lookup map
    this.lookup.delete(key);
    // delete the node from the reverse lookup
    this.reverseLookup.delete(tail);
    this.length--;
  }
}
