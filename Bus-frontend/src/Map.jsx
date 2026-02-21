import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css"

const BusTracker = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [location, setLocation] = useState({ lat: 30.8773, lng: 76.8723 });
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [speed, setSpeed] = useState("--");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Custom bus icon
  const busIcon = L.divIcon({
    className: "",
    html: `
      <div style="
        width:44px;height:44px;border-radius:50%;
        background:#f59e0b;border:3px solid #fff;
        box-shadow:0 4px 16px rgba(245,158,11,.6);
        display:flex;align-items:center;justify-content:center;
        font-size:22px;
        animation:markerPulse 2s ease-in-out infinite;
      ">🚌</div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });

  useEffect(() => {
    // Inject marker pulse keyframe
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes markerPulse {
        0%,100%{transform:scale(1);box-shadow:0 4px 16px rgba(245,158,11,.6);}
        50%{transform:scale(1.15);box-shadow:0 6px 24px rgba(245,158,11,.9);}
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    // Initialize map only once
    mapRef.current = L.map("map").setView([location.lat, location.lng], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // Add initial marker
    markerRef.current = L.marker([location.lat, location.lng], { icon: busIcon })
      .addTo(mapRef.current)
      .bindPopup(`
        <div style="font-family:sans-serif;font-size:13px;font-weight:600;color:#1e293b;padding:4px 6px;">
          🚌 Campus Bus — Live
        </div>
      `);

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://your-server-url/get-location")
        .then((res) => res.json())
        .then((data) => {
          if (data.latitude && data.longitude) {
            const lat = parseFloat(data.latitude);
            const lng = parseFloat(data.longitude);

            // Simulate speed from delta (optional display logic)
            const dist = Math.abs(lat - location.lat) + Math.abs(lng - location.lng);
            setSpeed(Math.round(dist * 111000 * 0.72)); // rough km/h approx

            setLocation({ lat, lng });
            setLastUpdated(new Date());
            setIsLive(true);

            if (markerRef.current) {
              markerRef.current.setLatLng([lat, lng]);
              mapRef.current.setView([lat, lng]);
            }
          }
        })
        .catch(() => setIsLive(false));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (d) =>
    d ? d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--";

  const recenter = () => {
    if (mapRef.current) mapRef.current.setView([location.lat, location.lng], 15);
  };

  return (
    <>
      <div className="bt-root">
        {/* Map */}
        <div id="map" />

        {/* Top bar */}
        <div className="bt-topbar">
          <div className="bt-brand">
            <div className="bt-dot" />
            BUSTRACK
          </div>

          <div className={`bt-live-badge ${isLive ? "on" : "off"}`}>
            {isLive ? "LIVE" : "CONNECTING"}
          </div>

          <a href="/dashboard" className="bt-back-btn">
            ← Dashboard
          </a>
        </div>

        {/* Sidebar toggle */}
        <div
          className={`bt-toggle ${sidebarOpen ? "open" : "closed"}`}
          onClick={() => setSidebarOpen(p => !p)}
          title={sidebarOpen ? "Hide panel" : "Show panel"}
        >
          {sidebarOpen ? "‹" : "›"}
        </div>

        {/* Sidebar */}
        <div className={`bt-sidebar ${sidebarOpen ? "" : "closed"}`}>
          <div className="section-title">Bus Status</div>

          <div className="stat-card">
            <div className="stat-label">Status</div>
            <div className={`stat-value ${isLive ? "green" : "amber"}`}>
              {isLive ? "ON ROUTE" : "WAITING"}
            </div>
            <div className="stat-sub">Chitkara Campus Express</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Last Updated</div>
            <div className="stat-value amber" style={{ fontSize: 22 }}>
              {formatTime(lastUpdated)}
            </div>
            <div className="stat-sub">Refreshes every 5 seconds</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Est. Speed</div>
            <div className="stat-value">
              {typeof speed === "number" ? speed : "--"}
              <span style={{ fontSize: 14, color: "#64748b", marginLeft: 4 }}>km/h</span>
            </div>
          </div>

          <div className="section-title" style={{ marginTop: 8 }}>Coordinates</div>

          <div className="stat-card">
            <div className="coord-row">
              <span className="coord-key">Latitude</span>
              <span className="coord-val">{location.lat.toFixed(5)}</span>
            </div>
            <div className="coord-row" style={{ borderBottom: "none" }}>
              <span className="coord-key">Longitude</span>
              <span className="coord-val">{location.lng.toFixed(5)}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="bt-actions">
          <div className="action-btn" onClick={recenter} title="Re-center map">
            🎯
          </div>
          <div
            className="action-btn"
            title="Zoom in"
            onClick={() => mapRef.current?.zoomIn()}
          >
            ＋
          </div>
          <div
            className="action-btn"
            title="Zoom out"
            onClick={() => mapRef.current?.zoomOut()}
          >
            −
          </div>
        </div>

        {/* Bottom strip */}
        <div className="bt-strip">
          <div className="strip-item">🚌 <span>Route 2 — Chitkara Express</span></div>
          <div className="strip-item">📍 <span>Chitkara University, Baddi Himachal</span></div>
          <div className="strip-item">🔄 <span>Auto-refresh: 5s</span></div>
        </div>
      </div>
    </>
  );
};

export default BusTracker;