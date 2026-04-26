const text = "> INIT_EFECT_SUITE...";
let i = 0;
const speed = 75; 

const systemLogs = [
    "Bypassing OS latency... OK",
    "Optimizing system registry... OK",
    "Loading macro engine hooks... OK",
    "Establishing secure connection... DONE"
];
let logIndex = 0;

// --- HARDWARE AUDIO & HAPTICS BYPASS ---
const clickSound = new Audio('spckclick.mp3'); 
const bootSound = new Audio('efectboot.mp3');   
clickSound.volume = 0.8;
bootSound.volume = 0.9;

function triggerClick() {
    clickSound.currentTime = 0; 
    clickSound.play().catch(() => {});
    if (navigator.vibrate) navigator.vibrate(15); 
}

function triggerBoot() {
    bootSound.currentTime = 0;
    bootSound.play().catch(() => {});
    if (navigator.vibrate) navigator.vibrate([40, 50, 40]); 
}

// --- TOAST NOTIFICATION ENGINE ---
function showToast(title, msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'efect-toast';
    toast.innerHTML = `<h4><i class="fa-solid fa-bell" style="margin-right:8px;"></i>${title}</h4><p>${msg}</p>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutToast 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 5000);
}

// --- FAKE PURCHASE GENERATOR ---
const efectProducts = ["EFECT Pro Macro", "EFECT Optimizer Elite", "EFECT FPS Booster", "Custom UEFN Map"];
setInterval(() => {
    if (Math.random() > 0.65) {
        const prod = efectProducts[Math.floor(Math.random() * efectProducts.length)];
        const chars = "0123456789ABCDEF";
        let serial = "";
        for(let j=0; j<4; j++) serial += chars[Math.floor(Math.random() * chars.length)];
        serial += "-XXXX-XXXX-****";
        showToast("SECURE CHECKOUT", `User just acquired <b>${prod}</b><br><span style="color:#00ff00;font-size:0.75rem;font-family:monospace;margin-top:5px;display:block;">LICENSE: ${serial}</span>`);
    }
}, 12000);

document.addEventListener('DOMContentLoaded', () => {
    const crt = document.createElement('div');
    crt.classList.add('crt-overlay');
    document.body.appendChild(crt);

    // --- PERSISTENT MEMORY LOADER ---
    const savedScore = localStorage.getItem('efect_synergy_score');
    if (savedScore) {
        const cardScore = document.getElementById('card-synergy-score');
        if (cardScore) cardScore.innerText = `${savedScore}/100`;
    }

    // --- SOPHISTICATED BOOT SPLASH ---
    const initBtn = document.getElementById('init-btn');
    const splashScreen = document.getElementById('splash-screen');
    const splashTerminal = document.getElementById('splash-terminal');
    const bootHud = document.getElementById('boot-hud');
    const scanner = document.getElementById('scanner');
    let isBooting = false;

    if (initBtn) {
        initBtn.addEventListener('click', async () => {
            if (isBooting) return;
            isBooting = true;
            triggerBoot(); 
            
            initBtn.style.display = 'none'; 
            if (bootHud) bootHud.style.display = 'flex';
            if (scanner) scanner.style.display = 'block';
            setTimeout(() => { if(bootHud) bootHud.style.opacity = '1'; }, 10);
            
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const permissionState = await DeviceOrientationEvent.requestPermission();
                    if (permissionState === 'granted') window.addEventListener('deviceorientation', handleGyro);
                } catch (err) {}
            } else { window.addEventListener('deviceorientation', handleGyro); }

            const hexStream = setInterval(() => {
                const hHex = document.getElementById('hud-hex');
                const hHex2 = document.getElementById('hud-hex2');
                const hVolt = document.getElementById('hud-volt');
                const hTemp = document.getElementById('hud-temp');
                if (hHex) hHex.innerText = '0x' + Math.floor(Math.random()*16777215).toString(16).toUpperCase();
                if (hHex2) hHex2.innerText = '0x' + Math.floor(Math.random()*16777215).toString(16).toUpperCase();
                if (hVolt) hVolt.innerText = (Math.random() * (1.35 - 1.15) + 1.15).toFixed(2) + 'V';
                if (hTemp) hTemp.innerText = Math.floor(Math.random() * (65 - 35) + 35) + '°C';
            }, 100);

            let bootIdx = 0;
            const bootSteps = [
                "INJECTING_KERNEL_HOOKS...",
                "BYPASSING_LATENCY_GATES...",
                "ALLOCATING_MEMORY...",
                "SECURING_ENCRYPTION...",
                "LINKING_HARDWARE...",
                "SYSTEM_READY"
            ];

            const bootInterval = setInterval(() => {
                if (bootIdx < 6) {
                    if (splashTerminal) splashTerminal.innerHTML = `> ${bootSteps[bootIdx]}`;
                    const seg = document.getElementById(`seg-${bootIdx + 1}`);
                    if (seg) seg.classList.add('active');
                    bootIdx++;
                } else {
                    clearInterval(bootInterval);
                    clearInterval(hexStream);
                    
                    setTimeout(() => {
                        if (splashScreen) splashScreen.style.opacity = '0';
                        setTimeout(() => {
                            if (splashScreen) splashScreen.remove();
                            initLockScreen(); 
                        }, 500);
                    }, 400);
                }
            }, 400);
        });
    }

    // --- SECURE LOCK SCREEN LOGIC ---
    function initLockScreen() {
        const lockScreen = document.getElementById('lock-screen');
        if (!lockScreen) {
            unlockSystem(); 
            return;
        }

        lockScreen.style.display = 'flex';
        setTimeout(() => { lockScreen.style.opacity = '1'; }, 10);

        const savedPin = localStorage.getItem('efect_master_key');
        const lockTitle = document.getElementById('lock-title');
        const lockSubtitle = document.getElementById('lock-subtitle');
        const lockInput = document.getElementById('lock-input');
        const lockBtn = document.getElementById('lock-btn');
        const lockError = document.getElementById('lock-error');

        if (!savedPin) {
            if (lockTitle) lockTitle.innerText = "INITIAL SETUP";
            if (lockSubtitle) lockSubtitle.innerText = "Create a new Master Key to encrypt your hub.";
            if (lockBtn) lockBtn.innerText = "REGISTER KEY";
        } else {
            if (lockTitle) lockTitle.innerText = "SYSTEM LOCKED";
            if (lockSubtitle) lockSubtitle.innerText = "Enter your Master Key to proceed.";
            if (lockBtn) lockBtn.innerText = "AUTHENTICATE";
        }

        const handleAuth = () => {
            if (!lockInput) return;
            const val = lockInput.value.trim();
            if (!val) return;
            triggerClick();

            if (!savedPin) {
                localStorage.setItem('efect_master_key', val);
                unlockSystem();
            } else {
                if (val === savedPin) {
                    unlockSystem();
                } else {
                    if (lockError) lockError.style.display = 'block';
                    lockInput.value = ''; 
                    const mc = lockScreen.querySelector('.modal-content');
                    if (mc) {
                        mc.style.transform = 'translateX(-10px)';
                        setTimeout(() => mc.style.transform = 'translateX(10px)', 100);
                        setTimeout(() => mc.style.transform = 'translateX(0)', 200);
                    }
                }
            }
        };

        if (lockBtn) lockBtn.addEventListener('click', handleAuth);
        if (lockInput) lockInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleAuth(); });
    }

    function unlockSystem() {
        const lockScreen = document.getElementById('lock-screen');
        if (lockScreen) lockScreen.style.opacity = '0';
        setTimeout(() => {
            if (lockScreen) lockScreen.style.display = 'none';
            typeWriter(); 
            initDiagnostics(); 
            fetchGitHubUpdates();
        }, 400);
    }

    // --- NATIVE IOS SHARE BUTTON ---
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            triggerClick();
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: 'EFECT Suite',
                        text: 'Check out the EFECT Performance & Optimization Hub.',
                        url: window.location.href
                    });
                } catch (err) {}
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        });
    }

    // --- COMMAND CONSOLE LOGIC ---
    const consoleUI = document.getElementById('command-console');
    const cmdInput = document.getElementById('cmd-input');
    const consoleHandle = document.getElementById('console-handle');
    const consoleIcon = document.getElementById('console-icon');
    let consoleOpen = false;

    if (consoleUI && cmdInput) {
        if (consoleHandle) {
            consoleHandle.addEventListener('click', (e) => {
                e.preventDefault();
                triggerClick();
                consoleOpen = !consoleOpen;
                consoleUI.style.top = consoleOpen ? '0' : '-100px';
                consoleIcon.className = consoleOpen ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
                if (consoleOpen) setTimeout(() => cmdInput.focus(), 300);
            });
        }

        consoleUI.addEventListener('submit', function (e) {
            e.preventDefault(); 
            triggerClick();
            const code = cmdInput.value.toLowerCase().trim();
            
            if (code === 'efect.lit') {
                const fCard = document.getElementById('secret-fps-card');
                if (fCard) fCard.style.display = 'flex';
                showToast("SYSTEM OVERRIDE", "Code accepted. FPS Override Active.");
            } else if (code === 'color_override') {
                document.body.style.filter = `hue-rotate(${Math.floor(Math.random() * 360)}deg)`;
                showToast("UI OVERRIDE", "Color matrix randomized.");
            } else if (code === 'matrix') {
                startMatrix();
                showToast("RENDER OVERRIDE", "Matrix background engaged.");
            } else if (code === '420') {
                triggerBoot(); 
                unlockHardwareMonitor();
                showToast("ADMIN ACCESS", "Hardware telemetry unlocked.");
            } else if (code === 'discord') {
                const dModal = document.getElementById('discord-modal');
                if (dModal) {
                    dModal.style.display = 'flex';
                    setTimeout(() => dModal.style.opacity = '1', 10);
                }
                showToast("LINK ESTABLISHED", "Opening comms channel.");
            } else if (code !== '') {
                showToast("ACCESS DENIED", "Invalid override code entered.");
            }
            
            consoleOpen = false;
            consoleUI.style.top = '-100px';
            consoleIcon.className = 'fa-solid fa-chevron-down';
            cmdInput.value = '';
            cmdInput.blur();
        });
    }

    // --- MODALS ---
    const setupModal = (btnId, modalId, vidId = null) => {
        document.getElementById(btnId)?.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerClick();
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => modal.style.opacity = '1', 10);
            }
            if (vidId) document.getElementById(vidId)?.play();
        });
    };

    setupModal('btn-preview', 'preview-modal', 'macro-vid');
    setupModal('btn-fps-preview', 'fps-modal');
    setupModal('btn-synergy', 'synergy-modal'); 

    document.getElementById('close-modal')?.addEventListener('click', () => {
        triggerClick();
        const pm = document.getElementById('preview-modal');
        if (pm) pm.style.opacity = '0';
        document.getElementById('macro-vid')?.pause();
        setTimeout(() => { if (pm) pm.style.display = 'none'; }, 300);
    });

    document.getElementById('close-fps-modal')?.addEventListener('click', () => {
        triggerClick();
        const fm = document.getElementById('fps-modal');
        if (fm) fm.style.opacity = '0';
        setTimeout(() => { if (fm) fm.style.display = 'none'; }, 300);
    });

    document.getElementById('close-synergy-modal')?.addEventListener('click', () => {
        triggerClick();
        const sm = document.getElementById('synergy-modal');
        if (sm) sm.style.opacity = '0';
        setTimeout(() => { if (sm) sm.style.display = 'none'; }, 300);
    });

    document.getElementById('close-discord-modal')?.addEventListener('click', () => {
        triggerClick();
        const dm = document.getElementById('discord-modal');
        if (dm) dm.style.opacity = '0';
        setTimeout(() => { if (dm) dm.style.display = 'none'; }, 300);
    });

    document.getElementById('copy-discord-btn')?.addEventListener('click', () => {
        triggerClick();
        const discordId = document.getElementById('discord-tag').innerText;
        navigator.clipboard.writeText(discordId).then(() => {
            showToast("COPIED TO CLIPBOARD", `${discordId} copied. Paste in Discord to DM.`);
            const btn = document.getElementById('copy-discord-btn');
            const originalText = btn.innerText;
            btn.innerText = "COPIED!";
            btn.style.background = "#5865F2";
            btn.style.color = "#fff";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "transparent";
                btn.style.color = "#5865F2";
            }, 2000);
        });
    });

    document.getElementById('btn-hub')?.addEventListener('click', () => {
        triggerClick();
        window.open('https://efectmacrosxtweaks.netlify.app/', '_blank');
    });

    document.getElementById('btn-maps')?.addEventListener('click', () => {
        triggerClick();
        window.open('https://fortnite.gg/creator/efect.lit', '_blank');
    });

    // --- SYNERGY CALCULATION LOGIC ---
    document.getElementById('run-synergy-btn')?.addEventListener('click', () => {
        triggerClick();
        const gpuName = document.getElementById('syn-gpu').value.toUpperCase() || "UNKNOWN GPU";
        const cpuName = document.getElementById('syn-cpu').value.toUpperCase() || "UNKNOWN CPU";
        const perName = document.getElementById('syn-per').value.toUpperCase() || "STANDARD GEAR";
        
        let gpuVal = 50;
        if (gpuName.includes('4090') || gpuName.includes('7900 XTX')) gpuVal = 100;
        else if (gpuName.includes('4080') || gpuName.includes('4070 TI') || gpuName.includes('7900 XT')) gpuVal = 95;
        else if (gpuName.includes('4070') || gpuName.includes('3090') || gpuName.includes('7800')) gpuVal = 88;
        else if (gpuName.includes('4060') || gpuName.includes('3080') || gpuName.includes('7700')) gpuVal = 82;
        else if (gpuName.includes('3070') || gpuName.includes('6700') || gpuName.includes('2080')) gpuVal = 75;
        else if (gpuName.includes('3060') || gpuName.includes('2070') || gpuName.includes('6600')) gpuVal = 65;
        else if (gpuName.includes('3050') || gpuName.includes('1660') || gpuName.includes('2060')) gpuVal = 45;

        let cpuVal = 50;
        if (cpuName.includes('14900') || cpuName.includes('7950X3D') || cpuName.includes('7800X3D')) cpuVal = 100;
        else if (cpuName.includes('14700') || cpuName.includes('13900') || cpuName.includes('7900X')) cpuVal = 95;
        else if (cpuName.includes('14600') || cpuName.includes('13700') || cpuName.includes('7700X')) cpuVal = 88;
        else if (cpuName.includes('13600') || cpuName.includes('12900') || cpuName.includes('5800X3D')) cpuVal = 82;
        else if (cpuName.includes('12700') || cpuName.includes('12600') || cpuName.includes('5700X')) cpuVal = 75;
        else if (cpuName.includes('12400') || cpuName.includes('11600') || cpuName.includes('5600')) cpuVal = 65;

        let perVal = 50;
        if (perName.includes('APEX PRO') || perName.includes('SUPERLIGHT') || perName.includes('WOOTING') || perName.includes('SCUF') || perName.includes('HEX')) perVal = 100;
        else if (perName.includes('PRO') || perName.includes('ESPORTS')) perVal = 85;
        
        const score = Math.floor((gpuVal * 0.45) + (cpuVal * 0.40) + (perVal * 0.15));
        const resultBox = document.getElementById('syn-result');
        const scoreText = document.getElementById('syn-score-text');
        const adviceText = document.getElementById('syn-advice');
        const cardScore = document.getElementById('card-synergy-score'); 
        
        resultBox.style.display = 'block';
        scoreText.innerText = "CALC...";
        adviceText.innerText = "Scanning hardware identifiers and simulating 1% lows...";
        
        setTimeout(() => {
            triggerClick(); 
            scoreText.innerText = score;
            localStorage.setItem('efect_synergy_score', score);
            if (cardScore) cardScore.innerText = `${score}/100`;
            
            let customFeedback = (gpuVal < cpuVal - 15) ? `BOTTLENECK: ${gpuName} is holding back ${cpuName}. ` : (cpuVal < gpuVal - 15) ? `BOTTLENECK: ${cpuName} is choking ${gpuName}. ` : `PERFECT SYNERGY: Flawlessly paired hardware. `;
            customFeedback += (score >= 90) ? `\n\nSTATUS: Elite Tier. Raw 0-delay hardware.` : (score >= 70) ? `\n\nSTATUS: Competitive Tier. Solid frame times.` : `\n\nSTATUS: Casual Tier. drop settings to Performance Mode.`;
            adviceText.innerText = customFeedback;
        }, 1500);
    });

    // --- HARDWARE MONITOR JAILBREAK ---
    function unlockHardwareMonitor() {
        const hwCard = document.getElementById('hw-monitor-card');
        const hwBtn = document.getElementById('btn-hw-monitor');
        const hwBadge = document.getElementById('hw-status-badge');
        if (hwCard && hwBtn && hwBadge) {
            hwCard.classList.remove('locked');
            hwBadge.className = 'status online';
            hwBadge.innerHTML = '<span class="dot"></span> ONLINE';
            hwBtn.classList.remove('disabled');
            hwBtn.removeAttribute('disabled');
            hwBtn.innerText = 'OPEN TELEMETRY';
            localStorage.setItem('efect_monitor_unlocked', 'true');
        }
    }
    if (localStorage.getItem('efect_monitor_unlocked') === 'true') unlockHardwareMonitor();

    initDiagnostics();
});

// --- GITHUB & MATRIX ---
async function fetchGitHubUpdates() {
    const ghUpdateElement = document.getElementById('gh-update');
    if (!ghUpdateElement) return;
    try {
        const response = await fetch('https://api.github.com/users/tjcorp420/events/public');
        const events = await response.json();
        const lastPush = events.find(event => event.type === 'PushEvent');
        if (lastPush) {
            ghUpdateElement.innerHTML = `<i class="fa-solid fa-code-commit"></i> UPDATE [${lastPush.repo.name.split('/')[1]}]: ${lastPush.payload.commits[0].message}`;
        }
    } catch (e) {}
}

function startMatrix() {
    const canvas = document.getElementById('matrix-canvas') || document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.appendChild(canvas);
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const drops = Array(Math.floor(canvas.width / 16)).fill(1);
    setInterval(() => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff00";
        drops.forEach((y, i) => {
            ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), i * 16, y * 16);
            if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        });
    }, 33);
}

function initDiagnostics() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(b => {
            const up = () => document.getElementById('batt-level').innerText = `${Math.round(b.level * 100)}% ${b.charging ? '⚡' : ''}`;
            up(); b.onlevelchange = up; b.onchargingchange = up;
        });
    }
}

function handleGyro(e) {
    const galaxy = document.querySelector('.galaxy-wrapper');
    if (galaxy) galaxy.style.transform = `translate(${e.gamma/1.5}px, ${(e.beta-45)/1.5}px)`;
}

function typeWriter() {
    const tw = document.getElementById("typewriter");
    if (i < text.length) { tw.innerHTML += text.charAt(i); i++; setTimeout(typeWriter, speed); }
    else { startTerminalLog(); }
}

function startTerminalLog() {
    const log = document.getElementById("terminal-log");
    setInterval(() => {
        log.innerText = "> " + systemLogs[logIndex];
        logIndex = (logIndex + 1) % systemLogs.length;
    }, 2000);
}

document.addEventListener('click', e => {
    if (['INPUT', 'SELECT', 'OPTION'].includes(e.target.tagName)) return;
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = e.pageX + 'px';
    ripple.style.top = e.pageY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600); 
});