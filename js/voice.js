let isListening = false;
let currentRecognition = null;

function startListening() {
    // Check if already listening
    if (isListening) {
        stopListening();
        return;
    }
    
    // Check if browser supports speech recognition
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
        alert("Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari, or use the text input instead.");
        return;
    }

    try {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        currentRecognition = recognition;
        
        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        recognition.start();
        isListening = true;
        
        const statusText = document.getElementById("status");
        const voiceIndicator = document.getElementById("voiceIndicator");
        
        if (statusText) statusText.innerText = "🎤 Listening... Speak now";
        if (voiceIndicator) voiceIndicator.classList.add("active");
        
        // Change mic button appearance
        const micBtn = document.getElementById("micBtn");
        if (micBtn) {
            micBtn.innerHTML = "🔴 Listening...";
            micBtn.style.background = "linear-gradient(135deg, #ff4444, #cc0000)";
        }

        recognition.onresult = function(event) {
            const text = event.results[0][0].transcript;
            console.log("Recognized:", text);
            
            const userTextElement = document.getElementById("userText");
            if (userTextElement) userTextElement.innerText = text;
            
            if (statusText) statusText.innerText = "🔄 Processing...";
            
            // Check if number guessing game is active
            if (typeof window.numberGameActive !== 'undefined' && window.numberGameActive && window.secretNumber) {
                const guess = parseInt(text);
                if (!isNaN(guess)) {
                    if (typeof window.attempts === 'undefined') window.attempts = 0;
                    window.attempts++;
                    if (guess === window.secretNumber) {
                        if (typeof speak === 'function') speak(`Correct! You guessed it in ${window.attempts} attempts!`);
                        window.numberGameActive = false;
                        window.secretNumber = null;
                    } else if (guess < window.secretNumber) {
                        if (typeof speak === 'function') speak("Too low! Try a higher number.");
                    } else {
                        if (typeof speak === 'function') speak("Too high! Try a lower number.");
                    }
                    if (statusText) statusText.innerText = "Click mic to speak or type below";
                    stopListening();
                    return;
                }
            }
            
            // Dispatch event for trivia game
            const eventObj = new CustomEvent('commandProcessed', { detail: text });
            window.dispatchEvent(eventObj);
            
            // Process the command
            if (typeof processCommand === 'function') {
                processCommand(text);
            } else {
                console.error("processCommand is not defined");
                if (statusText) statusText.innerText = "Error: Command processor not loaded";
            }
            
            if (statusText) statusText.innerText = "Click mic to speak or type below";
            stopListening();
        };

        recognition.onerror = function(event) {
            console.error("Speech recognition error:", event.error);
            let errorMsg = "Voice recognition error";
            
            switch(event.error) {
                case 'no-speech':
                    errorMsg = "No speech detected. Please try again.";
                    break;
                case 'audio-capture':
                    errorMsg = "No microphone found. Please check your microphone.";
                    break;
                case 'not-allowed':
                    errorMsg = "Microphone access denied. Please allow microphone access.";
                    break;
                case 'network':
                    errorMsg = "Network error. Please check your connection.";
                    break;
                default:
                    errorMsg = `Error: ${event.error}. Please try again.`;
            }
            
            alert(errorMsg);
            if (statusText) statusText.innerText = "Click mic to speak or type below";
            stopListening();
        };
        
        recognition.onend = function() {
            console.log("Recognition ended");
            stopListening();
        };
        
    } catch (error) {
        console.error("Error starting recognition:", error);
        alert("Could not start speech recognition. Please refresh the page and try again.");
        stopListening();
    }
}

function stopListening() {
    isListening = false;
    if (currentRecognition) {
        try {
            currentRecognition.abort();
        } catch(e) {
            console.log("Error aborting recognition:", e);
        }
        currentRecognition = null;
    }
    
    const statusText = document.getElementById("status");
    const voiceIndicator = document.getElementById("voiceIndicator");
    const micBtn = document.getElementById("micBtn");
    
    if (statusText && statusText.innerText === "🎤 Listening... Speak now") {
        statusText.innerText = "Click mic to speak or type below";
    }
    if (voiceIndicator) voiceIndicator.classList.remove("active");
    if (micBtn) {
        micBtn.innerHTML = "🎤 Start Listening";
        micBtn.style.background = "linear-gradient(135deg, #00f7ff 0%, #00c3cc 100%)";
    }
}

// Add escape key to stop listening
document.addEventListener("keydown", (event) => {
    if (event.key === 'Escape' && isListening) {
        stopListening();
    }
});