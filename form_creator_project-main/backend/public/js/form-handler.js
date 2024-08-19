document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const formId = form.id;

      const formObject = {};
      formData.forEach((value, key) => {
        if (formObject[key]) {
          if (!Array.isArray(formObject[key])) {
            formObject[key] = [formObject[key]];
          }
          formObject[key].push(value);
        } else {
          formObject[key] = value;
        }
      });

      fetch("http://localhost:5000/api/submitForm", {
        method: "POST",
        body: JSON.stringify({
          formId,
          formData: formObject,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          console.log("Form submitted successfully:", data);
          alert("Form submitted!");
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    });
  }
});
