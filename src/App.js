import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import { useState, useEffect } from 'react';

function App() {
  //Add task form toogle. Default is hidden.
  const [showAddTask, setShowAddTask] = useState(false);

  //our state is immutable
  //state mockup now in json database, so we dont need thath in code
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 1,
  //     text: 'Task 1',
  //     day: 'Feb 5th at 2:30pm',
  //     reminder: true,
  //   },
  //   {
  //     id: 2,
  //     text: 'Task 2',
  //     day: 'Feb 5th at 2:30pm',
  //     reminder: true,
  //   },
  //   {
  //     id: 3,
  //     text: 'Task 3',
  //     day: 'Feb 5th at 2:30pm',
  //     reminder: false,
  //   },
  // ]);

  const [tasks, setTasks] = useState([]);

  //load state
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks(); //we need this, becase fetch is async function
  }, []);

  //Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  };

  //Add task
  const addTask = (task) => {
    // console.log(task);
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

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
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No tasks'
      )}
    </div>
  );
}

export default App;
