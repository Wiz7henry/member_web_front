import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API_URL, APP_NAME } from "./globals";
// import '../style/MemberSearch.css'; // Import the CSS file
// const user = JSON.parse(localStorage.getItem("user")) || {};

const MemberSearch = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};

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
      state: { id: id_mem },
    });
  };

  const handleAdd = () => {
    navigate("/insert");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="member-search-container">
      <div className="content-wrapper">
        <h2>{APP_NAME} 📋</h2>
        <p>Welcome, {user?.name_mem || "User"}! 👋</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="search">
            🔍 Search
          </button>
        </form>
        <div className="table-container">
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
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(member.id_mem)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-container">
          <button className="add-button" onClick={() => handleAdd()}>
            ➕ Add
          </button>
          <button className="logout-button" onClick={handleLogout}>
            🔑 Logout
          </button>
        </div>
      </div>

      <style jsx>{`
        .member-search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: url("https://i.pinimg.com/originals/77/ca/a3/77caa32884d735d439ade45ba37feaf2.gif")
            no-repeat center center fixed;
          background-size: cover;
          overflow: hidden;
          background-attachment: fixed;
        }

        .content-wrapper {
          background: rgba(255, 255, 255, 0.3);
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(80, 18, 160, 0.6);
          width: 100%;
          max-width: 800px;
          position: fixed;
          overflow: auto;
        }

        h2 {
          margin-bottom: 1.5rem;
          color: #fff;
        }

        p {
        display: flex;
          color: rgb(255, 255, 255);
        }

        .search-form {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .search-form input {
          width: calc(80% - 1.5rem);
          padding: 0.75rem;
          margin-right: 1rem;
          border: 1px solid #444;
          border-radius: 5px;
          font-size: 1rem;
          background: rgb(255, 255, 255);
          color: #fff;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .search-form input:focus {
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(33, 70, 238, 0.99);
        }

        .search-form button {
          padding: 0.75rem;
          background: rgba(7, 75, 221, 0.67);
          box-shadow: 0 0 8px rgba(105, 9, 230, 0.6);
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }

        .search-form button:hover {
          background: rgba(64, 120, 241, 0.73);
          transform: scale(1.05);
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        .add-button,
        .logout-button {
          width: calc(40% - 1.5rem);
          padding: 0.75rem;
          background: rgba(7, 75, 221, 0.67);
          box-shadow: 0 0 8px rgba(105, 9, 230, 0.6);
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          justify-content: center;
          transition: background 0.3s, transform 0.3s;
        }

        .add-button:hover,
        .logout-button:hover {
          background: rgba(64, 120, 241, 0.73);
          transform: scale(1.05);
        }

        .table-container {
          display: flex;
          max-height: 400px;
          overflow-y: auto;
          margin-top: 1.5rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: rgba(10, 21, 121, 0.85);
          color: #fff;
          border-radius: 10px;
          overflow: auto;
        }

        thead th {
          position: sticky;
          top: 0;
          background: rgb(66, 177, 192);
          z-index: 1;
          padding: 1rem;
          text-align: left;
          font-size: 1.1rem;
          border-bottom: 2px solid #444;
        }

        th,
        td {
          justify-content: center;
          padding: 0.75rem;
          border: 1px solid #444;
          text-align: left;
        }

        tbody tr:nth-child(odd) {
          background: rgba(103, 210, 252, 0.47);
        }

        tbody tr:hover {
          background: rgb(15, 15, 15);
        }

        .edit-button {
          padding: 0.5rem 1rem;
          background: rgba(7, 75, 221, 0.67);
          box-shadow: 0 0 8px rgba(105, 9, 230, 0.6);
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }

        .edit-button:hover {
          background: rgb(64, 120, 241, 0.73);
          transform: scale(1.05);
        }

        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes backgroundMotion {
          0% {
            background-position: center;
          }
          100% {
            background-position: top;
          }
        }
      `}</style>
    </div>
  );
};

export default MemberSearch;
