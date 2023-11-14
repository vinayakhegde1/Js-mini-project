function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    if (email.trim() === "" || password.trim() === "") {
      alert("Email and Password are required");
      return false;
    }
    return true; // If all validations pass, the form will be submitted
}

// Validation can be more complex if needed 