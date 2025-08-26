import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    dueDate: Date,
    assignedTo: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
          
          assignedOn: { 
          type: Date, 
          default: Date.now
          },
        },
      ],
      default: [],
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    comments: [
      {
        text: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
        updatedOn: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Completed"],
      default: "Todo",
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    Owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: String,
    members: {
      type: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
          },
          role: {
            type: String,
            enum: ["Admin", "Member"],
            default: "Member",
          },
          joinedAt: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    tasks: [taskSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);

// // ======================
// import mongoose from "mongoose";
// const taskSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     description: String,
//     dueDate: Date,
//     assignedTo: {
//       type: [
//         {
//           user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//           },
          
//           assignedOn: { 
//           type: Date, 
//           default: Date.now
//           },
//         },
//       ],
//       default: [],
//     },
//     priority: {
//       type: String,
//       enum: ["High", "Medium", "Low"],
//       default: "Medium",
//     },
//     comments: 
//       {
//         text: String,
//         postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//         createdAt: { type: Date, default: Date.now },
//         updatedOn: { type: Date, default: Date.now },
//       },
//     status: {
//       type: String,
//       enum: ["Todo", "In Progress", "Completed"],
//       default: "Todo",
//     },
//     lastUpdated: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// const projectSchema = new mongoose.Schema(
//   {
//     Owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//     description: String,
//     members: {
//       type: [
//         {
//           user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: false,
//           },
//           role: {
//             type: String,
//             enum: ["Admin", "Member"],
//             default: "Member",
//           },
//           joinedAt: { type: Date, default: Date.now },
//         },
//       ],
//       default: [],
//     },
//     tasks: [taskSchema],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Project", projectSchema);
