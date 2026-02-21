import "./Dashboard.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [time, setTime] = useState(new Date());
  const [busPosition, setBusPosition] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('username');
    setUsername(user || 'User');

    // Clock
    const clock = setInterval(() => setTime(new Date()), 1000);

    // Animated bus
    const bus = setInterval(() => {
      setBusPosition(prev => (prev >= 110 ? -10 : prev + 0.3));
    }, 16);

    return () => {
      clearInterval(clock);
      clearInterval(bus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  const handleTrackBus = () => {
    navigate('/map');
  };

  const formatTime = (d) =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (d) =>
    d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const stats = [
    { label: 'Routes Active', value: '12', icon: '🗺️' },
    { label: 'Buses Live', value: '4', icon: '🚌' },
    { label: 'Avg Delay', value: '3 min', icon: '⏱️' },
    { label: 'Stops Covered', value: '10', icon: '📍' },
  ];

  return (
    <>
      <div className="db-root">
        {/* Background */}
        <div className="sky">
          <div className="stars" />
          <div className="windows" />
          <div className="city-silhouette" />
          <div className="road">
            <div className="road-line" />
          </div>
          <div className="bus-track">
            <svg
              className="bus-svg"
              style={{ left: `${busPosition}%` }}
              viewBox="0 0 120 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bus body */}
              <rect x="2" y="4" width="116" height="36" rx="6" fill="#1e3a5f" />
              <rect x="2" y="4" width="116" height="36" rx="6" stroke="#f59e0b" strokeWidth="1.5" />
              {/* Roof accent */}
              <rect x="6" y="4" width="108" height="6" rx="3" fill="#f59e0b" opacity="0.8" />
              {/* Windows */}
              <rect x="10" y="13" width="18" height="14" rx="2" fill="#93c5fd" opacity="0.7" />
              <rect x="34" y="13" width="18" height="14" rx="2" fill="#93c5fd" opacity="0.7" />
              <rect x="58" y="13" width="18" height="14" rx="2" fill="#93c5fd" opacity="0.7" />
              <rect x="82" y="13" width="18" height="14" rx="2" fill="#93c5fd" opacity="0.5" />
              {/* Door */}
              <rect x="100" y="13" width="14" height="20" rx="2" fill="#1e40af" stroke="#f59e0b" strokeWidth="1" />
              {/* Wheels */}
              <circle cx="25" cy="42" r="8" fill="#374151" stroke="#6b7280" strokeWidth="2" />
              <circle cx="25" cy="42" r="3" fill="#9ca3af" />
              <circle cx="90" cy="42" r="8" fill="#374151" stroke="#6b7280" strokeWidth="2" />
              <circle cx="90" cy="42" r="3" fill="#9ca3af" />
              {/* Headlights */}
              <circle cx="115" cy="22" r="3" fill="#fef08a" opacity="0.9" />
              {/* Number plate */}
              <rect x="6" y="30" width="22" height="8" rx="1" fill="#1e40af" />
              <text x="17" y="37" textAnchor="middle" fill="#fef08a" fontSize="5" fontFamily="monospace">BUS</text>
            </svg>
          </div>
        </div>

        {/* Main UI */}
        <div className="content">
          {/* Topbar */}
          <header className="topbar">
            <div className="logo">
              <div className="logo-dot" />
              WHERE IS MY BUS
            </div>
            <div className="live-badge">LIVE</div>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </header>

          {/* Hero */}
          <section className="hero">
            <div className="greeting-tag">PASSENGER DASHBOARD</div>
            <h1 className="hero-title">
              Welcome Back,
              <span>{username}</span>
            </h1>
            <p className="hero-sub">
              Real-time bus tracking at your fingertips. Know exactly where your bus is — before you even leave home.
            </p>
            <div className="clock">{formatTime(time)}</div>
            <div className="date-str">{formatDate(time)}</div>
          </section>

          {/* CTA */}
          <section className="cta-section">
            <button className="btn-track" onClick={handleTrackBus}>
              <span className="btn-icon">🚍</span>
              TRACK YOUR BUS NOW
            </button>
          </section>

          {/* Stats */}
          <div className="stats-grid">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Route strip */}
          <div className="route-strip">
            <div className="route-icon">🗺️</div>
            <div className="route-info">
              <div className="route-label">YOUR ACTIVE ROUTE</div>
              <div className="route-text">Kalka → AIRPORT Pinjore → Chitkara university</div>
            </div>
            <div className="route-arrow">›</div>
          </div>

          {/* Ticker */}
          <div className="ticker-wrap">
            <div className="ticker">
              {[...Array(2)].flatMap(() => [
                <div className="ticker-item" key="1a"><span>●</span>Route 12 — On Time</div>,
                <div className="ticker-item" key="2a"><span>●</span>Route 5 — 4 min delay</div>,
                <div className="ticker-item" key="3a"><span>●</span>Airport Express — Running</div>,
                <div className="ticker-item" key="4a"><span>●</span>Route 19 — On Time</div>,
                <div className="ticker-item" key="5a"><span>●</span>Night Bus — Departing Soon</div>,
                <div className="ticker-item" key="6a"><span>●</span>Route 7 — On Time</div>,
              ])}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}