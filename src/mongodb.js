const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD

const uri = `mongodb+srv://${username}:${password}@database-test.ahznk.mongodb.net/Database-Test?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function getUser(userId) {
    try {
      await client.connect();
      const database = client.db('users-test');
      const users = database.collection('users');
      // Query for a movie that has the title 'Back to the Future'
      const query = { id: userId };
      const user = await users.findOne(query);
      console.log(`${user.name} is logged in!`);
      client.close();
      return user
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    };
};

async function getProject(projectId) {
  try {
    await client.connect();
    const database = client.db('users-test');
    const projects = database.collection('projects');
    // Query for a movie that has the title 'Back to the Future'
    const query = { id: projectId };
    const project = await projects.findOne(query);
    console.log(`${project.name} found!`);
    client.close();
    return project
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  };
};

async function filterProjects(user) {
  try {
    await client.connect();
    const database = client.db('users-test');
    const projects = database.collection('projects');
    // Query for a movie that has the title 'Back to the Future'
    const query = { id: user.id };
    const project = await projects.find(query).toArray()
    console.log(project);
    client.close();
    return project
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  };
};

async function getAllProjects() {
  try {
    await client.connect();
    const database = client.db('users-test');
    const projects = database.collection('projects');
    // Query for a movie that has the title 'Back to the Future'
    const project = await projects.find({})
    console.log(project);
    client.close();
    return project
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  };
};


module.exports = {
    getUser,
    getProject,
    filterProjects,
    getAllProjects
};