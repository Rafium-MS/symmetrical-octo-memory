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
import ExportMenu from './ExportMenu';

const FictionEditor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Nova História');
  const [wordCount, setWordCount] = useState(0);

  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [plotPoints, setPlotPoints] = useState([]);

  const [newCharacter, setNewCharacter] = useState({ name: '', description: '', role: '' });
  const [newLocation, setNewLocation] = useState({ name: '', description: '', type: '' });
  const [newPlotPoint, setNewPlotPoint] = useState({ title: '', description: '', chapter: '' });

  const [showCharacterForm, setShowCharacterForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showPlotForm, setShowPlotForm] = useState(false);

  const [activePanel, setActivePanel] = useState('editor');
  const [showWordCount, setShowWordCount] = useState(true);
  const [writingMode, setWritingMode] = useState('normal');

  const editorRef = useRef(null);

  // Palavra
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  // Carregamento inicial do localStorage
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

  // Salvamentos automáticos
  useEffect(() => localStorage.setItem('fictionEditor_content', content), [content]);
  useEffect(() => localStorage.setItem('fictionEditor_title', title), [title]);
  useEffect(() => localStorage.setItem('fictionEditor_characters', JSON.stringify(characters)), [characters]);
  useEffect(() => localStorage.setItem('fictionEditor_locations', JSON.stringify(locations)), [locations]);
  useEffect(() => localStorage.setItem('fictionEditor_plot', JSON.stringify(plotPoints)), [plotPoints]);

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
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
    if (type === 'character') setCharacters(characters.filter(c => c.id !== id));
    if (type === 'location') setLocations(locations.filter(l => l.id !== id));
    if (type === 'plot') setPlotPoints(plotPoints.filter(p => p.id !== id));
  };

  const insertTemplate = (template) => {
    const templates = {
      dialogue: '\n\n— Texto do diálogo — disse o personagem, com uma expressão pensativa.\n\n',
      scene: '\n\n[NOVA CENA]\n\nDescrição do ambiente e atmosfera...\n\n',
      chapter: '\n\n═══ CAPÍTULO [NÚMERO] ═══\n[TÍTULO DO CAPÍTULO]\n\n',
      action: '\n\n[Descrição da ação intensa e movimento dos personagens]\n\n'
    };
    editorRef.current.innerHTML += templates[template];
    setContent(editorRef.current.innerHTML);
  };

  const resetProject = () => {
    if (window.confirm('Tem certeza que deseja apagar todo o conteúdo do projeto? Isso não pode ser desfeito.')) {
      ['fictionEditor_content', 'fictionEditor_title', 'fictionEditor_characters', 'fictionEditor_locations', 'fictionEditor_plot'].forEach(key =>
        localStorage.removeItem(key)
      );
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

  const getThemeClasses = () => {
    switch (writingMode) {
      case 'dark': return 'bg-gray-900 text-gray-100';
      case 'focus': return 'bg-amber-50 text-gray-800';
      default: return 'bg-white text-gray-900';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${getThemeClasses()}`}>
      {/* Header + Reset */}
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

      {/* Menu de Exportação */}
      <ExportMenu
        title={title}
        content={content}
        editorRef={editorRef}
        characters={characters}
        locations={locations}
        plotPoints={plotPoints}
      />

      <div className="flex h-screen">
        {/* Sidebar + Painel */}
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
              <CharacterPanel {...{ characters, newCharacter, setNewCharacter, addCharacter, removeItem, showCharacterForm, setShowCharacterForm, writingMode }} />
            )}
            {activePanel === 'locations' && (
              <LocationPanel {...{ locations, newLocation, setNewLocation, addLocation, removeItem, showLocationForm, setShowLocationForm, writingMode }} />
            )}
            {activePanel === 'plot' && (
              <PlotPanel {...{ plotPoints, newPlotPoint, setNewPlotPoint, addPlotPoint, removeItem, showPlotForm, setShowPlotForm, writingMode }} />
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <WritingToolbar formatText={formatText} writingMode={writingMode} />
          <EditorCanvas {...{ content, setContent, writingMode, editorRef }} />
        </div>
      </div>
    </div>
  );
};

export default FictionEditor;
