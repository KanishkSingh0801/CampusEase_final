import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    Contact_Number: {
      type: "Number",
      required: true,
      match: /^[0-9]{10}$/, // Ensures exactly 10 digits
      unique: true, // Prevents duplicate numbers
      trim: true
    }, 
    Applicant_Name: {
      type: "String",
      required: true,
    },
    // Department: {
    //   type: "String",
    //   required: true,
    // },
    Email: {
      type: "String",
      required: true,
      unique: true,
    },
    Password: {
      type: "String",
      required: true,
    },


    userType: {
      type: String,
      enum: ['student', 'faculty', 'visitor'],
      required: true
    },
    userId: {
      type: String,
      default: null  // if visitor, will remain null
    }
  },
  { timestamps: true }
);

export default mongoose.model("student", studentSchema);
// export default mongoose.model("user", studentSchema);
