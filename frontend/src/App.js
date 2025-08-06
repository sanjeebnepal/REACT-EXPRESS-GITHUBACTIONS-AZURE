import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const styles = {
  container: {
    maxWidth: 420,
    margin: '60px auto',
    padding: 30,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    borderRadius: 12,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    boxShadow: '0 8px 30px rgba(118, 75, 162, 0.4)',
    color: 'white',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 25,
    gap: 12,
  },
  button: isActive => ({
    padding: '12px 28px',
    cursor: 'pointer',
    borderRadius: 30,
    border: '2px solid white',
    backgroundColor: isActive ? 'white' : 'transparent',
    color: isActive ? '#764ba2' : 'white',
    fontWeight: '700',
    fontSize: 16,
    boxShadow: isActive ? '0 4px 10px rgba(118, 75, 162, 0.4)' : 'none',
    transition: 'all 0.3s ease',
  }),
};

function App() {
  const [page, setPage] = useState('login');

  return (
    <div style={styles.container}>
      <div style={styles.buttonGroup}>
        <button
          style={styles.button(page === 'login')}
          onClick={() => setPage('login')}
        >
          Login
        </button>
        <button
          style={styles.button(page === 'register')}
          onClick={() => setPage('register')}
        >
          Register
        </button>
      </div>

      {page === 'login' ? <Login /> : <Register />}
    </div>
  );
}

export default App;
