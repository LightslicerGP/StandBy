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
    while (grid.children.length > 8) {
        grid.removeChild(grid.lastChild);
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    const startDay = firstOfMonth.getDay();

    const lastOfMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < 42; i++) {
        const dayNum = i - startDay + 1;
        let cell = document.createElement('p');

        if (dayNum > 0 && dayNum <= lastOfMonth) {
            cell.textContent = dayNum;

            const gridWeekDay = (i % 7);

            if (dayNum === now.getDate()) {
                cell.classList.add('selected01');
            }
            if (gridWeekDay === 0 || gridWeekDay === 6) {
                cell.classList.add('dark01');
            } else {
                cell.classList.add('red01');
            }
        } else {
            cell.textContent = '';
        }

        grid.appendChild(cell);
    }
});

