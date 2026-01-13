const controls = document.getElementById('controls');
let hideTimeout;

function resetHideTimer() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        controls.classList.add('hidden');
    }, 3000);
}

['touchstart', 'mousedown'].forEach(evt => {
    document.addEventListener(evt, function () {
        controls.classList.remove('hidden');
        resetHideTimer();
    }, { passive: true });
});

window.addEventListener('load', () => {
    resetHideTimer();
});

controls.addEventListener('mouseenter', resetHideTimer);
controls.addEventListener('mousemove', resetHideTimer);
controls.addEventListener('touchstart', resetHideTimer);

// Fullscreen functionality for enterFullscreen and exitFullscreen buttons
const enterFullscreenBtn = document.getElementById('enterFullscreen');
const exitFullscreenBtn = document.getElementById('exitFullscreen');

function showEnterFullscreen(show) {
    if (show) {
        enterFullscreenBtn.classList.remove('removed');
        exitFullscreenBtn.classList.add('removed');
    } else {
        enterFullscreenBtn.classList.add('removed');
        exitFullscreenBtn.classList.remove('removed');
    }
}

// Setup initial state
if (enterFullscreenBtn && exitFullscreenBtn) {
    // Start by showing enter, hiding exit
    showEnterFullscreen(true);

    // Enter fullscreen on click
    enterFullscreenBtn.addEventListener('click', () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { // Safari
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE11
            elem.msRequestFullscreen();
        }
    });

    // Exit fullscreen on click
    exitFullscreenBtn.addEventListener('click', () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE11
            document.msExitFullscreen();
        }
    });

    // Listen for fullscreen changes to toggle icons
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            showEnterFullscreen(false);
        } else {
            showEnterFullscreen(true);
        }
    });
    document.addEventListener('webkitfullscreenchange', () => {
        if (document.webkitFullscreenElement) {
            showEnterFullscreen(false);
        } else {
            showEnterFullscreen(true);
        }
    });
    document.addEventListener('MSFullscreenChange', () => {
        if (document.msFullscreenElement) {
            showEnterFullscreen(false);
        } else {
            showEnterFullscreen(true);
        }
    });
}