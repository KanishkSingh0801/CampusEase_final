import mongoose from "mongoose";

const hallsSchema = new mongoose.Schema({
  // Faculty_ID: {
  //   type: "Number",
  //   required: true,
  // },
  Hall_ID: {
    type: "String",
    required: true,
    unique: true,
  },
  Hall_Name: {
    type: "String",
    required: true,
  },
  // Department: {
  //   type: "String",
  //   required: true,
  // },
  Description: {
    type: "String",
  },
  Price : {
    type: "Number",
    required: true
  },
  Capacity: {
    type: "Number",
    required: false,
  },
  Image1: {
    type: "String",
    required: false,
  },
  Image2: {
    type: "String",
    required: false,
  },
});

export default mongoose.model("halls", hallsSchema);
