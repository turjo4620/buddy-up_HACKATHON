const express = require('express');
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectMembers,
  updateProjectStatus,
  getProjectsByOwner
} = require('../controllers/projectController');

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(createProject);

// Specific routes must come BEFORE parameterized routes
router.get('/owner/:ownerId', getProjectsByOwner);

router.route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

// Additional project management routes
router.get('/:id/members', getProjectMembers);
router.put('/:id/status', updateProjectStatus);

module.exports = router;