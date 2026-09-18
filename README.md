# Sistema de Cadastros em React

Trabalho desenvolvido com React e Vite para consumir a API REST fornecida pelo professor. O sistema possui CRUD completo de produtos, clientes e tarefas.

## Funcionalidades

- Listagem e consulta de registros
- Cadastro de novos registros
- Edicao de registros existentes
- Exclusao com confirmacao
- Navegacao entre telas com `react-router-dom`
- Tratamento de carregamento e erros da API

## Tecnologias

- React
- React Router DOM
- Vite
- JavaScript
- Fetch API
- ESLint

## Como executar

1. Instale as dependencias:

   ```bash
   npm install
   ```

2. Inicie o projeto:

   ```bash
   npm run dev
   ```

3. Abra o endereco mostrado no terminal.

Por padrao, o Vite encaminha as requisicoes de `/api` para `http://177.190.80.28:3005`. Esse encaminhamento evita o bloqueio de CORS durante o desenvolvimento. Para utilizar outro servidor que aceite CORS, copie `.env.example` para `.env.local` e altere `VITE_API_URL`.

## Rotas da aplicacao

- `/` - pagina inicial
- `/produtos` - cadastro, listagem, edicao e exclusao de produtos
- `/clientes` - cadastro, listagem, edicao e exclusao de clientes
- `/tarefas` - cadastro, listagem, edicao e exclusao de tarefas

## API

Documentacao Swagger: <http://177.190.80.28:3005/docs/>

## GitHub

A pasta `node_modules` e os arquivos gerados pelo build estao configurados no `.gitignore` e nao devem ser enviados ao repositorio.
