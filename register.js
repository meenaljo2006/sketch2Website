// CHANGING THE TAB
let btn = document.querySelector(".signIn");
btn.addEventListener("click", function(){
    window.location.href = 'login.html';
});

//REDIRECT FROM LOGO
let logo = document.querySelector(".logo");
logo.addEventListener("click", function(){
    window.location.href = 'index.html';
});

// REDIRECTING TO DASHBOARD
document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    const data = {
      username,
      email,
      password,
      password2: confirmPassword,
    };
  
    try {
      const response = await fetch("https://api.testproject.live/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log(result);
    
      

      if (response.ok) {

        console.log("registration succesfull");
        console.log(result);

          localStorage.setItem("username", result.user.username);
          localStorage.setItem("email", result.user.email);

          localStorage.setItem("refreshToken", result.refresh);
          localStorage.setItem("accessToken", result.access);
  
          window.location.href = "dashboard.html";
      } 
      else if(!response.ok){

        if (result.email) {
          document.getElementById("email-error").innerText = result.email.join(" ");
        }
        if (result.username) {
          document.getElementById("username-error").innerText = result.username.join(" ");
        }
        if (result.password) {
          document.getElementById("password-error").innerText = result.password.join(" ");
        }

      }
      else {
      alert("Registration failed: " + result.message);
      }

    } catch (err) {
      alert("Something went wrong");
    }
   
});

