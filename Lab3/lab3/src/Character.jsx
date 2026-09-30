import { useState } from 'react';

function CharacterCard({character, onToggleStatus}) {

    function handleToggleStatus() {
        onToggleStatus(character.id);
        console.log(`Статус персонажа ${character.name} был переключен. Новый статус: ${character.status === 'in Party' ? 'AFK' : 'Resting'}`);
    }

    return (
        <div style={{ border: "1px solid #aaa", margin: "8px", padding: "8px" }}>
      <h4>{character.name}</h4>
      <p>Статус: {character.status}</p>
      <button onClick={handleToggleStatus}>
        Переключить статус
      </button>
    </div>
  );
}

export default function CharacterApp() {
    const [characters, setCharacters] = useState([
        { id: 1, name: 'Character 1', status: 'in Party' },
        { id: 2, name: 'Character 2', status: 'AFK' },
        { id: 3, name: 'Character 3', status: 'Resting' },
    ]);

    const toggleStatus = (id) => {
        setCharacters(prevCharacters => 
            prevCharacters.map(character => {
                if (character.id === id) {
                    return { ...character, status: character.status === 'in Party' ? 'AFK' : 'Resting' };
                }
                return character;
            })
        );
    };

    return (
    <div>
      {characters.map(char => (
        <CharacterCard 
          key={char.id} 
          character={char} 
          onToggleStatus={toggleStatus} 
        />
      ))}
    </div>
  );

}