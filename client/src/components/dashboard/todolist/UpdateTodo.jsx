import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';

const UpdateTodo = ({ id, storedCompleted }) => {
  const [isComplete, setIsComplete] = useState(storedCompleted);

  const handleToggleComplete = async () => {
    try {
      // Toggle the completed status locally
      setIsComplete(!isComplete);

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const response = await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({ completed: !isComplete }),
    });

      const parseResponse = await response.json();
      console.log(parseResponse);

    } catch (error) {
      console.error('Error toggling completion status:', error);
    }
  };

  return (
    <>
      <div onClick={handleToggleComplete}>
        {isComplete ? (
          <FontAwesomeIcon icon={faCheckCircle} />
        ) : (
          <FontAwesomeIcon icon={faCircle} />
        )}
      </div>
    </>
  );
};

export default UpdateTodo;