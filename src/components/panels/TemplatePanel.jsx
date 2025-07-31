import React from 'react';
import { Sparkles } from 'lucide-react';

const TemplatePanel = ({ insertTemplate, writingMode }) => {
  const buttonStyle = writingMode === 'dark'
    ? 'hover:bg-gray-700 text-gray-300'
    : writingMode === 'focus'
    ? 'hover:bg-amber-200 text-gray-700'
    : 'hover:bg-gray-100 text-gray-700';

  const templates = [
    { key: 'chapter', label: 'Novo Capítulo' },
    { key: 'scene', label: 'Nova Cena' },
    { key: 'dialogue', label: 'Diálogo' },
    { key: 'action', label: 'Sequência de Ação' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2 flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
          Templates Rápidos
        </h3>
        <div className="space-y-2">
          {templates.map((template) => (
            <button
              key={template.key}
              onClick={() => insertTemplate(template.key)}
              className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${buttonStyle}`}
            >
              {template.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatePanel;
