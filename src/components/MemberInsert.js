import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL, APP_NAME } from "./globals";
const MemberInsert = () => {
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
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await axios.post(BASE_API_URL + "/membersadd", {
        name_mem: name,
        email_mem: email,
        password_mem: password,
        sex_mem: sex,
        birthday_mem: birthday,
        phone_mem: phone,
        address_mem: address,
        zipcode_mem: zipcode,
        country_mem: country,
      });
      alert("Member added successfully");
      navigate("/search");
    } catch (error) {
      alert("Failed to add member");
    }
  };

  const handlecancel = () => {
    navigate("/search");
  };

  const validateForm = () => {
    if (!name || !email || !password || !birthday || !phone || !address || !zipcode || !country || !sex) {
      alert("กรุณากรอกข้อมูลที่จำเป็น");
      return false;
    }
    return true;
  };

  return (
    <div className="member-insert-container">
      <div className="content-wrapper">
        <h2>ADD MEMBER</h2>
        <form onSubmit={handleAdd}>
          <div className="form-grid">
            <div className="form-group">
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
                  placeholder="@#$%^&*123Abcd"
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
                <option value="">เลือกเพศ</option>
                <option value="1">ชาย</option>
                <option value="2">หญิง</option>
              </select>
            </div>
            <div className="form-group">
              <label>Birthday:</label>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone:</label>
              <input
                placeholder="0123456789"
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
            <button type="submit" className="save-button">
              Save
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => handlecancel()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .member-insert-container {
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

        h2 {
          margin-bottom: 2rem;
          color: #fff;
          text-align: center;
          font-size: 1.8rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
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

        input:hover,
        select:hover,
        textarea:hover {
          background: rgba(255, 255, 255, 1);
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

        textarea {
          resize: vertical;
          min-height: 80px;
          max-height: 150px;
        }

        select {
          cursor: pointer;
          appearance: none;
          padding-right: 2rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.7rem center;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2.5rem;
          padding: 0 1rem;
        }

        .save-button {
          width: 180px;
          padding: 0.9rem;
          background: rgba(3, 255, 16, 0.8);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-button {
          width: 180px;
          padding: 0.9rem;
          background: rgba(255, 3, 3, 0.8);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .save-button:hover {
          background: rgba(89, 252, 116, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(105, 9, 230, 0.3);
        }

        .cancel-button:hover {
          background: rgba(241, 72, 72, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(105, 9, 230, 0.3);
        }

        .save-button:active,
        .cancel-button:active {
          transform: translateY(-1px);
        }

        .password-input {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-input input {
          padding-right: 40px;
        }

        .password-toggle {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .password-toggle:hover {
          transform: scale(1.1);
        }

        .password-toggle:focus {
          outline: none;
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
export default MemberInsert;
