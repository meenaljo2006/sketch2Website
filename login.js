// CHANGING THE TAB
let btn = document.querySelector(".register");
btn.addEventListener("click", function(){
    window.location.href = 'register.html';
});

//REDIRECT FROM LOGO
let logo = document.querySelector(".logo");
logo.addEventListener("click", function(){
    window.location.href = 'index.html';
});

//REDIRECTING TO DASHBAOARD
document.getElementById("login").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch("https://api.testproject.live/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password })
      });

      console.log(email, password); // Check values

      
      const result = await response.json();

      console.log(result);
  
      if (response.ok) {

        localStorage.setItem("username", result.user.username); 
        localStorage.setItem("email", result.user.email);

        localStorage.setItem("refreshToken", result.refresh);
        localStorage.setItem("accessToken", result.access);
        window.location.href = "dashboard.html";

      } else {
        alert("Login failed: Invalid credentials ! Register the user first.");
      }
  
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }

});
  

