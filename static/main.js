/**
 * FocusFrame - Main JavaScript File
 * Handles animations, interactions, and core functionality
 */

// ===== GLOBAL VARIABLES =====
let particles = [];
let animationId;
let typingInterval;
let currentQuoteIndex = 0;

// Motivational quotes for typing animation
const motivationalQuotes = [
    "Focus is the gateway to all thinking.",
    "Where attention goes, energy flows.",
    "Deep work is the ability to focus without distraction.",
    "The successful person focuses on opportunities.",
    "Concentration is the secret of strength.",
    "Focus on being productive instead of busy.",
    "Your focus determines your reality.",
    "Single-tasking is the new multitasking."
];

// ===== PARTICLE SYSTEM =====
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    // Clear existing particles
    container.innerHTML = '';
    particles = [];

    // Create particles
    const particleCount = window.innerWidth < 768 ? 15 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    // Start animation loop
    if (animationId) cancelAnimationFrame(animationId);
    animateParticles();
}

function createParticle() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 6 + 2; // 2-8px
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speedX = (Math.random() - 0.5) * 0.5;
    const speedY = (Math.random() - 0.5) * 0.5;
    const opacity = Math.random() * 0.6 + 0.2;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.opacity = opacity;
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(particle);
    
    particles.push({
        element: particle,
        x: x,
        y: y,
        speedX: speedX,
        speedY: speedY,
        size: size,
        opacity: opacity
    });
}

function animateParticles() {
    particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen edges
        if (particle.x > window.innerWidth) particle.x = -particle.size;
        if (particle.x < -particle.size) particle.x = window.innerWidth;
        if (particle.y > window.innerHeight) particle.y = -particle.size;
        if (particle.y < -particle.size) particle.y = window.innerHeight;
        
        particle.element.style.left = particle.x + 'px';
        particle.element.style.top = particle.y + 'px';
    });
    
    animationId = requestAnimationFrame(animateParticles);
}

// Resize handler for particles
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(() => {
        initParticles();
    }, 250);
});

// ===== TYPING ANIMATION =====
let isTyping = false;

function startTypingAnimation() {
    const typingElement = document.getElementById('typingQuotes');
    if (!typingElement || isTyping) return;

    isTyping = true;
    currentQuoteIndex = 0;

    function typeQuote() {
        if (!document.getElementById('typingQuotes')) {
            isTyping = false;
            return; // Element no longer exists, stop animation
        }

        const quote = motivationalQuotes[currentQuoteIndex];
        let charIndex = 0;
        typingElement.textContent = '';
        
        function typeChar() {
            if (!document.getElementById('typingQuotes')) {
                isTyping = false;
                return; // Element removed, stop typing
            }
            
            if (charIndex < quote.length) {
                typingElement.textContent += quote.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50 + Math.random() * 50); // Variable typing speed
            } else {
                // Pause before next quote
                setTimeout(() => {
                    if (!document.getElementById('typingQuotes')) {
                        isTyping = false;
                        return;
                    }
                    
                    // Clear text with backspace effect
                    function deleteChar() {
                        if (!document.getElementById('typingQuotes')) {
                            isTyping = false;
                            return;
                        }
                        
                        const currentText = typingElement.textContent;
                        if (currentText.length > 0) {
                            typingElement.textContent = currentText.slice(0, -1);
                            setTimeout(deleteChar, 30);
                        } else {
                            // Move to next quote
                            currentQuoteIndex = (currentQuoteIndex + 1) % motivationalQuotes.length;
                            setTimeout(typeQuote, 500);
                        }
                    }
                    setTimeout(deleteChar, 2000); // Display quote for 2 seconds
                }, 100);
            }
        }
        
        typeChar();
    }
    
    // Start the typing animation
    typeQuote();
}

function stopTypingAnimation() {
    isTyping = false;
    if (typingInterval) {
        clearInterval(typingInterval);
        typingInterval = null;
    }
}

// ===== NAVIGATION FUNCTIONS =====
function navigateWithTransition(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

function navigateToHome() {
    navigateWithTransition('/home');
}

function navigateToStats() {
    navigateWithTransition('/stats');
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('DOMContentLoaded', () => {
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Prevent shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Home page shortcuts
        if (window.location.pathname === '/home') {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    startTimer(25);
                    break;
                case '2':
                    e.preventDefault();
                    startTimer(50);
                    break;
                case '3':
                    e.preventDefault();
                    startTimer(90);
                    break;
                case 'c':
                case 'C':
                    e.preventDefault();
                    document.getElementById('customMinutes')?.focus();
                    break;
                case 's':
                case 'S':
                    if (e.ctrlKey || e.metaKey) return; // Allow browser save
                    e.preventDefault();
                    navigateToStats();
                    break;
            }
        }
        
        // Global shortcuts
        switch(e.key) {
            case 'h':
            case 'H':
                if (window.location.pathname !== '/home') {
                    e.preventDefault();
                    navigateToHome();
                }
                break;
        }
    });
});

// ===== TIMER HELPER FUNCTIONS =====
function startTimer(minutes) {
    navigateWithTransition(`/start/${minutes}`);
}

// ===== UTILITY FUNCTIONS =====
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function showNotification(title, message, type = 'info') {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 
                   type === 'error' ? 'rgba(239, 68, 68, 0.9)' : 
                   'rgba(59, 130, 246, 0.9)',
        color: '#ffffff',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        maxWidth: '300px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backdropFilter: 'blur(10px)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== AUDIO CONTEXT FOR COMPLETION SOUND =====
function playCompletionSound() {
    try {
        // Create a simple completion sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Create a pleasant completion chord
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
        console.log('Audio not supported or blocked');
    }
}

// ===== FOCUS MODE HELPERS =====
function enterFocusMode() {
    // Hide cursor after inactivity during timer
    let cursorTimeout;
    
    function hideCursor() {
        document.body.style.cursor = 'none';
    }
    
    function showCursor() {
        document.body.style.cursor = 'default';
        clearTimeout(cursorTimeout);
        cursorTimeout = setTimeout(hideCursor, 3000);
    }
    
    document.addEventListener('mousemove', showCursor);
    cursorTimeout = setTimeout(hideCursor, 3000);
    
    return () => {
        document.removeEventListener('mousemove', showCursor);
        clearTimeout(cursorTimeout);
        document.body.style.cursor = 'default';
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ACCESSIBILITY HELPERS =====
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    Object.assign(announcement.style, {
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
    });
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===== SESSION STORAGE HELPERS =====
function saveToSessionStorage(key, data) {
    try {
        sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.warn('Session storage not available');
    }
}

function loadFromSessionStorage(key) {
    try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn('Session storage not available');
        return null;
    }
}

// ===== CLEANUP ON PAGE UNLOAD =====
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    stopTypingAnimation();
});

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles on all pages
    initParticles();
    
    // Page-specific initializations
    const path = window.location.pathname;
    
    if (path === '/home') {
        // Stop any existing typing animation first
        stopTypingAnimation();
        // Start fresh typing animation
        setTimeout(() => {
            startTypingAnimation();
        }, 500);
    }
    
    // Add loading class removal
    setTimeout(() => {
        document.body.classList.remove('page-enter');
    }, 100);
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatTime,
        debounce,
        throttle,
        motivationalQuotes
    };
}