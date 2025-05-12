import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', form);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}
      >
        <h2>Sign Up</h2>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          type="tel"
          pattern="[0-9]{10}"
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            marginBottom: '10px'
          }}
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Go to Login
        </button>
      </form>
    </div>
  );
}