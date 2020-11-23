import React from 'react';

import Dhomir from './lessons/Dhomir';
import IsmIsyarah from './lessons/IsmIsyarah';
import FiilMadhi from './lessons/FiilMadhi';
import FiilMudhori from './lessons/FiilMudhori';

const AppContent = ({ lessons, states, setStates }) => {
  const { active, en, ms } = states;

  const buildLessonList = () => (
    <div className="row">
      {lessons.map((lesson, index) => (
        <div key={index.toString()} className="xs-12 sm-6 col app-col">
          <div className="card app-card">
            <div className="card-body">
              <h4 className="card-title">{lesson.title}</h4>
              <h5 className="card-subtitle">{lesson.subtitle}</h5>
              <p className="card-text">{lesson.description}</p>
              <button onClick={() => setStates({ ...states, active: index })}>
                Learn Now!
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container app-content">
      {active === -1 && buildLessonList()}
      {active === 0 && <Dhomir en={en} ms={ms} />}
      {active === 1 && <IsmIsyarah en={en} ms={ms} />}
      {active === 2 && <FiilMadhi en={en} ms={ms} />}
      {active === 3 && <FiilMudhori en={en} ms={ms} />}
    </div>
  );
};

export default AppContent;
