import React from 'react';

const AppHeader = ({ lessons, states, setStates }) => {
  const { active, en, ms } = states;

  return (
    <div className="container app-header">
      {active === -1 ? (
        <h2 className="app-title">All Lessons</h2>
      ) : (
        <>
          <h2 className="app-title">{lessons[active].title}</h2>
          <h3 className="app-subtitle">{lessons[active].subtitle}</h3>
          <p className="app-description">{lessons[active].description}</p>
          <div className="app-buttons">
            <button onClick={() => setStates({ ...states, active: -1 })}>
              Back
            </button>
            {' : '}
            <button
              className={ms ? 'active ms' : ''}
              onClick={() => setStates({ ...states, ms: !ms })}>
              Malay
            </button>
            <button
              className={en ? 'active en' : ''}
              onClick={() => setStates({ ...states, en: !en })}>
              English
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AppHeader;
