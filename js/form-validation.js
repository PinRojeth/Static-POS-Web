document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    
    form.addEventListener("submit", function (event) {
      if (!form.checkValidity()) {
        event.preventDefault(); // Prevent form submission if invalid
        event.stopPropagation();
        form.classList.add("is-valid")
      }
      form.classList.add("was-validated");
    }, false);
  });