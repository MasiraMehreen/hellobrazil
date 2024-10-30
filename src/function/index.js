// Create a container for the content
const container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

// Set background video
const video = document.createElement("video");
video.src = "https://pin.it/6JF0nA3oB";  
video.autoplay = true;
video.muted = true;
video.loop = true;
video.style.position = "fixed";
video.style.top = "50%";
video.style.left = "50%";
video.style.width = "100vw";
video.style.height = "100vh";
video.style.objectFit = "cover";
video.style.transform = "translate(-50%, -50%)";
video.style.zIndex = "-1";
document.body.appendChild(video);

// Set background audio
const audio = document.createElement("audio");
audio.src = "https://pixabay.com/sound-effects/relaxing-ocean-waves-high-quality-recorded-177004/";
audio.autoplay = true;
audio.loop = true;
document.body.appendChild(audio);

// Language Toggle Button
const toggleButton = document.createElement("button");
toggleButton.textContent = "Switch Language";
toggleButton.style.position = "fixed";
toggleButton.style.top = "20px";
toggleButton.style.right = "20px";
toggleButton.style.padding = "10px 15px";
toggleButton.style.background = "#0066cc";
toggleButton.style.color = "white";
toggleButton.style.border = "none";
toggleButton.style.cursor = "pointer";
toggleButton.style.borderRadius = "5px";
toggleButton.style.fontSize = "16px";
toggleButton.onclick = toggleLanguage;
document.body.appendChild(toggleButton);

// Function to display the personalized message
function displayMessage(name, language) {
    const heart = `&#9829;`;  // HTML entity for heart symbol
    let message;

    if (language === 'pt') {
        message = `Olá, pessoas maravilhosas! Se você se sentir para baixo na vida, lembre-se: o Brasil é tão longo que leva uma semana para dirigir de um lado a outro. Você tem tempo, amigo! Desejando um dia feliz e saudável, ${name} ${heart}`;
    } else {
        message = `Hello, wonderful people! If you ever feel down about life, remember: Brazil is so long, it takes a week to drive from one end to the other. You've got time, friend! Wishing you a happy and healthy day, ${name} ${heart}`;
    }

    // Apply message with inline styling
    const targetElement = document.getElementById("container");
    targetElement.innerHTML = `
        <div style="padding: 20px; max-width: 600px; background: rgba(0, 0, 0, 0.6); border-radius: 10px; color: white; text-align: center;">
            <p>${message}</p>
        </div>
    `;
}

// Initial prompt for the user's name and display message
let currentLanguage = 'en';
window.onload = function() {
    const name = prompt("Please enter your name:");
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    displayMessage(capitalizedName, currentLanguage);
}

// Language toggle function
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    const name = prompt("Please enter your name:");
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    displayMessage(capitalizedName, currentLanguage);
}
