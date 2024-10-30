// edge-function.js
export const config = {
  runtime: 'edge'
};

const generateHtml = (name = '', language = 'en') => {
  const heart = '❤';
  const messages = {
    pt: `Olá, pessoas maravilhosas! Se você se sentir para baixo na vida, lembre-se: o Brasil é tão longo que leva uma semana para dirigir de um lado a outro. Você tem tempo, amigo! Desejando um dia feliz e saudável, ${name} ${heart}`,
    en: `Hello, wonderful people! If you ever feel down about life, remember: Brazil is so long, it takes a week to drive from one end to the other. You've got time, friend! Wishing you a happy and healthy day, ${name} ${heart}`
  };

  return `
    <!DOCTYPE html>
    <html lang="${language}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Language Toggle App</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: Arial, sans-serif;
                background: #f0f0f0;
            }
            #container {
                position: relative;
                z-index: 1;
            }
            .message-box {
                padding: 20px;
                max-width: 600px;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 10px;
                color: white;
                text-align: center;
            }
            #toggleButton {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 10px 15px;
                background: #0066cc;
                color: white;
                border: none;
                cursor: pointer;
                border-radius: 5px;
                font-size: 16px;
            }
            #videoBackground {
                position: fixed;
                top: 50%;
                left: 50%;
                width: 100vw;
                height: 100vh;
                object-fit: cover;
                transform: translate(-50%, -50%);
                z-index: -1;
            }
        </style>
    </head>
    <body>
        <video id="videoBackground" autoplay muted loop>
            <source src="https://pin.it/6JF0nA3oB" type="video/mp4">
        </video>
        
        <audio id="backgroundAudio" loop>
            <source src="https://pixabay.com/sound-effects/relaxing-ocean-waves-high-quality-recorded-177004/" type="audio/mp3">
        </audio>

        <div id="container">
            <div class="message-box">
                <p>${messages[language]}</p>
            </div>
        </div>

        <button id="toggleButton" onclick="toggleLanguage()">Switch Language</button>

        <script>
            let currentLanguage = '${language}';
            
            function toggleLanguage() {
                const newLang = currentLanguage === 'en' ? 'pt' : 'en';
                const name = prompt("Please enter your name:");
                if (name) {
                    window.location.href = \`?lang=\${newLang}&name=\${encodeURIComponent(name)}\`;
                }
            }

            // Handle audio autoplay with user interaction
            document.addEventListener('click', function() {
                const audio = document.getElementById('backgroundAudio');
                if (audio.paused) {
                    audio.play().catch(console.error);
                }
            }, { once: true });
        </script>
    </body>
    </html>
  `;
};

export default async function handler(request) {
  try {
    // Parse URL and query parameters
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || 'Friend';
    const lang = url.searchParams.get('lang') || 'en';
    
    // Capitalize name
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    // Generate HTML
    const html = generateHtml(capitalizedName, lang);

    // Return the response
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 's-maxage=1, stale-while-revalidate'
      },
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}
