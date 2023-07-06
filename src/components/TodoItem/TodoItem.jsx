/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./TodoItem.css";
import { useState, useEffect } from "react";
import {
  completeTodo,
  editTodo,
  deleteTodo,
} from "../../services/todo-api-service";

export default function TodoItem({ id, item, setItem, onUpdate }) {
  const [contentEditable, setContentEditable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // This useEffect hook is used to detect if the user is on a mobile device
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const handleChange = async (e) => {
    e.preventDefault();
    // Destructuring the event object to get the name and value of the input
    const { checked } = e.target;
    // Calling the completeTodo function from the todo-api-service
    await completeTodo(item.id, checked);
    // Updating the state with the new value
    setItem({ ...item, isCompleted: checked });
  };

  const handleSave = async (e) => {
    // Preventing the default behavior of the button
    e.preventDefault();

    let value = "";

    if (e.key === "Enter") {
      value = e.target.innerText;
    } else {
      // Getting the value of the label element
      value = document.getElementById(item.id).innerText;
    }

    if (value === item.title) {
      return;
    } else if (value === "") {
      value = item.title;
      setContentEditable(false);
      setItem({ ...item, title: value });
      return;
    }

    // Calling the editTodo function from the todo-api-service
    await editTodo(item.id, value)
      .then((response) => {
        // Updating the state with the new value
        setItem({ ...item, title: value });
      })
      .catch((_error) => {
        // Uncomment the next line to see the error message in the console
        // console.log("Error", error);
      });

    // Setting the contentEditable to false
    setContentEditable(false);
    // Calling the onUpdate function from the App component
    // onUpdate()
  };

  const handleDelete = async (e) => {
    // Preventing the default behavior of the button
    e.preventDefault();
    // Calling the deleteTodo function from the todo-api-service
    await deleteTodo(item.id)
      .then((response) => {
        // Updating the state with the new value
        // console.log(response.data);
      })
      .catch((_error) => {
        // Uncomment the next line to see the error message in the console
        // console.log("Error", error);
      });

    // Calling the onUpdate function from the App component
    onUpdate();
  };

  return (
    <>
      <li className="app__todo-item">
        <input
          className="app__checkbox"
          title={item.isCompleted ? "Mark as not done" : "Mark as done"}
          type="checkbox"
          id={"checkbox-" + id}
          checked={item.isCompleted}
          onChange={handleChange}
        />
        <label
          id={item.id}
          className={
            item.isCompleted ? "app__todo-label done" : "app__todo-label"
          }
          htmlFor={contentEditable ? undefined : id}
          contentEditable={contentEditable}
          suppressContentEditableWarning
          onClick={() => setContentEditable(true)}
          // onBlur={() => setContentEditable(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setContentEditable(false);
              handleSave(e);
            }
          }}
        >
          {item.title}
        </label>
        {contentEditable ? (
          <div className="app__buttons">
            <button className="app__button" onClick={handleSave} type="button">
              {isMobile ? (
                <i className="material-symbols-outlined">save</i>
              ) : (
                "Save"
              )}
            </button>
            <button
              className="app__button"
              onClick={handleDelete}
              type="button"
            >
              {isMobile ? (
                <i className="material-symbols-outlined">delete</i>
              ) : (
                "Delete"
              )}
            </button>
            <button
              className="app__button"
              onClick={() => setContentEditable(false)}
              type="button"
            >
              {isMobile ? (
                <i className="material-symbols-outlined">close</i>
              ) : (
                "Close"
              )}
            </button>
          </div>
        ) : (
          <button
            className="app__button"
            onClick={() => setContentEditable(true)}
            type="button"
          >
            Edit
          </button>
        )}
      </li>
    </>
  );
}
