// 1.14.26

function getOrdinalSuffix(n) {
    const j = n % 10,
          k = n % 100;
    if (j === 1 && k !== 11) {
        return n + "st";
    }
    if (j === 2 && k !== 12) {
        return n + "nd";
    }
    if (j === 3 && k !== 13) {
        return n + "rd";
    }
    return n + "th";
}

function updatePanel02() {
    const now = new Date();

    const timeElem = document.querySelector(".time02");
    const dateElem = document.querySelector(".date02");

    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;

    const weekDays = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (timeElem) {
        timeElem.innerText =
            displayHour.toString().padStart(2, "0") +
            ":" +
            minutes.toString().padStart(2, "0") +
            " " +
            ampm;
    }

    if (dateElem) {
        dateElem.innerHTML =
            weekDays[now.getDay()] + " " +
            months[now.getMonth()] + " " + 
            getOrdinalSuffix(now.getDate()) + ",<br>" +
            now.getFullYear();
    }
}

updatePanel02();
setInterval(updatePanel02, 1000);