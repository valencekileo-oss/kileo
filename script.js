// Typewriter effect
const typeWriterElement = document.querySelector('.typewriter');
const texts = [
    "Cyber Security Student at IAA", 
    "Frontend Developer", 
    "AI Vibe Coder",
    "Network Enthusiast"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentText = texts[textIndex];
    
    // Clear the element's content except for the cursor if it was there
    let displayText = '';
    
    if (isDeleting) {
        displayText = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40; // Faster deleting
    } else {
        displayText = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Normal typing speed
    }

    typeWriterElement.innerHTML = displayText + '<span class="cursor">_</span>';

    // Logic for pause and switch
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end of the word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before typing new word
    }

    setTimeout(type, typeSpeed);
}

// Matrix Rain Effect
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Make canvas full screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

// Characters used for matrix rain
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|:"<>?アイウエオカキクケコサシスセソタチツテト';
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = [];

// Initialize drops array
function initDrops() {
    columns = canvas.width / fontSize;
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}
initDrops();

function drawMatrix() {
    // Semi-transparent black to create trailing effect
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41'; // Matrix Green
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Sometimes make characters cyan or white for cyber feel
        if (Math.random() > 0.98) {
            ctx.fillStyle = '#00f3ff';
        } else if (Math.random() > 0.99) {
            ctx.fillStyle = '#ffffff';
        } else {
            ctx.fillStyle = '#00ff41';
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Start animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    setTimeout(type, 1000);
    
    // Start matrix background
    setInterval(drawMatrix, 33);
});

// Handle window resize for matrix canvas
window.addEventListener('resize', () => {
    resizeCanvas();
    initDrops();
});
