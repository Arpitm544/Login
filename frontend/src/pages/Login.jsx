import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);      
  const navigate = useNavigate(); 

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', form);
      const token = res.data.token;
      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err) {
     console.error(err);
     alert('Error on Login')
    }
  };

  return (
    <>
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
          <h2>Login</h2>
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
              fontSize: '16px'
            }}
          >
            Login
          </button>
          <div
            style={{
              marginTop: '15px',
              textAlign: 'center',
              fontSize: '14px'
            }}
          >
            <p>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>

      {error && (
        <div
          style={{
            color: 'red',
            textAlign: 'center',
            marginTop: '20px'
          }}
        >
          {error}
        </div>
      )}
    </>
  );
}