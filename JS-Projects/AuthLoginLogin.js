checkSession();

function register() {
  const username = document.getElementById("regUser").value;
  const password = document.getElementById("regPass").value;

  if (!username || !password) {
    setStatus(" All fields required");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    setStatus(" Username already exists");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  setStatus(" Registered successfully");
}

function login() {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    setStatus("Invalid credentials");
    return;
  }

  const session = {
    username,
    isLoggedIn: true,
  };

  localStorage.setItem("session", JSON.stringify(session));

  loadDashboard(session);
}

function logout() {
  localStorage.removeItem("session");
  document.getElementById("dashboard").style.display = "none";
  setStatus("Logged out");
}

function checkSession() {
  const session = JSON.parse(localStorage.getItem("session"));

  if (session && session.isLoggedIn) {
    loadDashboard(session);
  }
}

function loadDashboard(session) {
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("welcome").innerText = `Welcome, ${session.username}`;
  setStatus(" Logged in");
}

function setStatus(msg) {
  document.getElementById("status").innerText = msg;
}
