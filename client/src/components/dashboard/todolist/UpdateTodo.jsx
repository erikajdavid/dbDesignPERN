import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const UpdateTodo = ({ id, completed }) => {
  const [isComplete, setIsComplete] = useState(completed);

  const handleToggleComplete = async () => {
    try {
      // Toggle the completed status locally
      setIsComplete(!isComplete);

      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !isComplete,
        }),
      });
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