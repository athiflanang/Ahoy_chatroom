import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      navigate('/'); // Redirect to topic selection after login
    }
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center'> 
      <div className="p-4 w-[50vh] justify-center  flex flex-col">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="p-2 border mb-4"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
