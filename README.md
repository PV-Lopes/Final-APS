Estoque Backend

Este é o backend de um sistema de gerenciamento de estoque, desenvolvido em Node.js com integração ao Supabase para armazenamento de dados e imagens. O sistema permite criar, listar, atualizar e deletar produtos com imagens, além de oferecer suporte para upload(ainda em desenvolvimento) de arquivos ou apenas URLs de imagens.

Funcionalidades

-Criar Produto: Possibilidade de adicionar produtos com upload de imagem ou URL.
-Listar Produtos: Recupera todos os produtos cadastrados.
-Buscar Produto: Permite buscar um produto pelo seu ID.
-Atualizar Produto: Atualiza os detalhes de um produto, incluindo sua imagem.
-Deletar Produto: Remove um produto do sistema.

Tecnologias Utilizadas

-Node.js: Plataforma de desenvolvimento backend.
-Express: Framework para criação de APIs REST.
-Multer: Middleware para upload de arquivos.
-Supabase: Utilizado para armazenamento de dados e imagens.
-dotenv: Gerenciamento de variáveis de ambiente.
-fs e path: Manipulação de arquivos e diretórios locais.

Instalação

Clone este repositório:

git clone <URL_DO_REPOSITORIO>

Acesse o diretório do projeto:

cd estoque-backend

Instale as dependências:

npm install

Configure as variáveis de ambiente no arquivo .env:

PORT=3000
SUPABASE_URL=<URL_DO_SUPABASE>
SUPABASE_KEY=<CHAVE_DO_SUPABASE>

Inicie o servidor:

npm start

Endpoints da API

1. Criar Produto

POST /produtos

Parâmetros:

nome (string): Nome do produto.
descricao (string): Descrição do produto.
quantidade (number): Quantidade em estoque.
foto (file ou string): Upload da imagem ou URL da imagem.

Resposta:

{
  "message": "Produto enviado com sucesso!",
  "produto": {
    "id": 1,
    "nome": "Hamburguer",
    "descricao": "Bom de mais",
    "quantidade": 13,
    "foto": "https://linkdaimagem.com"
  }
}

2. Listar Produtos

GET /produtos

Resposta:

[
  {
    "id": 1,
    "nome": "Hamburguer",
    "descricao": "Bom de mais",
    "quantidade": 13,
    "foto": "https://linkdaimagem.com"
  }
]

3. Buscar Produto por ID

GET /produtos/:id (Alerta: o ":id" é o id do produto, exemplo produto com id:1 vai ficar "/produtos/1")

Resposta:

{
  "id": 1,
  "nome": "Hamburguer",
  "descricao": "Bom de mais",
  "quantidade": 13,
  "foto": "https://linkdaimagem.com"
}

4. Atualizar Produto

PUT /produtos/:id (Alerta: o ":id" é o id do produto, exemplo produto com id:1 vai ficar "/produtos/1")

Parâmetros:

Os mesmos campos de criação de produto são opcionais para atualizar.

Resposta:

{
  "message": "Produto atualizado com sucesso!",
  "produto": {
    "id": 1,
    "nome": "Hamburguer Atualizado",
    "descricao": "Ainda mais gostoso",
    "quantidade": 20,
    "foto": "https://novolinkdaimagem.com"
  }
}

5. Deletar Produto

DELETE /produtos/:id (Alerta: o ":id" é o id do produto, exemplo produto com id:1 vai ficar "/produtos/1")

Resposta:

{
  "message": "Produto deletado com sucesso!"
}

Estrutura de Diretórios

estoque-backend/
├── controllers/
│   └── produtos.controller.js
├── routes/
│   └── produtos.routes.js
├── config/
│   └── supabase.js
├── uploads/ (Pasta para upload local de imagens)
├── .env (Variáveis de ambiente)
├── index.js (Arquivo principal do servidor)
└── package.json