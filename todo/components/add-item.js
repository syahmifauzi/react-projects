import { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Section from './section';
import { TodosContext } from '../contexts/todos-context';
import Message from './message';

const AddItem = ({ user }) => {
  const [text, setText] = useState('');
  const [showError, setShowError] = useState(false);
  const { addTodo } = useContext(TodosContext);

  const onFormSubmit = e => {
    e.preventDefault();
    if (text !== '') {
      addTodo({ description: text });
      setText('');
    } else {
      setShowError(true);
    }
  };

  const onInputChange = e => {
    setText(e.target.value);
    setShowError(false);
  };

  const renderContent = () => (
    <form onSubmit={onFormSubmit}>
      <div className="flex flex-wrap pb-2">
        <label
          htmlFor="field"
          className="px-4 pb-2 text-sm text-blue-500 w-full">
          What do you want to do?
        </label>
        <input
          className="flex-1 border rounded-md px-4 py-2 w-full mr-2 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-400"
          type="text"
          id="field"
          name="description"
          placeholder="Write something here..."
          value={text}
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="btn w-10 h-10 bg-blue-400 hover:bg-blue-500 text-white focus:ring-blue-500">
          <FontAwesomeIcon icon="plus" className="icon text-xl" />
        </button>
      </div>
      {showError && (
        <div className="text-xs font-semibold text-red-500 px-4">
          * If you do nothing you get nothing.
        </div>
      )}
    </form>
  );

  return (
    <Section icon="clipboard-list" title="Add Item" color="blue">
      {user && renderContent()}
      {!user && <Message>You need to sign in to add todo item.</Message>}
    </Section>
  );
};

export default AddItem;
