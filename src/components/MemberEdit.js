import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_API_URL, APP_NAME } from "./globals";

const MemberEdit = () => {
  const [id_mem, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const fetchMember = async () => {
    try {
      const response = await axios.post(BASE_API_URL + "/members/searchid", {
        id_mem: id,
      });
      setId(response.data.user.id_mem);
      setName(response.data.user.name_mem);
      setEmail(response.data.user.email_mem);
      setPassword(response.data.user.password_mem);
      setSex(response.data.user.sex_mem);
      setBirthday(new Date(response.data.user.birthday_mem));
      setPhone(response.data.user.phone_mem);
      setAddress(response.data.user.address_mem);
      setZipcode(response.data.user.zipcode_mem);
      setCountry(response.data.user.country_mem);
    } catch (error) {
      alert("Failed to fetch member data");
    }
  };
  useEffect(() => {
    fetchMember(); // Trigger search when the component mounts
  }, [id]);
  const handleEdit = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("ยืนยันการบันทึกข้อมูล");
    if (userConfirmed) {
      try {
        await axios.put(BASE_API_URL + "/membersedit", {
          id_mem: id_mem,
          name_mem: name,
          email_mem: email,
          password_mem: password,
          sex_mem: sex,
          birthday_mem: birthday
            ? `${birthday.getFullYear()}-${(birthday.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${birthday
                .getDate()
                .toString()
                .padStart(2, "0")}`
            : null,
          phone_mem: phone,
          address_mem: address,
          zipcode_mem: zipcode,
          country_mem: country,
        });
        alert("Member Edited successfully");
        navigate("/search");
      } catch (error) {
        alert("Failed to edit member");
      }
    }
  };
  const handledel = async () => {
    const userConfirmed = window.confirm("ยืนยันการลบข้อมูล");
    if (userConfirmed) {
      try {
        await axios.delete(BASE_API_URL + "/membersdel", {
          data: { id_mem },
        });
        alert("Member Deleted successfully");
        navigate("/search");
      } catch (error) {
        alert("Failed to Delete member data");
      }
    }
  };
  const handlecancel = () => {
    navigate("/search");
  };
  return (
    <div className="member-edit-container">
      <div className="content-wrapper">
        <h2>EDIT MEMBER</h2>
        <form onSubmit={handleEdit}>
          <div className="form-grid">
            <div className="form-group">
              <input
                type="hidden"
                value={id_mem}
                onChange={(e) => setId(e.target.value)}
              />
              <label>Name:</label>
              <input
                type="text"
                placeholder="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🔒"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Sex:</label>
              <select value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="1">ชาย</option>
                <option value="2">หญิง</option>
              </select>
            </div>
            <div className="form-group">
              <label>Birthday:</label>
              <DatePicker
                selected={birthday}
                onChange={(date) => setBirthday(date)}
                dateFormat="yyyy-MM-dd"
                isClearable
                placeholderText="Select a date"
                required
                className="date-picker"
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="form-group full-width">
              <label>Address:</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label>Zipcode:</label>
              <input
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="delete-button" onClick={handledel}>Delete</button>
            <button type="button" className="cancel-button" onClick={handlecancel}>Cancel</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .member-edit-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: url("https://i.pinimg.com/originals/95/ef/b8/95efb8425d270933e5e890b33ab5ef70.gif")
            no-repeat center center fixed;
          background-size: cover;
          overflow: hidden;
          background-attachment: fixed;
        }
        
        h2 {
          color: #fff;
          text-align: center;
        }

        .content-wrapper {
          background: rgba(122, 65, 129, 0.31);
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 0 20px rgba(125, 57, 214, 0.57);
          width: 95%;
          max-width: 1200px;
          position: fixed;
          overflow: auto;
          max-height: 90vh;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(300px, 1fr));
          column-gap: 3rem;
          row-gap: 1.2rem;
          margin: 0 auto;
          padding: 0 1rem;
          max-width: 1100px;
        }

        .form-group {
          position: relative;
          margin: 0;
          padding: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
          max-width: 100%;
        }

        label {
          display: block;
          margin-bottom: 0.4rem;
          color: #fff;
          font-weight: 500;
          font-size: 0.95rem;
          transition: transform 0.3s;
        }

        input,
        select,
        textarea {
          font: bold 1rem Arial, sans-serif;
          width: 100%;
          padding: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.9);
          color: #000;
          transition: all 0.3s ease;
        }

        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
          transform: translateY(-2px);
          border-color: rgba(238, 33, 146, 0.99);
          box-shadow: 0 0 15px rgba(238, 33, 204, 0.42);
          background: #fff;
        }

        .password-input {
          display: flex;
          align-items: center;
        }

        .password-toggle {
          margin-left: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
        }

        .button-container {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
        }

        .save-button,
        .delete-button,
        .cancel-button {
          width: 180px;
          padding: 0.9rem;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .save-button {
          background: rgba(3, 255, 16, 0.8);
        }

        .save-button:hover {
          background: rgba(89, 252, 116, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(105, 9, 230, 0.3);
        }

        .save-button:active {
          transform: translateY(-1px);
        }

        .delete-button {
          background: rgba(255, 3, 3, 0.8);
        }

        .delete-button:hover {
          background: rgba(241, 72, 72, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(105, 9, 230, 0.3);
        }

        .delete-button:active {
          transform: translateY(-1px);
        }

        .cancel-button {
          background: rgba(255, 174, 0, 0.8);
        }

        .cancel-button:hover {
          background: rgba(255, 191, 53, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(105, 9, 230, 0.3);
        }

        .cancel-button:active {
          transform: translateY(-1px);
        }

        /* Add styles for DatePicker */
        .date-picker {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.9);
          color: #000;
          transition: all 0.3s ease;
        }

        .date-picker:hover {
          background: rgba(255, 255, 255, 1);
        }

        .date-picker:focus {
          outline: none;
          transform: translateY(-2px);
          border-color: rgba(238, 33, 146, 0.99);
          box-shadow: 0 0 15px rgba(238, 33, 204, 0.42);
          background: #fff;
        }

        @media (max-width: 968px) {
          .form-grid {
            grid-template-columns: 1fr;
            padding: 0;
          }
          
          .content-wrapper {
            padding: 2rem;
            width: 90%;
          }
          
          .form-group.full-width {
            grid-column: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default MemberEdit;
