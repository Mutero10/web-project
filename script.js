// Global JavaScript for ArchKenya

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Quiz if we are on the quiz page
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        initQuiz();
    }
});

function initQuiz() {
    const questions = [
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
        }
    ];

    let currentIdx = 0;
    let score = 0;

    const questionText = document.getElementById('q-text');
    const optionsContainer = document.getElementById('q-options');
    const explanationText = document.getElementById('q-explanation');
    const nextBtn = document.getElementById('next-btn');
    const progressText = document.getElementById('q-progress');
    const resultContainer = document.getElementById('quiz-results');
    const scoreText = document.getElementById('score-text');
    const quizActive = document.getElementById('quiz-active');
    const restartBtn = document.getElementById('restart-btn');

    function showQuestion() {
        explanationText.style.display = 'none';
        explanationText.innerHTML = '';
        nextBtn.style.display = 'none';
        optionsContainer.innerHTML = '';
        
        let q = questions[currentIdx];
        questionText.textContent = q.question;
        progressText.textContent = `Question ${currentIdx + 1} of ${questions.length}`;

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = "list-group-item list-group-item-action p-3 mb-2 rounded border text-start fw-medium option-btn";
            btn.textContent = opt;
            btn.addEventListener('click', () => selectOption(btn, idx));
            optionsContainer.appendChild(btn);
        });
    }

    function selectOption(selectedBtn, optionIdx) {
        // Disable all option buttons
        const buttons = optionsContainer.querySelectorAll('.option-btn');
        buttons.forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'default';
        });

        const q = questions[currentIdx];
        if (optionIdx === q.correct) {
            selectedBtn.classList.add('bg-success', 'text-white', 'border-success');
            score++;
        } else {
            selectedBtn.classList.add('bg-danger', 'text-white', 'border-danger');
            // Show correct one in green
            buttons[q.correct].classList.add('bg-success', 'text-white', 'border-success');
        }

        // Show explanation
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

    function showResults() {
        quizActive.style.display = 'none';
        resultContainer.style.display = 'block';
        
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
        currentIdx = 0;
        score = 0;
        quizActive.style.display = 'block';
        resultContainer.style.display = 'none';
        nextBtn.textContent = "Next Question";
        showQuestion();
    });

    showQuestion();
}
