document.addEventListener('DOMContentLoaded', function() {
    // Initialize ScrollReveal for animations
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '30px',
        duration: 800,
        delay: 200,
        reset: false
    });

    // Animate main sections
    sr.reveal('h2', { delay: 100 });
    sr.reveal('#transform-section h3', { delay: 200 });
    sr.reveal('.before-col', { delay: 300, origin: 'left' });
    sr.reveal('.after-col', { delay: 400, origin: 'right' });
    sr.reveal('.contrast-card', { interval: 200 });
    sr.reveal('.bg-white.rounded-xl', { interval: 150 });
    sr.reveal('#cta-section', { delay: 100 });

    // Highlight stats on hover
    const statsElements = document.querySelectorAll('.font-medium.text-green-600');
    statsElements.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add classes to enable animations
    document.querySelectorAll('.bg-white.rounded-xl').forEach(card => {
        card.classList.add('hover:shadow-lg', 'hover:-translate-y-1', 'transition-all', 'duration-300');
    });

    // Workflow Simulator Functionality
    initWorkflowSimulator();
    
    // ROI Calculator Functionality
    initROICalculator();
});

// Workflow Simulator Functions
function initWorkflowSimulator() {
    // Get DOM elements
    const invoiceBtn = document.getElementById('invoice-btn');
    const applicationBtn = document.getElementById('application-btn');
    const supportBtn = document.getElementById('support-btn');
    const manualViewBtn = document.getElementById('manual-view-btn');
    const aiViewBtn = document.getElementById('ai-view-btn');
    const startSimulationBtn = document.getElementById('start-simulation-btn');
    const workflowDiagram = document.getElementById('workflow-diagram');
    const manualProcess = document.getElementById('manual-process');
    const aiProcess = document.getElementById('ai-process');
    const processingTime = document.getElementById('processing-time');
    const stepCount = document.getElementById('step-count');
    const accuracy = document.getElementById('accuracy');
    const simulationResults = document.getElementById('simulation-results');
    
    // Track the current state
    let selectedDocType = null;
    let currentView = 'manual';
    let simulationRunning = false;
    
    // Initialize the document type buttons
    if (invoiceBtn && applicationBtn && supportBtn) {
        // Add click event listeners
        invoiceBtn.addEventListener('click', () => selectDocType('invoice'));
        applicationBtn.addEventListener('click', () => selectDocType('application'));
        supportBtn.addEventListener('click', () => selectDocType('support'));
    }
    
    // Initialize view toggle buttons
    if (manualViewBtn && aiViewBtn) {
        manualViewBtn.addEventListener('click', () => toggleView('manual'));
        aiViewBtn.addEventListener('click', () => toggleView('ai'));
    }
    
    // Initialize simulation start button
    if (startSimulationBtn) {
        startSimulationBtn.addEventListener('click', startSimulation);
    }
    
    // Function to handle document type selection
    function selectDocType(type) {
        // Reset state
        resetSimulation();
        
        // Update the selected document type
        selectedDocType = type;
        
        // Update UI to show selected button
        [invoiceBtn, applicationBtn, supportBtn].forEach(btn => {
            btn.classList.remove('border-blue-500', 'bg-blue-50');
            btn.classList.add('border-blue-200');
        });
        
        // Highlight the selected button
        const selectedBtn = document.getElementById(`${type}-btn`);
        if (selectedBtn) {
            selectedBtn.classList.remove('border-blue-200');
            selectedBtn.classList.add('border-blue-500', 'bg-blue-50');
        }
        
        // Create workflow diagrams
        createWorkflowDiagrams(type);
    }
    
    // Function to toggle between manual and AI views
    function toggleView(view) {
        // Update current view
        currentView = view;
        
        // Update UI
        if (view === 'manual') {
            manualViewBtn.classList.remove('bg-transparent', 'text-gray-500');
            manualViewBtn.classList.add('bg-white', 'shadow', 'text-gray-700');
            
            aiViewBtn.classList.remove('bg-white', 'shadow', 'text-gray-700');
            aiViewBtn.classList.add('bg-transparent', 'text-gray-500');
            
            if (manualProcess) manualProcess.classList.remove('hidden');
            if (aiProcess) aiProcess.classList.add('hidden');
        } else {
            aiViewBtn.classList.remove('bg-transparent', 'text-gray-500');
            aiViewBtn.classList.add('bg-white', 'shadow', 'text-gray-700');
            
            manualViewBtn.classList.remove('bg-white', 'shadow', 'text-gray-700');
            manualViewBtn.classList.add('bg-transparent', 'text-gray-500');
            
            if (aiProcess) aiProcess.classList.remove('hidden');
            if (manualProcess) manualProcess.classList.add('hidden');
        }
    }
    
    // Function to create workflow diagrams
    function createWorkflowDiagrams(docType) {
        if (!manualProcess || !aiProcess) return;
        
        // Clear previous diagrams
        manualProcess.innerHTML = '';
        aiProcess.innerHTML = '';
        
        // Create diagrams based on document type
        if (docType === 'invoice') {
            // Manual process for invoices
            manualProcess.innerHTML = `
                <div class="text-center text-sm font-medium text-gray-700 mb-4">Manual Invoice Processing</div>
                <div class="relative h-56 overflow-hidden">
                    <!-- Simple placeholder diagram for manual invoice process -->
                    <div class="flex flex-col items-center">
                        <div class="workflow-node mb-6 p-3 border border-orange-200 rounded-lg bg-orange-50 text-center w-36">
                            <div class="text-xs text-orange-700 mb-1">Step 1</div>
                            <div class="text-sm font-medium">Receive Invoice</div>
                        </div>
                        <svg class="h-6 w-6 text-orange-300 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        <div class="workflow-node mb-6 p-3 border border-orange-200 rounded-lg bg-orange-50 text-center w-36">
                            <div class="text-xs text-orange-700 mb-1">Step 2 (Manual)</div>
                            <div class="text-sm font-medium">Data Entry</div>
                        </div>
                        <svg class="h-6 w-6 text-orange-300 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        <div class="workflow-node p-3 border border-orange-200 rounded-lg bg-orange-50 text-center w-36">
                            <div class="text-xs text-orange-700 mb-1">Step 3 (Human)</div>
                            <div class="text-sm font-medium">Validation & Approval</div>
                        </div>
                    </div>
                </div>
            `;
            
            // AI process for invoices
            aiProcess.innerHTML = `
                <div class="text-center text-sm font-medium text-gray-700 mb-4">AI-Powered Invoice Processing</div>
                <div class="relative h-56 overflow-hidden">
                    <!-- Simple placeholder diagram for AI invoice process -->
                    <div class="flex flex-col items-center">
                        <div class="workflow-node mb-6 p-3 border border-green-200 rounded-lg bg-green-50 text-center w-36">
                            <div class="text-xs text-green-700 mb-1">Step 1</div>
                            <div class="text-sm font-medium">Receive Invoice</div>
                        </div>
                        <svg class="h-6 w-6 text-green-300 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        <div class="workflow-node mb-6 p-3 border border-green-200 rounded-lg bg-green-50 text-center w-36">
                            <div class="text-xs text-green-700 mb-1">Step 2 (AI)</div>
                            <div class="text-sm font-medium">Automated Extraction</div>
                        </div>
                        <svg class="h-6 w-6 text-green-300 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                        <div class="workflow-node p-3 border border-green-200 rounded-lg bg-green-50 text-center w-36">
                            <div class="text-xs text-green-700 mb-1">Step 3 (Exception Only)</div>
                            <div class="text-sm font-medium">Human Review</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (docType === 'application') {
            // Create application form process diagrams (simplified for now)
            manualProcess.innerHTML = `<div class="text-center pt-16">Application form process diagram will appear here</div>`;
            aiProcess.innerHTML = `<div class="text-center pt-16">AI application form process diagram will appear here</div>`;
        } else if (docType === 'support') {
            // Create support ticket process diagrams (simplified for now)
            manualProcess.innerHTML = `<div class="text-center pt-16">Support ticket process diagram will appear here</div>`;
            aiProcess.innerHTML = `<div class="text-center pt-16">AI support ticket process diagram will appear here</div>`;
        }
        
        // Show the appropriate view
        toggleView(currentView);
        
        // Remove placeholder text
        const placeholder = workflowDiagram.querySelector('.text-gray-500.italic');
        if (placeholder) placeholder.classList.add('hidden');
        
        // Show manual process diagram initially
        if (manualProcess) manualProcess.classList.remove('hidden');
    }
    
    // Function to start the simulation
    function startSimulation() {
        if (!selectedDocType || simulationRunning) return;
        
        simulationRunning = true;
        
        // Update button state
        startSimulationBtn.disabled = true;
        startSimulationBtn.classList.add('opacity-50', 'cursor-not-allowed');
        startSimulationBtn.textContent = 'Simulation Running...';
        
        // Reset counters
        processingTime.textContent = '00:00';
        stepCount.textContent = '0/3';
        accuracy.textContent = '0%';
        
        // Hide results
        simulationResults.classList.add('hidden');
        
        // Start manual process simulation
        toggleView('manual');
        
        let seconds = 0;
        let currentStep = 0;
        
        // Time updater
        const timer = setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            processingTime.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
            // For demo purposes, advance steps over time
            if (seconds === 5) {
                currentStep = 1;
                stepCount.textContent = '1/3';
                accuracy.textContent = '80%';
                
                // Highlight current step
                highlightStep('manual', 1);
            } else if (seconds === 15) {
                currentStep = 2;
                stepCount.textContent = '2/3';
                accuracy.textContent = '85%';
                
                // Highlight current step
                highlightStep('manual', 2);
            } else if (seconds === 25) {
                currentStep = 3;
                stepCount.textContent = '3/3';
                accuracy.textContent = '90%';
                
                // Highlight current step
                highlightStep('manual', 3);
                
                // Switch to AI view after manual process completes
                setTimeout(() => {
                    // Reset for AI process
                    seconds = 0;
                    currentStep = 0;
                    processingTime.textContent = '00:00';
                    stepCount.textContent = '0/3';
                    accuracy.textContent = '0%';
                    
                    // Switch to AI view
                    toggleView('ai');
                    
                    // Much faster progress for AI process
                    setTimeout(() => {
                        currentStep = 1;
                        stepCount.textContent = '1/3';
                        accuracy.textContent = '95%';
                        processingTime.textContent = '00:02';
                        highlightStep('ai', 1);
                    }, 2000);
                    
                    setTimeout(() => {
                        currentStep = 2;
                        stepCount.textContent = '2/3';
                        accuracy.textContent = '99%';
                        processingTime.textContent = '00:03';
                        highlightStep('ai', 2);
                    }, 3000);
                    
                    setTimeout(() => {
                        currentStep = 3;
                        stepCount.textContent = '3/3';
                        accuracy.textContent = '99.8%';
                        processingTime.textContent = '00:04';
                        highlightStep('ai', 3);
                        
                        // Show results when AI process completes
                        setTimeout(() => {
                            clearInterval(timer);
                            simulationResults.classList.remove('hidden');
                            
                            // Reset for next simulation
                            startSimulationBtn.disabled = false;
                            startSimulationBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                            startSimulationBtn.textContent = 'Start Simulation';
                            simulationRunning = false;
                        }, 2000);
                    }, 4000);
                }, 2000);
            }
        }, 1000);
    }
    
    // Function to highlight the current step in the workflow
    function highlightStep(processType, step) {
        const container = processType === 'manual' ? manualProcess : aiProcess;
        const nodes = container.querySelectorAll('.workflow-node');
        
        nodes.forEach((node, index) => {
            // Reset all nodes
            node.classList.remove('border-blue-500', 'bg-blue-50', 'shadow-md');
            
            // Highlight current step
            if (index === step - 1) {
                node.classList.add('border-blue-500', 'bg-blue-50', 'shadow-md');
            }
        });
    }
    
    // Function to reset the simulation
    function resetSimulation() {
        simulationRunning = false;
        
        // Reset UI elements
        if (startSimulationBtn) {
            startSimulationBtn.disabled = false;
            startSimulationBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            startSimulationBtn.textContent = 'Start Simulation';
        }
        
        if (processingTime) processingTime.textContent = '--:--';
        if (stepCount) stepCount.textContent = '0/0';
        if (accuracy) accuracy.textContent = '--%';
        
        if (simulationResults) simulationResults.classList.add('hidden');
    }
}

// ROI Calculator Functions
function initROICalculator() {
    const calculateButton = document.getElementById('calculate-roi');
    if (!calculateButton) return;
    
    calculateButton.addEventListener('click', calculateROI);
    
    function calculateROI() {
        // Get input values
        const industry = document.getElementById('industry').value;
        const docVolume = parseFloat(document.getElementById('doc-volume').value) || 0;
        const processTime = parseFloat(document.getElementById('process-time').value) || 0;
        const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;
        const errorRate = parseFloat(document.getElementById('error-rate').value) || 0;
        const errorCost = parseFloat(document.getElementById('error-cost').value) || 0;
        
        // Skip calculation if any required field is missing
        if (docVolume === 0 || processTime === 0 || hourlyRate === 0) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Calculate time savings (85% reduction)
        const currentMonthlyTime = (docVolume * processTime) / 60; // in hours
        const newMonthlyTime = currentMonthlyTime * 0.15; // 85% reduction
        const timeSavings = currentMonthlyTime - newMonthlyTime;
        
        // Calculate labor savings
        const laborSavings = timeSavings * hourlyRate;
        
        // Calculate error reduction savings (assuming 99% error reduction)
        const currentErrors = docVolume * (errorRate / 100);
        const newErrors = currentErrors * 0.01; // 99% reduction
        const errorSavings = (currentErrors - newErrors) * errorCost;
        
        // Calculate total savings
        const totalMonthlySavings = laborSavings + errorSavings;
        const annualSavings = totalMonthlySavings * 12;
        
        // Calculate implementation cost (industry-specific estimate)
        let implementationCost = 0;
        switch (industry) {
            case 'financial':
                implementationCost = 50000 + (docVolume * 0.5);
                break;
            case 'healthcare':
                implementationCost = 40000 + (docVolume * 0.4);
                break;
            case 'manufacturing':
                implementationCost = 35000 + (docVolume * 0.3);
                break;
            case 'retail':
                implementationCost = 30000 + (docVolume * 0.25);
                break;
            default:
                implementationCost = 40000 + (docVolume * 0.35);
        }
        
        // Calculate ROI and payback period
        const firstYearROI = (annualSavings - implementationCost) / implementationCost * 100;
        const paybackPeriod = implementationCost / totalMonthlySavings;
        
        // Update results
        document.getElementById('time-savings').textContent = `${Math.round(timeSavings)} hours`;
        document.getElementById('labor-savings').textContent = `$${Math.round(laborSavings).toLocaleString()}`;
        document.getElementById('error-savings').textContent = `$${Math.round(errorSavings).toLocaleString()}`;
        document.getElementById('total-savings').textContent = `$${Math.round(totalMonthlySavings).toLocaleString()}`;
        
        document.getElementById('annual-savings').textContent = `$${Math.round(annualSavings).toLocaleString()}`;
        document.getElementById('implementation-cost').textContent = `$${Math.round(implementationCost).toLocaleString()}`;
        document.getElementById('first-year-roi').textContent = `${Math.round(firstYearROI)}%`;
        document.getElementById('payback-period').textContent = `${Math.round(paybackPeriod)} months`;
        
        // Show results and hide placeholder
        document.getElementById('roi-results').classList.remove('hidden');
        document.getElementById('roi-placeholder').classList.add('hidden');
    }
} 