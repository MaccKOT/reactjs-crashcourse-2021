import { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    //some validation before submit
    if (!text) {
      alert('Please add text');
      return;
    }

    onAdd({
      text,
      day,
      reminder,
    });

    //clear form
    setText('');
    setDay('');
    setReminder(false);
  };

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='text'
          placeholder='Add day and time'
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>

      {/* TODO checkbox with react-icon, because default is ugly */}
      <div className='form-control form-control-check'>
        <label>Set reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type='submit' className='btn btn-block' value='Save Task' />
    </form>
  );
};

export default AddTask;
