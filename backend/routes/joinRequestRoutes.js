const express = require('express');
const {
  sendJoinRequest,
  getJoinRequestsForProject,
  getJoinRequestsByStudent,
  updateJoinRequestStatus,
  getMyJoinRequests
} = require('../controllers/joinRequestController');

const router = express.Router();

// Send join request
router.post('/', sendJoinRequest);

// Get join requests for current user (as a student) - specific route first
router.get('/my-requests', getMyJoinRequests);

// Get join requests for a project (for project owner)
router.get('/:projectId', getJoinRequestsForProject);

// Get join requests by student
router.get('/student/:studentId', getJoinRequestsByStudent);

// Update join request status (accept/reject)
router.put('/:requestId/status', updateJoinRequestStatus);

module.exports = router;