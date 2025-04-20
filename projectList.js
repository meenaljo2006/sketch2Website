// LOGOUT BUTTON
let logoutbtn = document.querySelector(".logout");
logoutbtn.addEventListener("click",function(){
  localStorage.clear();
  window.location.href = "index.html";
});

//LOGIN CREDENTIALS PART
window.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const initials = name.split(" ").map(word => word[0]).join("").toUpperCase();

  document.getElementById("userInitials").innerText = initials;
  document.getElementById("username").innerText = name;
  document.getElementById("email").innerText = email;
  
});

//REDIRECT FROM LOGO
let logo = document.querySelector(".logo");
logo.addEventListener("click", function(){
    window.location.href = 'dashboard.html';
});

//SHOWING THE PROJECT LIST
let accessToken = localStorage.getItem("accessToken");
fetch("https://api.testproject.live/vision/api/wireframes/user/", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${accessToken}`, 
    "Content-Type": "application/json"
  }
})

.then(response => response.json())
.then(data => {
  console.log("Wireframes:", data);

  const projectList = document.querySelector('.projectList');

  if (data.length > 0) {
    data.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <img src="http://13.50.217.154${project.image}" alt="${project.title}">
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        <button class="code">View Source Code</button>
      `;

      const button = card.querySelector('.code');
      button.addEventListener('click', () => {
        showCodePopup(project.generated_code);
      });

      projectList.appendChild(card);
    });

  } else {
    projectList.innerHTML = `<p class="no-projects">No projects found.</p>`;
  }
})
.catch(error => {
  console.error("Error fetching wireframes:", error);
  document.querySelector('.projectList').innerHTML = `<p class="no-projects">Failed to load projects.</p>`;
});



function showCodePopup(code) {
  document.getElementById('code-html').textContent = code.html;
  document.getElementById('code-css').textContent = code.css;
  document.getElementById('code-js').textContent = code.javascript;

  document.getElementById('codePopup').classList.remove('hidden');
}

document.querySelector('.close-btn').addEventListener('click', () => {
  document.getElementById('codePopup').classList.add('hidden');
});