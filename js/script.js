// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Chatbot
const chatIcon = document.getElementById('chatIcon');
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.querySelector('.chat-body');
const chatInput = document.querySelector('.chat-input input');
const sendBtn = document.querySelector('.chat-input button');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (name && email && message) {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Chatbot Section

// Chatbot Icon
let isOpen = false;
let responses = {};

chatIcon.onclick = () => {
  isOpen = !isOpen;
  if (isOpen) {
    chatWindow.classList.add('show');
  } else {
    chatWindow.classList.remove('show');
  }
};

// Fetch bot response data
fetch('js/botResponses.json')
  .then(res => res.json())
  .then(data => responses = data)
  .catch(err => console.error("Failed to load bot responses:", err));

sendBtn.onclick = () => {
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  addUserMessage(userInput);
  chatInput.value = "";

  addTypingIndicator();

  setTimeout(() => {
    const botReply = getBotResponse(userInput.toLowerCase());
    removeTypingIndicator();
    addBotMessage(botReply);
  }, 1000); // simulate thinking
};

function addUserMessage(msg) {
  const div = document.createElement('div');
  div.className = 'bot__msg';
  div.innerHTML = `<div class="msg__text" style="margin-left:auto;background:#333;color:white">${msg}</div>`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addBotMessage(msg) {
  const div = document.createElement('div');
  div.className = 'bot__msg';
  div.innerHTML = `<div class="bot__pfp"><img src="images/FloydGPT.jpg" alt="Bot"></div><div class="msg__text">${msg}</div>`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addTypingIndicator() {
  const div = document.createElement('div');
  div.className = 'bot__msg typing';
  div.innerHTML = `<div class="bot__pfp"><img src="images/FloydGPT.jpg" alt="Bot"></div><div class="msg__text">Typing...</div>`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function removeTypingIndicator() {
  const typing = chatBody.querySelector('.typing');
  if (typing) typing.remove();
}

function getBotResponse(text) {
  if (text.includes("hi") || text.includes("hello")) return pickRandom(responses.greeting);
  if (text.includes("project")) return pickRandom(responses.projects);
  if (text.includes("skill")) return pickRandom(responses.skills);
  if (text.includes("nigga") || text.includes("nigger")) return pickRandom(responses.insult);
  return pickRandom(responses.default);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
