import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const UpdateTodo = ({ id, storedCompleted, setTodosChange }) => {
  const [isComplete, setIsComplete] = useState(storedCompleted);

  const handleToggleComplete = async () => {
    setIsComplete((prevComplete) => !prevComplete);

    try {

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

      setTodosChange(true);

    } catch (error) {
      console.error('Error toggling completion status:', error);
    } finally {
      // Toggle the completed status locally
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