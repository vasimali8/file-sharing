
document.addEventListener("DOMContentLoaded", () => {
  
  const fileInput = document.getElementById("file");

  

  const copyIcon = document.getElementById("copy-icon");
  const linkElement = document.getElementById("link");
//   const browseButton = document.getElementById('browse-elements');
const browseButton = document.getElementById('browseButton');

  const uploadForm = document.getElementById('uploadForm');
  const createLinkButton = document.querySelector('.Link-button');

  const link = linkElement ? linkElement.href : null;

  copyIcon?.addEventListener("click", () => {
    if (link) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  });

//   document
//     .querySelector(".file-label span")
//     .addEventListener("click", function () {
//       fileInput.click();
//     });


browseButton.addEventListener('click', function () {
    fileInput.click();
});




fileInput.addEventListener('change', function (event) {
    event.stopPropagation();
  });




  document
    .getElementById("show-password")
    .addEventListener("change", function () {
      const passwordSection = document.getElementById("password-section");
      if (this.checked) {
        passwordSection.style.display = "block";
      } else {
        passwordSection.style.display = "none";
      }

      passwordSection.style.display = none;
    });

  if (link) {
    document.getElementById("option-password").style.display = "none";
    document.getElementById("password-section").style.display = "none";
  }


//   createLinkButton.addEventListener('click', function(event) {
//     // Check if no file is selected
//     if (!fileInput.files.length) {
//         alert('Please choose a file first.');
//         event.preventDefault(); // Prevent the default action (form submission)
//     }
// });


createLinkButton.addEventListener('click', function(event) {
    
    if (!fileInput.files.length) {
        alert('Please choose a file first.');
        event.preventDefault(); 
    } 
});





 
});


