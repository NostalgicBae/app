const express = require('express');
const router = express.Router();
const { getProject } = require('../mongodb.js');
const { authUser } = require('../basicAuth.js');
const { getUser } = require('../mongodb.js');
const { canViewProject, scopedProjects } = require('../permissions/project.js');

router.get('/', setUser, (req, res) => {

    console.log(scopedProjects(req.user))

    res.json(scopedProjects(req.user))
});

router.get('/:projectId', setUser,  setProject, authUser, authGetProject, (req, res) => {
    res.json(req.project)
});

async function setProject(req, res, next) {
    const projectId = parseInt(req.params.projectId)
    req.project = await getProject(projectId)

    if (req.project == null) {
        res.status(404);
        return res.send('Project not found')
    }
    next();
};


function authGetProject(req, res, next) {
    if (!canViewProject(req.user, req.project)) {
        res.status(401)
        return res.send('Not allowed')
    }
    next()
}

async function setUser(req, res, next) {
    const userId = req.body.userId;
    if (userId) {
        req.user = await getUser(userId)
    }
    next()
};



module.exports = router;