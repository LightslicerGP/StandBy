// 1.14(13).26

// Derived from:
// Slope (m) = (90 - 10) / (83.4565... - 16.5434...) ≈ 1.1956
// Intercept (b) ≈ -9.78

function scale_number(x) {
    const margin = 6;
    let raw_percent = ((((x - 1) % 15)) / 14) * 100;
    return margin + (raw_percent * (100 - (2 * margin)) / 100);
}

function generatePanel(panel) {
    panel.innerHTML = '';

    for (let i = 1; i <= 60; i++) {
        let tickDiv = document.createElement('div');
        tickDiv.style.position = 'absolute';
        tickDiv.style.transform = `translate(-50%, 0%)`;
        tickDiv.classList.add('tick00');

        if (i >= 1 && i <= 15) {
            tickDiv.style.top = "0%";
            tickDiv.style.left = `${scale_number(i)}%`;
        } else if (i >= 16 && i <= 30) {
            tickDiv.style.left = "100%";
            tickDiv.style.top = `${scale_number(i)}%`;
            tickDiv.style.transform = `rotate(${90}deg)`
        } else if (i >= 31 && i <= 45) {
            tickDiv.style.top = "100%";
            tickDiv.style.left = `${scale_number(i)}%`;
            tickDiv.style.transform = `rotate(${180}deg)`
        } else if (i >= 46 && i <= 60) {
            tickDiv.style.left = "0%";
            tickDiv.style.top = `${scale_number(i)}%`;
            tickDiv.style.transform = `rotate(${-90}deg)`
        }

        const j = ((i - 1) % 15) + 1;

        if (j % 8 == 0) {
            tickDiv.classList.add('tick-large00');
        }
        else if ((j + 2) % 5 == 0) {
            tickDiv.classList.add('tick-medium00');
        }
        else {
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
