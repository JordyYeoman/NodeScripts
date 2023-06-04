import { describe, expect, test } from "@jest/globals";
import Queue, { QNode } from "../dataStructures/queue";

// Basic type for testing with generics
type Person = {
  name: string;
  age: number;
};

describe("Queue Implementation", () => {
  // Understand a queue by testing.

  test("Queue Basic Setup", () => {
    const q = new Queue();

    expect(q.peek()).toBe(undefined);
  });

  test("Test Enqueue", () => {
    const q = new Queue();
    const person = {
      name: "Jordy",
      age: 72,
    };

    // Add new person to the queue
    q.enqueue(person);

    expect(q.length).toBe(1);
    expect(q.peek()).toBe(person);
  });

  test("Test Deque", () => {
    const q = new Queue();
    const person = {
      name: "Neville",
      age: 12,
    };
    const person2 = {
      name: "Layla",
      age: 23,
    };

    // Add new person2 to head then person 1 to tail of queue
    // Why? so we can test if we deque that the correct person is still in the queue.
    q.enqueue(person2);
    q.enqueue(person);

    // In our example below, if we deque, then only person2 should be left
    expect(q.length).toBe(2);
    q.deque();
    expect(q.peek()).toBe(person);
  });
});
