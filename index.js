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



/*
panel stuff
*/

const clockBackground = document.getElementById("clockBackground");

// Derived from:
// Slope (m) = (90 - 10) / (83.4565... - 16.5434...) ≈ 1.1956
// Intercept (b) ≈ -9.78
function scale_number(x) {
    const m = 1.2852;
    const b = -14.2625;
    return (m * x) + b;
}

function generatePanel() {
    for (let i = 1; i <= 60; i++) {
        let angleDeg = i * 6;
        let angleRad = (angleDeg - 90) * (Math.PI / 180);

        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        // console.log(i, angleDeg);

        let x = 50 + 50 * cos;
        let y = 50 + 50 * sin;

        let tickDiv = document.createElement('div');
        tickDiv.style.position = 'absolute';
        // tickDiv.style.left = `${x}%`;
        // tickDiv.style.top = `${y}%`;
        tickDiv.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;

        smallOffset = 1.3;
        mediumOffset = 2.9;
        largeOffset = 3.5;

        if (angleDeg <= 45 || angleDeg > 315) {
            if (i % 15 === 0) {
                tickDiv.className = 'tick tick-medium';
                tickDiv.style.top = `${mediumOffset}vw`;
                tickDiv.style.left = `${scale_number(x)}%`;
            } else if (i % 5 === 0) {
                tickDiv.className = 'tick tick-large';
                tickDiv.style.top = `${largeOffset}vw`;
                tickDiv.style.left = `${x > 50 ? x + 4 : x - 4}%`;
            } else {
                tickDiv.className = 'tick tick-small';
                tickDiv.style.top = `${smallOffset}vw`;
                tickDiv.style.left = `${scale_number(x)}%`;
            }
        } else if (angleDeg > 45 && angleDeg <= 135) {
            if (i % 15 === 0) {
                tickDiv.className = 'tick tick-medium';
                tickDiv.style.left = `calc(100% - ${mediumOffset}vw)`;
                tickDiv.style.top = `${scale_number(y)}%`;
            } else if (i % 5 === 0) {
                tickDiv.className = 'tick tick-large';
                tickDiv.style.left = `calc(100% - ${largeOffset}vw)`;
                tickDiv.style.top = `${y > 50 ? y + 4 : y - 4}%`;
            } else {
                tickDiv.className = 'tick tick-small';
                tickDiv.style.left = `calc(100% - ${smallOffset}vw)`;
                tickDiv.style.top = `${scale_number(y)}%`;
            }
        } else if (angleDeg > 135 && angleDeg <= 225) {

            if (i % 15 === 0) {
                tickDiv.className = 'tick tick-medium';
                tickDiv.style.top = `calc(100% - ${mediumOffset}vw)`;
                tickDiv.style.left = `${x}%`;
            } else if (i % 5 === 0) {
                tickDiv.className = 'tick tick-large';
                tickDiv.style.top = `calc(100% - ${largeOffset}vw)`;
                tickDiv.style.left = `${x > 50 ? x + 4 : x - 4}%`;
            } else {
                tickDiv.className = 'tick tick-small';
                tickDiv.style.top = `calc(100% - ${smallOffset}vw)`;
                tickDiv.style.left = `${scale_number(x)}%`;
            }
        } else if (angleDeg > 225 && angleDeg <= 315) {

            if (i % 15 === 0) {
                tickDiv.className = 'tick tick-medium';
                tickDiv.style.left = `${mediumOffset}vw`;
                tickDiv.style.top = `${y}%`;
            } else if (i % 5 === 0) {
                tickDiv.className = 'tick tick-large';
                tickDiv.style.left = `${largeOffset}vw`;
                tickDiv.style.top = `${y > 50 ? y + 4 : y - 4}%`;
            } else {
                tickDiv.className = 'tick tick-small';
                tickDiv.style.left = `${smallOffset}vw`;
                tickDiv.style.top = `${scale_number(y)}%`;
            }
        }

        // tickDiv.dataset.angle = angleDeg;
        // tickDiv.dataset.scale = angleDeg % 45;
        clockBackground.appendChild(tickDiv);
    }
}


generatePanel();