import React, { useState } from "react";
import './UserForm.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Validation function to check form fields
  const validate = () => {
    let formErrors = {};

    // Check for empty fields
    if (!formData.name.trim()) formErrors.name = "Name is required";
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is not valid";
    }
    if (!formData.age.trim()) formErrors.age = "Age is required";

    return formErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();

    if (Object.keys(formErrors).length === 0) {
      setSuccessMessage("Form submitted successfully!");
      setErrors({});
      // Here you could send the form data to a server (e.g. API call)
    } else {
      setErrors(formErrors);
      setSuccessMessage("");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <h2>Submit Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={errors.age ? "error" : ""}
          />
          {errors.age && <p className="error-message">{errors.age}</p>}
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default UserForm;
