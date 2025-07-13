# 🩺 Advanced Health Monitoring System

A real-time web-based health dashboard that allows **patients** to view their vital signs and **doctors** to monitor multiple patients using Firebase.

## 🔧 Features
- Firebase Authentication
- Real-time data with Firebase Realtime DB
- Role-based login for doctor/patient
- Live vitals dashboard
- Mobile responsive and animated UI

## 🛠 How to Use
1. Open `index.html`
2. Enter login credentials
3. Role-based redirection to dashboard

## 🧪 Sample DB Format
```
patients: {
  uid123: { heartRate: 72, temperature: 36.5, spo2: 97 }
}
users: {
  uid123: { role: 'patient' }
}
```

## 📦 Deployment
Host via GitHub Pages or Firebase Hosting.
