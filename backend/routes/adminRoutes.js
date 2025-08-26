import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addComment,
  addMembers,
  addTask,
  createProject,
  deleteMember,
  editTask,
  getProjectById,
  getProjects,
  listMembers,
  roleToggle,
  updateTaskStatus,
} from "../controllers/adminControllers.js";

const router = express.Router();

//admin only and anyone can be admin.
router.post("/create", authMiddleware, createProject);

//fetch all the projects
router.get("/allProjects", authMiddleware, getProjects);

//adding members to project
router.post("/addMember/:id", authMiddleware, addMembers);

//member role toggler
router.patch("/roleToggle/:id", authMiddleware, roleToggle);

//delete member
router.delete("/deleteMember/:id", authMiddleware, deleteMember);

//add task
router.post("/addtask", authMiddleware, addTask);

//edit tasks
router.patch("/edittask/:id", authMiddleware, editTask);

//list members
router.get("/listmembers/:id", authMiddleware, listMembers);

//add comments
router.post("/addcomment/:id", authMiddleware, addComment);

//update status
router.patch("/updatestatus/:taskId", authMiddleware, updateTaskStatus);

//get project by id
router.get("/getproject/:id", authMiddleware, getProjectById);

export default router;
