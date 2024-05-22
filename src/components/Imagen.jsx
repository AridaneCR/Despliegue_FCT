import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmpresaImages = ({ empresaId }) => {
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    // Obtener las imágenes de la empresa al cargar el componente
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/empresas/${empresaId}/images`);
        const images = response.data;

        // Filtrar las imágenes por tipo (logo o banner) y actualizar los estados correspondientes
        images.forEach(image => {
          if (image.tipo === 'logo') {
            setLogo(image);
          } else if (image.tipo === 'banner') {
            setBanner(image);
          }
        });
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    };

    fetchImages();
  }, [empresaId]);

  const handleUpload = async (event, tipo) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('imagen', file);

    try {
      await axios.post(`http://localhost:8000/api/empresas/${empresaId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Recargar las imágenes después de la carga
      fetchImages();
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

  const handleDelete = async (imagenId) => {
    try {
      await axios.delete(`http://localhost:8000/api/empresas/${empresaId}/images/${imagenId}`);

      // Recargar las imágenes después de la eliminación
      fetchImages();
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  };

  return (
    <div>
      <h2>Logo:</h2>
      {logo && (
        <div>
          <img src={`http://localhost:8000/storage/${logo.ruta}`} alt="Logo" />
          <button onClick={() => handleDelete(logo.id)}>Eliminar</button>
        </div>
      )}
      <input type="file" onChange={(event) => handleUpload(event, 'logo')} />

      <h2>Banner:</h2>
      {banner && (
        <div>
          <img src={`http://localhost:8000/storage/${banner.ruta}`} alt="Banner" />
          <button onClick={() => handleDelete(banner.id)}>Eliminar</button>
        </div>
      )}
      <input type="file" onChange={(event) => handleUpload(event, 'banner')} />
    </div>
  );
};

export default EmpresaImages;
