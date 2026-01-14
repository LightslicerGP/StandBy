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

if (enterFullscreenBtn && exitFullscreenBtn) {
    showEnterFullscreen(true);

    enterFullscreenBtn.addEventListener('click', () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    });

    exitFullscreenBtn.addEventListener('click', () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    });

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

const leftNext = document.getElementById('leftNext');
const leftPrevious = document.getElementById('leftPrevious');
const leftPanel = document.getElementById('leftPanel');
const rightNext = document.getElementById('rightNext');
const rightPrevious = document.getElementById('rightPrevious');
const rightPanel = document.getElementById('rightPanel');

// Use localStorage to persist panel IDs
const LEFT_PANEL_KEY = 'leftPanelID';
const RIGHT_PANEL_KEY = 'rightPanelID';

// Helper - get saved panelID value or default to 0x00
function getSavedPanelID(key) {
    let v = localStorage.getItem(key);
    if (v === null || isNaN(parseInt(v))) return 0x00;
    let n = Number(v);
    if (Number.isNaN(n) || n < 0 || n > 255) return 0x00;
    return n;
}

let leftPanelID = getSavedPanelID(LEFT_PANEL_KEY);
let rightPanelID = getSavedPanelID(RIGHT_PANEL_KEY);

function removeOldPanelScript(scriptId) {
    const script = document.getElementById(scriptId);
    if (script) {
        script.remove();
    }
    if (window.clockBackground !== undefined) {
        try { delete window.clockBackground; } catch { }
    }
    if (window.scale_number !== undefined) {
        try { delete window.scale_number; } catch { }
    }
    if (window.setMonth !== undefined) {
        try { delete window.setMonth; } catch { }
    }
}

async function loadLeftPanel(panelID) {
    let oldPanelCSS = document.getElementById('leftPanelCSS');
    if (oldPanelCSS) oldPanelCSS.remove();

    removeOldPanelScript('leftPanelJS');

    const hexID = panelID.toString(16).padStart(2, '0');
    const basePath = `Panels/${hexID}/`;

    try {
        const htmlRes = await fetch(basePath + 'panel.html');
        if (!htmlRes.ok) throw new Error('Panel HTML not found');
        const htmlText = await htmlRes.text();
        leftPanel.innerHTML = htmlText;
    } catch (e) {
        leftPanel.innerHTML = `<div style="color:red;text-align:center;padding:32px">Panel ${hexID} not found.</div>`;
        return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = basePath + 'panel.css';
    cssLink.id = 'leftPanelCSS';
    document.head.appendChild(cssLink);

    const jsScript = document.createElement('script');
    jsScript.id = 'leftPanelJS';
    jsScript.type = "text/javascript";
    try {
        const jsRes = await fetch(basePath + 'panel.js');
        if (jsRes.ok) {
            let code = await jsRes.text();
            code = `(function(){\n${code}\n})();`;
            jsScript.text = code;
        } else {
            jsScript.src = basePath + 'panel.js';
        }
    } catch (e) {
        jsScript.src = basePath + 'panel.js';
    }
    leftPanel.appendChild(jsScript);
}

async function loadRightPanel(panelID) {
    let oldPanelCSS = document.getElementById('rightPanelCSS');
    if (oldPanelCSS) oldPanelCSS.remove();

    removeOldPanelScript('rightPanelJS');

    const hexID = panelID.toString(16).padStart(2, '0');
    const basePath = `Panels/${hexID}/`;

    try {
        const htmlRes = await fetch(basePath + 'panel.html');
        if (!htmlRes.ok) throw new Error('Panel HTML not found');
        const htmlText = await htmlRes.text();
        rightPanel.innerHTML = htmlText;
    } catch (e) {
        rightPanel.innerHTML = `<div style="color:red;text-align:center;padding:32px">Panel ${hexID} not found.</div>`;
        return;
    }

    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = basePath + 'panel.css';
    cssLink.id = 'rightPanelCSS';
    document.head.appendChild(cssLink);

    const jsScript = document.createElement('script');
    jsScript.id = 'rightPanelJS';
    jsScript.type = "text/javascript";
    try {
        const jsRes = await fetch(basePath + 'panel.js');
        if (jsRes.ok) {
            let code = await jsRes.text();
            code = `(function(){\n${code}\n})();`;
            jsScript.text = code;
        } else {
            jsScript.src = basePath + 'panel.js';
        }
    } catch (e) {
        jsScript.src = basePath + 'panel.js';
    }
    rightPanel.appendChild(jsScript);
}

// Panel navigation, persisting state
leftNext.addEventListener('click', () => {
    leftPanelID = (leftPanelID + 1) & 0xff;
    localStorage.setItem(LEFT_PANEL_KEY, leftPanelID);
    loadLeftPanel(leftPanelID);
});
leftPrevious.addEventListener('click', () => {
    leftPanelID = (leftPanelID - 1 + 0x100) & 0xff;
    localStorage.setItem(LEFT_PANEL_KEY, leftPanelID);
    loadLeftPanel(leftPanelID);
});

rightNext.addEventListener('click', () => {
    rightPanelID = (rightPanelID + 1) & 0xff;
    localStorage.setItem(RIGHT_PANEL_KEY, rightPanelID);
    loadRightPanel(rightPanelID);
});
rightPrevious.addEventListener('click', () => {
    rightPanelID = (rightPanelID - 1 + 0x100) & 0xff;
    localStorage.setItem(RIGHT_PANEL_KEY, rightPanelID);
    loadRightPanel(rightPanelID);
});

window.addEventListener('DOMContentLoaded', () => {
    // Always in case user clears storage or data
    leftPanelID = getSavedPanelID(LEFT_PANEL_KEY);
    rightPanelID = getSavedPanelID(RIGHT_PANEL_KEY);
    loadLeftPanel(leftPanelID);
    loadRightPanel(rightPanelID);
});