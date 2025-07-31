import React from 'react';
import {
  Bold, Italic, Underline, Quote,
  List, AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';

const WritingToolbar = ({ formatText, writingMode }) => {
  const buttonClass = `p-2 rounded-lg transition-colors ${
    writingMode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
  }`;

  const divider = <div className="w-px h-6 bg-gray-300 mx-2"></div>;

  return (
    <div className={`border-b p-4 ${writingMode === 'dark' ? 'border-gray-700 bg-gray-800' : writingMode === 'focus' ? 'border-amber-200 bg-amber-100' : 'border-gray-200 bg-gray-50'}`}>
      <div className="flex items-center space-x-2 flex-wrap">
        <button onClick={() => formatText('bold')} className={buttonClass}>
          <Bold className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('italic')} className={buttonClass}>
          <Italic className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('underline')} className={buttonClass}>
          <Underline className="h-4 w-4" />
        </button>

        {divider}

        <button onClick={() => formatText('formatBlock', 'blockquote')} className={buttonClass}>
          <Quote className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('insertUnorderedList')} className={buttonClass}>
          <List className="h-4 w-4" />
        </button>

        {divider}

        <button onClick={() => formatText('justifyLeft')} className={buttonClass}>
          <AlignLeft className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('justifyCenter')} className={buttonClass}>
          <AlignCenter className="h-4 w-4" />
        </button>
        <button onClick={() => formatText('justifyRight')} className={buttonClass}>
          <AlignRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default WritingToolbar;
