
// Load charts after user is authenticated
firebase.auth().onAuthStateChanged(user => {
  if (user && document.getElementById("chart-container")) {
    const uid = user.uid;
    const db = firebase.database().ref("patients/" + uid);

    const hrChartCtx = document.getElementById("hrChart").getContext("2d");
    const tempChartCtx = document.getElementById("tempChart").getContext("2d");

    const hrData = { labels: [], datasets: [{ label: "Heart Rate", borderColor: "#00ff99", data: [] }] };
    const tempData = { labels: [], datasets: [{ label: "Temperature", borderColor: "#ffaa00", data: [] }] };

    const hrChart = new Chart(hrChartCtx, {
      type: "line",
      data: hrData,
      options: { responsive: true, scales: { y: { beginAtZero: false } } }
    });

    const tempChart = new Chart(tempChartCtx, {
      type: "line",
      data: tempData,
      options: { responsive: true, scales: { y: { beginAtZero: false } } }
    });

    db.on("value", snap => {
      const data = snap.val();
      const now = new Date().toLocaleTimeString();
      if (data) {
        hrData.labels.push(now);
        hrData.datasets[0].data.push(data.heartRate);
        if (hrData.labels.length > 10) {
          hrData.labels.shift();
          hrData.datasets[0].data.shift();
        }
        hrChart.update();

        tempData.labels.push(now);
        tempData.datasets[0].data.push(data.temperature);
        if (tempData.labels.length > 10) {
          tempData.labels.shift();
          tempData.datasets[0].data.shift();
        }
        tempChart.update();
      }
    });
  }
});
