import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate= useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const res = await axios.post('/api/v1/login', {
            email: formData.email,
            password: formData.password,
        });

        // console.log(res);

        if (res.data.success) {
            toast.success("login successfull");
            setFormData({
                email: '',
                password: '',
            });
        }

        navigate('/subscription');
    } catch (error) {
        // console.log(error);

        if (error.response && error.response.status === 400 && error.response.data.errors) {
            const errorMessages = error.response.data.errors;
            toast.error(errorMessages.join('\n'));
        } else {
            toast.error("An error occurred while processing your request");
        }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      <Link to={'/signup'}>Signup</Link>

      </form>
    </div>
  );
};

export default Login;
