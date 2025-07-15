// auth/auth.js
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { auth, database } from "../js/firebase-config.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "../Login.html";
  } else {
    const roleRef = ref(database, 'users/' + user.uid + '/role');
    const snapshot = await get(roleRef);
    const role = snapshot.val();
    if (!role) {
      alert("No role assigned. Please contact admin.");
      return;
    }
    console.log("Logged in as:", role);
  }
});