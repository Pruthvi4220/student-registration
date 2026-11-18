
import React, { useState, useEffect } from "react";

const emptyStudent = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  address: "",
  course: ""
};

function StudentForm({
  onAddStudent,
  editingStudent,
  onUpdateStudent,
  onCancelEdit
}) {

  const [student, setStudent] = useState(emptyStudent);

  useEffect(() => {
    if (editingStudent) {
      setStudent({
        ...emptyStudent,
        ...editingStudent
      });
    } else {
      setStudent(emptyStudent);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingStudent) {
      onUpdateStudent({
        ...student,
        id: editingStudent.id
      });
    } else {
      onAddStudent({
        ...student,
        id: Date.now()
      });
    }

    setStudent(emptyStudent);
  };

  return (
    <div className="form-section">

      <h2>
        {editingStudent ? "Update Student" : "Student Registration Form"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={student.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={student.email}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          pattern="[0-9]{10}"
          value={student.phone}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={student.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Date of Birth</label>

        <input
          type="date"
          name="dob"
          value={student.dob}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Enter Address"
          value={student.address}
          onChange={handleChange}
          required
        />

        <select
          name="course"
          value={student.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
          <option value="B.Tech">B.Tech</option>
          <option value="MCA">MCA</option>
          <option value="MBA">MBA</option>
        </select>

        <button type="submit">
          {editingStudent ? "Update Student" : "Register Student"}
        </button>

        {editingStudent && (
          <button type="button" onClick={onCancelEdit}>
            Cancel Edit
          </button>
        )}

      </form>
    </div>
  );
}

export default StudentForm;
