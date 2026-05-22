import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import './Login.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.6 } }
};

const Login = () => {
  const { login, register, currentUser } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle redirect path (e.g. if redirected from checkout)
  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from);
      }
    }
  }, [currentUser, navigate, from]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      setSuccess('Logged in successfully!');
      setTimeout(() => {
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(from);
        }
      }, 1000);
    } else {
      setError(result.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const result = await register(name, email, password);
    if (result.success) {
      setSuccess('Account created successfully!');
      setTimeout(() => {
        navigate(from);
      }, 1000);
    } else {
      setError(result.message);
    }
  };


  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="login-page container"
    >
      <div className="login-card-wrapper">
        <div className="login-tabs">
          <button 
            className={`tab-btn ${isLoginTab ? 'active' : ''}`}
            onClick={() => { setIsLoginTab(true); setError(''); setSuccess(''); }}
          >
            <LogIn size={18} />
            <span>Sign In</span>
          </button>
          <button 
            className={`tab-btn ${!isLoginTab ? 'active' : ''}`}
            onClick={() => { setIsLoginTab(false); setError(''); setSuccess(''); }}
          >
            <UserPlus size={18} />
            <span>Register</span>
          </button>
        </div>

        <div className="login-form-container">
          <h2>{isLoginTab ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="login-subtitle">
            {isLoginTab 
              ? 'Access your orders, tracking, and details' 
              : 'Join us to explore ancient Ayurvedic hair wellness'}
          </p>

          {error && (
            <div className="auth-alert error-alert">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="auth-alert success-alert">
              <CheckCircle size={16} />
              <span>{success}</span>
            </div>
          )}

          {isLoginTab ? (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <input 
                  type="email" 
                  id="login-email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input 
                  type="password" 
                  id="login-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <div className="form-helper">
                <span className="demo-info">Demo Admin: admin@manushayam.com / admin123</span>
              </div>

              <button type="submit" className="btn-primary auth-submit-btn">
                Sign In
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="reg-name">Full Name</label>
                <input 
                  type="text" 
                  id="reg-name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Email Address</label>
                <input 
                  type="email" 
                  id="reg-email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Password</label>
                <input 
                  type="password" 
                  id="reg-password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-confirm">Confirm Password</label>
                <input 
                  type="password" 
                  id="reg-confirm"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className="btn-primary auth-submit-btn">
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
