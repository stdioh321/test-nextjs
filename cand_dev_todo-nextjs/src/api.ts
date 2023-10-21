import { ITask } from "@/types/Taks"

const baseUrl = 'http://localhost:3001'

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`);
  const todos = await res.json()
  return todos;
}

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });

  const newTodo = await res.json()
  return newTodo;
}

export const updateTodo = async (id: string, text: string): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });

  const updatedTodo = await res.json()
  return updatedTodo;
}

export const removeTodo = async (id: string): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const removedTodo = await res.json()
  return removedTodo;
}