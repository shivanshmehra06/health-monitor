document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  // Register logic
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const role = document.getElementById('role').value;

      if (password !== confirmPassword) return alert("Passwords do not match");

      auth.createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          return database.ref('users/' + cred.user.uid).set({
            name,
            email,
            role,
            readings: {} // empty object to hold future sensor data
          });
        })
        .then(() => {
          alert("Registered successfully");
          window.location.href = "login.html";
        })
        .catch((error) => alert(error.message));
    });
  }

  // Login logic
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;

      auth.signInWithEmailAndPassword(email, password)
        .then((cred) => {
          return database.ref('users/' + cred.user.uid).once('value');
        })
        .then((snapshot) => {
          const user = snapshot.val();
          if (user.role === "doctor") {
            window.location.href = "doctor-dashboard.html";
          } else {
            window.location.href = "patient-dashboard.html";
          }
        })
        .catch((error) => alert(error.message));
    });
  }

  // Doctor Dashboard - View all patients
  if (document.getElementById('patientsData')) {
    database.ref('users').once('value', (snapshot) => {
      const container = document.getElementById('patientsData');
      snapshot.forEach(child => {
        const user = child.val();
        if (user.role === 'patient' && user.readings) {
          const div = document.createElement('div');
          div.className = 'patient-data';
          div.innerHTML = `
            <h3>${user.name}</h3>
            <pre>${JSON.stringify(user.readings, null, 2)}</pre>
          `;
          container.appendChild(div);
        }
      });
    });
  }

  // Patient Dashboard - Show graph
  if (document.getElementById('healthChart')) {
    auth.onAuthStateChanged(user => {
      if (!user) return;

      const uid = user.uid;
      const chartRef = database.ref('users/' + uid + '/readings');

      chartRef.on('value', (snapshot) => {
        const readings = snapshot.val();
        if (!readings) return;

        const labels = [];
        const pulseData = [];

        Object.keys(readings).forEach(key => {
          labels.push(key);
          pulseData.push(readings[key].pulse || 0); // default to 0 if undefined
        });

        const ctx = document.getElementById('healthChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets: [{
              label: 'Pulse (BPM)',
              data: pulseData,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0,123,255,0.1)',
              fill: true
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      });
    });
  }
});
