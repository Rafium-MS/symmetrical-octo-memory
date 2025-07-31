import React from 'react';
import { PlusCircle, X } from 'lucide-react';

const LocationPanel = ({
  locations,
  newLocation,
  setNewLocation,
  addLocation,
  removeItem,
  showLocationForm,
  setShowLocationForm,
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
        <h3 className="font-semibold">Locais</h3>
        <button
          onClick={() => setShowLocationForm(!showLocationForm)}
          className="p-1 text-purple-600 hover:bg-purple-100 rounded"
        >
          <PlusCircle className="h-4 w-4" />
        </button>
      </div>

      {showLocationForm && (
        <div className={cardClass}>
          <input
            type="text"
            placeholder="Nome do local"
            value={newLocation.name}
            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Tipo (cidade, floresta, castelo...)"
            value={newLocation.type}
            onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="Descrição do local"
            value={newLocation.description}
            onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
            className={`${inputClass} h-20`}
          />
          <button
            onClick={addLocation}
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Adicionar
          </button>
        </div>
      )}

      <div className="space-y-3">
        {locations.map((loc) => (
          <div key={loc.id} className={cardClass}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium">{loc.name}</h4>
                {loc.type && <p className="text-sm text-purple-600">{loc.type}</p>}
                {loc.description && (
                  <p className={`text-sm mt-1 ${writingMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {loc.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeItem(loc.id, 'location')}
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

export default LocationPanel;
