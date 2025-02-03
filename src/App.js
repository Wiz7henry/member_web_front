import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MemberSearch from "./components/MemberSearch";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<MemberSearch />} />
      </Routes>
    </Router>
  );
};
export default App;
