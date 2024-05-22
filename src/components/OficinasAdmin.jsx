import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente para cada elemento de la lista de empresas
const OficinasItem = ({ empresa, onDelete, onEdit }) => {
    return (
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
            <div>
                <span className="font-semibold">{empresa.nombre}</span> - {empresa.nif}
            </div>
            <div>
                <button onClick={() => onEdit(empresa)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Editar</button>
                <button onClick={() => onDelete(empresa.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Eliminar</button>
            </div>
        </div>
    );
};

// Componente para la lista de empresas
const ListaEmpresas = ({ empresas, onDelete, onEdit }) => {
    return (
        <div className="mt-4">
            {empresas.map(empresa => (
                <OficinasItem key={empresa.id} empresa={empresa} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
};

const OficinasFrom = () => {
    const [formData, setFormData] = useState({
        id: null,
        descripcion: '',
        nombre: '',
        nif: '',
        telefono: '',
        email: '',
        estado: '', 
        servicio: '',
        horario: ''
    });
    const eliminarEmpresa = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/empresas/${id}`);
            alert('¡Empresa eliminada exitosamente!');
            cargarEmpresas(); // Volvemos a cargar la lista de empresas después de eliminar una empresa
        } catch (error) {
            console.error('Error al eliminar la empresa:', error);
            alert('Ocurrió un error al eliminar la empresa. Por favor, inténtalo de nuevo.');
        }
    };

    const [empresas, setEmpresas] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para controlar la visualización del formulario

    // Función para cargar la lista de empresas desde el servidor
    const cargarEmpresas = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/empresas');
            setEmpresas(response.data);
        } catch (error) {
            console.error('Error al cargar las empresas:', error);
        }
    };

    useEffect(() => {
        cargarEmpresas();
    }, []); // Se ejecuta una vez al cargar el componente

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await axios.put(`http://127.0.0.1:8000/api/empresas/${formData.id}`, formData);
                alert('¡Empresa actualizada exitosamente!');
            } else {
                await axios.post('http://127.0.0.1:8000/api/empresas', formData);
                alert('¡Empresa creada exitosamente!');
            }
            cargarEmpresas(); // Volvemos a cargar la lista de empresas después de crear o editar una empresa
            setMostrarFormulario(false); // Ocultamos el formulario después de enviar los datos
            setFormData({ // Limpiamos el formulario después de enviar los datos
                descripcion: '',
                nombre: '',
                nif: '',
                telefono: '',
                email: '',
                estado: '',
                servicio: '',
                horario: ''
            });
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo.');
        }
    };

    const editarEmpresa = (empresa) => {
        // Establecer los datos de la empresa seleccionada en el estado formData
        setFormData({
            id: empresa.id,
            descripcion: empresa.descripcion,
            nombre: empresa.nombre,
            nif: empresa.nif,
            telefono: empresa.telefono,
            email: empresa.email,
            estado: empresa.estado,
            servicio: empresa.servicio,
            horario: empresa.horario
        });
        // Mostrar el formulario de edición
        setMostrarFormulario(true);
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
            {!mostrarFormulario ? (
                // Mostrar botón para mostrar el formulario
                <button onClick={() => setMostrarFormulario(true)} className="mb-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                    Mostrar Formulario de Crear Empresa
                </button>
            ) : (
                // Mostrar formulario para crear o editar empresa
                <div>
                    <h2 className="text-xl font-semibold mb-4">{formData.id ? 'Editar Empresa' : 'Crear Empresa'}</h2>
                    <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Descripción:</label>
                                <input
                                    type="text"
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">NIF:</label>
                                <input
                                    type="text"
                                    name="nif"
                                    value={formData.nif}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Teléfono:</label>
                                <input
                                    type="text"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Estado:</label>
                                <input
                                    type="text"
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Servicio:</label>
                                <input
                                    type="text"
                                    name="servicio"
                                    value={formData.servicio}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Horario:</label>
                                <input
                                    type="text"
                                    name="horario"
                                    value={formData.horario}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                                {formData.id ? 'Guardar Cambios' : 'Crear Empresa'}
                            </button>
                    </form>

                </div>
            )}

            {/* Lista de empresas */}
            <ListaEmpresas empresas={empresas} onDelete={eliminarEmpresa} onEdit={editarEmpresa} />
        </div>
    );
};

export default OficinasItem;