import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddPet() {
  const [formData, setFormData] = useState({
    name: '',
    age: 'Cachorro',
    type: '',
    description: '',
    characteristics: '',
    photo: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3005/api/pets', {
        ...formData,
        characteristics: formData.characteristics.split(',').map(char => char.trim())
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  };

  return (
    <div className="container">
      <h2>Agregar una nueva mascota</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <br></br>
        <select name="age" value={formData.age} onChange={handleInputChange} required>
          <option value="Cachorro">Cachorro</option>
          <option value="Adulto">Adulto</option>
          <option value="Senior">Senior</option>
        </select>
        <br></br>
        <input
          type="text"
          name="type"
          placeholder="Tipo de mascota (Perro, Gato, etc.)"
          value={formData.type}
          onChange={handleInputChange}
          required
        />
         <br></br>
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
         <br></br>
        <input
          type="text"
          name="characteristics"
          placeholder="Características (separadas por comas)"
          value={formData.characteristics}
          onChange={handleInputChange}
          required
        />
         <br></br>
        <input
          type="text"
          name="photo"
          placeholder="URL de la foto"
          value={formData.photo}
          onChange={handleInputChange}
          required
        />
         <br></br>
        <button type="submit">Agregar Mascota</button>
      </form>
    </div>
  );
}

export default AddPet;
