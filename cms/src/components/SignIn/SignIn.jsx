import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../../public/logo.png";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();


  // Logic of the  form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {email , password};
      try {
        const response = await fetch('http://localhost:4200/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success && data.role === 'admin') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          localStorage.setItem('role', data.role);
          localStorage.setItem('firstName', data.firstName);
          localStorage.setItem('lastName', data.lastName);
          navigate('/dashboard');
        } else {
          setError(data.message);
          setAttempts(attempts + 1);
          if (attempts >= 2) {
            setError('Maximum attempts reached. Please try again later.');
          } else {
            setError('Invalid email or password. Please try again.');
          }
        }
      } catch (error) {
        setError(error.message);
      }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-90">
      <div className="card shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            <img src={logo} alt="logo" width={50}/> <br />
            Admin Sign In </h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn custom-button2 w-100" disabled={attempts >= 3}>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
