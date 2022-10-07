import { atom, selector } from "recoil";

// Interfaces
export interface Task {
    id: number;
    text: string;
    isComplete: boolean;
}

// Atoms
export const todoListState = atom({
    key: 'TodoList',
    default: [] as Task[],
});

export const todoListFilterState = atom({
    key: 'TodoListFilter',
    default: 'Show All',
});

// Selectors
export const filteredTodoListState = selector({
    key: 'FilteredTodoList',
    get: ({ get }) => {
      const filter = get(todoListFilterState);
      const list = get(todoListState);
  
      switch (filter) {
        case 'Show Completed':
          return list.filter((item) => item.isComplete);
        case 'Show Uncompleted':
          return list.filter((item) => !item.isComplete);
        default:
          return list;
      }
    },
});

export const todoListStatsState = selector({
    key: 'TodoListStats',
    get: ({ get }) => {
      const todoList = get(todoListState);
      const totalNum = todoList.length;
      const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
      const totalUncompletedNum = totalNum - totalCompletedNum;
      const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100;
  
      return {
        totalNum,
        totalCompletedNum,
        totalUncompletedNum,
        percentCompleted,
      };
    },
});