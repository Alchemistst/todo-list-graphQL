var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");

const PORT = 4000;

// Our GraphQL Schema
var schema = buildSchema(`
  type Todo {
    id: ID!
    content: String!
    isDone: Boolean
    }
    
    type Query {
      getTodo(id: ID!): Todo
      getAll: [Todo]
      }
      
      type Mutation {
        createTodo(content: String): Todo
        updateTodo(id: ID!, content: String, isDone: Boolean): Todo
        deleteTodo(id: ID!): String
        }
        `);

// Implementation as a class of the TODO type
class Todo {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    this.isDone = false;
  }
}

// Fastest DB on earth ;)
const fakeDB = {};

// Resolvers for each API endpoint
var root = {
  getTodo({ id }) {
    if (!fakeDB[id]) {
      throw new Error(`ID ${id} does not belong to any TODO kiddo!`);
    }
    return fakeDB[id];
  },
  getAll() {
    return Object.values(fakeDB);
  },
  createTodo({ content }) {
    const { v4: uuidv4 } = require("uuid");

    const id = uuidv4();
    const todo = new Todo(id, content);
    fakeDB[id] = todo;

    return todo;
  },
  updateTodo({ id, content, isDone }) {
    if (!fakeDB[id]) {
      throw new Error(`ID ${id} does not belong to any TODO kiddo!`);
    }
    if (content) {
      fakeDB[id].content = content;
    }
    if (isDone) {
      fakeDB[id].isDone = isDone;
    }
    return fakeDB[id];
  },
  deleteTodo({ id }) {
    if (!fakeDB[id]) {
      throw new Error(`ID ${id} does not belong to any TODO kiddo!`);
    }
    delete fakeDB[id];
    return id;
  },
};

var app = express();

// GraphQL handler
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

// Expose GraphiQL at /
var { ruruHTML } = require("ruru/server");
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Start the server at port
app.listen(PORT);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
