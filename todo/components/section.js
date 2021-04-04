import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  faClipboardList,
  faList,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';

library.add(fas, faClipboardList, faList, faClipboardCheck);

const Field = ({ icon, color, title, children }) => {
  return (
    <div className="rounded-sm shadow-md mt-16 py-2 px-4 border">
      <div className="flex items-center">
        {icon && (
          <div
            className={`-mt-10 px-4 py-2 w-16 h-16 text-center rounded-md shadow-md text-white bg-${color}-400`}>
            <FontAwesomeIcon
              icon={['fas', `${icon}`]}
              className="w-full h-full text-4xl"
            />
          </div>
        )}
        <div className="ml-4 text-gray-500">{title.toUpperCase()}</div>
      </div>
      <hr className="my-4" />
      {children}
    </div>
  );
};

export default Field;
