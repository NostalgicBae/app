const express = require('express');
const Datastore = require('nedb');
const projectRouter = require('./routes/projects.js');
const { authUser, authRole } = require('./basicAuth')

// Load Database

const usersDb = new Datastore({filename: './src/database/users.db', autoload: true});

const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}

// Initialize server

const app = express();
const port = 3000;
app.listen(port, () => console.log(`listening at ${port}`));
// app.use(express.static('public'));
app.use(express.json());
app.use('/projects', projectRouter);
app.use(setUser);

// Routes

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page');
});

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin Page');
});

// Middleware

function setUser(req, res, next) {
    const userId = req.body.userId;
    if (userId) {
        usersDb.findOne({ id: userId }, function (err, user) {
            return user
        })
    }
    next()
};


