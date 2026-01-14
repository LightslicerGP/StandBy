// 1.14.26

function generatePanel(panel) {
    panel.innerHTML = '';
    // Get current month (0-11)
    const now = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[now.getMonth()];
    // Set the .month01 element's text
    const monthElement = panel.querySelector(".month01");
    if (monthElement) {
        monthElement.textContent = monthName;
    }
}

document.querySelectorAll(".text01").forEach(panel => {
    generatePanel(panel);
});