// models/Subject.js
import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true ,required:true},
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
});

export default mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
