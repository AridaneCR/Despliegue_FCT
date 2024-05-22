import React from 'react';
import './page.css'; // Supongamos que ya tienes estilos CSS generales en este archivo

// Componente para la imagen
function LocationImage({ selectedLocations, handleLocationClick }) {
    // Supongamos que tienes una imagen llamada 'vivero.png' en tu carpeta de assets
    const imagePath = 'vivero.png';

    const handleClick = (locationId) => {
        // Verifica si la ubicación ya está seleccionada
        const isSelected = selectedLocations.find(location => location.id === locationId);
        if (isSelected) {
            // Si está seleccionada, la deselecciona
            const updatedLocations = selectedLocations.filter(location => location.id !== locationId);
            handleLocationClick(updatedLocations);
        } else {
            // Si no está seleccionada, la selecciona
            handleLocationClick([...selectedLocations, { id: locationId }]);
        }
    };

    return (
        <div className="flex justify-center items-center border border-gray-300 rounded-lg p-4 bg-gray-100">
            <div className="relative">
                {selectedLocations.map(location => (
                    <img
                        key={location.id}
                        src="ubi.png" // Reemplaza 'ubi.png' con la ruta de tu imagen de marcador
                        alt={location.name}
                        className="marker"
                        style={{
                            left: location.x,
                            top: location.y,
                        }}
                        onClick={() => handleClick(location.id)}
                    />
                ))}
                <img
                    src={imagePath}
                    alt="Mapa"
                    className="max-w-screen-lg max-h-screen-lg main-image"
                />
            </div>
        </div>
    );
}

// Componente para el panel de ubicación
function LocationPanel({ locations, handleLocationSelect }) {
    return (
        <div className="flex flex-col items-start border border-gray-300 rounded-lg p-4 bg-gray-100">
            <p className="text-lg font-bold mb-4">Selecciona una ubicación:</p>
            {locations.map(location => (
                <button
                    key={location.id}
                    onClick={() => handleLocationSelect(location.id)}
                    className="my-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    {location.name}
                </button>
            ))}
        </div>
    );
}

// Componente principal que maneja el estado
function LocationApp() {
    const [selectedLocations, setSelectedLocations] = React.useState([]);
    const locations = [
        { id: 1, name: 'Platita Sofware', x: 150, y: 100 },
        { id: 2, name: 'Platita Sofware', x: 300, y: 150 },
        { id: 4, name: 'Platita Sofware', x: 500, y: 250 },
        { id: 5, name: 'Platita Sofware', x: 300, y: 250 },
        { id: 6, name: 'Platita Sofware', x: 400, y: 450 },
        // Agrega más ubicaciones según necesites
    ];

    const handleLocationSelect = (locationId) => {
        const location = locations.find(loc => loc.id === locationId);
        setSelectedLocations(prevLocations => {
            const isSelected = prevLocations.some(loc => loc.id === locationId);
            if (isSelected) {
                // Si la ubicación ya está seleccionada, la quitamos
                return prevLocations.filter(loc => loc.id !== locationId);
            } else {
                // Si la ubicación no está seleccionada, la agregamos
                return [...prevLocations, location];
            }
        });
    };

    return (
        <div className="flex justify-center">
            <LocationImage selectedLocations={selectedLocations} handleLocationClick={setSelectedLocations} />
            <LocationPanel locations={locations} handleLocationSelect={handleLocationSelect} />
        </div>
    );
}

export default LocationApp;
