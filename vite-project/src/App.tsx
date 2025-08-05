import React from "react";
import ProfileList from "./components/ProfileList";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <div>
      <h1>My Django + React App</h1>
      <ProfileList />
    </div>
  );
};

export default App;
