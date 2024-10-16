import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PetDetailsModal from './PetDetailsModal';

function Home() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/pets');
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, [refreshKey]);

  const openModal = (pet) => {
    setSelectedPet(pet);
  };

  const closeModal = () => {
    setSelectedPet(null);
  };

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleAgeFilterChange = (e) => {
    setAgeFilter(e.target.value);
  };

  const handlePetUpdated = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  const handlePetAdopted = (petId) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
  };

  const filteredPets = pets.filter((pet) => {
    const matchesType = typeFilter ? pet.type.toLowerCase().includes(typeFilter.toLowerCase()) : true;
    const matchesAge = ageFilter ? pet.age === ageFilter : true;
    return matchesType && matchesAge;
  });

  return (
    <div className="container">
      <h1>Mascotas Disponibles para Adopción</h1>

      <div className="filters">
        <label>
          Filtrar por tipo:
          <input 
            type="text" 
            placeholder="Escribe para buscar..." 
            value={typeFilter} 
            onChange={handleTypeFilterChange} 
          />
        </label>

        <label>
          Filtrar por edad:
          <select value={ageFilter} onChange={handleAgeFilterChange}>
            <option value="">Todas</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Adulto">Adulto</option>
            <option value="Senior">Senior</option>
          </select>
        </label>
      </div>

      <button onClick={() => navigate('/add-pet')} className="add-pet-button">
        Agregar nueva mascota
      </button>

      <div className="pets-list">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img src={pet.photo} alt={pet.name} className="pet-photo" />
              <h2>{pet.name}</h2>
              <p><strong>Edad:</strong> {pet.age}</p>
              <p><strong>Tipo:</strong> {pet.type}</p>
              <button onClick={() => openModal(pet)}>Ver detalles</button>
            </div>
          ))
        ) : (
          <p>No hay mascotas disponibles con los filtros aplicados.</p>
        )}
      </div>

      {selectedPet && (
        <PetDetailsModal
          pet={selectedPet}
          onClose={closeModal}
          onPetUpdated={handlePetUpdated}
          onPetAdopted={handlePetAdopted}
        />
      )}
    </div>
  );
}

export default Home;