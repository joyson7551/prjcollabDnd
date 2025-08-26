import mongoose from "mongoose";
import Project from "../models/projectSchema.js";
import User from "../models/userSchema.js";

export const createProject = async (req, res) => {
  const projectData = {
    ...req.body,
    Owner: req.user.id,
  };
  console.log(projectData);

  const newProject = new Project({ ...req.body, Owner: req.user.id });
  const savedProject = await newProject.save();

  res.json({
    success: true,
    message: "Project created Successfully...",
    data: savedProject,
  });
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ Owner: req.user.id });
    res.json({
      success: true,
      message: "Projects fetched...!",
      data: projects,
    });
  } catch (error) {
    console.log("failed to fetch..!", error.message);
    res.json({
      success: false,
      message: "failed to fetch Projects",
      error: error.message,
    });
  }
};

//get individual projects
export const getProjectById = async(req, res)=>{
  const { id } = req.params;
  const user = req.user.id;
  
  try {
    const project = await Project.findById(id);
    console.log(project,'project id')
    res.json({
    success:true,
    message:`successfully fetched the project with id: ${id}`,
    data:project
    })
    
  } catch (error) {
    console.error(error.message, `failed to fetch the project with id ${id}`)
    res.josn({
    success:false,
    message:`failed to fetch the project with id ${id}`
    })
  }
}

//Owner & admin specific
//Use drop down in the frontend #####
export const roleToggle = async (req, res) => {
  const { id } = req.params;
  const { role, projectId } = req.body;
  const targetedId = id;
  const isOwnerOrAdmin = req.user.id;
  console.log(isOwnerOrAdmin, "<--isOwnerOrAdmin will print here");
  console.log(targetedId, "targetedId");

  try {
    const project = await Project.findById(projectId);
    console.log(project, "project printed");

    const isOwner = isOwnerOrAdmin === project.Owner.toString();
    const isAdmin =
      isOwnerOrAdmin ===
      project.members.some(
        (mbr) => mbr.user.toString() === isOwnerOrAdmin && mbr.role === "Admin"
      );

    if (!isOwner && isAdmin) {
      return res.json({
        success: false,
        message: "Only Owner or Admin can change the role of a member",
      });
    }

    const validateRole = ["Admin", "Member"];
    if (!validateRole.includes(role)) {
      return res.json({
        success: false,
        message:
          "Only two roles are allowed 'Admin' and 'Member', case sensitive ",
      });
    }

    const member = project.members.find(
      (mbr) => mbr.user.toString() === targetedId
    );
    console.log(member, "member identified...");
    if (!member) {
      return res.json({
        success: false,
        message: "failed at the user findings",
      });
    }

    if (member) {
      member.role = role;
    }

    await project.save();
    res.json({
      success: true,
      message: `Member Role updated to ${role} successfully...`,
      data: member,
    });
  } catch (error) {
    console.log(error.message, "error, finding the project");
    res.json({
      success: false,
      message: `failed to update member role to ${role}`,
      error: error.message,
    });
  }
};

//adding members only admin and owner
export const addMembers = async (req, res) => {
  const { id } = req.params;
  const { projectId } = req.body;
  const newMemberId = id;
  const isOwnerOrAdmin = req.user.id;
  // console.log(newMemberId,'<---newMemberId')
  console.log(isOwnerOrAdmin, "<--isOwnerOrAdmin will print here");
  // console.log(newMemberId, "<--targetedId");

  try {
    const project = await Project.findById(projectId);
    // console.log(project, '<--- project identified');

    const isOwner = isOwnerOrAdmin === project.Owner.toString();
    const isAdmin = project.members.some(
      (mbr) => mbr.user.toString() === isOwnerOrAdmin && mbr.role === "Admin"
    );
    console.log(isOwner, isAdmin, "<--isOwner, isAdmin");

    if (!isOwner && !isAdmin) {
      return res.json({
        success: false,
        message: "Only Owner or Admin can add a member",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(newMemberId)) {
      return res.status(400).json({
        success: false,
        message: "User not found or invalid ID format",
      });
    }

    const isRegisteredUser = await User.findById(newMemberId);

    if (!isRegisteredUser) {
      return res.json({
        success: false,
        message: "User not found or invalid ID format",
      });
    }
    console.log(isRegisteredUser, "<-- isRegisteredUser is true");

    const alreadyMember = project.members.find(
      (mbr) => mbr.user.toString() === newMemberId
    );
    console.log(alreadyMember, "alreadyMember prints here");

    if (alreadyMember) {
      return res.json({
        success: false,
        message: "Already existing member..!",
      });
    }

    project.members.push({ user: newMemberId });
    await project.save();

    const memberAdded = project.members.find(
      (mbr) => mbr.user.toString() === newMemberId
    );
    console.log(memberAdded, "memberAdded");

    res.json({
      success: true,
      message: "New member is added to the project..!",
      data: memberAdded,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: "failed to add member to project",
      error: error.message,
    });
  }
};

//delete a member
export const deleteMember = async (req, res) => {
  const { id } = req.params;
  const { projectId } = req.body;
  const deleteMemberId = id;
  const isOwnerOrAdmin = req.user.id;
  // console.log(newMemberId,'<---newMemberId')
  console.log(isOwnerOrAdmin, "<--isOwnerOrAdmin will print here");
  // console.log(newMemberId, "<--targetedId");

  try {
    const project = await Project.findById(projectId);
    // console.log(project, '<--- project identified');

    const isOwner = isOwnerOrAdmin === project.Owner.toString();
    const isAdmin = project.members.some(
      (mbr) => mbr.user.toString() === isOwnerOrAdmin && mbr.role === "Admin"
    );
    console.log(isOwner, isAdmin, "<--isOwner, isAdmin");

    if (!isOwner && !isAdmin) {
      return res.json({
        success: false,
        message: "Only Owner or Admin can add a member",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(deleteMemberId)) {
      return res.status(400).json({
        success: false,
        message: "User not found or invalid ID format",
      });
    }

    const isNotMember = project.members.some(
      (mbr) => mbr.user.toString() === deleteMemberId
    );

    if (!isNotMember) {
      return res.json({
        success: false,
        message: "Already removed or not a member of this project..!",
      });
    }

    const remainingMembers = project.members.filter(
      (mbr) => mbr.user.toString() !== deleteMemberId
    );
    project.members = remainingMembers;
    await project.save();

    res.json({
      success: true,
      message: "Member deleted successfully..!",
      data: deleteMemberId,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: "failed to delete the member from the project",
      error: error.message,
    });
  }
};

//add tasks
export const addTask = async (req, res) => {
  const isOwnerOrAdmin = req.user.id;
  const {
    title,
    description,
    dueDate,
    assignedTo,
    priority,
    comments,
    projectId,
  } = req.body;

  if (!title || !projectId) {
    return res.json({
      success: false,
      message: "title and projectId are mandatory fields..!",
    });
  }
  try {
    const project = await Project.findById(projectId);
    console.log(project, "<--project will print here");

    const isOwner = isOwnerOrAdmin === project.Owner.toString();
    const isAdmin = project.members.some(
      (mbr) => mbr.user.toString() === isOwnerOrAdmin && mbr.role === "Admin"
    );
    console.log(isOwner, isAdmin, "<--isOwner, isAdmin");
    if (!isOwner && !isAdmin) {
      return res.json({
        success: false,
        message: "Only Owner or Admin can add task",
      });
    }

    const newTask = {
      title,
      description,
      dueDate,
      assignedTo,
      priority,
      comments,
      lastUpdated: Date.now(),
    };
    project.tasks.push(newTask);
    await project.save();

    const addedTask = project.tasks[project.tasks.length - 1];

    res.json({
      success: true,
      message: "Task added successfully..!",
      data: addedTask,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: "Failed to add the task..!",
      error: error.message,
    });
  }
};

// edit task
export const editTask = async (req, res) => {
  const { id: taskId } = req.params;
  const isOwnerOrAdmin = req.user.id;
  const {
    title,
    description,
    dueDate,
    assignedTo,
    status,
    priority,
    comments,
    projectId,
  } = req.body;

  if (!taskId || !projectId) {
    return res.status(400).json({
      success: false,
      message: "taskId and projectId are mandatory fields..!",
    });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.json({
        success: false,
        message: "Project not found",
      });
    }

    const isOwner = isOwnerOrAdmin === project.Owner.toString();
    const isAdmin = project.members.some(
      (mbr) => mbr.user.toString() === isOwnerOrAdmin && mbr.role === "Admin"
    );

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only Owner or Admin can edit tasks",
      });
    }

    const taskToEdit = project.tasks.id(taskId);
    if (!taskToEdit) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (title) taskToEdit.title = title;
    if (description) taskToEdit.description = description;
    if (dueDate) taskToEdit.dueDate = dueDate;
    if (assignedTo) taskToEdit.assignedTo = assignedTo;
    if (priority) taskToEdit.priority = priority;
    if (comments) taskToEdit.comments = comments;
    if (status) taskToEdit.status = status;

    taskToEdit.lastUpdated = Date.now();

    await project.save();

    return res.json({
      success: true,
      message: "Task updated successfully..!",
      data: taskToEdit,
    });
  } catch (error) {
    console.error("Error editing task:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to edit the task..!",
      error: error.message,
    });
  }
};

//update status
// Add this to your existing controllers
export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status, projectId } = req.body;
  
  // Validate input
  if (!taskId || !projectId || !status) {
    return res.status(400).json({
      success: false,
      message: "taskId, projectId and status are required"
    });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = project.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    task.lastUpdated = new Date();

    await project.save();

    return res.json({
      success: true,
      message: "Task status updated successfully",
      data: task
    });

  } catch (error) {
    console.error("Status update error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update task status",
      error: error.message
    });
  }
};

//add comment
export const addComment = async (req, res) => {
  const { id: projectId } = req.params;
  const { text, taskId } = req.body;
  const isOwnerOrAdmin = req.user.id;

  try {
    const project = await Project.findById(projectId);
    console.log(project, "project fetched..");
    
      const isOwner = isOwnerOrAdmin === project.Owner.toString();
    const isAdmin = project.members.some(
      (mbr) => mbr.user.toString() === isOwnerOrAdmin && mbr.role === "Admin"
    );
    console.log(isOwner, isAdmin, "<--isOwner, isAdmin");
    if (!isOwner && !isAdmin) {
      return res.json({
        success: false,
        message: "Only Owner or Admin can add task",
      });
    }
  

    const targetedTask = project.tasks.id(taskId);
    const newComment = {
    text:text,
    postedBy:isOwnerOrAdmin,
    updatedOn:Date.now()
    }
    
    targetedTask.comments.push(newComment);
    await project.save();

    res.json({
      success: true,
      message: "comments added..",
    });
  } catch (error) {
    console.error(error, "failed to add comments...");
    res.json({
      success: false,
      message: "failed to add comments..",
    })
  }
};

//list members
export const listMembers = async (req, res) => {
  const { id: projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate({
      path: "members.user",
      model: "user",
    });
    console.log(project, "<--- projectId fetched");

    const getMembers = project.members;
    console.log(getMembers, "<--- all members fetched");

    res.json({
      success: true,
      message: "all members are fetched..",
      data: getMembers,
    });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: "failed to fecth all members..",
      error: error.message,
    });
  }
};
