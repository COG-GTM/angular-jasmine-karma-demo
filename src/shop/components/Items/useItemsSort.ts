import { useCallback, useState } from 'react';
import {
  createInitialItemsSortState,
  sortItems as sortItemsState,
  type ItemsSortState,
  type SortField,
} from './itemsSort';

export interface UseItemsSortResult extends ItemsSortState {
  sortItems: (field: SortField) => void;
}

export function useItemsSort(initialState?: Partial<ItemsSortState>): UseItemsSortResult {
  const [state, setState] = useState<ItemsSortState>(() => ({
    ...createInitialItemsSortState(),
    ...initialState,
  }));

  const sortItems = useCallback((field: SortField) => {
    setState((previous) => sortItemsState(previous, field));
  }, []);

  return { ...state, sortItems };
}
