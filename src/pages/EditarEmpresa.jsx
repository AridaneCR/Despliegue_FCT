import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditEmpresaPage = ({ match }) => {
  const [empresa, setEmpresa] = useState({
    descripcion: '',
    descripcion_2: '',
    nombre: '',
    horario: '',
    logo: null,
    banner: null
  });

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/empresas/1`);
        setEmpresa(response.data);
      } catch (error) {
        console.error('Error al obtener la información de la empresa:', error);
      }
    };

    fetchEmpresa();
  }, [match.params.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmpresa(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setEmpresa(prevState => ({
      ...prevState,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('descripcion', empresa.descripcion);
    formData.append('descripcion_2', empresa.descripcion_2);
    formData.append('nombre', empresa.nombre);
    formData.append('horario', empresa.horario);
    formData.append('logo', empresa.logo);
    formData.append('banner', empresa.banner);

    try {
      await axios.put(`http://localhost:8000/api/empresas/1`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Redirigir a la página de detalles de la empresa después de la edición
      // Puedes usar useHistory de react-router-dom o cualquier otro método de enrutamiento que prefieras
    } catch (error) {
      console.error('Error al actualizar la información de la empresa:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Editar Información de la Empresa</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
          <textarea name="descripcion" value={empresa.descripcion} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción 2:</label>
          <textarea name="descripcion_2" value={empresa.descripcion_2} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
          <input type="text" name="nombre" value={empresa.nombre} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Horario:</label>
          <input type="text" name="horario" value={empresa.horario} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo:</label>
          <input type="file" name="logo" onChange={handleFileChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Banner:</label>
          <input type="file" name="banner" onChange={handleFileChange} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditEmpresaPage;
