const { response } = require("express");
const Form = require("../models/Form");

exports.getMyForms = async (req, res) => {
  const { userid } = req.params;

  try {
    await Form.find({ userId: userid })
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

exports.create = async (req, res) => {
  try {
    let fields = JSON.parse(req.body?.fields);
    let typeForm = req.body?.typeForm;
    let generatedHtml = req.body?.generatedHtml;
    let userId = req.body?.userId;

    const newForm = new Form({
      typeForm: typeForm,
      fields: fields,
      generatedHtml: generatedHtml,
      userId: userId,
    });

    await newForm
      .save()
      .then((savedForm) => {
        const updatedHtml = generatedHtml.replace("{{formId}}", savedForm._id);
        return Form.findByIdAndUpdate(
          savedForm._id,
          { generatedHtml: updatedHtml },
          { new: true }
        );
      })
      .then((updatedForm) => {
        res.status(201).json(updatedForm);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    await Form.findByIdAndDelete(id)
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
