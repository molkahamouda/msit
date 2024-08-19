const FormSubmission = require("../models/FormSubmission");

exports.submitDataById = async (req, res) => {
  try {
    const formId = req.body?.formId;
    const formData = req.body?.formData;
    if (!formId || !formData) {
      return res.status(400).json({ error: "Form ID and data are required" });
    }
    const newFormSubmission = new FormSubmission({
      formId,
      formData: formData,
    });
    await newFormSubmission
      .save()
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ error: err.message });
  }
};
