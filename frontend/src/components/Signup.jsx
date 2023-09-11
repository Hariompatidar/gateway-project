import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading]= useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post('/api/v1/signup', {
            name: formData.username,
            email: formData.email,
            password: formData.password,
        });

        console.log(res);

        if (res.data.success) {
            toast.success("Signup successfull");
            setFormData({
                username: '',
                email: '',
                password: '',
            });
        }
        setLoading(false);
    } catch (error) {
        // console.log(error);
        setLoading(false);

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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
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
        {
            loading?(<div>
                Loading ...
            </div>):(
                <button type="submit">Signup</button>
            )
        }
      <Link to={'/login'}>Login</Link>
      </form>
    </div>
  );
};

export default Signup;
