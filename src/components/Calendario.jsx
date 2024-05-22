import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import ReservationModal from './ReservasModal';

import { isTimeSlotAvailable } from './Helps';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const calendarRef = useRef(null);

  // Función para cargar las reservas desde la API
  const loadReservations = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/reserva');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      console.log("Datos recibidos:", data);
      setEvents(data); // Actualiza el estado events con las reservas recibidas
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };
  


  // Cargar las reservas al cargar el componente
  useEffect(() => {
    loadReservations();
  }, []);

  const handleDateClick = (arg) => {
    const clickedDate = arg.date;
    setSelectedDate(clickedDate);
    setModalIsOpen(true);
  };

  const handleAddEvent = (newEvent) => {
    // Validar si el intervalo de tiempo está disponible
    const isAvailable = isTimeSlotAvailable(new Date(newEvent.start), new Date(newEvent.end));
    if (isAvailable) {
      setEvents([...events, newEvent]);
      setModalIsOpen(false); // Cierra el modal después de agregar el evento
    } else {
      alert("El intervalo de tiempo seleccionado ya está reservado. Por favor, elija otro.");
    }
  };
  console.log("Datos de eventos:", events);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setModalIsOpen(true)}>Reservar</button>
      <ReservationModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        addEvent={handleAddEvent}
        selectedDate={selectedDate}
        events={events} // Pasar events como prop al componente ReservationModal
      />
      <div className="mt-4">
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin]}// Cambia la vista a mes
          events={events}
          height="auto" // Hace que el calendario ajuste su altura automáticamente
          className="w-full max-w-full" // Utiliza el ancho completo del contenedor
          dateClick={handleDateClick} // Llama a la función cuando se hace clic en una fecha
        />
      </div>
    </div>
  );
}

export default Calendar;
