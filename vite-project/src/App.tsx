// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfileList from "./components/ProfileList";
import Authors from "./components/Authors";
import CreateBookForm from "./components/CreateBookForm"; // 👈 your book form
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";  // import your ProtectedRoute



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/profiles" element={<ProfileList />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books/new" element={<CreateBookForm />} /> {/* 👈 new route */}
        {/* Wrap StudentList with ProtectedRoute */}
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentList />
            </ProtectedRoute>
          }
        />        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
