import { useState, useEffect } from 'react';
import Axios from 'axios';
import AuthValidationErrors from 'components/AuthValidationErrors';
import Button from 'components/Button';
import Input from 'components/Input';
import Label from 'components/Label';
import { useAuth } from '../hooks/auth';
import Modal from 'react-modal';

const Reserva = ({ isOpen, closeModal }) => {
  const { reservas } = useAuth({});

  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [sala_id, setSala_id] = useState('');
  const [roomOptions, setRoomOptions] = useState([]);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await Axios.get('http://localhost:8000/api/salas');
      if (response && response.data) {
        setRoomOptions(response.data);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const submitForm = async event => {
    event.preventDefault();
    try {
      await reservas({ title, start, end, sala_id, empresa_id: '1', setErrors });
      setSuccessMessage('Reserva creada exitosamente.');
      // Se cierra el modal después de 2 segundos
      setTimeout(() => {
        closeModal();
        setSuccessMessage('');
        window.location.reload(); // Recarga la página
      }, 2000);
    } catch (error) {
      console.error('Error al crear reserva:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center"
      overlayClassName="fixed inset-0 z-40 bg-black bg-opacity-75"
    >
      <div className="p-4 bg-white rounded-lg max-w-md w-full mx-2 z-50">
        <h1 className="text-lg font-semibold mb-4">Reserva</h1>
        {successMessage && (
          <div className="bg-green-200 text-green-800 rounded-md p-2 mb-4">
            {successMessage}
          </div>
        )}
        <AuthValidationErrors className="mb-4" errors={errors} />
        <form onSubmit={submitForm} className="flex flex-col items-center">
          <div className="mb-4 w-full max-w-md">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              required
              autoFocus
              className="input"
            />
          </div>
          <div className="mb-4 w-full max-w-md">
            <Label htmlFor="start">Fecha de inicio</Label>
            <Input
              id="start"
              type="datetime-local"
              value={start}
              onChange={event => setStart(event.target.value)}
              required
              className="input"
            />
          </div>
          <div className="mb-4 w-full max-w-md">
            <Label htmlFor="end">Fecha de finalización</Label>
            <Input
              id="end"
              type="datetime-local"
              value={end}
              onChange={event => setEnd(event.target.value)}
              required
              className="input"
            />
          </div>
          <div className="mb-4 w-full max-w-md">
            <Label htmlFor="salas_id">Seleccionar Sala</Label>
            <select
              id="salas_id"
              value={sala_id}
              onChange={event => setSala_id(event.target.value)}
              required
              className="input"
            >
              <option value="">Seleccione una sala</option>
              {roomOptions.map(room => (
                <option key={room.id} value={room.id}>
                  {room.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center w-full space-x-4">
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Reservar
            </Button>
            <Button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Reserva;
