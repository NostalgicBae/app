const express = require('express');
const Datastore = require('nedb');
const projectRouter = require('./routes/projects.js');
const { authUser, authRole } = require('./basicAuth');
const { user } = require('./routes/projects.js');

// Load Database

const usersDb = new Datastore({filename: './src/database/users.db', autoload: true});

const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
};

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
async function setUser(req, res, next) {
    const userId = req.body.userId;
    if (userId) {
        req.user = await usersDb.findOne({ id: userId }, (err, user) => {
            if (err) {
                return res.send(`User not in database`)
            }
            return user
        })
        console.log(req.user)
    }
    next()
};