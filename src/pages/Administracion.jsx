import React, { useState } from 'react';
import CompanyForm from '../components/EmpresasAdmin';


const AdminPage = () => {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const renderComponent = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div className="min-h-screen flex w-full"> {/* Agregamos la clase 'w-full' para que ocupe el 100% del ancho */}
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="p-4">
                    <h2 className="text-lg font-semibold">Admin Panel</h2>
                </div>
                <nav className="flex-1">
                    <ul className="space-y-2 p-4">
                        <li>
                            <button onClick={() => renderComponent(<CompanyForm />)} className="block p-2 rounded hover:bg-gray-700">Empresas</button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="flex-1 p-8 bg-gray-100">
                {selectedComponent}
            </main>
        </div>
    );
};

export default AdminPage;
