import React, { useState, useRef, useEffect } from 'react';

// Componentes principais
import Sidebar from '../Sidebar/Sidebar.jsx';
import EditorHeader from '../EditorHeader/EditorHeader.jsx';
import WritingToolbar from '../WritingToolbar/WritingToolbar.jsx';
import EditorCanvas from '../EditorCanvas/EditorCanvas.jsx';

// Painéis
import TemplatePanel from '../panels/TemplatePanel.jsx';
import CharacterPanel from '../panels/CharacterPanel.jsx';
import LocationPanel from '../panels/LocationPanel.jsx';
import PlotPanel from '../panels/PlotPanel.jsx';

// Utilitários
import htmlDocx from 'html-docx-js/dist/html-docx.js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import ExportMenu from '../ExportMenu/ExportMenu.jsx';

const FictionEditor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Nova História');
  const [wordCount, setWordCount] = useState(0);
  const [mode, setMode] = useState('normal');
  const [panel, setPanel] = useState('editor');

  const contentRef = useRef(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const resetProject = () => {
    if (window.confirm("Deseja realmente apagar o conteúdo atual?")) {
      setContent('');
      setTitle('Nova História');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 px-6 py-4">
      <h1 className="text-3xl font-bold mb-1">{title}</h1>
      <p className="text-sm text-gray-600 mb-4">{wordCount} palavras</p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={resetProject}
          className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded text-sm"
        >
          Resetar Projeto
        </button>

        <ExportMenu content={content} title={title} />
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label htmlFor="mode" className="font-medium text-sm">Modo de Escrita</label>
        <select
          id="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="normal">Normal</option>
          <option value="foco">Modo Foco</option>
          <option value="escuro">Modo Escuro</option>
        </select>

        <div className="flex gap-2 ml-4">
          <button
            className={`px-3 py-1 rounded text-sm ${panel === 'editor' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setPanel('editor')}
          >
            ✍️ Editor
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${panel === 'characters' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setPanel('characters')}
          >
            🧑 Personagens
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${panel === 'locations' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setPanel('locations')}
          >
            📍 Locais
          </button>
          <button
            className={`px-3 py-1 rounded text-sm ${panel === 'plot' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setPanel('plot')}
          >
            📚 Enredo
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 mb-6">
        {panel === 'editor' && (
          <>
            <WritingToolbar editorRef={contentRef} />
            <EditorCanvas content={content} setContent={setContent} ref={contentRef} />
            <TemplatePanel editorRef={contentRef} />
          </>
        )}
        {panel === 'characters' && <CharacterPanel />}
        {panel === 'locations' && <LocationPanel />}
        {panel === 'plot' && <PlotPanel />}
      </div>
    </div>
  );
};

export default FictionEditor;
