import { apiClient } from '../api/api-client';

export const getUsersTodos = async (email) => {
	try {
		const response = await apiClient.post('/todo/user', {
            email: email,
        });
		return response.data;
	} catch (error) {
		console.error('Error while getting todos', error.message);
		throw error;
	}
};

export const addTodo = async (value, email) => {
    try {
        await apiClient.post('/todo', {
            title: value,
            isCompleted: false,
            userEmail: email,
        });
    } catch (error) {
        console.error('Error while adding todo', error.message);
        throw error;
    }
}

export const editTodo = async (id, value) => {
    try {
        await apiClient.put('/todo/' + id, {
            title: value,
        });
    } catch (error) {
        console.error('Error while editing todo', error.message);
        throw error;
    }
}

export const completeTodo = async (id, checked) => {
    try {
        await apiClient.post('/todo/' + id, {
            isCompleted: checked,
        });
    } catch (error) {
        console.error('Error while completing todo', error.message);
        throw error;
    }
}

export const deleteTodo = async (id) => {
    try {
        await apiClient.delete('/todo/' + id);
    } catch (error) {
        console.error('Error while deleting todo', error.message);
        throw error;
    }
}