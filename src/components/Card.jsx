import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
 // Asegúrate de ajustar la ruta si es necesario

const Card = () => {
  const [empresasData, setEmpresasData] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/empresas');
        setEmpresasData(response.data); // Almacena los datos de la empresa en el estado 'empresasData'
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData(); // Llama a la función fetchData al montar el componente
  }, []);

  // Helper function to truncate text and ensure a minimum length of 20 characters
  const truncateText = (text, length) => {
    if (text.length < 20) {
      return text.padEnd(20, '.');
    }
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div>
      {empresasData.map((empresa, index) => (
        <div key={index} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div className="rounded-full h-20 w-20 flex items-center justify-center bg-gray-300">
            <img src="/platita.png" alt="Logo" className="h-20 w-auto" />
            </div>
            <div className="ml-4">
              <p className="font-semibold text-xl">{empresa.nombre}</p>
              <p className="text-gray-600">Horario: {empresa.horario}</p>
              <p className={empresa.estado === 'Abierto' ? 'text-green-500' : 'text-red-500'}>{empresa.estado}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-600">{truncateText(empresa.descripcion, 30)}</p>
          </div>
          <div className="flex flex-col items-end">
            <Link to={`/empresas-info/${empresa.id}`}>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                Ver Más
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
