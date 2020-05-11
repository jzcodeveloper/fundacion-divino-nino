const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  disableTask
} = require("../controllers/tasks");

// @methods   GET / POST
// @route     /api/tasks/
// @access    Admin
router
  .route("/")
  .get(protect, getTasks)
  .post(protect, authorize("admin"), createTask);

// @methods   GET / PUT / DELETE
// @route     /api/tasks/:id
// @access    Admin
router
  .route("/:id")
  .get(protect, getTask)
  .put(protect, authorize("admin"), updateTask)
  .delete(protect, authorize("admin"), deleteTask);

// @methods   PUT
// @route     /api/tasks/:id/available
// @access    Admin
router.route("/:id/available").put(protect, authorize("admin"), disableTask);

module.exports = router;
