const userList = document.getElementById("userList");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userList.innerHTML = "<p>Loading data...</p>";
  
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    userList.innerHTML = `<p class="error">⚠️ Failed to load data. Please check your internet connection and try again.</p>`;
  }
}

function displayUsers(users) {
  userList.innerHTML = "";
  
  users.forEach(user => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    
    userCard.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city}</p>
    `;
    
    userList.appendChild(userCard);
  });
}

reloadBtn.addEventListener("click", fetchUsers);

// Fetch users on initial load
fetchUsers();
