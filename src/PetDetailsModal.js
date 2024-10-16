import React, { useState } from 'react';
import axios from 'axios';

function PetDetailsModal({ pet, onClose, onPetUpdated, onPetAdopted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: pet.name,
    age: pet.age,
    type: pet.type,
    description: pet.description,
    characteristics: pet.characteristics.join(', '),
    photo: pet.photo
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPet = {
        ...formData,
        characteristics: formData.characteristics.split(',').map(char => char.trim())
      };
      const response = await axios.put(`http://localhost:3005/api/pets/${pet.id}`, updatedPet);
      
      onPetUpdated(response.data);
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleAdopt = async () => {
    try {
      await axios.delete(`http://localhost:3005/api/pets/${pet.id}`);
      onPetAdopted(pet.id);
      onClose();
    } catch (error) {
      console.error('Error adopting pet:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>

        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <h2>Editar {pet.name}</h2>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <select name="age" value={formData.age} onChange={handleInputChange} required>
              <option value="Cachorro">Cachorro</option>
              <option value="Adulto">Adulto</option>
              <option value="Senior">Senior</option>
            </select>
            <input
              type="text"
              name="type"
              placeholder="Tipo de mascota (Perro, Gato, etc.)"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="characteristics"
              placeholder="Características (separadas por comas)"
              value={formData.characteristics}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="photo"
              placeholder="URL de la foto"
              value={formData.photo}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Guardar cambios</button>
          </form>
        ) : (
          <>
            <h2>{pet.name}</h2>
            <img src={pet.photo} alt={pet.name} className="pet-photo-large" />
            <p><strong>Edad:</strong> {pet.age}</p>
            <p><strong>Tipo:</strong> {pet.type}</p>
            <p><strong>Descripción:</strong> {pet.description}</p>
            <p><strong>Características:</strong> {pet.characteristics.join(', ')}</p>
            <button onClick={() => setIsEditing(true)}>Editar</button>
            <button onClick={handleAdopt}>Adoptar</button>
          </>
        )}
      </div>
    </div>
  );
}

export default PetDetailsModal;
