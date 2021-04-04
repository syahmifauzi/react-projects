import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Section from './section';
import { TodosContext } from '../contexts/todos-context';
import Message from './message';

const Completed = ({ todos, user }) => {
  const { deleteTodo } = useContext(TodosContext);

  const onButtonDeleteClick = id => {
    deleteTodo(id);
  };

  const renderContent = () => {
    return todos.map(({ id, fields }) => {
      return (
        <div key={id}>
          <div className="flex items-center my-2 ml-2 text-gray-500">
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
    <Section icon="clipboard-check" title="Completed" color="green">
      {user && renderContent()}
      {!user && (
        <Message>You need to sign in to view your completed todos.</Message>
      )}
      {user && !todos.length && <Message>Please complete your todos.</Message>}
    </Section>
  );
};

export default Completed;
