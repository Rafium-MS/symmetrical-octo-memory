import React from 'react';
import { PlusCircle, X } from 'lucide-react';

const CharacterPanel = ({
  characters,
  newCharacter,
  setNewCharacter,
  addCharacter,
  removeItem,
  showCharacterForm,
  setShowCharacterForm,
  writingMode
}) => {
  const inputClass = `w-full p-2 mb-2 border rounded ${writingMode === 'dark'
    ? 'bg-gray-600 border-gray-500 text-gray-100'
    : 'bg-white border-gray-300'}`;

  const cardClass = `p-3 rounded-lg border ${writingMode === 'dark'
    ? 'border-gray-600 bg-gray-700'
    : 'border-gray-200 bg-gray-50'}`;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Personagens</h3>
        <button
          onClick={() => setShowCharacterForm(!showCharacterForm)}
          className="p-1 text-purple-600 hover:bg-purple-100 rounded"
        >
          <PlusCircle className="h-4 w-4" />
        </button>
      </div>

      {showCharacterForm && (
        <div className={cardClass}>
          <input
            type="text"
            placeholder="Nome do personagem"
            value={newCharacter.name}
            onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Papel/Função"
            value={newCharacter.role}
            onChange={(e) => setNewCharacter({ ...newCharacter, role: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="Descrição e características"
            value={newCharacter.description}
            onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
            className={`${inputClass} h-20`}
          />
          <button
            onClick={addCharacter}
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Adicionar
          </button>
        </div>
      )}

      <div className="space-y-3">
        {characters.map((char) => (
          <div key={char.id} className={cardClass}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium">{char.name}</h4>
                {char.role && <p className="text-sm text-purple-600">{char.role}</p>}
                {char.description && (
                  <p className={`text-sm mt-1 ${writingMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {char.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeItem(char.id, 'character')}
                className={`p-1 rounded ${writingMode === 'dark' ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterPanel;
