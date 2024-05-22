import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyInfoPage = ({ match }) => {
    const [companyInfo, setCompanyInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const companyId = match.params.id; // Accede a la propiedad 'id' en match.params

    console.log(companyId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/empresas/${companyId}`
                );

                setCompanyInfo(response.data);
                setLoading(false);
                console.log(response);
            } catch (error) {
                console.error("Error al obtener datos de la API:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [companyId]);

    return (
        <div className="bg-gray-100 min-h-screen">

            <div
                className="relative bg-cover bg-center h-64 flex items-center justify-center"

            >

                <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
                <div className="relative z-10 text-white text-center">
                    <p>
                        <img src="/platita_cover.jpeg" alt="banner"></img>
                    </p>
                    <img
                        src="/platita.png"
                        alt="Logo de la Empresa"
                        className="h-20 w-20 mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-semibold">
                        {loading ? "Cargando..." : companyInfo.nombre}
                    </h1>
                </div>
            </div>

            {/* Información de la Empresa */}
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-md rounded-lg p-8 mb-8 flex flex-col md:flex-row">
                    {/* Ubicación y Horario */}
                    <div className="w-full md:w-1/3 pr-0 md:pr-8">
                        <h2 className="text-2xl font-semibold mb-4">Ubicación y Horario</h2>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Ubicación</h3>
                            <p>{loading ? "Cargando..." : companyInfo.ubicacion}</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Horario</h3>
                            <p>{loading ? "Cargando..." : companyInfo.horario}</p>
                        </div>
                    </div>
                    {/* Descripción */}
                    <div className="w-full md:w-2/3 mt-8 md:mt-0">
                        <h2 className="text-2xl font-semibold mb-4">Acerca de Nosotros</h2>
                        <p>{loading ? "Cargando..." : companyInfo.descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfoPage;
