document.addEventListener('DOMContentLoaded', () => {
    // State
    const state = {
        sections: window.COURSE_DATA ? window.COURSE_DATA.sections : [],
        currentSectionId: null,
        completed: JSON.parse(localStorage.getItem('completedSections') || '[]'),
        theme: localStorage.getItem('theme') || 'dark'
    };

    // DOM Elements
    const els = {
        themeToggle: document.getElementById('theme-toggle'),
        searchInput: document.getElementById('search-input'),
        searchResults: document.getElementById('search-results'),
        navLinks: document.getElementById('nav-links'),
        contentContainer: document.getElementById('content-container'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        progressBar: document.getElementById('progress-bar'),
        progressText: document.getElementById('progress-text'),
        resetProgress: document.getElementById('reset-progress'),
        pathSelector: document.getElementById('path-selector')
    };

    // Initialize
    initTheme();
    renderNav();
    updateProgress();
    
    // Auto-load first section or saved section
    const savedSection = localStorage.getItem('lastSection');
    if (savedSection && state.sections.find(s => s.id === savedSection)) {
        loadSection(savedSection);
    } else if (state.sections.length > 0) {
        loadSection(state.sections[0].id);
    }

    // Event Listeners
    els.themeToggle.addEventListener('click', toggleTheme);
    els.prevBtn.addEventListener('click', () => navigate(-1));
    els.nextBtn.addEventListener('click', () => navigate(1));
    els.resetProgress.addEventListener('click', resetProgress);
    els.searchInput.addEventListener('input', handleSearch);
    
    // Close search results on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            els.searchResults.classList.add('hidden');
        }
    });

    // Theme Management
    function initTheme() {
        if (state.theme === 'light') {
            document.body.classList.remove('dark-mode');
            els.themeToggle.textContent = '☀️';
        } else {
            document.body.classList.add('dark-mode');
            els.themeToggle.textContent = '🌙';
        }
    }

    function toggleTheme() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', state.theme);
        initTheme();
    }

    // Navigation Render
    function renderNav() {
        const path = els.pathSelector.value;
        let html = '';
        let currentGroup = '';

        state.sections.forEach(section => {
            // Simple path filtering (can be expanded)
            if (path === 'docker' && (!section.id.startsWith('docker') && section.index > 12)) return;
            if (path === 'k8s' && (section.index < 13 || section.index > 22)) return;
            if (path === 'prod' && (section.index < 23 || section.index > 29)) return;

            if (section.group !== currentGroup) {
                html += `<div class="nav-section-title">${section.group}</div>`;
                currentGroup = section.group;
            }

            const isCompleted = state.completed.includes(section.id) ? 'completed' : '';
            const isActive = section.id === state.currentSectionId ? 'active' : '';

            html += `<a href="#" class="nav-item ${isCompleted} ${isActive}" data-id="${section.id}">${section.title}</a>`;
        });

        els.navLinks.innerHTML = html;

        // Attach clicks
        document.querySelectorAll('.nav-item').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                loadSection(e.target.getAttribute('data-id'));
            });
        });
    }

    // Load Section Content
    function loadSection(id) {
        const section = state.sections.find(s => s.id === id);
        if (!section) return;

        state.currentSectionId = id;
        localStorage.setItem('lastSection', id);
        
        // Hide all, show target
        document.querySelectorAll('.section-content').forEach(el => {
            el.classList.remove('active');
            if (el.id === `section-${id}`) el.classList.add('active');
        });

        // Update nav active state
        renderNav();
        updateNavButtons();
        
        // Mark previous as complete automatically if moving forward
        const currentIndex = state.sections.findIndex(s => s.id === id);
        if (currentIndex > 0) {
            const prevId = state.sections[currentIndex - 1].id;
            if (!state.completed.includes(prevId)) {
                state.completed.push(prevId);
                saveProgress();
            }
        }
        
        // Scroll to top
        els.contentContainer.scrollTop = 0;
        window.scrollTo(0, 0);

        // Re-bind interactive elements inside this section
        bindInteractiveElements(`section-${id}`);
    }

    // Navigation Buttons
    function navigate(direction) {
        const currentIndex = state.sections.findIndex(s => s.id === state.currentSectionId);
        const newIndex = currentIndex + direction;
        
        if (newIndex >= 0 && newIndex < state.sections.length) {
            loadSection(state.sections[newIndex].id);
        }
    }

    function updateNavButtons() {
        const currentIndex = state.sections.findIndex(s => s.id === state.currentSectionId);
        els.prevBtn.disabled = currentIndex === 0;
        
        if (currentIndex === state.sections.length - 1) {
            els.nextBtn.textContent = "Finish Course 🎉";
        } else {
            els.nextBtn.textContent = "Next →";
        }
    }

    // Progress Tracking
    function saveProgress() {
        localStorage.setItem('completedSections', JSON.stringify(state.completed));
        updateProgress();
        renderNav(); // update checks
    }

    function updateProgress() {
        const total = state.sections.length;
        if (total === 0) return;
        const complete = state.completed.length;
        const percent = Math.round((complete / total) * 100);
        
        els.progressBar.style.width = `${percent}%`;
        els.progressText.textContent = `${percent}% Complete`;
    }

    function resetProgress() {
        if(confirm("Are you sure you want to reset all your progress?")) {
            state.completed = [];
            saveProgress();
            localStorage.removeItem('lastSection');
            if (state.sections.length > 0) loadSection(state.sections[0].id);
        }
    }

    // Search
    function handleSearch(e) {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            els.searchResults.classList.add('hidden');
            return;
        }

        const results = state.sections.filter(s => 
            s.title.toLowerCase().includes(query) || 
            (s.keywords && s.keywords.some(k => k.toLowerCase().includes(query)))
        );

        if (results.length > 0) {
            els.searchResults.innerHTML = results.map(r => 
                `<div class="search-result-item" data-id="${r.id}">${r.title}</div>`
            ).join('');
            
            document.querySelectorAll('.search-result-item').forEach(el => {
                el.addEventListener('click', (ev) => {
                    loadSection(ev.target.getAttribute('data-id'));
                    els.searchResults.classList.add('hidden');
                    els.searchInput.value = '';
                });
            });
            els.searchResults.classList.remove('hidden');
        } else {
            els.searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            els.searchResults.classList.remove('hidden');
        }
    }

    // Interactive Components Binding
    function bindInteractiveElements(sectionId) {
        const sectionEl = document.getElementById(sectionId);
        if(!sectionEl) return;

        // Command Playground
        sectionEl.querySelectorAll('.cmd-explain-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const explainEl = e.target.closest('.command-playground').querySelector('.cmd-explain');
                explainEl.classList.toggle('show');
                e.target.textContent = explainEl.classList.contains('show') ? 'Hide Info' : 'Explanation';
            });
        });

        sectionEl.querySelectorAll('.cmd-copy-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const text = e.target.closest('.command-playground').querySelector('.cmd-text').innerText;
                navigator.clipboard.writeText(text);
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied!';
                setTimeout(() => e.target.textContent = originalText, 2000);
            });
        });

        // Architecture Diagrams
        sectionEl.querySelectorAll('.arch-node').forEach(node => {
            node.addEventListener('click', (e) => {
                const infoId = e.target.getAttribute('data-info');
                const infoEl = sectionEl.querySelector(`#${infoId}`);
                if (infoEl) {
                    sectionEl.querySelectorAll('.arch-info').forEach(el => el.style.display = 'none');
                    infoEl.style.display = 'block';
                }
            });
        });
        
        // Quizzes
        sectionEl.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const container = e.target.closest('.quiz-options');
                // prevent re-answering
                if(container.classList.contains('answered')) return;
                
                container.classList.add('answered');
                const isCorrect = e.target.getAttribute('data-correct') === 'true';
                
                e.target.classList.add(isCorrect ? 'correct' : 'wrong');
                
                // Show correct answer if wrong
                if(!isCorrect) {
                    container.querySelector('[data-correct="true"]').classList.add('correct');
                }
            });
        });
    }
});
