/* eslint-disable no-unused-vars */
import { getTodos } from "../../services/todo-api-service";
import { useEffect, useState } from "react";
import ToDoItem from "../TodoItem/TodoItem"

export default function TodoList() {

    const [todos, setTodos] = useState([]);

    const handleItemChange = (newItem) => {
        const index = todos.findIndex((todo) => todo.todoId === newItem.todoId);
        todos.splice(index, 1, newItem);
        setTodos([...todos]);
    }

    useEffect(() => {
        getTodos().then((response) => {
            setTodos(response.data);
        }).catch((error) => {
            // Uncomment the next line to see the error message in the console
            // console.log("Error", error);
        });
    }, []);

    return (
        <>
            <main className="app__main">
                {todos.map((todo, index) => (
                    <ul key={index} className="app__todo-items">
                        <ToDoItem
                            id={todo.todoId}
                            item={todo}
                            // setItem={ (newItem) => { todos.splice(index, 1, newItem); setTodos([...todos]) } }
                            setItem={handleItemChange}
                        />
                    </ul>
                ))}
            </main>
        </>
    );
}