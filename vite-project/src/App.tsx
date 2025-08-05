// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfileList from "./components/ProfileList";
import CreateBookForm from "./components/CreateBookForm"; // 👈 your book form
import StudentList from "./components/StudentList";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";  // import your ProtectedRoute
import ErrorBoundary from "./components/ErrorBoundary";
import { Suspense, lazy } from "react";

const Authors = lazy(() => import('./components/Authors'));
const StudentDetails = lazy(() => import('./components/StudentDetails'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/profiles" element={<ErrorBoundary fallback={<div>Oops! Could not load students. Try refreshing.</div>}>
              <ProfileList />                  
            </ErrorBoundary>            
          } />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books/new" element={<CreateBookForm />} /> {/* 👈 new route */}
          {/* Wrap StudentList with ProtectedRoute */}
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                    <ErrorBoundary fallback={<div>Oops! Could not load students. Try refreshing.</div>}>
                      <StudentList />
                    </ErrorBoundary>            
              </ProtectedRoute>
            }
          />        
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
