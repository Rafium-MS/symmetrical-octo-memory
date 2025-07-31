import React from 'react';
import { Edit3, Users, MapPin, BookOpen } from 'lucide-react';

const Sidebar = ({ activePanel, setActivePanel, writingMode, setWritingMode }) => {
  return (
    <div className={`w-80 border-r flex flex-col ${writingMode === 'dark' ? 'border-gray-700 bg-gray-800' : writingMode === 'focus' ? 'border-amber-200 bg-amber-100' : 'border-gray-200 bg-gray-50'}`}>
      {/* Modo de Escrita */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium mb-2">Modo de Escrita</label>
        <select
          value={writingMode}
          onChange={(e) => setWritingMode(e.target.value)}
          className={`w-full p-2 border rounded-lg ${writingMode === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'}`}
        >
          <option value="normal">Normal</option>
          <option value="focus">Foco (Pergaminho)</option>
          <option value="dark">Modo Escuro</option>
        </select>
      </div>

      {/* Navegação */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'editor', icon: Edit3, label: 'Editor' },
          { id: 'characters', icon: Users, label: 'Personagens' },
          { id: 'locations', icon: MapPin, label: 'Locais' },
          { id: 'plot', icon: BookOpen, label: 'Enredo' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            className={`flex-1 flex items-center justify-center p-3 text-sm font-medium border-b-2 transition-colors ${
              activePanel === tab.id 
                ? 'border-purple-500 text-purple-600' 
                : `border-transparent ${writingMode === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`
            }`}
          >
            <tab.icon className="h-4 w-4 mr-1" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
