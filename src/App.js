import Header from './components/Header';
import Tasks from './components/Tasks';
import { useState } from 'react';

function App() {
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
      reminder: true,
    },
    {
      id: 3,
      text: 'Task 3',
      day: 'Feb 5th at 2:30pm',
      reminder: false,
    },
  ]);

  //Delete task
  const deleteTask = (id) => {
    // console.log(`delete ${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle reminder
  const toggleReminder = (id) => {
    // console.log(`toggle ${id}`);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className='container'>
      <Header />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No tasks'
      )}
    </div>
  );
}

export default App;
