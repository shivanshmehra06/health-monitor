function login() {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(() => {
      if (role === "doctor") {
        window.location.href = "doctor-dashboard.html";
      } else {
        window.location.href = "patient-dashboard.html";
      }
    }).catch(err => {
      alert(err.message);
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  });
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const uid = user.uid;
    const db = firebase.database();

    // Doctor Dashboard
    if (document.getElementById("patients")) {
      const ref = db.ref("patients");
      ref.on("value", snapshot => {
        let html = "";
        snapshot.forEach(child => {
          const data = child.val();
          html += `<div class="patient-box">
                    <h3>${child.key}</h3>
                    <p>Heart Rate: ${data.heartRate} bpm</p>
                    <p>Temperature: ${data.temperature} °C</p>
                   </div>`;
        });
        document.getElementById("patients").innerHTML = html;
      });
    }

    // Patient Dashboard
    if (document.getElementById("mydata")) {
      const ref = db.ref("patients/" + uid);
      ref.on("value", snap => {
        document.getElementById("hr").textContent = snap.val().heartRate;
        document.getElementById("temp").textContent = snap.val().temperature;
      });
    }

  }
});
