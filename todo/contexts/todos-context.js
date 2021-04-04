import { createContext, useState } from 'react';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodo = async () => {
    try {
      const res = await fetch('/api/getTodos');
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async ({ description }) => {
    try {
      const res = await fetch('/api/createTodo', {
        method: 'POST',
        body: JSON.stringify({ description }),
        headers: { 'Content-Type': 'application/json' },
      });
      const newTodo = await res.json();
      setTodos(prevTodos => [newTodo, ...prevTodos]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async updatedTodo => {
    try {
      const res = await fetch('/api/updateTodo', {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: { 'Content-Type': 'application/json' },
      });
      res.json();
      setTodos(prevTodos => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
          todo => todo.id === updatedTodo.id
        );
        if (existingTodo) {
          existingTodo.fields = updatedTodo.fields;
        }
        return existingTodos;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async id => {
    try {
      const res = await fetch('/api/deleteTodo', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      res.json();
      setTodos(prevTodos => prevTodos.filter(todo => todo.id != id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, refreshTodo, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
