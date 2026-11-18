
import React, { useState } from "react";

function StudentList({
  students,
  onEditStudent,
  onDeleteStudent
}) {

  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="list-section">

      <h2>Registered Students</h2>

      <h4>Total Records: {students.length}</h4>

      <input
        type="text"
        className="search-input"
        placeholder="Search by name, email or course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.length === 0 ? (

              <tr>
                <td colSpan="6">
                  No matching students found.
                </td>
              </tr>

            ) : (

              filteredStudents.map((student) => (

                <tr key={student.id}>

                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.gender}</td>
                  <td>{student.course}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => onEditStudent(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDeleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default StudentList;
