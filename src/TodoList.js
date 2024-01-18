import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [nextId, setNextId] = useState(0);

    const handleAdd = () => {
        if (!input.trim()) {
            return;
        }
        const newTodo = { id: nextId, text: input, completed: false };
        setTodos([...todos, newTodo]);
        setInput('');
        setNextId(nextId + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd();
    };

    const handleDelete = id => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleEdit = (id, newText) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const toggleComplete = id => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={handleAdd}>Add</button>
            </form>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
                        {todo.text}
                        <button onClick={() => handleEdit(todo.id, prompt('Edit todo:', todo.text))}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
