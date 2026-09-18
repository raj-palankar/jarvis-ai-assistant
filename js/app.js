const micBtn = document.getElementById("micBtn");
const statusText = document.getElementById("status");
const textCommand = document.getElementById("textCommand");
const sendBtn = document.getElementById("sendBtn");

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Update active class
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section, .container');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom && sectionId) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Voice input
micBtn.addEventListener("click", () => {
    startListening();
});

// TEXT INPUT FUNCTIONALITY
function processTextCommand() {
    const command = textCommand.value.trim();
    
    if (command === "") {
        textCommand.placeholder = "Please type a command...";
        textCommand.style.borderColor = "#ff4444";
        setTimeout(() => {
            textCommand.placeholder = "💬 Type your command here... e.g., 'What time is it?' or 'Open YouTube'";
            textCommand.style.borderColor = "";
        }, 2000);
        return;
    }
    
    // Display what the user typed
    document.getElementById("userText").innerText = command;
    statusText.innerText = "Processing text command...";
    
    // Process the command through the same API
    processCommand(command);
    
    // Clear input field after processing
    textCommand.value = "";
    statusText.innerText = "Click mic to speak or type below";
    
    // Add focus back to input for next command
    textCommand.focus();
}

// Send button click
if (sendBtn) {
    sendBtn.addEventListener("click", processTextCommand);
}

// Enter key press in text input
if (textCommand) {
    textCommand.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            processTextCommand();
        }
    });
}

// Quick action buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const command = btn.getAttribute('data-command');
        if (command) {
            document.getElementById("userText").innerText = command;
            processCommand(command);
            if (textCommand) {
                textCommand.value = command;
            }
        }
    });
});

// Command search functionality
const commandSearch = document.getElementById('commandSearch');
if (commandSearch) {
    commandSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const commandItems = document.querySelectorAll('.command-item');
        
        commandItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}

// Add keyboard shortcut (press 'm' key to start listening)
document.addEventListener("keydown", (event) => {
    if ((event.key === 'm' || event.key === 'M') && typeof isListening !== 'undefined' && !isListening) {
        startListening();
    }
    // Ctrl+K or Cmd+K to focus text input
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (textCommand) {
            textCommand.focus();
            statusText.innerText = "Type your command...";
        }
    }
});

// Check browser compatibility on load
window.addEventListener("load", () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        statusText.innerText = "Speech recognition not supported - please use text input";
        micBtn.disabled = true;
        micBtn.style.opacity = "0.5";
        micBtn.title = "Speech recognition not supported in this browser";
    }
    
    // Focus text input on load
    if (textCommand) {
        setTimeout(() => {
            textCommand.focus();
        }, 500);
    }
    
    // Welcome message
    setTimeout(() => {
        if (typeof speak === 'function') {
            speak("Jarvis is ready. You can speak by clicking the microphone or type your command in the text box below.");
        }
    }, 1500);
});