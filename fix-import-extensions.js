import fs from 'fs';
import path from 'path';

const validExtensions = ['.js', '.jsx'];
const rootDir = './src';

function processFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');

  const updated = code.replace(
    /import\s+(.*?from\s+['"])(\.{1,2}\/[^'"]+)(['"])/g,
    (match, prefix, importPath, suffix) => {
      const fullPath = path.resolve(path.dirname(filePath), importPath);
      for (const ext of validExtensions) {
        if (fs.existsSync(fullPath + ext)) {
          return `${prefix}${importPath + ext}${suffix}`;
        }
      }
      return match; // não altera se não encontrar arquivo válido
    }
  );

  if (updated !== code) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`✔ Atualizado: ${filePath}`);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (validExtensions.includes(path.extname(file))) {
      processFile(fullPath);
    }
  });
}

walk(rootDir);
