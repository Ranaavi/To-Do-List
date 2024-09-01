import React from 'react';

const TodoItems = ({ text, id, isComplete, deleteTodo, toggle, startEditing, isEditing, editText, setEditText, editTodo }) => {
  return (
    <div className={`flex items-center justify-between p-2 my-2 ${isComplete ? 'line-through' : ''}`}>
      {isEditing ? (
        <>
          <input
            className='flex-1 h-8 bg-gray-200 rounded-full pl-2'
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => editTodo(id)} className='ml-2 bg-green-500 text-white rounded-full px-3 py-1'>
            Save
          </button>
        </>
      ) : (
        <>
          <span className='flex-1 cursor-pointer' onClick={() => toggle(id)}>
            {text}
          </span>
          <button onClick={() => startEditing(id, text)} className='ml-2 bg-blue-500 text-white rounded-full px-3 py-1'>
            Edit
          </button>
          <button onClick={() => deleteTodo(id)} className='ml-2 bg-red-500 text-white rounded-full px-3 py-1'>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItems;
