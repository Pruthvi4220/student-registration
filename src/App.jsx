
import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {

  // Load previously saved students
  const [students, setStudents] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("students") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [editingStudent, setEditingStudent] = useState(null);

  // Save students whenever the list changes
  useEffect(() => {
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }, [students]);

  const addStudent = (student) => {
    setStudents((previous) => [...previous, student]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents((previous) =>
      previous.map((student) =>
        student.id === updatedStudent.id
          ? updatedStudent
          : student
      )
    );

    setEditingStudent(null);
    alert("Student updated successfully!");
  };

  const editStudent = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((previous) =>
        previous.filter((student) => student.id !== id)
      );

      if (editingStudent?.id === id) {
        setEditingStudent(null);
      }
    }
  };

  return (
    <div className="app">

      <header className="header">
        <h1>Student Registration System</h1>
        <p>Student Management Dashboard</p>
      </header>

      <main className="main-container">

        <div className="dashboard">

          <div className="card">
            <h3>Total Students</h3>
            <h2>{students.length}</h2>
          </div>

          <div className="card">
            <h3>Total Courses</h3>
            <h2>5</h2>
          </div>

          <div className="card">
            <h3>New Registrations</h3>
            <h2>{students.length}</h2>
          </div>

        </div>

        <StudentForm
          onAddStudent={addStudent}
          editingStudent={editingStudent}
          onUpdateStudent={updateStudent}
          onCancelEdit={() => setEditingStudent(null)}
        />

        <StudentList
          students={students}
          onEditStudent={editStudent}
          onDeleteStudent={deleteStudent}
        />

      </main>

    </div>
  );
}

export default App;
