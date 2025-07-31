import React from 'react';
import { PlusCircle, X } from 'lucide-react';

const PlotPanel = ({
  plotPoints,
  newPlotPoint,
  setNewPlotPoint,
  addPlotPoint,
  removeItem,
  showPlotForm,
  setShowPlotForm,
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
        <h3 className="font-semibold">Pontos do Enredo</h3>
        <button
          onClick={() => setShowPlotForm(!showPlotForm)}
          className="p-1 text-purple-600 hover:bg-purple-100 rounded"
        >
          <PlusCircle className="h-4 w-4" />
        </button>
      </div>

      {showPlotForm && (
        <div className={cardClass}>
          <input
            type="text"
            placeholder="Título do evento"
            value={newPlotPoint.title}
            onChange={(e) => setNewPlotPoint({ ...newPlotPoint, title: e.target.value })}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Capítulo/Seção"
            value={newPlotPoint.chapter}
            onChange={(e) => setNewPlotPoint({ ...newPlotPoint, chapter: e.target.value })}
            className={inputClass}
          />
          <textarea
            placeholder="Descrição do evento"
            value={newPlotPoint.description}
            onChange={(e) => setNewPlotPoint({ ...newPlotPoint, description: e.target.value })}
            className={`${inputClass} h-20`}
          />
          <button
            onClick={addPlotPoint}
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Adicionar
          </button>
        </div>
      )}

      <div className="space-y-3">
        {plotPoints.map((plot) => (
          <div key={plot.id} className={cardClass}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium">{plot.title}</h4>
                {plot.chapter && <p className="text-sm text-purple-600">Cap. {plot.chapter}</p>}
                {plot.description && (
                  <p className={`text-sm mt-1 ${writingMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plot.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeItem(plot.id, 'plot')}
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

export default PlotPanel;
