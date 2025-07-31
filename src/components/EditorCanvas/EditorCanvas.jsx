import React, { forwardRef } from 'react';

const EditorCanvas = forwardRef(({ content, setContent }, ref) => {
  return (
    <textarea
      ref={ref}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full min-h-[24rem] max-h-[70vh] p-4 border border-gray-300 rounded-md bg-white shadow-sm text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Comece a escrever sua história aqui..."
    />
  );
});

export default EditorCanvas;
