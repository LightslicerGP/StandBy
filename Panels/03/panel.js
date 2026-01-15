// 1.15.26

function updatePanel03() {
    const now = new Date();

    const weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsShort = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const weekdayElem = document.querySelector(".weekday03");
    if (weekdayElem) {
        weekdayElem.textContent = weekDaysShort[now.getDay()];
    }

    const monthElem = document.querySelector(".month03");
    if (monthElem) {
        monthElem.textContent = monthsShort[now.getMonth()];
    }

    const dayElem = document.querySelector(".day03");
    if (dayElem) {
        dayElem.textContent = now.getDate();
    }
}

updatePanel03();
setInterval(updatePanel03, 1000);