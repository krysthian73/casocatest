# CasocaTest

## Descrição

CasocaTest é uma aplicação web construída utilizando **Next.js** com **TypeScript**, focada em gerenciar tarefas com funcionalidade de arrastar e soltar (drag and drop). A aplicação utiliza a biblioteca `@dnd-kit` para o gerenciamento das tarefas e `Tailwind CSS` para estilização.

## Estrutura do Projeto

```bash
src/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   ├── contexts/            # Contextos para gerenciamento de estado global
│   ├── fonts/               # Configuração de fontes
│   ├── hooks/               # Hooks personalizados
│   ├── login/               # Páginas e componentes relacionados ao login
│   ├── services/            # Serviços de API e funções utilitárias
│   ├── tasks/               # Páginas e componentes de gerenciamento de tarefas
│   ├── types/               # Definições de tipos TypeScript
│   └── ...
│
├── globals.css              # Estilos globais
├── layout.tsx               # Layout padrão para as páginas
├── page.tsx                 # Página inicial
├── middleware.ts            # Middleware para proteção de rotas
├── .env                     # Variáveis de ambiente
└── ...

## Tecnologias Utilizadas

-   **Next.js** - Framework React para aplicações server-side e estáticas.
-   **TypeScript** - Superconjunto de JavaScript que adiciona tipagem estática.
-   **@dnd-kit** - Biblioteca para funcionalidades de drag and drop.
-   **Tailwind CSS** - Framework de CSS utilitário para estilização rápida.
-   **Axios** - Cliente HTTP para fazer requisições à API.
-   **NestJS** - Framework para desenvolvimento de API RESTful.
-   **Cookies-next** - Manipulação de cookies para autenticação e persistência de usuário.

## Instalação

1.  Clone o repositório:

    bash

    Copiar código

    `git clone https://github.com/usuario/CasocaTest.git`

2.  Navegue até o diretório do projeto:

    bash

    Copiar código

    `cd CasocaTest`

3.  Instale as dependências:

    bash

    Copiar código

    `npm install`

    ou, se você estiver usando `pnpm`:

    bash

    Copiar código

    `pnpm install`

4.  Configure as variáveis de ambiente no arquivo `.env` com base no `.env.example` fornecido.


## Scripts Disponíveis

No diretório do projeto, você pode executar:

-   `npm run dev`: Roda a aplicação em modo de desenvolvimento. Aberta em http://localhost:3000.
-   `npm run build`: Cria a aplicação para produção na pasta `out`.
-   `npm run start`: Inicia o servidor de produção.
-   `npm run lint`: Executa o linter nos arquivos do projeto.

## Estrutura de Diretórios

-   `app/components`: Componentes genéricos e reutilizáveis, como botões, modais, etc.
-   `app/contexts`: Contextos para gerenciamento global de estados.
-   `app/hooks`: Hooks personalizados para lógica reutilizável.
-   `app/login`: Componentes e páginas relacionadas à autenticação.
-   `app/services`: Funções para comunicação com APIs.
-   `app/tasks`: Componentes e páginas relacionadas ao gerenciamento de tarefas.
-   `app/types`: Definições de tipos TypeScript para o projeto.

## Funcionalidades`

-   **Autenticação**: Login de usuário com persistência de sessão usando cookies.
-   **Gerenciamento de Tarefas**: Adição, edição e remoção de tarefas.
-   **Drag and Drop**: Arrastar e soltar para organizar tarefas entre colunas.
-   **Dark Mode**: Tema claro e escuro com persistência usando Context API.

## API

### Endpoints

#### `POST /auth/signin`

-   Autentica o usuário e retorna um token JWT.
-   **Corpo**:

    json

    Copiar código

    `{
      "email": "usuario@exemplo.com",
      "password": "senha123"
    }`


#### `GET /tasks/user/{userId}`

-   Retorna todas as tarefas de um usuário.
-   **Parâmetros**:
    -   `userId`: ID do usuário autenticado.

#### `POST /tasks`

-   Cria uma nova tarefa.
-   **Corpo**:

    json

    Copiar código

    `{
      "title": "Título da Tarefa",
      "description": "Descrição da tarefa"
    }`
```
