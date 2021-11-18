const { ROLE } = require('../roles.js');
const { filterProjects, getAllProjects } = require('../mongodb.js');

function canViewProject(user, project) {
    return (
        user.role === ROLE.ADMIN || 
        project.userId === user.id
    )
};

async function scopedProjects(user) {
    if (user.role === ROLE.ADMIN) {
        let project = await getAllProjects()
        
        let result = project[0]
        console.log(`This is the` + result)
        return result

    } else {
        filterProjects(user).then(console.log)
  
    }

};

module.exports = {
    canViewProject,
    scopedProjects
}