import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bus, MapPin, UserCircle, Lock, Mail, School } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [busPos, setBusPos] = useState(-10);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    studentId: '',
    role: 'student',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPos(prev => (prev >= 110 ? -10 : prev + 0.35));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (isLogin) {
      const user = storedUsers.find(
        (u) => u.email === formData.email && u.password === formData.password && u.role === formData.role
      );
      if (user) {
        localStorage.setItem('username', user.name);
        localStorage.setItem('role', user.role);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials! Please try again.');
      }
    } else {
      storedUsers.push(formData);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      alert('Sign Up Successfully!');
      setIsLogin(true);
    }
  };

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <>
      <div className="lg-root">
        {/* ===== LEFT PANEL ===== */}
        <div className="left-panel">
          <div className="city-bg">
            <div className="stars-l" />
            <div className="windows-l" />
            <div className="city-silhouette-l" />
            <div className="road-l">
              <div className="road-line-l" />
            </div>
            <div className="bus-track-l">
              <svg
                className="bus-svg-l"
                style={{ left: `${busPos}%` }}
                viewBox="0 0 120 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="4" width="116" height="36" rx="6" fill="#1e3a5f" />
                <rect x="2" y="4" width="116" height="36" rx="6" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="6" y="4" width="108" height="6" rx="3" fill="#f59e0b" opacity="0.8" />
                <rect x="10" y="13" width="18" height="14" rx="2" fill="#93c5fd" opacity="0.7" />
                <rect x="34" y="13" width="18" height="14" rx="2" fill="#93c5fd" opacity="0.7" />
                <rect x="58" y="13" width="18" height="14" rx="2" fill="#93c5fd" opacity="0.7" />
                <rect x="82" y="13" width="18" height="14" rx="2" fill="#93c5fd" opacity="0.5" />
                <rect x="100" y="13" width="14" height="20" rx="2" fill="#1e40af" stroke="#f59e0b" strokeWidth="1" />
                <circle cx="25" cy="42" r="8" fill="#374151" stroke="#6b7280" strokeWidth="2" />
                <circle cx="25" cy="42" r="3" fill="#9ca3af" />
                <circle cx="90" cy="42" r="8" fill="#374151" stroke="#6b7280" strokeWidth="2" />
                <circle cx="90" cy="42" r="3" fill="#9ca3af" />
                <circle cx="115" cy="22" r="3" fill="#fef08a" opacity="0.9" />
                <rect x="6" y="30" width="22" height="8" rx="1" fill="#1e40af" />
                <text x="17" y="37" textAnchor="middle" fill="#fef08a" fontSize="5" fontFamily="monospace">BUS</text>
              </svg>
            </div>
          </div>

          <div className="lp-content">
            <div className="lp-logo-ring">
              <Bus size={44} color="#f59e0b" />
            </div>
            <div className="lp-brand">CHITKARA BUSTRACK</div>
            <div className="lp-sub">Campus Transit System</div>

            <div className="feature-card">
              <div className="feature-icon"><MapPin size={18} /></div>
              <div>
                <div className="feature-title">Real-time GPS Tracking</div>
                <div className="feature-text">See your bus live on the map</div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><School size={18} /></div>
              <div>
                <div className="feature-title">Campus-wide Coverage</div>
                <div className="feature-text">All routes, all stops covered</div>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><UserCircle size={18} /></div>
              <div>
                <div className="feature-title">Student-friendly Interface</div>
                <div className="feature-text">Designed for daily commuters</div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== RIGHT PANEL ===== */}
        <div className="right-panel">
          <div className="form-card">
            {/* Mobile logo */}
            <div className="mobile-logo">
              <Bus size={24} color="#f59e0b" />
              CHITKARA BUSTRACK
            </div>

            <div className="form-header">
              <div className="form-title">
                {isLogin ? <>WELCOME <span>BACK</span></> : <>JOIN THE <span>RIDE</span></>}
              </div>
              <div className="form-desc">
                {isLogin
                  ? 'Sign in to access your campus bus tracker'
                  : 'Create an account to start tracking campus buses'}
              </div>
            </div>

            {/* Tab toggle */}
            <div className="tab-row">
              <button
                type="button"
                className={`tab-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                type="button"
                className={`tab-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Full Name — signup only */}
              {!isLogin && (
                <div className="field-group slide-in">
                  <label className="field-label" htmlFor="name">Full Name</label>
                  <div className="field-wrap">
                    <span className="field-icon"><UserCircle size={18} /></span>
                    <input
                      className="field-input"
                      type="text"
                      minLength={1}
                      maxLength={25}
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Student ID — signup only */}
              {!isLogin && (
                <div className="field-group slide-in">
                  <label className="field-label" htmlFor="studentId">Student ID</label>
                  <div className="field-wrap">
                    <span className="field-icon"><School size={18} /></span>
                    <input
                      className="field-input"
                      type="text"
                      id="studentId"
                      name="studentId"
                      placeholder="Enter your student ID"
                      value={formData.studentId}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="field-group">
                <label className="field-label" htmlFor="email">Email Address</label>
                <div className="field-wrap">
                  <span className="field-icon"><Mail size={18} /></span>
                  <input
                    className="field-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field-group">
                <label className="field-label" htmlFor="password">Password</label>
                <div className="field-wrap">
                  <span className="field-icon"><Lock size={18} /></span>
                  <input
                    className="field-input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Role */}
              <div className="field-group">
                <label className="field-label" htmlFor="role">
                  {isLogin ? 'Login as' : 'Sign Up as'}
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="field-select"
                  required
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                  <option value="driver">Driver</option>
                </select>
              </div>

              {/* Remember me */}
              {isLogin && (
                <div className="remember-row">
                  <div className="remember-left">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="submit-btn">
                {isLogin ? '🚍 Sign In' : '🚍 Create Account'}
              </button>
            </form>

            <div className="toggle-row">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button onClick={toggleForm} className="toggle-btn" type="button">
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}