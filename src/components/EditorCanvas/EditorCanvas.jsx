import React, { useEffect } from 'react';

const EditorCanvas = ({ content, setContent, writingMode, editorRef }) => {
  useEffect(() => {
    // Atualiza o conteúdo exibido caso seja modificado externamente
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content, editorRef]);

  const handleInput = (e) => {
    setContent(e.target.innerHTML);
  };

  const getTextStyle = () => {
    if (writingMode === 'dark' || writingMode === 'escuro') return 'text-gray-100';
    if (writingMode === 'focus' || writingMode === 'foco') return 'text-gray-800 font-serif';
    return 'text-gray-900';
  };
    return (
      <div className="flex-1 p-8">
      <div className={`max-w-4xl mx-auto ${
        writingMode === 'focus' || writingMode === 'foco'
          ? 'bg-white rounded-lg shadow-lg p-8'
          : ''
      }`}>
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className={`min-h-96 outline-none leading-relaxed text-lg ${getTextStyle()}`}
          style={{
            fontFamily:
              writingMode === 'focus' || writingMode === 'foco'
                ? 'Georgia, serif'
                : 'system-ui, sans-serif',
            lineHeight: '1.8'
          }}
          placeholder="Era uma vez, em uma terra muito distante..."
        />
      </div>
    </div>
  );
  };

export default EditorCanvas;