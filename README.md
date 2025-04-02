# 📌 Task Manager API

Este é um backend simples para gerenciamento de tarefas, desenvolvido em **Node.js** com **Express** e **SQLite**. Ele implementa um CRUD básico para tarefas.

---

## 🚀 Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **SQLite3**

---

## 📦 Instalação e Configuração

### 🔹 1. Clone o repositório:
```sh
git clone https://github.com/luizgmelo/todolist-backend.git
cd todolist-backend
```

### 🔹 2. Instale as dependências:
```sh
npm install
```

### 🔹 3. Configure o banco de dados SQLite:
Se ainda não existir, o banco de dados será criado automaticamente ao iniciar o servidor.

### 🔹 4. Inicie o servidor:
```sh
npm start
```
O servidor estará rodando em `http://localhost:3000`

---

## 📌 Endpoints da API

### 🔹 1. Criar uma Tarefa
**POST /api/tasks**
```json
{
  "description": "Estudar Node.js",
}
```
**Resposta:**
```json
{
  "id": 1,
  "description": "Estudar Node.js",
  "status": 0,
}
```

---

### 🔹 2. Listar Todas as Tarefas
**GET /api/tasks**
**Resposta:**
```json
[
  {
    "id": 1,
    "description": "Estudar Node.js",
    "status": 0,
  }
]
```

---

### 🔹 3. Atualizar uma Tarefa
**PUT /api/tasks/:id**
```json
{
  "description": "Revisar Express.js",
  "status": 1
}
```
**Resposta:**
```json
{
  "id": 1,
  "description": "Revisar Express.js",
  "status": 1,
}
```

---

### 🔹 4. Excluir uma Tarefa
**DELETE /api/tasks/:id**
**Resposta:**
```json
{
  "message": "Tarefa excluída com sucesso!"
}
```

## 📌 Contato
Se precisar de ajuda ou tiver sugestões, sinta-se à vontade para abrir uma issue ou entrar em contato! 🚀
