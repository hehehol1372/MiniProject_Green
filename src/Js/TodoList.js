import React, { useState } from 'react';
import '../Css/TodoList.css';
import EditModal from './EditModal.js';
import AddIcon from '../Image/Check.png';
import PencilIcon from '../Image/pencil.png';
import TrashIcon from '../Image/trashCan.png';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [nextId, setNextId] = useState(0);
    const [editingTodo, setEditingTodo] = useState(null);

    const handleEditClick = (todo) => {
        setEditingTodo(todo);
    };

    const handleSaveEdit = (id, newText) => {
        if (!newText.trim()) {
            handleDelete(id); // 공백일 경우 삭제
        } else {
            handleEdit(id, newText); // 공백이 아닐 경우 수정
        }
        setEditingTodo(null); // 모달 닫기
    };
    const handleCancelEdit = () => {
        setEditingTodo(null);
    };

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
        <div div className="center-top-container">
            <h1>ToDo체크리스트</h1>
            <form onSubmit={handleSubmit}>
                <input value={input}
                       onChange={e => setInput(e.target.value)}
                       placeholder="할 일을 입력하세요!"
                       className="input-text"
                />
                <button onClick={handleAdd}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            padding: 0,
                            margin: 0,
                            cursor: 'pointer',
                        }}
                >
                    <img src={AddIcon} alt="Add" className="custom-button"/>
                </button>
            </form>
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                        <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>
                        {todo.text}
                        <button onClick={() => handleEditClick(todo)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    padding: 0,
                                    margin: 0,
                                    cursor: 'pointer',
                                }}>
                            <img src={PencilIcon} alt="Pencil" className="save-icon"/>
                        </button>
                        <button onClick={() => handleDelete(todo.id)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    padding: 0,
                                    margin: 0,
                                    cursor: 'pointer',
                                }}>
                            <img src={TrashIcon} alt="Delete" className="delete-icon"/>
                        </button>
                    </li>
                ))}
            </ul>
            {editingTodo && (
                <EditModal
                    todo={editingTodo}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}

export default TodoList;
