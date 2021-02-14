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
    <div className='container'>
      <Header />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
