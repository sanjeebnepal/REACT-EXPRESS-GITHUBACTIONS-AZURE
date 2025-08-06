import React, { useState } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  input: {
    padding: 14,
    fontSize: 18,
    borderRadius: 10,
    border: '2px solid #764ba2',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: 16,
    fontSize: 18,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(45deg, #764ba2, #667eea)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '700',
    boxShadow: '0 6px 14px rgba(118, 75, 162, 0.5)',
    transition: 'background 0.3s',
  },
  message: {
    marginTop: 18,
    fontWeight: '700',
    color: '#ffd700',
    textShadow: '0 0 5px #ffd700',
  },
};

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setUser(null);

    try {
      const res = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setMessage('Login successful!');
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (err) {
      setMessage('Login failed');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Login</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <p style={styles.message}>{message}</p>

      {user && (
        <div style={{ marginTop: 20, color: '#ffd700' }}>
          <h3>Welcome, {user.username}!</h3>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
}
