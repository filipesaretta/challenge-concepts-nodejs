const express = require("express");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => response.json(repositories));

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    techs,
    url,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex((repos) => repos.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ Error: 'Something could not be found' });
  }

  const repository = {
    id,
    title,
    techs,
    url,
    likes: 0,
  };

  repositories[repoIndex] = repository;

  return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex((repos) => repos.id === id);

  if (repoIndex < 0) {
    return response.status(400).json({ Error: 'Something could not be found' });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
