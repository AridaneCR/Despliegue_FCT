import React, { useState } from 'react';

function EventForm({ addEvent }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({ title, start, end });
    setTitle('');
    setStart('');
    setEnd('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título del evento"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button type="submit">Crear Evento</button>
    </form>
  );
}

export default EventForm;
