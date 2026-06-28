// Global JavaScript for ArchKenya

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Quiz if we are on the quiz page
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        initQuiz();
    }

    // Initialize Nairobi Spotlight Filter if we are on the spotlight page
    const landmarksGrid = document.getElementById('landmarks-grid');
    if (landmarksGrid) {
        initSpotlightFilter();
    }



    // Initialize Back to Top button
    initBackToTop();
});

// -------------------------------------------------------------
// 1. Nairobi Spotlight Filtering Logic
// -------------------------------------------------------------
function initSpotlightFilter() {


    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.landmark-card');
    const noResults = document.getElementById('no-results');

    let currentCategory = 'all';
    let searchQuery = '';

    // Apply animation styling dynamically
    cards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });

    function filterCards() {
        let visibleCount = 0;

        cards.forEach(card => {
            const cardStyle = card.getAttribute('data-style');
            const cardTitle = card.querySelector('.card-title').textContent.toLowerCase();
            const cardText = card.querySelector('.card-text').textContent.toLowerCase();
            
            // Check category match
            const matchesCategory = currentCategory === 'all' || cardStyle === currentCategory;
            
            // Check search match
            const matchesSearch = cardTitle.includes(searchQuery) || cardText.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
                visibleCount++;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Show or hide "No Results" message
        setTimeout(() => {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
                noResults.style.opacity = '1';
            } else {
                noResults.style.display = 'none';
            }
        }, 150);
    }

    // Search Input Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterCards();
        });
    }

    // Category Button Listener
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentCategory = btn.getAttribute('data-filter');
            filterCards();
        });
    });
}



// -------------------------------------------------------------
// 3. Interactive Quiz Logic
// -------------------------------------------------------------
function initQuiz() {
    const allQuestions = [
        {
            question: "What material was traditionally used for ceilings and structural support in Swahili Coastal architecture due to its termite-resistant nature?",
            options: ["Bamboo Poles", "Boriti (Mangrove poles)", "Eucalyptus Wood", "Cypress Timber"],
            correct: 1,
            explanation: "Boriti (mangrove poles) were harvested from coastal swamps and used to support heavy coral stone roofs and ceilings because they are incredibly strong and naturally termite-resistant."
        },
        {
            question: "Which traditional homestead layout was arranged circularly to secure livestock and reinforce community safety?",
            options: ["Swahili Courtyard", "Maasai Manyatta", "Neoclassical Plaza", "Modernist Grid"],
            correct: 1,
            explanation: "Maasai Manyattas are loaf-shaped structures constructed in a circular arrangement (called a kraal or boma) to shield family members and livestock from wild animals."
        },
        {
            question: "Which iconic Nairobi heritage building (built in 1913) was used as a registration office where Africans had to carry identification cards?",
            options: ["McMillan Memorial Library", "Kipande House", "KICC", "Mombasa Treasury Square"],
            correct: 1,
            explanation: "Kipande House (named after the 'Kipande' ID document) served as the primary registration depot for African labourers in Nairobi during British colonial rule."
        },
        {
            question: "What post-independence architectural monument features striking brutalist concrete curves and a terracotta cylinder design?",
            options: ["Times Tower", "KICC (Kenyatta International Convention Centre)", "Jamia Mosque", "Nairobi National Museum"],
            correct: 1,
            explanation: "Designed by Karl Henrik Nøstvik, the KICC is a landmark example of African Modernism, blending international modernist concrete forms with traditional shapes inspired by a Kenyan shield."
        },
        {
            question: "Which traditional Kenyan house type is built primarily with flexible curved branches and animal skins, designed to be quickly dismantled and transported by camels?",
            options: ["Mijikenda Kaya", "Maasai Manyatta", "Rendille Goba", "Luo Dala"],
            correct: 2,
            explanation: "The Rendille Goba is a portable, lightweight dome-shaped dwelling designed to be easily packed onto camels within an hour for their nomadic migrations."
        },
        {
            question: "Which building in Nairobi, constructed in 1931, features massive granite steps, imposing neoclassical pillars, and stone lion statues at its entrance?",
            options: ["Norfolk Hotel", "Kipande House", "McMillan Memorial Library", "Nairobi Gallery"],
            correct: 2,
            explanation: "McMillan Memorial Library is a classic example of grand neoclassical architecture in Nairobi, constructed with granite columns and flanked by iconic stone lions."
        },
        {
            question: "Which UNESCO World Heritage Swahili settlement is characterized by narrow streets, coral stone houses, and intricate carved wooden doors?",
            options: ["Mombasa Old Town", "Lamu Old Town", "Gede Ruins", "Siyu Settlement"],
            correct: 1,
            explanation: "Lamu Old Town is the oldest and best-preserved Swahili settlement in East Africa, famous for its narrow alleyways and monumental carved doors."
        },
        {
            question: "Which modernist building, standing at 140 meters high, was once the tallest building in East Africa and is wrapped in solar-reflective glass?",
            options: ["KICC", "Nation Centre", "Times Tower", "Co-operative Bank House"],
            correct: 2,
            explanation: "Times Tower (New Central Bank Tower) is a landmark modernist skyscraper wrapped in solar-reflective glass that dominated the East African skyline for years."
        },
        {
            question: "What sacred, forested fortresses in the coastal hinterlands were used by the Mijikenda people for security, governance, and spiritual rituals?",
            options: ["Manyattas", "Kayas", "Dalas", "Goba Villages"],
            correct: 1,
            explanation: "Kayas are fortified villages hidden inside sacred forests, serving as historical, cultural, and spiritual centers for the Mijikenda people."
        },
        {
            question: "What material, mined from the ocean, was traditionally used with lime plaster as the primary structural stone in Swahili coastal architecture?",
            options: ["Granite Block", "Coral Rag", "Clay Brick", "Sandstone Slab"],
            correct: 1,
            explanation: "Coral rag (fossilized coral) was mined directly from ocean reefs and used with lime plaster to construct permanent merchant houses along the East African coast."
        }
    ];

    let questions = [];
    let currentIdx = 0;
    let userAnswers = [];

    const questionText = document.getElementById('q-text');
    const optionsContainer = document.getElementById('q-options');
    const explanationText = document.getElementById('q-explanation');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const progressText = document.getElementById('q-progress');
    const resultContainer = document.getElementById('quiz-results');
    const scoreText = document.getElementById('score-text');
    const quizActive = document.getElementById('quiz-active');
    const restartBtn = document.getElementById('restart-btn');

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startNewRound() {
        const shuffledPool = shuffleArray([...allQuestions]);
        questions = shuffledPool.slice(0, 4);
        currentIdx = 0;
        userAnswers = [null, null, null, null];
    }

    function showQuestion() {
        explanationText.style.display = 'none';
        explanationText.innerHTML = '';
        nextBtn.style.display = 'none';
        optionsContainer.innerHTML = '';
        
        let q = questions[currentIdx];
        questionText.textContent = q.question;
        progressText.textContent = `Question ${currentIdx + 1} of ${questions.length}`;

        // Handle Back button visibility
        if (currentIdx > 0) {
            prevBtn.style.display = 'inline-block';
        } else {
            prevBtn.style.display = 'none';
        }

        const answeredIdx = userAnswers[currentIdx];

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = "list-group-item list-group-item-action p-3 mb-2 rounded border text-start fw-medium option-btn";
            btn.textContent = opt;

            if (answeredIdx !== null) {
                // Already answered this question
                btn.disabled = true;
                btn.style.cursor = 'default';
                if (idx === q.correct) {
                    btn.classList.add('bg-success', 'text-white', 'border-success');
                } else if (idx === answeredIdx) {
                    btn.classList.add('bg-danger', 'text-white', 'border-danger');
                }
            } else {
                // Not yet answered
                btn.addEventListener('click', () => selectOption(btn, idx));
            }

            optionsContainer.appendChild(btn);
        });

        // Show explanation and next buttons if already answered
        if (answeredIdx !== null) {
            explanationText.style.display = 'block';
            explanationText.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
            
            nextBtn.style.display = 'inline-block';
            if (currentIdx === questions.length - 1) {
                nextBtn.textContent = "See Results";
            } else {
                nextBtn.textContent = "Next Question";
            }
        }
    }

    function selectOption(selectedBtn, optionIdx) {
        userAnswers[currentIdx] = optionIdx;

        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'default';
        });

        const q = questions[currentIdx];
        if (optionIdx === q.correct) {
            selectedBtn.classList.add('bg-success', 'text-white', 'border-success');
        } else {
            selectedBtn.classList.add('bg-danger', 'text-white', 'border-danger');
            buttons[q.correct].classList.add('bg-success', 'text-white', 'border-success');
        }

        explanationText.style.display = 'block';
        explanationText.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
        
        nextBtn.style.display = 'inline-block';
        if (currentIdx === questions.length - 1) {
            nextBtn.textContent = "See Results";
        } else {
            nextBtn.textContent = "Next Question";
        }
    }

    nextBtn.addEventListener('click', () => {
        currentIdx++;
        if (currentIdx < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIdx > 0) {
            currentIdx--;
            showQuestion();
        }
    });

    function showResults() {
        quizActive.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Calculate score from answers
        const score = userAnswers.reduce((acc, ans, idx) => acc + (ans === questions[idx].correct ? 1 : 0), 0);

        let rank = "";
        let color = "";
        if (score === questions.length) {
            rank = "Master Architect 🏛️";
            color = "text-success";
        } else if (score >= 2) {
            rank = "Apprentice Builder 🧱";
            color = "text-warning";
        } else {
            rank = "Novice Historian 📜";
            color = "text-danger";
        }

        scoreText.innerHTML = `You scored <span class="fw-bold fs-3">${score} / ${questions.length}</span>.<br>Your Rank: <span class="fw-bold fs-4 ${color}">${rank}</span>`;
    }

    restartBtn.addEventListener('click', () => {
        startNewRound();
        quizActive.style.display = 'block';
        resultContainer.style.display = 'none';
        nextBtn.textContent = "Next Question";
        showQuestion();
    });

    startNewRound();
    showQuestion();
}

// -------------------------------------------------------------
// 4. Back to Top Button Logic
// -------------------------------------------------------------
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


