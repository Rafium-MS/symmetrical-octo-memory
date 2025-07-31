import React from 'react';
import { Scroll, Eye, EyeOff } from 'lucide-react';

const EditorHeader = ({ title, setTitle, wordCount, showWordCount, setShowWordCount, writingMode }) => {
  const getColor = () => (writingMode === 'dark' ? 'text-gray-100' : 'text-gray-900');

  return (
    <div className={`border-b px-6 py-4 ${writingMode === 'dark' ? 'border-gray-700 bg-gray-800' : writingMode === 'focus' ? 'border-amber-200 bg-amber-100' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Scroll className="h-8 w-8 text-purple-600" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`text-2xl font-bold bg-transparent border-none outline-none ${getColor()}`}
            placeholder="Título da História"
          />
        </div>

        <div className="flex items-center space-x-4">
          {showWordCount && (
            <div className={`text-sm ${writingMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {wordCount} palavras
            </div>
          )}
          <button
            onClick={() => setShowWordCount(!showWordCount)}
            className={`p-2 rounded-lg ${writingMode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
          >
            {showWordCount ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
