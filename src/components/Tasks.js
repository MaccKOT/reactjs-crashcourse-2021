import { useState } from 'react';

const Tasks = () => {
  //our state is immutable
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Task 1',
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: 'Task 2',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    },
    {
      id: 3,
      text: 'Task 3',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    },
  ]);

  return (
    <>
      {tasks.map((task) => (
        <h3 key={task.id}>{task.text}</h3>
      ))}
    </>
  );
};

export default Tasks;
