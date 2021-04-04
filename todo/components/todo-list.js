import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Section from './section';
import { TodosContext } from '../contexts/todos-context';
import Message from './message';

const TodoList = ({ todos, user }) => {
  const { updateTodo, deleteTodo } = useContext(TodosContext);

  const onButtonCompleteClick = id => {
    const updatedTodo = todos.find(todo => todo.id === id);
    updatedTodo.fields.completed = true;
    updateTodo(updatedTodo);
  };

  const onButtonDeleteClick = id => {
    deleteTodo(id);
  };

  const renderContent = () => {
    return todos.map(({ id, fields }) => {
      return (
        <div key={id}>
          <div className="flex items-center my-2">
            <button
              onClick={() => onButtonCompleteClick(id)}
              className="btn mx-4 bg-blue-400 hover:bg-blue-500 text-white focus:ring-blue-500">
              <FontAwesomeIcon icon="check" className="icon text-sm" />
            </button>
            <div className="w-full">{fields.description}</div>
            <button
              onClick={() => onButtonDeleteClick(id)}
              className="btn mx-2 focus:ring-red-500 group">
              <FontAwesomeIcon
                icon="trash-alt"
                className="icon text-sm text-red-500 group-hover:text-red-600"
              />
            </button>
          </div>
          <hr />
        </div>
      );
    });
  };

  return (
    <Section icon="list" title="To-Do List" color="yellow">
      {user && renderContent()}
      {!user && <Message>You need to sign in to view your todo list.</Message>}
      {user && !todos.length && <Message>Please add your todo.</Message>}
    </Section>
  );
};

export default TodoList;
