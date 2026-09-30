import React, { useState } from 'react';
import './Dashboard.css';

const INITIAL_CHARACTERS = [
  { id: 'c1', name: 'Aragorn', role: 'Warrior', level: 10, status: 'In Battle' },
  { id: 'c2', name: 'Gandalf', role: 'Mage', level: 20, status: 'Resting' },
  { id: 'c3', name: 'Legolas', role: 'Ranger', level: 12, status: 'In Battle' },
  { id: 'c4', name: 'Gimli', role: 'Warrior', level: 11, status: 'On Quest' },
];

function CharacterCard({ character, onDelete, onStatusChange }) {
  console.log(`[Re-render] Character card: ${character.name} (ID: ${character.id})`);

  const [equipment, setEquipment] = useState({
    weapon: 'Basic Sword',
    shield: false,
  });

  return (
    <div className="card">
      <div className="card-header">
        <h3>{character.name}</h3>
        <span className={`status-tag status-${character.status.toLowerCase().replace(/\s+/g, '-')}`}>
          {character.status}
        </span>
      </div>

      <p><strong>Role:</strong> {character.role}</p>
      <p><strong>Level:</strong> {character.level}</p>

      <div className="local-state-box">
        <h4>Local Equipment:</h4>
        <label>
          Weapon: 
          <input
            type="text"
            value={equipment.weapon}
            onChange={(e) => setEquipment({ ...equipment, weapon: e.target.value })}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={equipment.shield}
            onChange={(e) => setEquipment({ ...equipment, shield: e.target.checked })}
          />
          Shield Equipped
        </label>
      </div>

      <div className="card-actions">
        <select
          value={character.status}
          onChange={(e) => onStatusChange(character.id, e.target.value)}
        >
          <option value="In Battle">In Battle</option>
          <option value="Resting">Resting</option>
          <option value="On Quest">On Quest</option>
        </select>

        <button className="delete-btn" onClick={() => onDelete(character.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  console.log('[Re-render] Main Dashboard component');

  const [characters, setCharacters] = useState(INITIAL_CHARACTERS);
  const [filterRole, setFilterRole] = useState('All');
  const [isReversed, setIsReversed] = useState(false);
  
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Warrior');

  const [resetVersion, setResetVersion] = useState(0);

  const handleAddCharacter = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newChar = {
      id: `c_${Date.now()}`,
      name: newName,
      role: newRole,
      level: 1,
      status: 'Resting',
    };

    setCharacters([newChar, ...characters]);
    setNewName('');
  };

  const handleDelete = (id) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setCharacters(
      characters.map((char) =>
        char.id === id ? { ...char, status: newStatus } : char
      )
    );
  };

  const handleResetAllLocalStates = () => {
    setResetVersion((prev) => prev + 1);
  };

  const filteredCharacters = characters.filter((char) => {
    if (filterRole === 'All') return true;
    return char.role === filterRole;
  });

  const displayedCharacters = isReversed
    ? [...filteredCharacters].reverse()
    : filteredCharacters;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>⚔️ RPG Guild Dashboard</h1>
        <p>Guild Character Management</p>
      </header>

      <form className="add-form" onSubmit={handleAddCharacter}>
        <h3>Add Character</h3>
        <div className="form-group">
          <input
            type="text"
            placeholder="Character name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
            <option value="Warrior">Warrior</option>
            <option value="Mage">Mage</option>
            <option value="Ranger">Ranger</option>
          </select>
          <button type="submit" className="add-btn">Add</button>
        </div>
      </form>

      <div className="controls-bar">
        <div className="control-item">
          <label>Filter by Role: </label>
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="All">All</option>
            <option value="Warrior">Warriors</option>
            <option value="Mage">Mages</option>
            <option value="Ranger">Rangers</option>
          </select>
        </div>

        <button className="secondary-btn" onClick={() => setIsReversed(!isReversed)}>
          Order: {isReversed ? 'Reversed' : 'Direct'}
        </button>

        <button className="reset-btn" onClick={handleResetAllLocalStates}>
          🔄 Reset Card Local State (Keys Reset)
        </button>
      </div>

      <div className="card-grid">
        {displayedCharacters.map((char) => (
          <CharacterCard
            key={`${char.id}-v${resetVersion}`}
            character={char}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
}