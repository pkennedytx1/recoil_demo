import React from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { filteredTodoListState, todoListFilterState, todoListStatsState } from "./TaskList.state";
import { TodoItem, TodoItemCreator } from './TodoItem';

function TodoListFilters() {
    const [filter, setFilter] = useRecoilState(todoListFilterState);
  
    const updateFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(event.target.value);
    };
  
    return (
      <>
        <b>Filter Tasks</b>
        <select className='form-select' value={filter} onChange={updateFilter}>
          <option value="Show All">All</option>
          <option value="Show Completed">Completed</option>
          <option value="Show Uncompleted">Uncompleted</option>
        </select>
      </>
    );
}

function TodoListStats() {
    const {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    } = useRecoilValue(todoListStatsState);
  
    const formattedPercentCompleted = Math.round(percentCompleted);
  
    return (
      <ul className='list-group'>
        <li className='list-group-item'>Total items: {totalNum}</li>
        <li className='list-group-item'>Items completed: {totalCompletedNum}</li>
        <li className='list-group-item'>Items not completed: {totalUncompletedNum}</li>
        <li className='list-group-item'>Percent completed: {formattedPercentCompleted}%</li>
      </ul>
    );
}

export const TaskList = () => {
    const todoList = useRecoilValue(filteredTodoListState);

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <img height='150' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dc87a8a6-976c-4b63-a822-8c47e1de613a/ddz1q4g-c53910d0-bcd0-4dc8-a154-61f32000b778.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RjODdhOGE2LTk3NmMtNGI2My1hODIyLThjNDdlMWRlNjEzYVwvZGR6MXE0Zy1jNTM5MTBkMC1iY2QwLTRkYzgtYTE1NC02MWYzMjAwMGI3NzguanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kiaPvfTIZ3oRDyAIVmFoTe45LJIqhdBS7npBoZ_RtwE' />
            <h1>Super Saiyan Patrick's Todo List</h1>
            <TodoListStats />
            <br />
            <TodoListFilters />
            <br />
            <TodoItemCreator />
            <br />
            {todoList?.length > 0 && <h2>Tasks</h2>}
            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
        </div>
    );
}