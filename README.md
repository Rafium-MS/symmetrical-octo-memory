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
Os estilos agora são escritos manualmente em CSS, sem depender do Tailwind. A
folha `src/styles/main.css` contém todas as classes utilizadas pela aplicação.
Após clonar o repositório lembre-se de executar `npm install` para instalar as
dependências necessárias.