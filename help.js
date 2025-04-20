// FILLING USER LOGIN - CREDENTIALS PART
window.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("username");
    const email = localStorage.getItem("email");
  
      const initials = name.split(" ").map(word => word[0]).join("").toUpperCase();
  
      document.getElementById("userInitials").innerText = initials;
      document.getElementById("username").innerText = name;
      document.getElementById("email").innerText = email;
    
});

// LOGOUT BUTTON
let logoutbtn = document.querySelector(".logout");
logoutbtn.addEventListener("click",function(){
  localStorage.clear();
  window.location.href = "dashboard.html";
});

//REDIRECT FROM LOGO
let logo = document.querySelector(".logo");
logo.addEventListener("click", function(){
    window.location.href = 'dashboard.html';
});
