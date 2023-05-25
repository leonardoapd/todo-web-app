/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './TodoItem.css';
import { useState } from 'react';
import { completeTodo, editTodo } from '../../services/todo-api-service';

export default function TodoItem({ id, item, setItem }) {

    const [contentEditable, setContentEditable] = useState(false);

    const handleChange = async (e) => {
        // Destructuring the event object to get the name and value of the input
        const { checked } = e.target;
        // Calling the completeTodo function from the todo-api-service
        await completeTodo(item.todoId, checked);
        // Updating the state with the new value
        setItem({ ...item, done: checked });
    }

    const handleSave = async (e) => {
        // Preventing the default behavior of the button
        e.preventDefault();
        // Setting the contentEditable to false
        setContentEditable(false);

        let value = "";

        if (e.key === 'Enter') {
            value = e.target.innerText;
        } else {
            // Getting the value of the label element
            value = e.target.previousSibling.innerText;
        }

        // Calling the editTodo function from the todo-api-service
        await editTodo(item.todoId, value).then((response) => {
            // Updating the state with the new value
            console.log(response.data);
            setItem({ ...item, todo: value });
        }).catch((error) => {
            // Uncomment the next line to see the error message in the console
            // console.log("Error", error);
        });

    }

    return (
        <>
            <li className="app__todo-item">
                <input
                    className="app__checkbox"
                    title={item.done ? "Mark as not done" : "Mark as done"}
                    type="checkbox"
                    id={"checkbox-" + id}
                    checked={item.done}
                    onChange={handleChange} />
                <label
                    className={item.done ? "app__todo-label done" : "app__todo-label"}
                    htmlFor={contentEditable ? undefined : id}
                    contentEditable={contentEditable}
                    value={item.todo}
                    suppressContentEditableWarning={true}
                    onClick={() => setContentEditable(true)}
                    onBlur={() => setContentEditable(false)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setContentEditable(false); handleSave(e); } }}
                >
                    {item.todo}
                </label>
                {
                    contentEditable ? (
                        <button
                            className="app__button"
                            onClick={handleSave}
                            type='button'>
                            Save
                        </button>
                    ) : (
                        <button
                            className="app__button"
                            onClick={() => setContentEditable(true)}
                            type='button'
                        >
                            Edit
                        </button>
                    )
                }
            </li>
        </>
    );
}