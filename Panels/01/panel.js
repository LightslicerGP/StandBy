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

    for (let spacer = 0; spacer < startDay; spacer++) {
        let emptyCell = document.createElement('p');
        emptyCell.textContent = '';
        grid.appendChild(emptyCell);
    }

    for (let i = 0; i < lastOfMonth; i++) {
        const dayNum = i + 1;
        const gridIndex = i + startDay;
        const gridWeekDay = gridIndex % 7;

        let cell = document.createElement('p');
        cell.textContent = dayNum;

        if (dayNum === now.getDate()) {
            cell.classList.add('selected01');
        }
        if (gridWeekDay === 0 || gridWeekDay === 6) {
            cell.classList.add('dark01');
        } else {
            cell.classList.add('red01');
        }

        grid.appendChild(cell);
    }

    // Optional: If you want to keep the row structure looking tidy, add trailing spacers to fill the last week to 7 columns
    // Comment this block out if you do NOT want trailing spacers!
    // const totalCells = startDay + lastOfMonth;
    // const trailingSpaces = (7 - (totalCells % 7)) % 7;
    // for (let spacer = 0; spacer < trailingSpaces; spacer++) {
    //     let emptyCell = document.createElement('p');
    //     emptyCell.textContent = '';
    //     emptyCell.className = 'spacer01';
    //     grid.appendChild(emptyCell);
    // }
});
