/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useRef } from 'react';
import TextInput from '../TextInput/TextInput';
import { addTodo } from '../../services/todo-service';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';
import './TodoCreator.css';

export default function TodoCreator({ onUpdate }) {
	const [todo, setTodoText] = useState('');
	const [error, setError] = useState('');
	const { getUserEmail } = useUser();
	const todoInputRef = useRef(null);

	const handleChange = (newValue) => {
		// Updating the state with the new value
		setTodoText(newValue);
	};

	const handleSubmit = async (e) => {
		// Preventing the default behavior of the form
		e.preventDefault();

		const userEmail = getUserEmail();
		const value = todo;

		// Checking if the input field is empty or not before submitting the form
		if (value === '') {
			// console.log("Please enter a todo");
			toast.error('Please enter a todo');
			return;
		}
		// Calling the addTodo function from the todo-api-service
		await addTodo(value, userEmail)
			.then((response) => {
				// Updating the state with the new value
				if (!response) {
					// console.log("Todo not added");
					toast.error('Todo not added');
					return;
				}
				if (response.status === 200) {
					// console.log("Todo added successfully");
					setError('');
					toast.success('Todo added successfully');
				}
			})
			.catch((error) => {
				console.log(error);
			});

		// Clearing the input field after submitting the form using the ref
		setTodoText('');
		if (todoInputRef.current) {
			todoInputRef.current.resetInput();
		}

		// Calling the onUpdate function from the App component
		onUpdate();
	};

	return (
		<>
			<section className='app__todo-creator'>
				<form className='app__form' onSubmit={handleSubmit}>
					<TextInput
						ref={todoInputRef}
						label='Add a new todo'
						type='text'
						name='todo'
						value={todo}
						onChange={handleChange}
					/>
					<button className='app__button' type='submit' title='Add todo'>
						Add
					</button>
				</form>
				{error && <p className='form-group-error'>{error}</p>}
			</section>
		</>
	);
}
