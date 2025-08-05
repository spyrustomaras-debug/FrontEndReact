// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfileList from "./components/ProfileList";
import Authors from "./components/Authors";
import CreateBookForm from "./components/CreateBookForm"; // 👈 your book form

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/profiles" element={<ProfileList />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books/new" element={<CreateBookForm />} /> {/* 👈 new route */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
