/**
 * Handle Request
 * This is the input function where you can perform your implementation.
 * @param {Request} request https://developer.mozilla.org/en-US/docs/Web/API/Request
 * @param {*} args function args e.g args.my_secret
 * @returns {Response} https://developer.mozilla.org/en-US/docs/Web/API/Response
 */
async function handleRequest(request, args) {
  // HTML content with JavaScript for video, audio, and personalized message
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Hello World with Media</title>
      <style>
        body { margin: 0; font-family: Arial, sans-serif; }
        #container { text-align: center; padding: 20px; }
        video { position: fixed; top: 50%; left: 50%; width: 100vw; height: 100vh; object-fit: cover; transform: translate(-50%, -50%); z-index: -1; }
        button { position: fixed; top: 20px; right: 20px; padding: 10px 15px; background: #0066cc; color: white; border: none; cursor: pointer; border-radius: 5px; font-size: 16px; }
      </style>
    </head>
    <body>
      <div id="container"></div>
      <video src="https://v1.pinimg.com/videos/mc/720p/c2/33/1f/c2331f4a5fc4115a12348ebb56c9fa6f.mp4" autoplay muted loop></video>
      <audio src="https://example.com/path/to/your-audio.mp3" autoplay loop></audio>
      <button onclick="toggleLanguage()">Switch Language</button>
      
      <script>
        function displayMessage(name, language) {
          const heart = '&#9829;';
          let message;
          if (language === 'pt') {
            message = \`Olá, pessoas maravilhosas! Desejando um dia feliz e saudável, \${name} \${heart}\`;
          } else {
            message = \`Hello, wonderful people! Wishing you a happy and healthy day, \${name} \${heart}\`;
          }
          document.getElementById("container").innerHTML = \`
            <div style="padding: 20px; max-width: 600px; background: rgba(0, 0, 0, 0.6); border-radius: 10px; color: white; text-align: center;">
              <p>\${message}</p>
            </div>
          \`;
        }
        
        let currentLanguage = 'en';
        window.onload = function() {
          const name = prompt("Please enter your name:");
          displayMessage(name, currentLanguage);
        }
        
        function toggleLanguage() {
          currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
          const name = prompt("Please enter your name:");
          displayMessage(name, currentLanguage);
        }
      </script>
    </body>
    </html>
  `;

  return new Response(htmlContent, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
    status: 200,
  });
}

export { handleRequest };
