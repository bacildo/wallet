# Aplicativo de Gerenciamento Financeiro

Este é um aplicativo de gerenciamento financeiro construído com React, TypeScript, Node.js, Express e MongoDB. Ele permite aos usuários gerenciar suas transações, incluindo criação, edição e exclusão de transações. O aplicativo fornece um painel para exibir o histórico de transações e o saldo.

## Funcionalidades

- Autenticação e autorização de usuários
- Operações CRUD para transações
- Exibição do histórico de transações e saldo
- Validação de entrada para dados de transações

## Tecnologias Utilizadas

- Frontend: React, TypeScript, Axios
- Backend: Node.js, Express, TypeScript, MongoDB, TypeORM
- Autenticação: JWT
- Estilização: Tailwind CSS

## Como Começar

Para começar com o projeto, siga estes passos:

1. Clone o repositório: `git clone https://github.com/bacildo/wallet.git`
2. Instale as dependências:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`

3. Configure as variáveis de ambiente:
   - Crie um arquivo `development.ts` no diretório `backend` e preencha as variáveis de acordo com sua base de dados.
    
4. Inicie o servidor de desenvolvimento:
   - Frontend: `cd spa-wallet && npm run start:frontend`
   - Backend: `cd spa-wallet && npm run start:backend`
   - Aplicação Completa: `cd spa-wallet && npm run application`

## Endpoints da API

- No backend, basta verificar os controllers
- No frontend, basta verificar a pasta services

## Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE](/LICENSE) para obter mais detalhes.
