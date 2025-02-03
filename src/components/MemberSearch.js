import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL, APP_NAME } from "./globals";
// import '../style/MemberSearch.css'; // Import the CSS file

const MemberSearch = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const { user } = location.state || {};

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(BASE_API_URL + "/members/search", {
        name_mem: name,
      });
      setResults(response.data);
    } catch (error) {
      alert("❌ Search failed");
    }
  };

  const handleSearchReload = async () => {
    try {
      const response = await axios.post(BASE_API_URL + "/members/search", {
        name_mem: name,
      });
      setResults(response.data);
    } catch (error) {
      alert("❌ Search failed");
    }
  };

  useEffect(() => {
    handleSearchReload(); // Trigger search when the component mounts
  }, []);

  const handleEdit = (id_mem) => {
    navigate("/edit", {
      state: { id_mem: id_mem },
    });
  };

  const handleAdd = () => {
    navigate("/insert");
  };

  return (
    <div className="container">
      <h2>{APP_NAME} 📋</h2>
      <p>Welcome, {user?.name_mem || "User"}! 👋</p>
      <form className="search_form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="search">🔍 Search</button>
      </form>
      <button onClick={() => handleAdd()}>➕ Add</button>
      <table>
        <thead>
          <tr>
            <th>ID ผู้ใช้</th>
            <th>ชื่อ-นามสกุล</th>
            <th>เบอร์โทร</th>
            <th>E-mail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map((member) => (
            <tr key={member.id_mem}>
              <td>{member.id_mem}</td>
              <td>{member.name_mem}</td>
              <td>{member.phone_mem}</td>
              <td>{member.email_mem}</td>
              <td>
                <button onClick={() => handleEdit(member.id_mem)}>✏️ Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberSearch;
