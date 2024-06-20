# Simple TODO CRUD with GraphQL and Express

This project demonstrates how to build a simple TODO application with full CRUD (Create, Read, Update, Delete) functionality using GraphQL and Express.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [GraphQL Queries and Mutations](#graphql-queries-and-mutations)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v12.x or later)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)
- [asdf](https://asdf-vm.com/guide/getting-started.html) (Optional)

## Installation

1. Clone the repository:

```sh
    git clone https://github.com/Alchemistst/todo-list-graphQL.git
    cd todo-list-graphQL
```

2. (Optional, only if using asdf):
```sh
    asdf install
```

3. Install dependencies:

```sh
    npm install
    # or
    yarn install
```

## Run the application

To start the server run:

```sh
    npm start
    # or
    yarn start
```

## GraphQL queries and mutations

Navigate to ```localhost:4000/``` to open GraphiQL IDE. You can test it running the following queries and mutations:

## GraphQL Queries and Mutations

Here are some example queries and mutations you can use to interact with the TODO application.

### Queries

#### Get all TODOs

```graphql
query {
  getAll {
    id,
    content,
    isDone
  }
}
```

#### Get TODO by Id

```graphql
query {
  getTodo(id: "UUID") {
    id,
    content,
    isDone
  }
}
```

### Mutations

#### Create TODO

```graphql
mutation {
  createTodo(content: "Feed Mr Mittens") {
    id,
    content,
    isDone
  }
}
```

#### Update TODO

```graphql
mutation {
  updateTodo(id:"UUID", isDone: true) {
    id,
    content,
    isDone
  }
}
```

#### Delete TODO

```graphql
mutation {
  deleteTodo(id: "UUID")
}
```