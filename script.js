const videoElement = document.getElementById('webcam');
const canvasElement = document.getElementById('output-canvas');
const canvasCtx = canvasElement.getContext('2d');

// UI Element Selectors for Real-Time Telemetry
const repCounter = document.getElementById('rep-count');
const angleDisplay = document.getElementById('joint-angle');
const feedbackText = document.getElementById('feedback-text');

// State Machine Variables for Precise Repetition Counting
let count = 0;
let position = null; // Tracks extension ("down") vs flexion ("up") states

/**
 * Calculates the internal angle between three spatial coordinates.
 * In a bicep curl: p1 = Shoulder, p2 = Elbow, p3 = Wrist
 */
function calculateAngle(p1, p2, p3) {
    let radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    
    // Ensure we always calculate the interior angle of the joint
    if (angle > 180.0) angle = 360.0 - angle;
    
    return Math.round(angle);
}

/**
 * MediaPipe Inference Callback Loop
 * Processes each webcam frame to extract landmarks and overlay the skeletal tracking HUD
 */
function onResults(results) {
    // If no human skeleton is intercepted, update UI warning status
    if (!results.poseLandmarks) {
        feedbackText.textContent = "No user detected. Step into frame.";
        feedbackText.className = "status-warn";
        return;
    }

    // Dynamic Canvas Synchronization with local webcam streaming dimensions
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    // Clear previous drawing frame layer
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    // Render the tracking nodes and skeletal lines on the canvas overlay
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: 'rgba(0, 242, 254, 0.6)', lineWidth: 3 });
    drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#ff5f6d', lineWidth: 1, radius: 4 });

    // Target skeletal nodes for physical analysis (Shoulder: 11, Elbow: 13, Wrist: 15)
    const shoulder = results.poseLandmarks[11];
    const elbow = results.poseLandmarks[13];
    const wrist = results.poseLandmarks[15];

    if (shoulder && elbow && wrist) {
        // Calculate the live angle of the arm
        const angle = calculateAngle(shoulder, elbow, wrist);
        angleDisplay.textContent = `${angle}°`;

        // Algorithmic Finite State Machine for Bicep Curls tracking
        if (angle > 160) {
            if (position !== "down") {
                position = "down";
            }
            feedbackText.textContent = "Curl upwards!";
            feedbackText.className = "status-good";
        }
        
        if (angle < 45 && position === "down") {
            position = "up";
            count++;
            repCounter.textContent = count;
            feedbackText.textContent = "Perfect Rep!";
            feedbackText.className = "status-good";
        }
        
        // Posture Warning Logic Constraints
        if (angle < 160 && angle > 45 && position === null) {
            feedbackText.textContent = "Extend your arm fully to start.";
            feedbackText.className = "status-warn";
        }
    }
}

// Instantiate Google MediaPipe Pose Architecture configuration pipeline
const pose = new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
});

pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

pose.onResults(onResults);

// Stream initialization routing using local camera module utilities
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await pose.send({ image: videoElement });
    },
    width: 640,
    height: 480
});

camera.start().then(() => {
    feedbackText.textContent = "Engine Online. Start Workout!";
    feedbackText.className = "status-good";
});
