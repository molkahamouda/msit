const mongoose = require("mongoose");

const formSubmissionSchema = new mongoose.Schema(
  {
    formId: { type: mongoose.Schema.ObjectId, ref: "Forms" },
    formData: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FormSubmission = mongoose.model("FormSubmissions", formSubmissionSchema);

module.exports = FormSubmission;
