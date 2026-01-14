// 1.14(13).26

// Derived from:
// Slope (m) = (90 - 10) / (83.4565... - 16.5434...) ≈ 1.1956
// Intercept (b) ≈ -9.78

function scale_number(x) {
    const m = 1.2852;
    const b = -14.2625;
    return (m * x) + b;
}

function generatePanel(panel) {
    panel.innerHTML = '';

    for (let i = 1; i <= 60; i++) {
        let angleDeg = i * 6;
        let angleRad = (angleDeg - 90) * (Math.PI / 180);

        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);

        let x = 50 + 50 * cos;
        let y = 50 + 50 * sin;

        let tickDiv = document.createElement('div');
        tickDiv.style.position = 'absolute';
        tickDiv.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;

        let smallOffset = 1.3;
        let mediumOffset = 2.9;
        let largeOffset = 3.5;

        if (angleDeg <= 45 || angleDeg > 315) {
            if (i % 15 === 0) {
                tickDiv.className = 'tick00 tick-medium00';
                tickDiv.style.top = `${mediumOffset}vw`;
                tickDiv.style.left = `${x}%`;
            } else if (i % 5 === 0) {
                tickDiv.className = 'tick00 tick-large00';
                tickDiv.style.top = `${largeOffset}vw`;
                tickDiv.style.left = `${x > 50 ? x + 4 : x - 4}%`;
            } else {
                tickDiv.className = 'tick00 tick-small00';
                tickDiv.style.top = `${smallOffset}vw`;
                tickDiv.style.left = `${scale_number(x)}%`;
            }
        } else if (angleDeg > 45 && angleDeg <= 135) {
            if (i % 15 === 0) {
                tickDiv.className = 'tick00 tick-medium00';
                tickDiv.style.left = `calc(100% - ${mediumOffset}vw)`;
                tickDiv.style.top = `${y}%`;
            } else if (i % 5 === 0) {
                tickDiv.className = 'tick00 tick-large00';
                tickDiv.style.left = `calc(100% - ${largeOffset}vw)`;
                tickDiv.style.top = `${y > 50 ? y + 3 : y - 3}%`;
            } else {
                tickDiv.className = 'tick00 tick-small00';
                tickDiv.style.left = `calc(100% - ${smallOffset}vw)`;
                tickDiv.style.top = `${scale_number(y)}%`;
            }
        } else if (angleDeg > 135 && angleDeg <= 225) {

            if (i % 15 === 0) {
                tickDiv.className = 'tick00 tick-medium00';
                tickDiv.style.top = `calc(100% - ${mediumOffset}vw)`;
                tickDiv.style.left = `${x}%`;
            } else if (i % 5 === 0) {
                tickDiv.className = 'tick00 tick-large00';
                tickDiv.style.top = `calc(100% - ${largeOffset}vw)`;
                tickDiv.style.left = `${x > 50 ? x + 4 : x - 4}%`;
            } else {
                tickDiv.className = 'tick00 tick-small00';
                tickDiv.style.top = `calc(100% - ${smallOffset}vw)`;
                tickDiv.style.left = `${scale_number(x)}%`;
            }
        } else if (angleDeg > 225 && angleDeg <= 315) {

            if (i % 15 === 0) {
                tickDiv.className = 'tick00 tick-medium00';
                tickDiv.style.left = `${mediumOffset}vw`;
                tickDiv.style.top = `${y}%`;
            } else if (i % 5 === 0) {
                tickDiv.className = 'tick00 tick-large00';
                tickDiv.style.left = `${largeOffset}vw`;
                tickDiv.style.top = `${y > 50 ? y + 3 : y - 3}%`;
            } else {
                tickDiv.className = 'tick00 tick-small00';
                tickDiv.style.left = `${smallOffset}vw`;
                tickDiv.style.top = `${scale_number(y)}%`;
            }
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
