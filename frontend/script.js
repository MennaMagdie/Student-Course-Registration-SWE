// Shared JavaScript functions

// Check if user is logged in
function checkLogin() {
  const studentId = localStorage.getItem('studentId');
  if (!studentId) {
    window.location.href = 'login.html';
  }
}

// Show message to user
function showMessage(msg, type) {
  const msgBox = document.getElementById('messageBox');
  if (msgBox) {
    msgBox.innerHTML = `<div class="message ${type}">${msg}</div>`;
  }
}

// API base URL
const API_URL = 'http://localhost:3000';
