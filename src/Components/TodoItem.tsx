import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Task, todoListState } from './TaskList.state';

interface ITodoItemProps {
  item: Task;
}

export function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='input-group mb-3'>
      <input className='form-control' type="text" value={inputValue} onChange={onChange} />
      <button className='btn btn-primary' onClick={addItem}>Add Task</button>
    </div>
  );
}

// utility for creating unique Id
let id = 0;
function getId() {
  return id++;
}

export function TodoItem({ item }: ITodoItemProps) {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((listItem) => listItem === item);
  
    const editItemText = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        text: event.target.value,
      });
  
      setTodoList(newList);
    };
  
    const toggleItemCompletion = () => {
      const newList = replaceItemAtIndex(todoList, index, {
        ...item,
        isComplete: !item.isComplete,
      });
  
      setTodoList(newList);
    };
  
    const deleteItem = () => {
      const newList = removeItemAtIndex(todoList, index);
  
      setTodoList(newList);
    };
  
    return (
      <div className='input-group mb-3'>
        <input className='form-control' type="text" value={item.text} onChange={editItemText} />
        <div style={{ display: 'flex', gap: '10px', border: 'solid 1px lightGrey', marginBottom: '0', paddingRight: '30px', paddingLeft: '5px'}} className="form-check form-check-reverse">
          <label className='form-check-label'>
            Complete
          </label>
          <input
            className='form-check-input'
            type="checkbox"
            checked={item.isComplete}
            onChange={toggleItemCompletion}
          />
        </div>
        <button className='btn btn-danger' onClick={deleteItem}>X</button>
      </div>
    );
  }
  
  function replaceItemAtIndex(arr: Task[], index: number, newValue: Task) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }
  
  function removeItemAtIndex(arr: Task[], index: number) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }