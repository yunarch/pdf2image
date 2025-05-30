import { useCallback, useRef, useState, type RefObject } from 'react';

interface QueueMethods<T> {
  /**
   * The array of items in the queue.
   */
  list: RefObject<T[]>;
  /**
   * The number of items in the queue.
   */
  length: number;
  /**
   * The first item in the queue or undefined if the queue is empty.
   */
  first: T | undefined;
  /**
   * The last item in the queue or undefined if the queue is empty.
   */
  last: T | undefined;
  /**
   * Appends new elements to the end of the queue.
   *
   * @param items - The items to be added to the queue.
   */
  push: (...items: T[]) => void;
  /**
   * Removes the last element from the queue and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   *
   * @returns The last element of the queue or undefined if the queue is empty.
   */
  pop: () => T | undefined;
  /**
   * Removes the first element from an array and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   *
   * @returns The first element of the queue or undefined if the queue is empty.
   */
  shift: () => T | undefined;
  /**
   * Clears the queue, removing all elements.
   */
  clear: () => void;
  /**
   * Removes elements from the queue, if necessary, inserts new elements in their place.
   *
   * @param start - The zero-based location in the queue from which to start removing elements.
   * @param deleteCount - The number of elements to remove.
   * @param items - Elements to insert into the queue in place of the deleted elements.
   *
   * @returns — An array containing the elements that were deleted.
   */
  splice: (start: number, deleteCount: number, ...items: T[]) => T[];
}

/**
 * Hook to manage a queue of items using refs for immediate access in async contexts.
 *
 * @param initialValue - The initial value of the queue. Defaults to an empty array.
 * @returns An object containing methods to manipulate the queue and its properties.
 */
export function useQueue<T>(initialValue: T[] = []): QueueMethods<T> {
  const listRef = useRef<T[]>([...initialValue]);

  // Update re-render helpers
  const [, forceRender] = useState(0);
  const update = () => {
    forceRender((v) => v + 1);
  };

  // Methods
  const push = useCallback((...items: T[]) => {
    listRef.current.push(...items);
    update();
  }, []);
  const pop = useCallback(() => {
    const item = listRef.current.pop();
    update();
    return item;
  }, []);
  const shift = useCallback(() => {
    const item = listRef.current.shift();
    update();
    return item;
  }, []);
  const splice = useCallback(
    (start: number, deleteCount: number, ...items: T[]) => {
      const removed = listRef.current.splice(start, deleteCount, ...items);
      update();
      return removed;
    },
    []
  );
  const clear = useCallback(() => {
    listRef.current = [];
    update();
  }, []);

  // Return the queue methods and properties
  return {
    list: listRef,
    length: listRef.current.length,
    first: listRef.current.at(0),
    last: listRef.current.at(-1),
    push,
    pop,
    shift,
    splice,
    clear,
  };
}
