// 1.14(13).26

// Derived from:
// Slope (m) = (90 - 10) / (83.4565... - 16.5434...) ≈ 1.1956
// Intercept (b) ≈ -9.78

function scale_number(x) {
    const margin = 4;
    let raw_percent = ((((x - 1) % 15)) / 14) * 100;
    return margin + (raw_percent * (100 - (2 * margin)) / 100);
}

function generatePanel(panel) {
    panel.innerHTML = '';

    const rect = panel.getBoundingClientRect();
    const panelWidth = rect.width;
    const panelHeight = rect.height;

    for (let i = 1; i <= 60; i++) {
        let tickDiv = document.createElement('div');
        tickDiv.style.position = 'absolute';
        tickDiv.classList.add('tick00');

        let xPct = 0;
        let yPct = 0;
        const val = scale_number(i);

        if (i >= 1 && i <= 15) {
            xPct = val;
            yPct = 0;
        } else if (i >= 16 && i <= 30) {
            xPct = 100;
            yPct = val;
        } else if (i >= 31 && i <= 45) {
            xPct = val;
            yPct = 100;
        } else if (i >= 46 && i <= 60) {
            xPct = 0;
            yPct = val;
        }

        tickDiv.style.left = `${xPct}%`;
        tickDiv.style.top = `${yPct}%`;

        const tickX_px = (xPct / 100) * panelWidth;
        const tickY_px = (yPct / 100) * panelHeight;

        const centerX_px = panelWidth / 2;
        const centerY_px = panelHeight / 2;

        const deltaX = centerX_px - tickX_px;
        const deltaY = centerY_px - tickY_px;

        const rad = Math.atan2(deltaY, deltaX);

        const deg = rad * (180 / Math.PI) + 90;

        tickDiv.style.transform = `translate(-50%, 0%) rotate(${deg - 180}deg)`;

        const j = ((i - 1) % 15) + 1;
        if (j % 8 == 0) {
            tickDiv.classList.add('tick-medium00');
        } else if ((j + 2) % 5 == 0) {
            tickDiv.classList.add('tick-large00');
        } else {
            tickDiv.classList.add('tick-small00');
        }

        panel.appendChild(tickDiv);
    }
}

document.querySelectorAll(".clockBackground00").forEach(panel => {
    generatePanel(panel);
});

// Rotates the clock hands for every .clockHands00 container found
function updateClockHands() {
    const now = new Date();
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const ms = now.getMilliseconds();

    document.querySelectorAll(".clockHands00").forEach(clock => {
        const hourHand = clock.querySelector(".hour00");
        const minuteHand = clock.querySelector(".minute00");
        const secondHand = clock.querySelector(".second00");

        // Calculate angles
        const hourAngle = (hour + minute / 60) * 30; // 360/12 = 30
        const minuteAngle = (minute + second / 60) * 6; // 360/60 = 6
        const secondAngle = (second + ms / 1000) * 6; // continuous, 360/60 = 6

        if (hourHand) {
            hourHand.style.transform = `rotate(${hourAngle}deg)`;
        }
        if (minuteHand) {
            minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
        }
        if (secondHand) {
            secondHand.style.transform = `rotate(${secondAngle}deg)`;
        }
    });
}

// Start the animation
function startClockAnimation() {
    updateClockHands();
    requestAnimationFrame(startClockAnimation);
}
startClockAnimation();
