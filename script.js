const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('output-canvas');
const canvasCtx = canvasElement.getContext('2d');

// UI Selectors
const repCounter = document.getElementById('rep-count');
const angleDisplay = document.getElementById('joint-angle');
const angleLabel = document.getElementById('angle-label');
const feedbackText = document.getElementById('feedback-text');
const feedbackCard = document.getElementById('feedback-card');
const progressBar = document.getElementById('rep-progress-bar');

// Circular Progress Meter Layout Configuration
const radius = progressBar.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
progressBar.style.strokeDasharray = `${circumference} ${circumference}`;
progressBar.style.strokeDashoffset = circumference;

// Core Runtime Configurations
let currentExercise = 'bicep_curl';
let count = 0;
let position = null;
let lastSpokenFeedback = "";
let totalCaloriesConsumed = 0;
let loggedFoods = [];

// Dynamic Exercise State Configurations Object
const exerciseRules = {
    bicep_curl: { name: "ELBOW JOINTS", nodes: [11, 13, 15], extension: 160, flexion: 45 },
    squat: { name: "KNEE JOINTS", nodes: [23, 25, 27], extension: 160, flexion: 90 }
};

// Personalized Workouts Dataset Matrix
const routinePlans = {
    fat_loss: `
        <p><strong>DAY 1:</strong> AI Squat Automation (4 Sets x 20 Reps)</p>
        <p><strong>DAY 2:</strong> High Intensity Bicep Flexion (4 Sets x 25 Reps)</p>
        <p><strong>DAY 3:</strong> Core Stabilization & Cardio Drills (30 Mins)</p>
        <p><strong>METRIC TARGET:</strong> High velocity tracking to maximize calorie burn.</p>
    `,
    muscle_gain: `
        <p><strong>DAY 1:</strong> Progressive Load Squat Layer (4 Sets x 10 Hyper-Controlled Reps)</p>
        <p><strong>DAY 2:</strong> Mechanical Tension Bicep Curls (4 Sets x 12 Slow Reps)</p>
        <p><strong>DAY 3:</strong> Biomechanical Compound Lifting (Chest/Back focuses)</p>
        <p><strong>METRIC TARGET:</strong> Slow, precise form mapping to maximize target strain.</p>
    `
};

// UI Live Internal Digital Clock Loop
setInterval(() => {
    document.getElementById('system-time').textContent = new Date().toUTCString().replace("GMT", "UTC");
}, 1000);

// App Initialize Lifecycle Hook
window.onload = function() {
    loadPersonalizedPlan('fat_loss');
    initializeLocalStorageLogs();
};

/* --- Navigation Tab Switcher Logic --- */
function switchModule(moduleName) {
    const modules = ['vision', 'nutrition', 'routines'];
    modules.forEach(m => {
        const container = document.getElementById(`module-${m}-container`);
        const tabButton = document.getElementById(`tab-${m}`);
        if (m === moduleName) {
            container.classList.add('module-visible');
            container.classList.remove('module-hidden');
            tabButton.classList.add('active');
        } else {
            container.classList.remove('module-visible');
            container.classList.add('module-hidden');
            tabButton.classList.remove('active');
        }
    });
    triggerAudioFeedback(`Accessing ${moduleName} framework.`);
}

/* --- Calorie Engine Data Ingestion --- */
function initializeLocalStorageLogs() {
    const cachedLogs = localStorage.getItem('fitverse_food_registry');
    if (cachedLogs) {
        loggedFoods = JSON.parse(cachedLogs);
        rebuildFoodDOMList();
    }
}

function logFoodItem(event) {
    event.preventDefault();
    const nameInput = document.getElementById('food-name');
    const calInput = document.getElementById('food-calories');
    
    const entry = {
        id: Date.now(),
        name: nameInput.value.toUpperCase(),
        calories: parseInt(calInput.value)
    };
    
    loggedFoods.push(entry);
    localStorage.setItem('fitverse_food_registry', JSON.stringify(loggedFoods));
    
    nameInput.value = '';
    calInput.value = '';
    
    rebuildFoodDOMList();
    triggerAudioFeedback(`Logged ${entry.calories} kilocalories.`);
}

function rebuildFoodDOMList() {
    const targetList = document.getElementById('food-log-list');
    targetList.innerHTML = '';
    totalCaloriesConsumed = 0;
    
    loggedFoods.forEach(item => {
        totalCaloriesConsumed += item.calories;
        const li = document.createElement('li');
        li.className = 'hud-list-item';
        li.innerHTML = `<span>${item.name}</span> <span style="color: #00f2fe">${item.calories} KCAL</span>`;
        targetList.appendChild(li);
    });
    
    document.getElementById('total-calories').textContent = totalCaloriesConsumed;
}

/* --- Routine Ingestion Logic --- */
function loadPersonalizedPlan(type) {
    document.getElementById('routine-plan-content').innerHTML = routinePlans[type];
    document.getElementById('plan-fatloss').classList.toggle('active', type === 'fat_loss');
    document.getElementById('plan-muscle').classList.toggle('active', type === 'muscle_gain');
    triggerAudioFeedback(`Loading ${type.replace('_', ' ')} schematics.`);
}

/* --- Vision Tracking Framework Core --- */
function setExercise(type) {
    currentExercise = type;
    count = 0;
    position = null;
    repCounter.textContent = count;
    updateProgressBar(0);
    angleLabel.textContent = exerciseRules[type].name;
    
    document.getElementById('btn-curl').classList.toggle('active', type === 'bicep_curl');
    document.getElementById('btn-squat').classList.toggle('active', type === 'squat');
    triggerAudioFeedback(`Switching tracking parameters to ${type.replace('_', ' ')} logic matrix.`);
}

function updateProgressBar(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressBar.style.strokeDashoffset = offset;
}

function triggerAudioFeedback(text) {
    if (text === lastSpokenFeedback) return;
    lastSpokenFeedback = text;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
}

function playBeepSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = 880;
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    oscillator.stop(audioCtx.currentTime + 0.15);
}

function calculateAngle(p1, p2, p3) {
    let radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360.0 - angle;
    return Math.round(angle);
}

function onResults(results) {
    // Only compile pose loops if the Vision module tab workspace is actively visible
    if (!document.getElementById('module-vision-container').classList.contains('module-visible')) return;

    if (!results.poseLandmarks) {
        feedbackText.textContent = "BIO-LINK DROP // TARGET REMOVED";
        feedbackText.className = "status-warn";
        feedbackCard.className = "metric-card feedback-card status-warn-border";
        return;
    }

    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: 'rgba(0, 242, 254, 0.4)', lineWidth: 2 });
    drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#ff5f6d', lineWidth: 1, radius: 3 });

    const rule = exerciseRules[currentExercise];
    const p1 = results.poseLandmarks[rule.nodes[0]];
    const p2 = results.poseLandmarks[rule.nodes[1]];
    const p3 = results.poseLandmarks[rule.nodes[2]];

    if (p1 && p2 && p3) {
        const angle = calculateAngle(p1, p2, p3);
        angleDisplay.textContent = `${angle}°`;

        let progressPercent = 0;
        if (position === "down") {
            const range = rule.extension - rule.flexion;
            const currentDelta = rule.extension - angle;
            progressPercent = Math.min(Math.max((currentDelta / range) * 100, 0), 100);
        }
        updateProgressBar(progressPercent);

        if (angle > rule.extension) {
            position = "down";
            feedbackText.textContent = "EXECUTE FLEXION SEQUENCE";
            feedbackText.className = "status-good";
            feedbackCard.className = "metric-card feedback-card status-good-border";
        }
        
        if (angle < rule.flexion && position === "down") {
            position = "up";
            count++;
            repCounter.textContent = count;
            playBeepSound();
            updateProgressBar(100);
            feedbackText.textContent = `CYCLE SUCCESS: COUNT ${count}`;
            feedbackText.className = "status-good";
            feedbackCard.className = "metric-card feedback-card status-good-border";
            triggerAudioFeedback(`${count}`);
        }
        
        if (angle < rule.extension && angle > rule.flexion && position === null) {
            feedbackText.textContent = "CLEAR SYSTEM BOUNDARY // EXTEND FULLY";
            feedbackText.className = "status-warn";
            feedbackCard.className = "metric-card feedback-card status-warn-border";
            triggerAudioFeedback("Extend body vector fully to engage framework.");
        }
    }
}

const pose = new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});

pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
pose.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => { await pose.send({ image: videoElement }); },
    width: 640, height: 480
});
camera.start().then(() => {
    feedbackText.textContent = "BIO-LINK ENGINE UP // COGNITIVE SHIELD READY";
    triggerAudioFeedback("System operational. Neural tracking initialized.");
});
