// 1.14.26

function setMonth(element) {
    const now = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[now.getMonth()];
    element.textContent = monthName;
}

document.querySelectorAll(".month01").forEach(element => {
    setMonth(element);
});

document.querySelectorAll(".grid01").forEach(grid => {
    // Remove any existing day elements beyond the month and weekday labels (8 items: 1 for month, 7 for days)
    while (grid.children.length > 8) {
        grid.removeChild(grid.lastChild);
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    // Compute first day in grid (0 = Sunday, ..., 6 = Saturday)
    const firstOfMonth = new Date(year, month, 1);
    const startDay = firstOfMonth.getDay();

    // How many days in this month?
    const lastOfMonth = new Date(year, month + 1, 0).getDate();

    // There are 7 header cells: 1 for month, 6 for S M T W T F S
    // Start filling days after the 8th child (index 7)
    // Fill up to 6 weeks x 7 = 42 cells after weekday labels
    for (let i = 0; i < 42; i++) {
        const dayNum = i - startDay + 1;
        let cell = document.createElement('p');

        if (dayNum > 0 && dayNum <= lastOfMonth) {
            cell.textContent = dayNum;
            if (dayNum === now.getDate()) {
                cell.classList.add('selected01'); // Highlight today
            } else {
                cell.classList.add('dark01');
            }
        } else {
            cell.textContent = '';
        }

        grid.appendChild(cell);
    }
});

