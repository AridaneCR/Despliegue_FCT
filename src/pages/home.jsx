import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Layouts/Navbar';
import axios from 'axios';

const App = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/empresas');
            console.log("Empresas:", response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleVerMas = (empresa_id) => {
        window.location.href = `/empresas-info/${empresa_id}`;
    };

    return (
    

        <div className="flex flex-col min-h-screen">
          <Navbar></Navbar>
            <div className="container mx-auto mt-8 flex-grow">
                <Routes>
                    <Route path="/" element={<Card data={data} onVerMas={handleVerMas} />} />
                </Routes>
            </div>
            
        </div>
        
    );
};

export default App;
