import React, { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const handleAdd = () => {
        const newTodos = [...todos, input];
        setTodos(newTodos);
        setInput('');
    };

    return (
        <div>
            <input value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
