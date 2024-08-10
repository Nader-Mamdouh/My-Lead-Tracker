import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  remove,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuSBKfljgY4IuWrIL8AP6lgb-W6cFUNLg",
  authDomain: "my-leads-tracker-71350.firebaseapp.com",
  databaseURL:
    "https://my-leads-tracker-71350-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-leads-tracker-71350",
  storageBucket: "my-leads-tracker-71350.appspot.com",
  messagingSenderId: "29478528620",
  appId: "1:29478528620:web:69e834ef2cf7b9b38f5a49",
  measurementId: "G-6S9S9MB02C",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const referenceINDB = ref(database, "Leads");

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i]}'>
          ${leads[i]}
        </a>
      </li>
    `;
  }
  ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("click", function () {
  remove(referenceINDB)
    .then(() => {
      ulEl.innerHTML = "";
    })
    .catch((error) => {
      console.error("Error removing leads: ", error);
    });
});

inputBtn.addEventListener("click", function () {
  const newLead = inputEl.value.trim();
  if (newLead !== "") {
    push(referenceINDB, newLead);
    inputEl.value = "";
  }
});

// Listen for changes in the database and update the UI
onValue(referenceINDB, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    const leads = Object.values(data);
    render(leads);
  } else {
    ulEl.innerHTML = ""; // Clear the list if no data
  }
});
