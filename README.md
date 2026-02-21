## 🚌 Where Is My Bus

A real-time bus tracking system that allows users to track the live location of buses on a map using GPS and GSM technology.

This project uses Arduino + GSM module to send GPS coordinates to a backend server, which then displays the live bus location on a web interface built with React and Leaflet.

# 🚀 Features

📍 Real-time bus location tracking

🌍 Live map display using OpenStreetMap

🔄 Auto-refreshing bus coordinates

🔐 Login & Signup system

📡 GPS tracking using Arduino + GSM module

☁️ Backend deployed on Render

# 📱 Responsive UI

🛠️ Tech Stack
🔹 Frontend

React (Vite)

Leaflet.js

OpenStreetMap

HTML5

CSS3

JavaScript

# 🔹 Backend

Node.js

Express.js

JSON file storage (for GPS data)

Render (Deployment)

# 🔹 Hardware

Arduino Uno

GSM 808 Module

GPS Antenna

SIM Card (with internet)

9V Battery

Jumper Wires

# 📡 How It Works

GPS module collects real-time latitude and longitude.

Arduino reads GPS coordinates.

GSM module sends coordinates to backend server via HTTP request.

Backend stores the location data.

React frontend fetches location data.

Leaflet displays the live bus location on OpenStreetMap.

# 🧠 System Architecture

Arduino + GPS → GSM Module → Node.js Backend → React Frontend → Leaflet Map

# Arduino Setup

Insert SIM card into GSM module

Connect GPS antenna

Upload gps_gsm_code.ino to Arduino

Update backend URL in Arduino code

# 🌍 Live Demo

# 🔗 Backend: https://bus-backend-vnxc.onrender.com

# 🔗 Frontend: https://whereismybus-ten.vercel.app
------------------------------------------------------------
# 🔐 Authentication

User Signup

User Login

Redirect to Dashboard

Access live bus tracking after login

# 🎯 Future Improvements

Multiple bus tracking

Admin panel

Route selection

Estimated arrival time (ETA)

Mobile App version

Database integration (MongoDB)
