import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  //Add task button toggle. Default is form hidden.
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

  //Fetch task (need for toggle reminder)
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  //Add task
  const addTask = async (task) => {
    // console.log(task);
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  //Delete task
  const deleteTask = async (id) => {
    // console.log(`delete ${id}`);

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  //Toggle reminder
  const toggleReminder = async (id) => {
    // console.log(`toggle ${id}`);

    const taskToTogle = await fetchTask(id);
    const updTask = { ...taskToTogle, reminder: !taskToTogle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No tasks'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
