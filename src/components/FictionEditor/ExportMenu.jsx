import React from 'react';
import htmlDocx from 'html-docx-js/dist/html-docx';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ExportMenu = ({ title, content, editorRef, characters, locations, plotPoints }) => {
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

    const historia = editorRef.current.innerText || content;
    zip.file('historia.txt', historia);
    zip.file('personagens.json', JSON.stringify(characters, null, 2));
    zip.file('locais.json', JSON.stringify(locations, null, 2));
    zip.file('enredo.json', JSON.stringify(plotPoints, null, 2));

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `${title || 'projeto-literario'}.zip`);
  };

  return (
    <div className="flex gap-2 px-6 py-2 bg-transparent">
      <button
        onClick={exportAsTxt}
        className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition"
      >
        Exportar .TXT
      </button>
      <button
        onClick={exportAsDocx}
        className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition"
      >
        Exportar .DOCX
      </button>
      <button
        onClick={exportProjectAsZip}
        className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700 transition"
      >
        Exportar Projeto .ZIP
      </button>
    </div>
  );
};

export default ExportMenu;
