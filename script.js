// --- WORKSPACE CORE DOM SELECTORS ---
const buttons = document.querySelectorAll('.menu-btn');
const slides = document.querySelectorAll('.slide');
const menuContainer = document.querySelector('.menu-buttons-stack');
const splashScreen = document.getElementById('splash-screen');
const mainDashboard = document.getElementById('main-dashboard');
const fairytaleWrapper = document.getElementById('fairytale-title-wrapper');
const startBtn = document.getElementById('start-btn');
const homeBtn = document.getElementById('home-btn');

// Default target focus element selection state anchor
let lockedTargetId = 'algebra'; 

// --- STATE MANAGEMENT ENGINE (SUB-PAGE RETIREMENT ANCHOR) ---
// If coming back from another page, instantly skip splash screen, and trigger full animation from scratch
if (localStorage.getItem('mstcWorkspaceActive') === 'true') {
    if (splashScreen) {
        splashScreen.style.display = 'none';
        splashScreen.classList.add('fade-out');
    }
    if (mainDashboard) {
        mainDashboard.classList.add('show-dashboard');
    }
    if (fairytaleWrapper) {
        // Clear previous classes, force a hardware reflow to reset layout state completely, 
        // and trigger the exact same entrance animation sequence as clicking "Start Reviewing"
        fairytaleWrapper.classList.remove('animate-active');
        void fairytaleWrapper.offsetWidth; 
        fairytaleWrapper.classList.add('animate-active');
    }
}

// Universal UI View Synchronization engine
function updateDisplay(targetId) {
    slides.forEach(slide => {
        if (slide.id === targetId) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    buttons.forEach(btn => {
        if (btn.getAttribute('data-target') === targetId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// --- DYNAMIC SELECTION & HOVER ANIMATION LAYER ---
buttons.forEach(btn => {
    const targetId = btn.getAttribute('data-target');
    const destinationUrl = btn.getAttribute('data-url');

    // Trigger Action A: Content Peek on Mouse Hover
    btn.addEventListener('mouseenter', () => {
        updateDisplay(targetId);
    });

    // Trigger Action B: Permalock Selection and Immediately Launch on Single Click
    btn.addEventListener('click', () => {
        lockedTargetId = targetId; 
        updateDisplay(targetId);
        
        // Haptic micro-bounce simulation feedback before immediate window redirect
        btn.style.transform = 'translateX(6px) scale(0.98)';
        
        setTimeout(() => { 
            btn.style.transform = ''; 
            if (destinationUrl) {
                window.location.href = destinationUrl;
            }
        }, 120);
    });
});

// Trigger Action C: Revert focus back to locked element when mouse leaves panel context
if (menuContainer) {
    menuContainer.addEventListener('mouseleave', () => {
        updateDisplay(lockedTargetId);
    });
}

// --- CORE PANEL TRANSLATION ACTIONS ---
if (startBtn) {
    startBtn.addEventListener('click', () => {
        localStorage.setItem('mstcWorkspaceActive', 'true');

        if (splashScreen) {
            splashScreen.classList.remove('instant-hide'); 
            splashScreen.classList.add('fade-out');
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 800);
        }
        
        if (mainDashboard) {
            mainDashboard.classList.add('show-dashboard');
        }
        
        if (fairytaleWrapper) {
            fairytaleWrapper.classList.remove('animate-active');
            void fairytaleWrapper.offsetWidth; 
            fairytaleWrapper.classList.add('animate-active');
        }
    });
}

if (homeBtn) {
    homeBtn.addEventListener('click', () => {
        localStorage.removeItem('mstcWorkspaceActive');

        if (splashScreen) {
            splashScreen.style.display = 'flex';
            splashScreen.classList.remove('instant-hide');
            splashScreen.classList.remove('fade-out');
        }
        
        if (mainDashboard) {
            mainDashboard.classList.remove('show-dashboard');
        }
        
        if (fairytaleWrapper) {
            fairytaleWrapper.classList.remove('animate-active');
        }
    });
}
