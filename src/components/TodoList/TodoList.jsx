/* eslint-disable no-unused-vars */
import { getTodos } from "../../services/todo-api-service";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ToDoItem from "../TodoItem/TodoItem";
import TodoCreator from "../TodoCreator/TodoCreator";
import "./TodoList.css";
import { authInterceptor } from "../../helpers/auth-interceptor";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleItemChange = (newItem) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === newItem.id ? newItem : todo
    );
    setTodos(updatedTodos);
    setUpdateTrigger((prevState) => !prevState);
  };

  // This function is not used in this component, but it is passed to the TodoCreator component
  const handleUpdate = () => {
    setUpdateTrigger((prevState) => !prevState);
  };

  useEffect(() => {
    authInterceptor();
    setIsLoading(true);
    getTodos()
      .then((response) => {
        setTodos(response.data);
        // setIsLoading(false);
      })
      .catch((_error) => {
        // Uncomment the next line to see the error message in the console
        // console.log("Error", error);
        setHasError(true);
      });
  }, [updateTrigger]);

  useEffect(() => {
    if (hasError) {
      navigate("/login");
    }
  }, [hasError, navigate]);

  return (
    <>
      <section className="app__container">
        <TodoCreator onUpdate={handleUpdate} />
        {/* {isLoading ? (
          <div>Loading...</div>
        ) : ( */}
          <ul className="app__todo-items">
            {todos.map((todo) => (
              <ToDoItem
                key={todo.id}
                id={todo.id}
                item={todo}
                setItem={handleItemChange}
                onUpdate={handleUpdate}
              />
            ))}
          </ul>
        {/* )} */}
      </section>
    </>
  );
}
