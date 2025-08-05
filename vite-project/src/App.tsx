import React from "react";
import ProfileList from "./components/ProfileList";
import Navbar from './components/Navbar';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

export default App;
