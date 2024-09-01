import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png';
import TodoItems from './Todoitems';

const Todo = () => {
  const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => prvTodos.filter((todo) => todo.id !== id));
  };

  const toggle = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    );
  };

  const editTodo = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: editText };
        }
        return todo;
      })
    );
    setEditId(null); // Exit edit mode
    setEditText(""); // Clear edit text state
  };

  const startEditing = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className='bg-white 
    place-self-center w-11/12 max-w-md 
    flex flex-col p-7 min-h-[550px] rounded-x1'>

      {/*--------title---------*/}
      <div className='flex items-center mt-7 gap-2'>
        <img className='w-8' src={todo_icon} alt="" />
        <h1 className='text-3xl font-semibold'>To-Do List</h1>
      </div>

      {/*--------input box---------*/}
      <div className='flex items-centre my-7
     bg-gray-200 rounded-full'>
        <input ref={inputRef} className=
          'bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600'
          type="text" placeholder='Add your task' />
        <button onClick={add} className='border-none rounded-full
          bg-orange-600 w-32 h-14 text-white text-lg 
          front-medium cursor-pointer'>ADD +</button>
      </div>

      {/*--------todo list---------*/}
      <div>
        {todoList.map((item) => (
          <TodoItems key={item.id}
            text={item.text}
            id={item.id}
            isComplete={item.isComplete}
            deleteTodo={deleteTodo}
            toggle={toggle}
            startEditing={startEditing}
            isEditing={editId === item.id}
            editText={editText}
            setEditText={setEditText}
            editTodo={editTodo}
          />
        ))}
      </div>

    </div>
  );
};

export default Todo;
