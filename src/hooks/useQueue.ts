import { useCallback, useState } from 'react';

interface QueueMethods<T> {
  /**
   * The array of items in the queue.
   */
  list: T[];
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
  const [list, setList] = useState<T[]>([...initialValue]);

  // Methods
  const push = useCallback((...items: T[]) => {
    setList((prevList) => [...prevList, ...items]);
  }, []);
  const pop = useCallback(() => {
    let poppedItem: T | undefined;
    setList((prevList) => {
      if (prevList.length === 0) return prevList;
      poppedItem = prevList.at(-1);
      return prevList.slice(0, -1);
    });
    return poppedItem;
  }, []);
  const shift = useCallback(() => {
    let shiftedItem: T | undefined;
    setList((prevList) => {
      if (prevList.length === 0) return prevList;
      shiftedItem = prevList.at(0);
      return prevList.slice(1);
    });
    return shiftedItem;
  }, []);
  const splice = useCallback(
    (start: number, deleteCount: number, ...items: T[]) => {
      let deletedItems: T[] = [];
      setList((prevList) => {
        const newList = [...prevList];
        deletedItems = newList.splice(start, deleteCount, ...items);
        return newList;
      });
      return deletedItems;
    },
    []
  );
  const clear = useCallback(() => {
    setList([]);
  }, []);

  // Return the queue methods and properties
  return {
    list,
    length: list.length,
    first: list.at(0),
    last: list.at(-1),
    push,
    pop,
    shift,
    splice,
    clear,
  };
}
