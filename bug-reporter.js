(function() {
    'use strict';
    
    console.log('🐛 Bug Reporter: Starting initialization...');
    
    // Configuration
    const API_ENDPOINT = window.BUG_REPORTER_CONFIG?.apiUrl || 'http://localhost:3000/api/issues';
    const REPO_URL = window.BUG_REPORTER_CONFIG?.repoUrl || 'https://github.com/unknown/repo';
    const BUTTON_SIZE = window.BUG_REPORTER_CONFIG?.buttonSize || 50;
    const BUTTON_COLOR = window.BUG_REPORTER_CONFIG?.buttonColor || '#ff4757';
    const BUTTON_HOVER_COLOR = window.BUG_REPORTER_CONFIG?.buttonHoverColor || '#ff3742';
    
    console.log('🐛 Bug Reporter: Configuration loaded:', {
        API_ENDPOINT,
        REPO_URL,
        BUTTON_SIZE,
        BUTTON_COLOR
    });
    
    // Create styles with more specific selectors and better visibility
    const styles = `
        .bug-reporter-container {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            z-index: 9999999 !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            pointer-events: auto !important;
        }
        
        .bug-reporter-button {
            width: ${BUTTON_SIZE}px !important;
            height: ${BUTTON_SIZE}px !important;
            border-radius: 50% !important;
            background-color: ${BUTTON_COLOR} !important;
            border: 2px solid white !important;
            cursor: pointer !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
            transition: all 0.3s ease !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: white !important;
            font-size: 20px !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
        }
        
        .bug-reporter-button:hover {
            background-color: ${BUTTON_HOVER_COLOR} !important;
            transform: scale(1.1) !important;
            box-shadow: 0 6px 16px rgba(0,0,0,0.4) !important;
            border-color: #f8f9fa !important;
        }
        
        .bug-reporter-button:active {
            transform: scale(0.95) !important;
        }
        
        .bug-reporter-modal {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background-color: rgba(0,0,0,0.5) !important;
            z-index: 10000000 !important;
            display: none !important;
            align-items: center !important;
            justify-content: center !important;
            pointer-events: auto !important;
        }
        
        .bug-reporter-modal.show {
            display: flex !important;
        }
        
        .bug-reporter-form {
            background: white !important;
            border-radius: 12px !important;
            padding: 24px !important;
            width: 90% !important;
            max-width: 500px !important;
            max-height: 80vh !important;
            overflow-y: auto !important;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
            pointer-events: auto !important;
        }
        
        .bug-reporter-header {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            margin-bottom: 20px !important;
        }
        
        .bug-reporter-title {
            font-size: 18px !important;
            font-weight: 600 !important;
            color: #333 !important;
            margin: 0 !important;
        }
        
        .bug-reporter-close {
            background: none !important;
            border: none !important;
            font-size: 24px !important;
            cursor: pointer !important;
            color: #666 !important;
            padding: 0 !important;
            width: 30px !important;
            height: 30px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        .bug-reporter-close:hover {
            color: #333 !important;
        }
        
        .bug-reporter-field {
            margin-bottom: 16px !important;
        }
        
        .bug-reporter-label {
            display: block !important;
            margin-bottom: 6px !important;
            font-weight: 500 !important;
            color: #555 !important;
            font-size: 14px !important;
        }
        
        .bug-reporter-input,
        .bug-reporter-textarea,
        .bug-reporter-select {
            width: 100% !important;
            padding: 10px 12px !important;
            border: 1px solid #ddd !important;
            border-radius: 6px !important;
            font-size: 14px !important;
            font-family: inherit !important;
            box-sizing: border-box !important;
        }
        
        .bug-reporter-input:focus,
        .bug-reporter-textarea:focus,
        .bug-reporter-select:focus {
            outline: none !important;
            border-color: ${BUTTON_COLOR} !important;
            box-shadow: 0 0 0 3px rgba(255, 71, 87, 0.1) !important;
        }
        
        .bug-reporter-textarea {
            resize: vertical !important;
            min-height: 100px !important;
        }
        
        .bug-reporter-buttons {
            display: flex !important;
            gap: 12px !important;
            margin-top: 20px !important;
        }
        
        .bug-reporter-submit {
            background-color: ${BUTTON_COLOR} !important;
            color: white !important;
            border: none !important;
            padding: 10px 20px !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            font-weight: 500 !important;
            flex: 1 !important;
        }
        
        .bug-reporter-submit:hover {
            background-color: ${BUTTON_HOVER_COLOR} !important;
        }
        
        .bug-reporter-cancel {
            background-color: #f8f9fa !important;
            color: #666 !important;
            border: 1px solid #ddd !important;
            padding: 10px 20px !important;
            border-radius: 6px !important;
            cursor: pointer !important;
            font-weight: 500 !important;
            flex: 1 !important;
        }
        
        .bug-reporter-cancel:hover {
            background-color: #e9ecef !important;
        }
        
        .bug-reporter-message {
            padding: 12px !important;
            border-radius: 6px !important;
            margin-top: 12px !important;
            font-size: 14px !important;
            display: none !important;
        }
        
        .bug-reporter-success {
            background-color: #d4edda !important;
            color: #155724 !important;
            border: 1px solid #c3e6cb !important;
        }
        
        .bug-reporter-error {
            background-color: #f8d7da !important;
            color: #721c24 !important;
            border: 1px solid #f5c6cb !important;
        }
        
        .bug-reporter-loading {
            opacity: 0.6 !important;
            pointer-events: none !important;
        }
    `;
    
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    console.log('🐛 Bug Reporter: Styles injected');
    
    // Wait for DOM to be ready
    function initBugReporter() {
        console.log('🐛 Bug Reporter: Initializing...');
        
        // Create the bug reporter HTML
        const bugReporterHTML = `
            <div class="bug-reporter-container">
                <button class="bug-reporter-button" title="Report a Bug" style="opacity: 1 !important; visibility: visible !important;">
                    🐛
                </button>
            </div>
            
            <div class="bug-reporter-modal">
                <div class="bug-reporter-form">
                    <div class="bug-reporter-header">
                        <h3 class="bug-reporter-title">🐛 Report a Bug</h3>
                        <button class="bug-reporter-close">&times;</button>
                    </div>
                    
                    <form id="bugForm">
                        <div class="bug-reporter-field">
                            <label class="bug-reporter-label" for="bugError">Error Message *</label>
                            <input type="text" id="bugError" class="bug-reporter-input" placeholder="e.g., Button not working on mobile Safari" required>
                        </div>
                        
                        <div class="bug-reporter-field">
                            <label class="bug-reporter-label" for="bugContext">Description</label>
                            <textarea id="bugContext" class="bug-reporter-textarea" placeholder="Describe what happened and what you expected to happen..."></textarea>
                        </div>
                        
                        <div class="bug-reporter-field">
                            <label class="bug-reporter-label" for="bugSteps">Steps to Reproduce</label>
                            <textarea id="bugSteps" class="bug-reporter-textarea" placeholder="1. Navigate to the page&#10;2. Click the button&#10;3. Notice the issue"></textarea>
                        </div>
                        
                        <div class="bug-reporter-field">
                            <label class="bug-reporter-label" for="bugSeverity">Severity</label>
                            <select id="bugSeverity" class="bug-reporter-select">
                                <option value="low">Low</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>
                        
                        <div class="bug-reporter-field">
                            <label class="bug-reporter-label" for="bugSource">Source</label>
                            <input type="text" id="bugSource" class="bug-reporter-input" placeholder="e.g., frontend, user-report" value="user-report">
                        </div>
                        
                        <div class="bug-reporter-message" id="bugMessage"></div>
                        
                        <div class="bug-reporter-buttons">
                            <button type="button" class="bug-reporter-cancel">Cancel</button>
                            <button type="submit" class="bug-reporter-submit">🚀 Submit Bug Report</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Inject the HTML
        document.body.insertAdjacentHTML('beforeend', bugReporterHTML);
        console.log('🐛 Bug Reporter: HTML injected');
        
        // Get elements
        const button = document.querySelector('.bug-reporter-button');
        const modal = document.querySelector('.bug-reporter-modal');
        const closeBtn = document.querySelector('.bug-reporter-close');
        const cancelBtn = document.querySelector('.bug-reporter-cancel');
        const form = document.getElementById('bugForm');
        const messageDiv = document.getElementById('bugMessage');
        const submitBtn = document.querySelector('.bug-reporter-submit');
        
        console.log('🐛 Bug Reporter: Elements found:', {
            button: !!button,
            modal: !!modal,
            closeBtn: !!closeBtn,
            cancelBtn: !!cancelBtn,
            form: !!form,
            messageDiv: !!messageDiv,
            submitBtn: !!submitBtn
        });
        
        // Ensure button is visible
        if (button) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
            button.style.pointerEvents = 'auto';
            button.style.zIndex = '9999999';
            console.log('🐛 Bug Reporter: Button styles applied');
        }
        
        // Show modal
        function showModal() {
            console.log('🐛 Bug Reporter: Showing modal');
            if (modal) {
                modal.style.display = 'flex';
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
                console.log('🐛 Bug Reporter: Modal should be visible now');
            } else {
                console.error('🐛 Bug Reporter: Modal element not found!');
            }
        }
        
        // Hide modal
        function hideModal() {
            console.log('🐛 Bug Reporter: Hiding modal');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('show');
                document.body.style.overflow = '';
                if (form) form.reset();
                if (messageDiv) messageDiv.style.display = 'none';
                if (form) form.classList.remove('bug-reporter-loading');
            }
        }
        
        // Show message
        function showMessage(text, type = 'success') {
            if (messageDiv) {
                messageDiv.textContent = text;
                messageDiv.className = `bug-reporter-message bug-reporter-${type}`;
                messageDiv.style.display = 'block';
            }
        }
        
        // Submit bug report
        async function submitBug(bugData) {
            console.log('🐛 Bug Reporter: Submitting bug report:', bugData);
            
            try {
                const requestBody = {
                    title: bugData.error,
                    description: bugData.description || bugData.error,
                    repository_id: 1,
                    repository_url: REPO_URL,
                    priority: bugData.severity || 'medium',
                    severity: bugData.severity || 'medium',
                    user_agent: bugData.userAgent,
                    steps_to_reproduce: bugData.stepsToReproduce
                };
                
                console.log('🐛 Bug Reporter: Request body:', requestBody);
                console.log('🐛 Bug Reporter: API endpoint:', API_ENDPOINT);
                
                const authToken = window.BUG_REPORTER_CONFIG?.authToken || 'test-token-1';
                const response = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                        'Accept': 'application/json',
                        'Origin': window.location.origin
                    },
                    body: JSON.stringify(requestBody),
                    mode: 'cors',
                    credentials: 'omit'
                });
                
                console.log('🐛 Bug Reporter: Response status:', response.status);
                console.log('🐛 Bug Reporter: Response headers:', response.headers);
                
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('🐛 Bug Reporter: HTTP error:', response.status, errorText);
                    throw new Error(`HTTP ${response.status}: ${errorText}`);
                }
                
                const result = await response.json();
                console.log('🐛 Bug Reporter: Response data:', result);
                
                if (result.success || result.id) {
                    showMessage('Thank you for submitting the bug! We are right on it. 🚀', 'success');
                    setTimeout(hideModal, 3000);
                } else {
                    showMessage(`Error: ${result.message || 'Unknown error'}`, 'error');
                }
            } catch (error) {
                console.error('🐛 Bug Reporter: Network error:', error);
                showMessage(`Network error: ${error.message}`, 'error');
            }
        }
        
        // Event listeners
        if (button) {
            button.addEventListener('click', showModal);
            console.log('🐛 Bug Reporter: Button click listener added');
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', hideModal);
            console.log('🐛 Bug Reporter: Close button listener added');
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', hideModal);
            console.log('🐛 Bug Reporter: Cancel button listener added');
        }
        
        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    hideModal();
                }
            });
            console.log('🐛 Bug Reporter: Modal outside click listener added');
        }
        
        // Handle form submission - both form submit and button click
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                console.log('🐛 Bug Reporter: Form submitted via form submit event');
                await handleFormSubmission();
            });
            console.log('🐛 Bug Reporter: Form submit listener added');
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                console.log('🐛 Bug Reporter: Submit button clicked');
                await handleFormSubmission();
            });
            console.log('🐛 Bug Reporter: Submit button click listener added');
        }
        
        // Handle form submission logic
        async function handleFormSubmission() {
            console.log('🐛 Bug Reporter: Handling form submission...');
            
            const formData = {
                error: document.getElementById('bugError')?.value || '',
                description: document.getElementById('bugContext')?.value || '',
                stepsToReproduce: document.getElementById('bugSteps')?.value || '',
                severity: document.getElementById('bugSeverity')?.value || 'medium',
                source: document.getElementById('bugSource')?.value || 'user-report',
                url: window.location.href,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
            };
            
            console.log('🐛 Bug Reporter: Form data collected:', formData);
            
            if (form) {
                form.classList.add('bug-reporter-loading');
            }
            
            await submitBug(formData);
            
            if (form) {
                form.classList.remove('bug-reporter-loading');
            }
        }
        
        // Auto-capture console errors
        const originalError = console.error;
        console.error = function(...args) {
            originalError.apply(console, args);
            
            // Auto-populate error field if empty
            const errorField = document.getElementById('bugError');
            if (errorField && !errorField.value) {
                errorField.value = args.join(' ');
            }
        };
        
        console.log('🐛 Bug Reporter: Initialization complete!');
        
        // Debug: Check if elements were created
        setTimeout(() => {
            const button = document.querySelector('.bug-reporter-button');
            const modal = document.querySelector('.bug-reporter-modal');
            const form = document.getElementById('bugForm');
            const submitBtn = document.querySelector('.bug-reporter-submit');
            
            console.log('🐛 Bug Reporter: Final check - Button found:', !!button);
            console.log('🐛 Bug Reporter: Final check - Modal found:', !!modal);
            console.log('🐛 Bug Reporter: Final check - Form found:', !!form);
            console.log('🐛 Bug Reporter: Final check - Submit button found:', !!submitBtn);
            
            if (button) {
                console.log('🐛 Bug Reporter: Button styles:', window.getComputedStyle(button));
                console.log('🐛 Bug Reporter: Button opacity:', window.getComputedStyle(button).opacity);
                console.log('🐛 Bug Reporter: Button visibility:', window.getComputedStyle(button).visibility);
                console.log('🐛 Bug Reporter: Button z-index:', window.getComputedStyle(button).zIndex);
            }
        }, 1000);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBugReporter);
    } else {
        initBugReporter();
    }
})(); 