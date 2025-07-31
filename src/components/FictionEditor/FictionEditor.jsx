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
  const [writingMode, setWritingMode] = useState('normal');

  const editorRef = useRef(null);

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

  const resetProject = () => {
    if (window.confirm("Deseja realmente apagar o conteúdo atual?")) {
      setContent('');
      setTitle('Nova História');
    }
  };
const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

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

  const removeItem = (id, type) => {
    if (type === 'character') {
      setCharacters(characters.filter((char) => char.id !== id));
    } else if (type === 'location') {
      setLocations(locations.filter((loc) => loc.id !== id));
    } else if (type === 'plot') {
      setPlotPoints(plotPoints.filter((plot) => plot.id !== id));
    }
  };

  const insertTemplate = (template) => {
    const templates = {
      dialogue: '\n\n— Texto do diálogo — disse o personagem, com uma expressão pensativa.\n\n',
      scene: '\n\n[NOVA CENA]\n\nDescrição do ambiente e atmosfera...\n\n',
      chapter: '\n\n═══ CAPÍTULO [NÚMERO] ═══\n[TÍTULO DO CAPÍTULO]\n\n',
      action: '\n\n[Descrição da ação intensa e movimento dos personagens]\n\n'
    };

    const currentContent = editorRef.current?.value || '';
    const updated = currentContent + templates[template];
    if (editorRef.current) {
      editorRef.current.value = updated;
    }
    setContent(updated);
  };

  const getThemeClasses = () => {
    switch (writingMode) {
      case 'dark':
        return 'bg-gray-900 text-gray-100';
      case 'focus':
        return 'bg-amber-50 text-gray-800';
      default:
        return 'bg-white text-gray-900';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      <EditorHeader
        title={title}
        setTitle={setTitle}
        wordCount={wordCount}
        showWordCount={showWordCount}
        setShowWordCount={setShowWordCount}
        writingMode={writingMode}
      />

      <div className="flex h-screen">
        <div className="flex flex-col">
          <Sidebar
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            writingMode={writingMode}
            setWritingMode={setWritingMode}
          />

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
              <div className="flex-1 flex flex-col">
          <WritingToolbar formatText={formatText} writingMode={writingMode} />
          <EditorCanvas content={content} setContent={setContent} ref={editorRef} />
          <div className="p-4 flex items-center gap-2">
            <button
              onClick={resetProject}
              className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded text-sm"
            >
              Resetar Projeto
            </button>
            <ExportMenu
              content={content}
              title={title}
              editorRef={editorRef}
              characters={characters}
              locations={locations}
              plotPoints={plotPoints}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FictionEditor;
