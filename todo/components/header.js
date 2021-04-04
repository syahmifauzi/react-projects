import { useEffect, useRef, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TodosContext } from '../contexts/todos-context';
import Container from './container';

const Header = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const wrapperRef = useRef(null);
  const { refreshTodo } = useContext(TodosContext);

  const closeMenu = ref => {
    useEffect(() => {
      // Close the menu if clicked on outside of element
      const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpenMenu(false);
        }
      };
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  closeMenu(wrapperRef);

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-md">
      <Container>
        <div className="flex justify-between items-center relative">
          <h2 className="text-lg font-medium">Just Do It</h2>
          {!user && <a href="/api/auth/login">Sign In</a>}
          {user && (
            <div ref={wrapperRef} className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="btn w-9 h-9 p-0 flex">
                <img src={user.picture} alt={user.name} className="icon" />
              </button>
              {openMenu && (
                <div className="flex items-start absolute right-1 top-10 bg-white text-gray-900 p-2 rounded-sm shadow-md w-max">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-12 h-12 rounded-full shadow-md"
                  />
                  <div className="px-2">
                    <div className="font-medium">{user.name}</div>
                    <div className="font-light">{user.email}</div>
                    <div className="flex justify-between text-md text-blue-500 mt-1">
                      <a href="/api/auth/logout">Sign Out</a>
                      <div className="group">
                        <button onClick={refreshTodo} className="btn">
                          <FontAwesomeIcon icon="sync" className="icon" />
                        </button>
                        <div className="absolute hidden group-hover:block text-xs text-center right-0 w-15 px-2 py-1 rounded-sm bg-gray-200 text-gray-900">
                          Refresh App
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
