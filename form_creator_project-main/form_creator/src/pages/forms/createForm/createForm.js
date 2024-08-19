import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthProvider";
import { baseUrl } from "../../../config/config";
import "./createForm.css"


const CreateForm = () => {
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState([]);
  const [generatedHtml, setGeneratedHtml] = useState("");
  // const { isAuthenticated } = useContext(AuthContext);
  const  isAuthenticated  = ""
  const [formData, setFormData] = useState({
    typeForm: "",
    generatedHtml: generatedHtml,
    fields: [],
    userId: isAuthenticated?.data?.id,
  });

  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/forms/myforms");
  };

  const handleSubmit = async (e) => {
    try {
      // console.log(JSON.stringify(fields));
      let data = formData;
      data["fields"] = JSON.stringify(fields);
      data["generatedHtml"] = generatedHtml;

      await axios
        .post(`${baseUrl}/api/forms`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // console.log("Form data submitted successfully:", response.data);
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
          });
          swalWithBootstrapButtons
            .fire({
              title: "Form created successfully",
              text: "copy below or exit",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "Copy to clipboard",
              cancelButtonText: "Close",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                copyToClipboard();
                handleRedirect();
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                handleRedirect();
              }
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const addField = (fieldType) => {
    const newField = { type: fieldType, label: "", placeholder: "" };
    if (fieldType === "checkbox" || fieldType === "radio") {
      newField.options = ["Option 1"];
    }
    setFields([...fields, newField]);
  };

  const handleLabelChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].label = event.target.value;
    setFields(newFields);
  };

  const handlePlaceHolderChange = (index, event) => {
    const newFields = [...fields];
    newFields[index].placeholder = event.target.value;
    setFields(newFields);
  };

  const handleOptionChange = (fieldIndex, optionIndex, event) => {
    const newFields = [...fields];
    newFields[fieldIndex].options[optionIndex] = event.target.value;
    setFields(newFields);
  };

  const addOption = (fieldIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].options.push(
      `Option ${newFields[fieldIndex].options.length + 1}`
    );
    setFields(newFields);
  };

  const removeOption = (fieldIndex, optionIndex) => {
    const newFields = [...fields];
    newFields[fieldIndex].options.splice(optionIndex, 1);
    setFields(newFields);
  };

  const removeField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  useEffect(() => {
    const html = fields
      .map((field) => {
        const label = `<label class="form-label">${
          field.label || "(No Label)"
        }</label>`;
        let element = "";
        const inputType = field.type === "textfield" ? "text" : field.type;
        if (inputType === "radio" || inputType === "checkbox") {
          element = field.options
            .map((option) => {
              const input = `<input type="${inputType}" id="${option}" name="${field.label}" value="${option}" class="form-check-input" />`;
              const optionLabel = `<label for="${option}" class="form-check-label">${option}</label>`;
              return `<div class="form-check">${input}${optionLabel}</div>`;
            })
            .join("");
        } else {
          const sanitizedFieldLabel = field.label.replace(/\s+/g, "_");
          const input = `<input type="${inputType}" name="${sanitizedFieldLabel}" placeholder="${
            field.placeholder || ""
          }" class="form-control" />`;
          element = `${input}`;
        }
        return `<div class="mb-3">${label}${element}</div>`;
      })
      .join("");

    const formHtml = `<form id="{{formId}}" class="container">${html}<button type="submit" class="btn btn-primary mt-3">Submit</button></form>`;
    const fullHtml = `${formHtml}<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script><script src="http://localhost:5000/js/form-handler.js"></script>`;
    setGeneratedHtml(fullHtml);
  }, [fields]);

  const clearAll = () => {
    setGeneratedHtml("");
    setFields([]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml).then(
      () => {
        alert("HTML copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  const allLabelsSet = () => {
    return (
      fields.every((field) => field.label.trim() !== "") && fields.length > 0
    );
  };

  const handleStep0Click = () => {
    setFormData({
      typeForm: "",
      fields: [],
    });
    clearAll();
    setStep(1);
  };

  const handleStep1Click = (type) => {
    setFormData({
      ...formData,
      typeForm: type,
    });
    setStep(2);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form_add">
        {step === 1 && (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h3 className="text-center mb-4 mt-4">Select Form Type</h3>
              <div className="d-flex justify-content-around flex-wrap">
                <div className="card mb-3" style={{ width: "18rem" }}>
                  <div className="card-body text-center">
                    <button
                      className="btn btn-primary w-100 "
                      onClick={() => handleStep1Click("Contact")}
                      type="button"
                    >
                      Contact
                    </button>
                  </div>
                </div>
                <div className="card mb-3" style={{ width: "18rem" }}>
                  <div className="card-body text-center">
                    <button
                      className="btn btn-primary w-100 btn_add"
                      onClick={() => handleStep1Click("Rendezvous")}
                      type="button"
                    >
                      Rendezvous
                    </button>
                  </div>
                </div>
                <div className="card mb-3" style={{ width: "18rem" }}>
                  <div className="card-body text-center">
                    <button
                      className="btn btn-primary w-100 btn_add"
                      onClick={() => handleStep1Click("Devis")}
                      type="button"
                    >
                      Devis
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="container-fluid p-3" id="setupForm">
              <div className="row justify-content-center">
                {/* Sidebar */}
                <div className="col-md-2 bg-light border rounded p-3 mx-2">
                  <h5>Choose fields</h5>
                  <button
                    className="btn btn-primary w-100 mb-2 "
                    type="button"
                    onClick={() => addField("email")}
                  >
                    Add Email Field
                  </button>
                  <button
                    className="btn btn-primary w-100 mb-2 "
                    type="button"
                    onClick={() => addField("textfield")}
                  >
                    Add Text Field
                  </button>
                  <button
                    className="btn btn-primary w-100 mb-2 "
                    type="button"
                    onClick={() => addField("number")}
                  >
                    Add Number Field
                  </button>
                  <button
                    className="btn btn-primary w-100 mb-2 "
                    type="button"
                    onClick={() => addField("date")}
                  >
                    Add Date Field
                  </button>
                  <button
                    className="btn btn-primary w-100 mb-2 "
                    type="button"
                    onClick={() => addField("time")}
                  >
                    Add Time Field
                  </button>
                  <button
                    className="btn btn-primary w-100 mb-2 "
                    type="button"
                    onClick={() => addField("file")}
                  >
                    Add File Upload
                  </button>
                  <button
                    className="btn btn-primary w-100 mb-2 "
                    type="button"
                    onClick={() => addField("checkbox")}
                  >
                    Add Checkbox List
                  </button>
                  <button
                    className="btn btn-primary w-100"
                    type="button"
                    onClick={() => addField("radio")}
                  >
                    Add Radio Selection
                  </button>
                </div>

                {/* Label Naming Section */}
                <div className="col-md-3 p-3 bg-light border rounded mx-2">
                  <h5>Label Naming</h5>
                  {fields?.map((field, index) => (
                    <div key={index} className="mb-3">
                      <h6>
                        {field.type.charAt(0).toUpperCase() +
                          field.type.slice(1)}{" "}
                        Field
                      </h6>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={field.label}
                        placeholder="Enter field label"
                        onChange={(event) => handleLabelChange(index, event)}
                      />

                      {field.type !== "date" &&
                        field.type !== "time" &&
                        field.type !== "file" &&
                        field.type !== "checkbox" &&
                        field.type !== "radio" && (
                          <input
                            type="text"
                            className="form-control mb-2"
                            value={field.placeholder || ""}
                            placeholder="Enter Hint/PlaceHolder"
                            onChange={(event) =>
                              handlePlaceHolderChange(index, event)
                            }
                          />
                        )}
                      {(field.type === "checkbox" ||
                        field.type === "radio") && (
                        <div>
                          <h6>Options</h6>
                          {field.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="input-group mb-2">
                              <input
                                type="text"
                                className="form-control"
                                value={option}
                                onChange={(event) =>
                                  handleOptionChange(index, optionIndex, event)
                                }
                              />
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeOption(index, optionIndex)}
                                disabled={field.options.length === 1}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                          <button
                            className="btn btn-secondary btn-sm"
                            type="button"
                            onClick={() => addOption(index)}
                          >
                            Add Option
                          </button>
                        </div>
                      )}
                      <button
                        className="btn btn-danger btn-sm mt-2"
                        type="button"
                        onClick={() => removeField(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Preview */}
                <div className="col-md-6 p-3 bg-light border rounded mx-2">
                  <h5>Preview</h5>
                  <form>
                    {fields?.map((field, index) => (
                      <div key={index} className="mb-3">
                        <label className="form-label">
                          {field.label || "(No Label)"}
                        </label>
                        {field.type === "checkbox" || field.type === "radio" ? (
                          <div>
                            {field.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="form-check">
                                <input
                                  className="form-check-input"
                                  type={field.type}
                                  name={`field-${index}`}
                                  id={`option-${index}-${optionIndex}`}
                                  value={option}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`option-${index}-${optionIndex}`}
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <input
                            type={
                              field.type === "email"
                                ? "email"
                                : field.type === "textfield"
                                ? "text"
                                : field.type
                            }
                            placeholder={
                              field.type !== "date" &&
                              field.type !== "time" &&
                              field.type !== "file" &&
                              field.placeholder
                                ? field.placeholder
                                : ""
                            }
                            className="form-control"
                          />
                        )}
                      </div>
                    ))}
                  </form>
                  <button
                    className="btn btn-light mt-2"
                    type="button"
                    onClick={clearAll}
                  >
                    Clear all
                  </button>
                </div>
              </div>
              <div className="row mb-4 mt-4">
                <div className="col-6">
                  <button
                    className="btn btn-primary w-20"
                    onClick={() => handleStep0Click()}
                    type="button"
                  >
                    Return
                  </button>
                </div>
                <div className="col-6 text-end">
                  <button
                    type="button"
                    disabled={!allLabelsSet()}
                    className="btn btn-primary w-20"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default CreateForm;
