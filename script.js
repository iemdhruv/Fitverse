:root {
    --bg-darker: #05070b;
    --bg-card: rgba(10, 15, 26, 0.75);
    --border-neon: rgba(0, 242, 254, 0.15);
    --accent-blue: #00f2fe;
    --accent-neon: #4facfe;
    --accent-coral: #ff5f6d;
    --accent-warn: #ffad33;
    --text-primary: #f0f6fc;
    --text-secondary: #5865f2;
    --neon-glow: 0 0 20px rgba(0, 242, 254, 0.4);
}

body {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
    background: radial-gradient(circle at center, #0b1528 0%, var(--bg-darker) 100%);
    color: var(--text-primary);
    min-height: 100vh;
}

.app-container {
    max-width: 1350px;
    margin: 0 auto;
    padding: 25px;
}

/* Premium System HUD Header layout */
.hud-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-neon);
    padding-bottom: 15px;
    margin-bottom: 25px;
}

.system-status {
    font-size: 0.8rem;
    color: var(--accent-blue);
    display: flex;
    align-items: center;
    gap: 8px;
}

.pulse-dot {
    width: 8px;
    height: 8px;
    background-color: var(--accent-blue);
    border-radius: 50%;
    animation: pulse 1.5s infinite;
}

.brand-title h1 {
    font-size: 1.8rem;
    font-weight: 900;
    text-align: center;
    letter-spacing: 0.15em;
    margin: 0;
    background: linear-gradient(90deg, #fff, var(--accent-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.brand-title p {
    font-size: 0.65rem;
    text-align: center;
    letter-spacing: 0.4em;
    color: #4a5a78;
    margin: 4px 0 0 0;
}

.system-clock {
    font-size: 0.8rem;
    color: #4a5a78;
}

/* Module Selector Controls Bar */
.module-navigation {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 10px;
}

.nav-tab {
    background: transparent;
    border: none;
    color: #4a5a78;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    padding: 10px 20px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.nav-tab.active, .nav-tab:hover {
    color: var(--accent-blue);
    text-shadow: var(--neon-glow);
    border-bottom: 2px solid var(--accent-blue);
}

/* Structural Module View Switching Rule sets */
.module-visible { display: grid !important; }
.module-hidden { display: none !important; }

/* Two Column Work Matrix Grid */
.main-layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 30px;
}

/* Tactical Crosshair Camera Overlay */
.video-box {
    position: relative;
    background: var(--bg-card);
    border: 1px solid var(--border-neon);
    border-radius: 4px;
    overflow: hidden;
    aspect-ratio: 4/3;
    box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
}

#webcam, #output-canvas {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    position: absolute;
}

.scanline {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    background-size: 100% 4px, 6px 100%;
    z-index: 2;
    pointer-events: none;
}

.hud-corner {
    position: absolute;
    width: 15px;
    height: 15px;
    border: 2px solid var(--accent-blue);
    z-index: 3;
}
.top-left { top: 15px; left: 15px; border-right: 0; border-bottom: 0; }
.top-right { top: 15px; right: 15px; border-left: 0; border-bottom: 0; }
.bottom-left { bottom: 15px; left: 15px; border-right: 0; border-top: 0; }
.bottom-right { bottom: 15px; right: 15px; border-left: 0; border-top: 0; }

/* Interactive Cyber Controller Buttons */
.btn-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 5px;
}

.hud-btn {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(200,200,200,0.1);
    color: #4a5a78;
    padding: 12px;
    font-family: inherit;
    font-size: 0.75rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: all 0.2s ease;
}

.hud-btn.active {
    border-color: var(--accent-blue);
    color: var(--accent-blue);
    background: rgba(0, 242, 254, 0.05);
    box-shadow: inset 0 0 10px rgba(0, 242, 254, 0.2);
}

.btn-full { grid-column: span 2; margin-top: 10px; }

/* Data Form Controls */
.hud-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.hud-input {
    background: rgba(0,0,0,0.4);
    border: 1px solid var(--border-neon);
    padding: 12px;
    color: var(--text-primary);
    font-family: inherit;
    font-size: 0.85rem;
}

.hud-input:focus {
    outline: none;
    border-color: var(--accent-blue);
}

/* Logging Tables & Registries */
.log-table-wrapper {
    margin-top: 25px;
    text-align: left;
}

.log-table-wrapper h4 {
    font-size: 0.75rem;
    color: #4a5a78;
    letter-spacing: 0.1em;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding-bottom: 8px;
    margin-bottom: 12px;
}

.hud-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 220px;
    overflow-y: auto;
}

.hud-list-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: rgba(255,255,255,0.01);
    border: 1px solid rgba(255,255,255,0.03);
    margin-bottom: 6px;
    font-size: 0.8rem;
}

.diet-chart-summary {
    text-align: left;
    font-size: 0.8rem;
    line-height: 1.8;
}

.diet-chart-summary p {
    margin: 8px 0;
    border-bottom: 1px dashed rgba(255,255,255,0.03);
    padding-bottom: 4px;
}

/* Circular Dashboard Progress Elements */
.progress-container {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
}

.progress-ring__bar {
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: stroke-dashoffset 0.15s ease;
}

.counter {
    position: absolute;
    font-size: 3rem;
    font-weight: 900;
    color: #fff;
    text-shadow: var(--neon-glow);
}

.metric-card {
    background: var(--bg-card);
    border: 1px solid rgba(255,255,255,0.03);
    border-top: 2px solid rgba(255,255,255,0.1);
    padding: 20px;
    text-align: center;
}

.metric-card h3 {
    margin: 0 0 12px 0;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    color: #4a5a78;
}

.angle-display {
    font-size: 2.8rem;
    font-weight: bold;
    color: var(--accent-coral);
}

.sub-label {
    font-size: 0.6rem;
    color: #4a5a78;
    letter-spacing: 0.1em;
    margin-top: 4px;
}

/* Dynamic Live Diagnostics Feedback Framework Cards */
.status-good-border { border-top: 2px solid var(--accent-blue) !important; }
.status-warn-border { border-top: 2px solid var(--accent-warn) !important; }

#feedback-text {
    font-size: 0.95rem;
    font-weight: bold;
    letter-spacing: 0.05em;
}

.status-good { color: #56d364; }
.status-warn { color: var(--accent-warn); }

@keyframes pulse {
    0% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 0.4; }
}
