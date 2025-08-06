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
    border: '2px solid #28a745',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: 16,
    fontSize: 18,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(45deg, #28a745, #218838)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '700',
    boxShadow: '0 6px 14px rgba(40, 167, 69, 0.5)',
    transition: 'background 0.3s',
  },
  message: {
    marginTop: 18,
    fontWeight: '700',
    color: '#c3e6cb',
    textShadow: '0 0 5px #c3e6cb',
  },
  successBox: {
    marginTop: 20,
    padding: 14,
    backgroundColor: 'rgba(40, 167, 69, 0.2)',
    borderRadius: 10,
    color: '#218838',
    fontWeight: '600',
  },
};

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    setRegisteredUser(null);

    try {
      const res = await fetch(`${BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setRegisteredUser({ username: form.username, email: form.email });
        setMessage('Registration successful!');
        setForm({ username: '', email: '', password: '' }); // clear form
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 20, color: '#28a745' }}>Register</h2>
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
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
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
          Register
        </button>
      </form>
      <p style={styles.message}>{message}</p>

      {registeredUser && (
        <div style={styles.successBox}>
          <p>Welcome, <strong>{registeredUser.username}</strong>! You have successfully registered with the email <strong>{registeredUser.email}</strong>.</p>
        </div>
      )}
    </div>
  );
}
