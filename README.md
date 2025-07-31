# Fiction Editor

Este projeto é um editor de histórias escrito em React. Agora inclui uma API Node.js simples usando Express com persistência em SQLite e arquivo JSON.

## Scripts

- `npm start` inicia a aplicação React em modo de desenvolvimento.
- `npm run build` gera os arquivos de produção.
- `npm run server` inicia o servidor Express na porta 3001.

## Endpoints da API

- `GET /data` retorna o último estado salvo do editor.
- `POST /data` salva o estado do editor. Envie `content`, `title`, `characters`, `locations` e `plotPoints` no corpo da requisição.

Os dados são armazenados tanto em `database.sqlite` quanto em `data.json` na raiz do projeto.

##
Esta aplicação utiliza Tailwind CSS integrado ao PostCSS.
Para compilar os estilos corretamente com o Tailwind 4+ é
necessário instalar também o plugin `@tailwindcss/postcss` e
garantir que o `postcss.config.js` faça referência a ele.

```bash
npm install --save-dev @tailwindcss/postcss
```

O arquivo `postcss.config.js` já está configurado conforme
abaixo:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {}
  }
};
```

Após clonar o repositório lembre-se de executar `npm install`
para garantir que todas as dependências estejam presentes.