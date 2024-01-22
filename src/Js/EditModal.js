import React, { useState } from 'react';
import '../Css/EditModal.css';


function EditModal({ todo, onSave, onCancel }) {
    const [newText, setNewText] = useState(todo.text);
    const handleSave = () => {
        onSave(todo.id, newText);
        onCancel(); // 모달 닫기
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') { // 엔터 키를 눌렀을 때
            handleSave();
        }
    };

    return (
        <div className="modal-background">
            <div className="modal-content">
                <input
                    type="text"
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                    onKeyDown={handleKeyDown} // 엔터 키 감지
                />
                <button onClick={handleSave}>수정</button>
                <button onClick={onCancel}>취소</button>
            </div>
        </div>
    );
}

export default EditModal;
