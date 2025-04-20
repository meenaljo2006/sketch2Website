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
  window.location.href = "index.html";
})

//REDIRECT FROM LOGO
let logo = document.querySelector(".logo");
logo.addEventListener("click", function(){
    window.location.href = 'dashboard.html';
});
  
//UPLOAD FILE  & CODE GENERATION
const browseBtn = document.getElementById("browseBtn");
const fileInput = document.getElementById("sketchUpload");
const fileNameDisplay = document.getElementById("fileName");
const titleInput = document.getElementById("Title");

const generateCodeBtn = document.getElementById("generateCodeBtn");
const codeContainer = document.querySelector(".code-container");
const codeBox = document.getElementById("codeBox");

browseBtn.addEventListener("click", () => {
  fileInput.click(); // input file triggered
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file){
    alert("Please select a file to upload.");
    return;
  }

  uploadSketch(file);  // Upload the file

});


async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  const response = await fetch("https://api.testproject.live/users/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refresh: refreshToken })
  });

  if (response.ok) {
    const result = await response.json();
    localStorage.setItem("accessToken", result.access); // Store the new access token
    return result.access; // Return the new access token
  } else {
    throw new Error("Failed to refresh access token");
  }
}
  
// UPLOADING SKETCH TO SERVER
async function uploadSketch(file) {
  
  const formData = new FormData();
  formData.append("image", file);

  const title = titleInput.value.trim() || "New Sketch";
  const description = new Date().toLocaleString();
  
  formData.append("title", title); 
  formData.append("description", description);  


  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    let accessToken = localStorage.getItem("accessToken");
    const response = await fetch("https://api.testproject.live/vision/api/wireframes/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
      body: formData
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      
      fileNameDisplay.textContent = `Selected: ${file.name}`; // Show file name

      // Show image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.maxWidth = "200px";

        const uploadBox = document.querySelector(".upload-box");
        const existingImg = uploadBox.querySelector("img");
        if (existingImg) existingImg.remove();

        uploadBox.appendChild(img);

      };

      reader.readAsDataURL(file);

      console.log(result.id);
      localStorage.setItem("lastUploadedId", result.id);

      // Display generated code button
      generateCodeBtn.style.display = "inline-block"; 

      generateCodeBtn.addEventListener("click", async () => {
      const combinedCode = `<!-- HTML FILE -->\n${result.generated_code.html}\n\n\n/* CSS- STYLING */\n\n${result.generated_code.css}\n\n\n/*JAVASCRIPT*/\n\n${result.generated_code.javascript}`;
      document.getElementById("popupCodeBox").innerText = combinedCode;
      document.getElementById("codePopup").style.display = "flex";

});

    } else {
      alert("Upload failed: " + (result.message || "Unknown error"));
    }

  } catch (error) {
    alert("Something went wrong while uploading.");
    console.error(error);
  }
}


// CLOSE BUTTON - POPUP
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("codePopup").style.display = "none";
});
  
  
  