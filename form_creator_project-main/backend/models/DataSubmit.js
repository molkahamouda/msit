const mongoose = require("mongoose");

const dataSubmitSchema = new mongoose.Schema(
  {
    // userId: {type: mongoose.Schema.ObjectId, ref: 'User'},
  },
  {
    timestamps: true,
  }
);

const DataSubmit = mongoose.model("DataSubmit", formSchema);

module.exports = Form;
