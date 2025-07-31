import React, { useState, useRef, useEffect } from 'react';

// Componentes principais
import Sidebar from './Sidebar';
import EditorHeader from './EditorHeader';
import WritingToolbar from './WritingToolbar';
import EditorCanvas from './EditorCanvas';

// Painéis
import TemplatePanel from './panels/TemplatePanel';
import CharacterPanel from './panels/CharacterPanel';
import LocationPanel from './panels/LocationPanel';
import PlotPanel from './panels/PlotPanel';

// Utilitários
import htmlDocx from 'html-docx-js/dist/html-docx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver'; // também precisaremos dela

const FictionEditor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Nova História');
  const [wordCount, setWordCount] = useState(0);

  // Dados e formulários
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [plotPoints, setPlotPoints] = useState([]);

  const [newCharacter, setNewCharacter] = useState({ name: '', description: '', role: '' });
  const [newLocation, setNewLocation] = useState({ name: '', description: '', type: '' });
  const [newPlotPoint, setNewPlotPoint] = useState({ title: '', description: '', chapter: '' });

  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showPlotForm, setShowPlotForm] = useState(false);

  // Estado da interface
  const [activePanel, setActivePanel] = useState('editor');
  const [showWordCount, setShowWordCount] = useState(true);
  const [writingMode, setWritingMode] = useState('normal'); // normal, focus, dark

  const editorRef = useRef(null);

  // Contador de palavras
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);
  
  useEffect(() => {
  const savedContent = localStorage.getItem('fictionEditor_content');
  const savedTitle = localStorage.getItem('fictionEditor_title');
  const savedCharacters = localStorage.getItem('fictionEditor_characters');
  const savedLocations = localStorage.getItem('fictionEditor_locations');
  const savedPlot = localStorage.getItem('fictionEditor_plot');

  if (savedContent) setContent(savedContent);
  if (savedTitle) setTitle(savedTitle);
  if (savedCharacters) setCharacters(JSON.parse(savedCharacters));
  if (savedLocations) setLocations(JSON.parse(savedLocations));
  if (savedPlot) setPlotPoints(JSON.parse(savedPlot));
}, []);
  useEffect(() => {
    localStorage.setItem('fictionEditor_content', content);
  }, [content]);

  useEffect(() => {
    localStorage.setItem('fictionEditor_title', title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem('fictionEditor_characters', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    localStorage.setItem('fictionEditor_locations', JSON.stringify(locations));
  }, [locations]);

  useEffect(() => {
    localStorage.setItem('fictionEditor_plot', JSON.stringify(plotPoints));
  }, [plotPoints]);

  // Formatação de texto
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  // Funções de adicionar itens
  const addCharacter = () => {
    if (newCharacter.name.trim()) {
      setCharacters([...characters, { ...newCharacter, id: Date.now() }]);
      setNewCharacter({ name: '', description: '', role: '' });
      setShowCharacterForm(false);
    }
  };

  const addLocation = () => {
    if (newLocation.name.trim()) {
      setLocations([...locations, { ...newLocation, id: Date.now() }]);
      setNewLocation({ name: '', description: '', type: '' });
      setShowLocationForm(false);
    }
  };

  const addPlotPoint = () => {
    if (newPlotPoint.title.trim()) {
      setPlotPoints([...plotPoints, { ...newPlotPoint, id: Date.now() }]);
      setNewPlotPoint({ title: '', description: '', chapter: '' });
      setShowPlotForm(false); 
    }
  };
  const resetProject = () => {
    if (window.confirm('Tem certeza que deseja apagar todo o conteúdo do projeto? Isso não pode ser desfeito.')) {
      localStorage.removeItem('fictionEditor_content');
      localStorage.removeItem('fictionEditor_title');
      localStorage.removeItem('fictionEditor_characters');
      localStorage.removeItem('fictionEditor_locations');
      localStorage.removeItem('fictionEditor_plot');

      setContent('');
      setTitle('Nova História');
      setCharacters([]);
      setLocations([]);
      setPlotPoints([]);
      setNewCharacter({ name: '', description: '', role: '' });
      setNewLocation({ name: '', description: '', type: '' });
      setNewPlotPoint({ title: '', description: '', chapter: '' });
      setShowCharacterForm(false);
      setShowLocationForm(false);
      setShowPlotForm(false);
      setActivePanel('editor');
    }
  };

const exportAsTxt = () => {
  const element = document.createElement('a');
  const file = new Blob([editorRef.current.innerText], { type: 'text/plain' });
  element.href = URL.createObjectURL(file);
  element.download = `${title || 'historia'}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const exportAsDocx = () => {
  const html = `
    <html>
      <head><meta charset="utf-8"></head>
      <body>
        <h1>${title}</h1>
        ${editorRef.current.innerHTML}
      </body>
    </html>
  `;
  const converted = htmlDocx.asBlob(html);
  const element = document.createElement('a');
  element.href = URL.createObjectURL(converted);
  element.download = `${title || 'historia'}.docx`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const exportProjectAsZip = async () => {
  const zip = new JSZip();

  // Adiciona texto da história
  const historia = editorRef.current.innerText || content;
  zip.file('historia.txt', historia);

  // Adiciona metadados como JSON
  zip.file('personagens.json', JSON.stringify(characters, null, 2));
  zip.file('locais.json', JSON.stringify(locations, null, 2));
  zip.file('enredo.json', JSON.stringify(plotPoints, null, 2));

  // Gera e baixa
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${title || 'projeto-literario'}.zip`);
};
  // Remover itens
  const removeItem = (id, type) => {
    if (type === 'character') {
      setCharacters(characters.filter(char => char.id !== id));
    } else if (type === 'location') {
      setLocations(locations.filter(loc => loc.id !== id));
    } else if (type === 'plot') {
      setPlotPoints(plotPoints.filter(plot => plot.id !== id));
    }
  };

  // Templates de texto
  const insertTemplate = (template) => {
    const templates = {
      dialogue: '\n\n— Texto do diálogo — disse o personagem, com uma expressão pensativa.\n\n',
      scene: '\n\n[NOVA CENA]\n\nDescrição do ambiente e atmosfera...\n\n',
      chapter: '\n\n═══ CAPÍTULO [NÚMERO] ═══\n[TÍTULO DO CAPÍTULO]\n\n',
      action: '\n\n[Descrição da ação intensa e movimento dos personagens]\n\n'
    };

    const currentContent = editorRef.current.innerHTML;
    editorRef.current.innerHTML = currentContent + templates[template];
    setContent(content + templates[template]);
  };

  // Classes de tema
  const getThemeClasses = () => {
    switch (writingMode) {
      case 'dark': return 'bg-gray-900 text-gray-100';
      case 'focus': return 'bg-amber-50 text-gray-800';
      default: return 'bg-white text-gray-900';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      {/* Header */}
    <div className="relative">
      <EditorHeader
        title={title}
        setTitle={setTitle}
        wordCount={wordCount}
        showWordCount={showWordCount}
        setShowWordCount={setShowWordCount}
        writingMode={writingMode}
      />
      <div className="absolute top-4 right-6">
        <button
          onClick={resetProject}
          className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Resetar Projeto
        </button>
      </div>
    </div>
<div className="flex justify-end gap-2 px-6 py-2 bg-transparent">
  <button onClick={exportAsTxt} className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition">
    Exportar .TXT
  </button>

  <button onClick={exportAsDocx} className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition">
    Exportar .DOCX
  </button>
</div>
<button
  onClick={exportProjectAsZip}
  className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700 transition"
>
  Exportar Projeto .ZIP
</button>


      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="flex flex-col">
          <Sidebar
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            writingMode={writingMode}
            setWritingMode={setWritingMode}
          />

          {/* Conteúdo do painel lateral */}
          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === 'editor' && (
              <TemplatePanel insertTemplate={insertTemplate} writingMode={writingMode} />
            )}
            {activePanel === 'characters' && (
              <CharacterPanel
                characters={characters}
                newCharacter={newCharacter}
                setNewCharacter={setNewCharacter}
                addCharacter={addCharacter}
                removeItem={removeItem}
                showCharacterForm={showCharacterForm}
                setShowCharacterForm={setShowCharacterForm}
                writingMode={writingMode}
              />
            )}
            {activePanel === 'locations' && (
              <LocationPanel
                locations={locations}
                newLocation={newLocation}
                setNewLocation={setNewLocation}
                addLocation={addLocation}
                removeItem={removeItem}
                showLocationForm={showLocationForm}
                setShowLocationForm={setShowLocationForm}
                writingMode={writingMode}
              />
            )}
            {activePanel === 'plot' && (
              <PlotPanel
                plotPoints={plotPoints}
                newPlotPoint={newPlotPoint}
                setNewPlotPoint={setNewPlotPoint}
                addPlotPoint={addPlotPoint}
                removeItem={removeItem}
                showPlotForm={showPlotForm}
                setShowPlotForm={setShowPlotForm}
                writingMode={writingMode}
              />
            )}
          </div>
        </div>

        {/* Área Principal */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <WritingToolbar formatText={formatText} writingMode={writingMode} />

          {/* Editor de Texto */}
          <EditorCanvas
            content={content}
            setContent={setContent}
            writingMode={writingMode}
            editorRef={editorRef}
          />
        </div>
      </div>
    </div>
  );
};

export default FictionEditor;
