// demobtn video - scroll
let btn = document.querySelector(".demoBtn");
let target = document.querySelector("#demo")
btn.addEventListener("click", function(){
    target.scrollIntoView({ behavior: "smooth" });
});

// SignUp - click
let signupBtn = document.querySelector('.signup');
signupBtn.addEventListener('click', function() {
    window.location.href = 'register.html';
});

// login - click
let loginBtn = document.querySelector('.login');
loginBtn.addEventListener('click', function() {
    window.location.href = 'login.html';
});


