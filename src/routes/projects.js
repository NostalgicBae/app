const express = require('express');
const router = express.Router();
const Datastore = require('nedb');

const projectsDb = new Datastore({filename: './src/database/projects.db', autoload: true});

router.get('/', (req, res) => {
    res.json(projectsDb)
});

router.get('/:projectId', setProject, (req, res) => {
    res.json(req.project)
});

function setProject(req, res, next) {
    const projectId = parseInt(req.params.projectId)
    req.project = projectsDb.find(project => project.id === projectId)

    if (req.project == null) {
        res.status(404);
        return res.send('Project not found')
    }
    next();
};

module.exports = router;