import mongoose from "mongoose";
import Project from "../models/projectSchema.js";
import User from "../models/userSchema.js";

//status toggling
export const setStatus = async (req, res) => {
  const userId = req.user.id;
  const { id: taskId } = req.params;
  const { projectId, status } = req.body;

  const statusValidation = ["Todo", "In Progress", "Completed"];
  if (!statusValidation.includes(status)) {
    return res.json({
      success: false,
      message: "Invalid status value",
    });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.json({
        success: false,
        message: "failed to fetch the project",
      });
    }
    console.log(project, "<--project fetched");

    const isMember = project.members.some((m) => m.user.toString() === userId);
    if (!isMember) {
      return res.json({
        success: false,
        message: "Not a member of this project..",
      });
    }

    const getTaskToUpdate = project.tasks.id(taskId);
    if (!getTaskToUpdate) {
      return res.json({
        success: false,
        message: "Task not found...",
      });
    }

    getTaskToUpdate.status = status;
    getTaskToUpdate.lastUpdated = Date.now();

    await project.save();

    res.json({
      success: true,
      message: "task status updated successfully",
      data: getTaskToUpdate,
    });
  } catch (error) {
    console.error(error.message, "failed..");
    res.json({
      success: false,
      message: "failed to update task status",
      error: error.message,
    });
  }
};

//add comment
export const addComment = async (req, res) => {
  const { id: taskId } = req.params;
  const { text, projectId } = req.body;
  const userId = req.user.id;
  // console.log(userId, 'userId check it is assigned or not')

  try {
    const project = await Project.findById(projectId);
    // console.log(project, "project fetched..");

    const targetedTask = project.tasks.id(taskId);
    // console.log(targetedTask,'<---targetedTask will print here')
    const isAssignedMember = targetedTask.assignedTo.some(
      (a) => a.user.toString() === userId
    );
    console.log(isAssignedMember, "<--isAssignedMember printed");
    if (!isAssignedMember) {
      return res.json({
        success: false,
        message: "Only assigned member can add comment",
      });
    }

    const newComment = {
      text: text,
      postedBy: userId,
      createdAt: Date.now(),
      updatedOn: Date.now(),
    };

    targetedTask.comments.push(newComment);
    await project.save();

    res.json({
      success: true,
      message: "comments added..",
    });
  } catch (error) {
    console.error(error.message, "failed to add comments...");
    res.json({
      success: false,
      message: "failed to add comments..",
      error: error.message,
    });
  }
};

//edit comment
export const editComment = async (req, res) => {
  const { taskId, commentId } = req.params;
  const { text, projectId } = req.body;
  const userId = req.user.id;
  // console.log(userId, 'userId check it is assigned or not')

  try {
    const project = await Project.findById(projectId);
    // console.log(project, "project fetched..");

    const targetedTask = project.tasks.id(taskId);
    // console.log(targetedTask, "<---targetedTask will print here");

    const isAssignedMember = targetedTask.assignedTo.some(
      (a) => a.user.toString() === userId
    );
    if (!isAssignedMember) {
      return res.json({
        success: false,
        message: "Only assigned members can edit comments",
      });
    }

    const editComment = targetedTask.comments.id(commentId);
    if (!editComment) {
      return res.json({
        success: false,
        message: "Comment not found",
      });
    }

    editComment.text = text || editComment.text;
    editComment.updatedOn = Date.now();
    targetedTask.lastUpdated = Date.now();

    await project.save();

    res.json({
      success: true,
      message: "Comment updated successfully",
      data: editComment,
    });
  } catch (error) {
    console.error("Edit comment error:", error.message);
    res.json({
      success: false,
      message: "Failed to edit comment",
      error: error.message,
    });
  }
};

