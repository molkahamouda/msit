const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Schema.ObjectId, ref: 'users'},
    // formWebsite: { type: String, required: true },
    typeForm: { type: String, required: true },
    fields: [
      {
        type: { type: String, required: true },
        label: { type: String, required: true },
        placeholder: { type: String },
        options: [String],
      },
    ],
    generatedHtml: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Forms", formSchema);

module.exports = Form;
