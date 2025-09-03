// App State Management
const appState = {
    currentSection: 'home',
    currentLanguage: 'en',
    currentStory: null,
    currentPage: 1,
    totalPages: 1,
    userProgress: {
        storiesRead: 0,
        gamesPlayed: 0,
        artworksCreated: 0
    },
    userStories: [],
    userArtworks: []
};

// Game State Management
const gameState = {
    memory: {
        isActive: false,
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        totalPairs: 4,
        moves: 0,
        startTime: null,
        timer: null
    },
    puzzle: {
        isActive: false,
        pieces: [],
        completed: false,
        startTime: null
    },
    quiz: {
        isActive: false,
        currentQuestion: 0,
        score: 0,
        questions: []
    }
};

// Story Database
const storiesDatabase = {
    en: [
        {
            id: 1,
            title: "The Clever Tortoise",
            category: "folktale",
            language: "en",
            description: "A wise tortoise outsmarts larger animals with clever thinking.",
            content: [
                "Once upon a time, in a beautiful forest, there lived a clever tortoise named Tobi.",
                "The other animals often made fun of Tobi because he was slow, but he was very wise.",
                "One day, a fierce lion challenged all the animals to a race around the forest.",
                "All the animals were afraid, but Tobi had a clever plan.",
                "He asked the lion to wait while he prepared, then he secretly asked his friends to help.",
                "When the race started, the lion ran fast, but at every turn, he saw what he thought was Tobi.",
                "The lion was so tired from running that he gave up, and Tobi was declared the winner!",
                "From that day on, all the animals respected Tobi for his wisdom and cleverness."
            ],
            ageGroup: "5-8",
            readingTime: "5 min"
        },
        {
            id: 2,
            title: "The Magic Calabash",
            category: "fantasy",
            language: "en",
            description: "A young girl discovers a magical calabash that grants wishes.",
            content: [
                "In a small village by the river, there lived a kind girl named Ada.",
                "One day, while fetching water, Ada found a beautiful calabash floating in the river.",
                "The calabash sparkled with strange colors and seemed to whisper her name.",
                "Ada carefully picked it up and took it home to show her grandmother.",
                "Her grandmother smiled and said, 'This is a magic calabash, my child.'",
                "'It will grant you three wishes, but only if your heart is pure and kind.'",
                "Ada thought carefully about her wishes and decided to help others first.",
                "She wished for food for the hungry, medicine for the sick, and peace for her village.",
                "The calabash granted all her wishes, and Ada learned that helping others brings the greatest joy."
            ],
            ageGroup: "6-9",
            readingTime: "6 min"
        },
        {
            id: 3,
            title: "The Brave Little Hunter",
            category: "adventure",
            language: "en",
            description: "A young hunter learns courage and respect for nature.",
            content: [
                "Kemi was a young girl who loved to explore the forest with her father.",
                "Her father was a great hunter who taught her to respect all living things.",
                "One day, Kemi went into the forest alone to practice her hunting skills.",
                "She found a small, injured bird and decided to help it instead of hunting.",
                "Kemi carefully wrapped the bird in her cloth and took it home.",
                "She nursed the bird back to health with patience and care.",
                "When the bird was well, it flew away, but not before giving Kemi a special feather.",
                "The feather had magical powers that helped Kemi become the best hunter in the village.",
                "Kemi learned that true bravery comes from kindness and helping others."
            ],
            ageGroup: "7-10",
            readingTime: "7 min"
        }
    ],
    ha: [
        {
            id: 4,
            title: "Danko da Doki",
            category: "folktale",
            language: "ha",
            description: "Labarin wani danko mai hikima da ya shawo kan doki.",
            content: [
                "A da, a wani gandun daji mai kyau, akwai wani danko mai suna Danko.",
                "Sauran dabbobi suna yin dariya ga Danko saboda yana jinkiri, amma yana da hikima.",
                "Wata rana, wani zaki mai tsanani ya kalubalanci dukkan dabbobi zuwa tseren a dajin.",
                "Dukkan dabbobi suna tsoro, amma Danko yana da shirin wayo.",
                "Ya roki zaki ya jira yayin da yake shirya, sannan ya roki abokansa su taimaka.",
                "Lokacin da tseren ya fara, zaki ya gudu da sauri, amma a kowane juyi, ya ga abin da ya zaci Danko.",
                "Zaki ya gaji sosai daga gudu har ya daina, kuma Danko an ayyana shi a matsayin mai nasara!",
                "Daga wannan rana, dukkan dabbobi suna girmama Danko saboda hikimarsa da wayo."
            ],
            ageGroup: "5-8",
            readingTime: "5 min"
        }
    ],
    yo: [
        {
            id: 5,
            title: "Igbẹ Alágbà",
            category: "folktale",
            language: "yo",
            description: "Itan nipa igbẹ alágbà tí ó jẹ́ ọ̀pọ̀lọpọ̀ ọmọ.",
            content: [
                "Láéláé, nínú igbẹ̀ kan tí ó dára, igbẹ̀ alágbà kan wà tí ó jẹ́ ọ̀pọ̀ ọmọ.",
                "Gbogbo ọmọ yẹn ń gbàdùn igbẹ̀ yẹn púpọ̀, tí wọ́n sì ń sọ̀rọ̀ nípa rẹ̀.",
                "Ọjọ́ kan, ọmọ kan tí ó jẹ́ ọmọ ọlọ́rọ̀ wá bá igbẹ̀ yẹn.",
                "Ọmọ yẹn fẹ́ kí ó pa igbẹ̀ yẹn, ṣùgbọ́n igbẹ̀ yẹn ní ìmọ̀.",
                "Igbẹ̀ yẹn sọ fún ọmọ yẹn pé bí ó bá pa òun, ọmọ yẹn yóò pa òun.",
                "Ọmọ yẹn gbọ́, ó sì fẹ́ràn igbẹ̀ yẹn, ó sì jẹ́ ọmọ igbẹ̀ yẹn.",
                "Láti ìgbà yẹn, ọmọ yẹn ń gbàdùn igbẹ̀ yẹn, ó sì ń ṣe igbẹ̀ yẹn.",
                "Igbẹ̀ yẹn sì ń ṣe ọmọ yẹn, ó sì ń ṣe igbẹ̀ yẹn."
            ],
            ageGroup: "5-8",
            readingTime: "5 min"
        }
    ],
    ig: [
        {
            id: 6,
            title: "Ọkụ na Mmiri",
            category: "educational",
            language: "ig",
            description: "Akụkọ banyere ọkụ na mmiri na otu ha si arụ ọrụ ọnụ.",
            content: [
                "N'otu oge, ọkụ na mmiri bụ ndị enyi dị mma.",
                "Ha na-arụkọ ọrụ ọnụ iji nyere ndị mmadụ aka.",
                "Ọkụ na-enye ọkụ na ọkụ, mmiri na-enye mmiri na mmiri.",
                "Otu ụbọchị, ọkụ chere na ọ bụ ya kacha mkpa.",
                "Ọ sịrị mmiri na ya enweghị mkpa ọ bụla.",
                "Mmiri wee gbaa ọkụ ọkụ, ọkụ wee gbaa mmiri ọkụ.",
                "Ha wee lụọ ọgụ, ha wee lụọ ọgụ.",
                "Ndị mmadụ wee taa ahụhụ n'ihi ọgụ ha.",
                "Ha wee mata na ha dị mkpa n'otu aka.",
                "Ha wee bụrụ ndị enyi ọzọ, ha wee rụkọọ ọrụ ọnụ."
            ],
            ageGroup: "6-9",
            readingTime: "6 min"
        }
    ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserProgress();
    populateStories();
    populateCommunityContent();
});

// Initialize App
function initializeApp() {
    // Set initial language
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = appState.currentLanguage;
    }
    
    // Show home section by default
    showSection('home');
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            navigateToSection(section);
        });
    });

    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            appState.currentLanguage = this.value;
            updateLanguage();
        });
    }

    // Story filters
    const storyLanguageFilter = document.getElementById('storyLanguageFilter');
    if (storyLanguageFilter) {
        storyLanguageFilter.addEventListener('change', filterStories);
    }

    const storyCategoryFilter = document.getElementById('storyCategoryFilter');
    if (storyCategoryFilter) {
        storyCategoryFilter.addEventListener('change', filterStories);
    }

    // Activity tabs
    const activityTabs = document.querySelectorAll('.activity-tab');
    activityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const activity = this.getAttribute('data-activity');
            switchActivity(activity);
        });
    });

    // Community tabs
    const communityTabs = document.querySelectorAll('.community-tab');
    communityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchCommunityTab(tabName);
        });
    });

    // Drawing canvas
    setupDrawingCanvas();
}

// Navigation Functions
function navigateToSection(sectionName) {
    showSection(sectionName);
    updateNavigation(sectionName);
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        appState.currentSection = sectionName;
    }
}

function updateNavigation(activeSection) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current section link
    const activeLink = document.querySelector(`[href="#${activeSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Language Functions
function updateLanguage() {
    // Update UI text based on selected language
    // This would typically involve loading language-specific text
    console.log(`Language changed to: ${appState.currentLanguage}`);
    
    // Refresh stories display
    populateStories();
}

// Story Functions
function populateStories() {
    const storiesGrid = document.getElementById('storiesGrid');
    if (!storiesGrid) return;

    storiesGrid.innerHTML = '';
    
    // Get all stories for current language and any additional stories
    let storiesToShow = [];
    
    if (appState.currentLanguage === 'en') {
        // Show all stories for English
        Object.values(storiesDatabase).forEach(languageStories => {
            storiesToShow.push(...languageStories);
        });
    } else {
        // Show stories in selected language + English translations
        storiesToShow.push(...storiesDatabase[appState.currentLanguage] || []);
        storiesToShow.push(...storiesDatabase.en);
    }

    storiesToShow.forEach(story => {
        const storyCard = createStoryCard(story);
        storiesGrid.appendChild(storyCard);
    });
}

// Audio Functions
function toggleAudio() {
    const isEnabled = audioSystem.toggle();
    const audioToggle = document.getElementById('audioToggle');
    const icon = audioToggle.querySelector('i');
    
    if (isEnabled) {
        audioToggle.classList.remove('disabled');
        icon.className = 'fas fa-volume-up';
        audioToggle.title = 'Disable Audio Narration';
    } else {
        audioToggle.classList.add('disabled');
        icon.className = 'fas fa-volume-mute';
        audioToggle.title = 'Enable Audio Narration';
    }
}

// Update story card creation to include categories and language badges
function createStoryCard(story) {
    const card = document.createElement('div');
    card.className = 'story-card';
    card.onclick = () => openStory(story);

    const languageNames = {
        'en': 'English',
        'ha': 'Hausa',
        'yo': 'Yoruba',
        'ig': 'Igbo'
    };

    const categoryNames = {
        'folktale': 'Folktale',
        'fantasy': 'Fantasy',
        'adventure': 'Adventure',
        'educational': 'Educational',
        'cultural': 'Cultural'
    };

    card.innerHTML = `
        <div class="story-image">
            <i class="fas fa-book-open"></i>
        </div>
        <div class="story-content">
            <h3 class="story-title">${story.title}</h3>
            <div class="story-meta-top">
                <span class="story-language language-badge">${languageNames[story.language]}</span>
                <span class="story-category ${story.category}">${categoryNames[story.category]}</span>
            </div>
            <p class="story-description">${story.description}</p>
            <div class="story-meta">
                <span>Age: ${story.ageGroup}</span>
                <span>${story.readingTime}</span>
            </div>
        </div>
    `;

    return card;
}

function openStory(story) {
    appState.currentStory = story;
    appState.currentPage = 1;
    appState.totalPages = story.content.length;

    const modal = document.getElementById('storyModal');
    const title = document.getElementById('modalStoryTitle');
    const text = document.getElementById('modalStoryText');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');

    title.textContent = story.title;
    currentPageSpan.textContent = appState.currentPage;
    totalPagesSpan.textContent = appState.totalPages;

    displayStoryPage();

    modal.classList.add('active');
}

function displayStoryPage() {
    if (!appState.currentStory) return;

    const text = document.getElementById('modalStoryText');
    const currentPage = appState.currentPage - 1;
    
    if (appState.currentStory.content[currentPage]) {
        text.textContent = appState.currentStory.content[currentPage];
    }
}

function nextPage() {
    if (appState.currentPage < appState.totalPages) {
        appState.currentPage++;
        displayStoryPage();
        document.getElementById('currentPage').textContent = appState.currentPage;
    }
}

function previousPage() {
    if (appState.currentPage > 1) {
        appState.currentPage--;
        displayStoryPage();
        document.getElementById('currentPage').textContent = appState.currentPage;
    }
}

function closeStoryModal() {
    const modal = document.getElementById('storyModal');
    modal.classList.remove('active');
    
    // Update progress
    if (appState.currentStory) {
        appState.userProgress.storiesRead++;
        updateProgressDisplay();
        saveUserProgress();
    }
}

function filterStories() {
    const languageFilter = document.getElementById('storyLanguageFilter').value;
    const categoryFilter = document.getElementById('storyCategoryFilter').value;
    
    const storiesGrid = document.getElementById('storiesGrid');
    if (!storiesGrid) return;

    storiesGrid.innerHTML = '';
    
    let storiesToShow = [];
    
    // Get stories based on filters
    if (languageFilter === 'all') {
        Object.values(storiesDatabase).forEach(languageStories => {
            storiesToShow.push(...languageStories);
        });
    } else {
        storiesToShow.push(...(storiesDatabase[languageFilter] || []));
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
        storiesToShow = storiesToShow.filter(story => story.category === categoryFilter);
    }

    storiesToShow.forEach(story => {
        const storyCard = createStoryCard(story);
        storiesGrid.appendChild(storyCard);
    });
}

// Game Functions
function createGame(gameType) {
    const modal = document.getElementById('gameModal');
    const title = document.getElementById('gameTitle');
    const container = document.getElementById('gameContainer');

    switch (gameType) {
        case 'memory':
            title.textContent = 'Memory Match Game';
            container.innerHTML = createMemoryGame();
            initializeMemoryGame();
            break;
        case 'puzzle':
            title.textContent = 'Story Puzzle Game';
            container.innerHTML = createPuzzleGame();
            initializePuzzleGame();
            break;
        case 'quiz':
            title.textContent = 'Story Quiz Game';
            container.innerHTML = createQuizGame();
            initializeQuizGame();
            break;
        case 'coloring':
            title.textContent = 'Story Coloring Game';
            container.innerHTML = createColoringGame();
            initializeColoringGame();
            break;
        case 'word-scramble':
            title.textContent = 'Word Scramble Game';
            container.innerHTML = createWordScrambleGame();
            advancedFeatures.advancedGames.wordScramble.start();
            break;
        case 'story-sequencer':
            title.textContent = 'Story Sequencer Game';
            container.innerHTML = createStorySequencerGame();
            // Start with a random story
            const allStories = [];
            Object.values(storiesDatabase).forEach(langStories => {
                allStories.push(...langStories);
            });
            const randomStory = allStories[Math.floor(Math.random() * allStories.length)];
            advancedFeatures.advancedGames.storySequencer.start(randomStory.id);
            break;
    }

    modal.classList.add('active');
}

function createMemoryGame() {
    return `
        <div class="memory-game">
            <div class="game-header">
                <h3>Match the Story Characters!</h3>
                <div class="game-stats">
                    <span>Pairs: <span id="memoryPairs">0</span>/4</span>
                    <span>Moves: <span id="memoryMoves">0</span></span>
                    <span>Time: <span id="memoryTimer">00:00</span></span>
                </div>
            </div>
            <p>Click on cards to find matching pairs. Test your memory!</p>
            <div class="memory-grid" id="memoryGrid">
                <!-- Cards will be populated by JavaScript -->
            </div>
            <div class="game-controls">
                <button class="btn btn-primary" onclick="startMemoryGame()">Start Game</button>
                <button class="btn btn-secondary" onclick="resetMemoryGame()">Reset</button>
            </div>
        </div>
    `;
}

function initializeMemoryGame() {
    const memoryCards = [
        { id: 1, value: 'tortoise', emoji: '🐢', story: 'The Clever Tortoise' },
        { id: 2, value: 'tortoise', emoji: '🐢', story: 'The Clever Tortoise' },
        { id: 3, value: 'lion', emoji: '🦁', story: 'The Clever Tortoise' },
        { id: 4, value: 'lion', emoji: '🦁', story: 'The Clever Tortoise' },
        { id: 5, value: 'fish', emoji: '🐟', story: 'The Golden Fish' },
        { id: 6, value: 'fish', emoji: '🐟', story: 'The Golden Fish' },
        { id: 7, value: 'tree', emoji: '🌳', story: 'The Brave Little Hunter' },
        { id: 8, value: 'tree', emoji: '🌳', story: 'The Brave Little Hunter' }
    ];

    // Shuffle cards
    gameState.memory.cards = shuffleArray([...memoryCards]);
    gameState.memory.flippedCards = [];
    gameState.memory.matchedPairs = 0;
    gameState.memory.moves = 0;
    gameState.memory.isActive = false;

    renderMemoryCards();
    updateMemoryStats();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderMemoryCards() {
    const grid = document.getElementById('memoryGrid');
    if (!grid) return;

    grid.innerHTML = '';
    gameState.memory.cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.setAttribute('data-index', index);
        cardElement.setAttribute('data-value', card.value);
        cardElement.innerHTML = `
            <div class="card-front">
                <span class="card-emoji">${card.emoji}</span>
                <span class="card-story">${card.story}</span>
            </div>
            <div class="card-back">
                <i class="fas fa-question"></i>
            </div>
        `;
        cardElement.addEventListener('click', () => flipMemoryCard(index));
        grid.appendChild(cardElement);
    });
}

function flipMemoryCard(index) {
    if (!gameState.memory.isActive) return;
    
    const card = gameState.memory.cards[index];
    const cardElement = document.querySelector(`[data-index="${index}"]`);
    
    if (gameState.memory.flippedCards.length === 2) return;
    if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) return;

    // Flip card
    cardElement.classList.add('flipped');
    gameState.memory.flippedCards.push({ index, card });

    if (gameState.memory.flippedCards.length === 2) {
        gameState.memory.moves++;
        updateMemoryStats();
        checkMemoryMatch();
    }
}

function checkMemoryMatch() {
    const [first, second] = gameState.memory.flippedCards;
    
    if (first.card.value === second.card.value) {
        // Match found
        setTimeout(() => {
            document.querySelector(`[data-index="${first.index}"]`).classList.add('matched');
            document.querySelector(`[data-index="${second.index}"]`).classList.add('matched');
            
            gameState.memory.matchedPairs++;
            updateMemoryStats();
            
            if (gameState.memory.matchedPairs === gameState.memory.totalPairs) {
                endMemoryGame();
            }
        }, 500);
    } else {
        // No match
        setTimeout(() => {
            document.querySelector(`[data-index="${first.index}"]`).classList.remove('flipped');
            document.querySelector(`[data-index="${second.index}"]`).classList.remove('flipped');
        }, 1000);
    }
    
    gameState.memory.flippedCards = [];
}

function startMemoryGame() {
    gameState.memory.isActive = true;
    gameState.memory.startTime = Date.now();
    gameState.memory.timer = setInterval(updateMemoryTimer, 1000);
    
    document.querySelector('.memory-game .btn-primary').textContent = 'Game in Progress...';
    document.querySelector('.memory-game .btn-primary').disabled = true;
}

function resetMemoryGame() {
    clearInterval(gameState.memory.timer);
    initializeMemoryGame();
    document.querySelector('.memory-game .btn-primary').textContent = 'Start Game';
    document.querySelector('.memory-game .btn-primary').disabled = false;
}

function endMemoryGame() {
    gameState.memory.isActive = false;
    clearInterval(gameState.memory.timer);
    
    const endTime = Date.now();
    const duration = Math.floor((endTime - gameState.memory.startTime) / 1000);
    
    // Update progress
    appState.userProgress.gamesPlayed++;
    updateProgressDisplay();
    saveUserProgress();
    
    // Show completion message
    const container = document.getElementById('gameContainer');
    container.innerHTML = `
        <div class="game-completion">
            <h3>🎉 Congratulations! 🎉</h3>
            <p>You completed the Memory Match Game!</p>
            <div class="completion-stats">
                <p>Pairs Matched: ${gameState.memory.matchedPairs}/${gameState.memory.totalPairs}</p>
                <p>Total Moves: ${gameState.memory.moves}</p>
                <p>Time: ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}</p>
            </div>
            <button class="btn btn-primary" onclick="closeGameModal()">Close</button>
        </div>
    `;
}

function updateMemoryStats() {
    const pairsElement = document.getElementById('memoryPairs');
    const movesElement = document.getElementById('memoryMoves');
    
    if (pairsElement) pairsElement.textContent = gameState.memory.matchedPairs;
    if (movesElement) movesElement.textContent = gameState.memory.moves;
}

function updateMemoryTimer() {
    if (!gameState.memory.startTime) return;
    
    const currentTime = Date.now();
    const elapsed = Math.floor((currentTime - gameState.memory.startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    
    const timerElement = document.getElementById('memoryTimer');
    if (timerElement) {
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function createPuzzleGame() {
    return `
        <div class="puzzle-game">
            <h3>Complete the Story Scene!</h3>
            <p>Drag and drop puzzle pieces to complete the picture.</p>
            <div class="puzzle-container">
                <div class="puzzle-pieces">
                    <div class="puzzle-piece" draggable="true">🧩</div>
                    <div class="puzzle-piece" draggable="true">🧩</div>
                    <div class="puzzle-piece" draggable="true">🧩</div>
                    <div class="puzzle-piece" draggable="true">🧩</div>
                </div>
                <div class="puzzle-board">
                    <div class="puzzle-slot"></div>
                    <div class="puzzle-slot"></div>
                    <div class="puzzle-slot"></div>
                    <div class="puzzle-slot"></div>
                </div>
            </div>
        </div>
    `;
}

function initializePuzzleGame() {
    // Puzzle game logic would go here
    // For now, just render the puzzle pieces
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    puzzlePieces.forEach(piece => {
        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.innerHTML);
        });
        piece.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        piece.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            const targetSlot = e.target.closest('.puzzle-slot');
            if (targetSlot) {
                targetSlot.innerHTML = data;
                // Check if puzzle is completed
                if (document.querySelectorAll('.puzzle-slot').every(slot => slot.innerHTML !== '')) {
                    endPuzzleGame();
                }
            }
        });
    });
}

function endPuzzleGame() {
    gameState.puzzle.isActive = false;
    // Update progress
    appState.userProgress.gamesPlayed++;
    updateProgressDisplay();
    saveUserProgress();

    const container = document.getElementById('gameContainer');
    container.innerHTML = `
        <div class="game-completion">
            <h3>🎉 Congratulations! 🎉</h3>
            <p>You completed the Story Puzzle Game!</p>
            <button class="btn btn-primary" onclick="closeGameModal()">Close</button>
        </div>
    `;
}

function createQuizGame() {
    return `
        <div class="quiz-game">
            <h3>Test Your Story Knowledge!</h3>
            <div class="quiz-question">
                <h4>Question 1:</h4>
                <p>What did the clever tortoise use to win the race?</p>
                <div class="quiz-options">
                    <button class="quiz-option" onclick="checkAnswer('cleverness')">A. His speed</button>
                    <button class="quiz-option" onclick="checkAnswer('cleverness')">B. His cleverness</button>
                    <button class="quiz-option" onclick="checkAnswer('strength')">C. His strength</button>
                    <button class="quiz-option" onclick="checkAnswer('size')">D. His size</button>
                </div>
            </div>
        </div>
    `;
}

function initializeQuizGame() {
    // Quiz game logic would go here
    // For now, just render the quiz question
}

function endQuizGame() {
    gameState.quiz.isActive = false;
    // Update progress
    appState.userProgress.gamesPlayed++;
    updateProgressDisplay();
    saveUserProgress();

    const container = document.getElementById('gameContainer');
    container.innerHTML = `
        <div class="game-completion">
            <h3>🎉 Congratulations! 🎉</h3>
            <p>You completed the Story Quiz Game!</p>
            <button class="btn btn-primary" onclick="closeGameModal()">Close</button>
        </div>
    `;
}

function createColoringGame() {
    return `
        <div class="coloring-game">
            <h3>Color the Story Scene!</h3>
            <p>Choose colors and paint the beautiful story illustration.</p>
            <div class="coloring-canvas">
                <canvas id="coloringCanvas" width="400" height="300"></canvas>
                <div class="coloring-palette">
                    <div class="color-option" style="background: red;" onclick="selectColor('red')"></div>
                    <div class="color-option" style="background: blue;" onclick="selectColor('blue')"></div>
                    <div class="color-option" style="background: green;" onclick="selectColor('green')"></div>
                    <div class="color-option" style="background: yellow;" onclick="selectColor('yellow')"></div>
                    <div class="color-option" style="background: purple;" onclick="selectColor('purple')"></div>
                </div>
            </div>
        </div>
    `;
}

function initializeColoringGame() {
    // Coloring game logic would go here
    // For now, just render the coloring canvas
}

function endColoringGame() {
    gameState.coloring.isActive = false;
    // Update progress
    appState.userProgress.gamesPlayed++;
    updateProgressDisplay();
    saveUserProgress();

    const container = document.getElementById('gameContainer');
    container.innerHTML = `
        <div class="game-completion">
            <h3>🎉 Congratulations! 🎉</h3>
            <p>You completed the Story Coloring Game!</p>
            <button class="btn btn-primary" onclick="closeGameModal()">Close</button>
        </div>
    `;
}

function createWordScrambleGame() {
    return `
        <div class="word-scramble-game">
            <div class="game-header">
                <h3>Unscramble Nigerian Story Words!</h3>
                <div class="game-stats">
                    <span>Score: <span id="wordScrambleScore">0</span></span>
                    <span>Time: <span id="wordScrambleTime">60</span>s</span>
                </div>
            </div>
            <p>Unscramble words from Nigerian stories and learn their meanings!</p>
            <div id="wordScrambleDisplay">
                <!-- Word display will be populated by JavaScript -->
            </div>
            <div class="game-controls">
                <button class="btn btn-primary" onclick="advancedFeatures.advancedGames.wordScramble.start()">Start Game</button>
                <button class="btn btn-secondary" onclick="closeGameModal()">Close</button>
            </div>
        </div>
    `;
}

function createStorySequencerGame() {
    return `
        <div class="story-sequencer-game">
            <div class="game-header">
                <h3>Arrange Story Parts in Order!</h3>
                <div class="game-stats">
                    <span>Score: <span id="storySequencerScore">0</span>%</span>
                </div>
            </div>
            <p>Drag and drop story parts to arrange them in the correct sequence!</p>
            <div id="storySequencerDisplay">
                <!-- Story sequence will be populated by JavaScript -->
            </div>
        </div>
    `;
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('active');
    
    // Update progress
    appState.userProgress.gamesPlayed++;
    updateProgressDisplay();
    saveUserProgress();
}

// Activity Functions
function switchActivity(activityName) {
    // Remove active class from all tabs
    const activityTabs = document.querySelectorAll('.activity-tab');
    activityTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to clicked tab
    const activeTab = document.querySelector(`[data-activity="${activityName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Hide all panels
    const activityPanels = document.querySelectorAll('.activity-panel');
    activityPanels.forEach(panel => {
        panel.classList.remove('active');
    });

    // Show target panel
    const targetPanel = document.getElementById(activityName);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

// Drawing Canvas Functions
function setupDrawingCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;

        const currentTool = document.querySelector('.tool-btn.active').getAttribute('data-tool');
        const color = document.getElementById('colorPicker').value;
        const size = document.getElementById('brushSize').value;

        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';

        if (currentTool === 'eraser') {
            ctx.strokeStyle = 'white';
        }

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();

        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Tool selection
    const toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toolBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function clearCanvas() {
    const canvas = document.getElementById('drawingCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// Coloring Functions
function selectColoringImage(imageType) {
    console.log(`Selected coloring image: ${imageType}`);
    // This would typically load a specific coloring template
    alert(`You selected the ${imageType} to color! This feature would open a coloring canvas.`);
}

// Story Creation Functions
function saveStory() {
    const title = document.getElementById('storyTitle').value;
    const language = document.getElementById('storyLanguage').value;
    const content = document.getElementById('storyContent').value;

    if (!title || !content) {
        alert('Please fill in both title and story content!');
        return;
    }

    const newStory = {
        id: Date.now(),
        title: title,
        language: language,
        content: content,
        author: 'You',
        date: new Date().toLocaleDateString()
    };

    appState.userStories.push(newStory);
    
    // Clear form
    document.getElementById('storyTitle').value = '';
    document.getElementById('storyContent').value = '';
    
    alert('Story saved successfully! You can view it in the Community section.');
    
    // Update community content
    populateCommunityContent();
}

// Community Functions
function switchCommunityTab(tabName) {
    // Remove active class from all tabs
    const communityTabs = document.querySelectorAll('.community-tab');
    communityTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to clicked tab
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // Hide all panels
    const communityPanels = document.querySelectorAll('.community-panel');
    communityPanels.forEach(panel => {
        panel.classList.remove('active');
    });

    // Show target panel
    const targetPanel = document.getElementById(tabName);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

function populateCommunityContent() {
    populateSharedStories();
    populateArtworkGallery();
}

function populateSharedStories() {
    const sharedStoriesGrid = document.getElementById('sharedStoriesGrid');
    if (!sharedStoriesGrid) return;

    sharedStoriesGrid.innerHTML = '';

    // Add user stories
    appState.userStories.forEach(story => {
        const storyCard = createCommunityStoryCard(story);
        sharedStoriesGrid.appendChild(storyCard);
    });

    // Add some sample community stories
    const sampleStories = [
        {
            id: 'sample1',
            title: 'The Friendly Elephant',
            author: 'Aisha',
            language: 'English',
            date: '2024-01-15'
        },
        {
            id: 'sample2',
            title: 'The Wise Old Tree',
            author: 'Kemi',
            language: 'Yoruba',
            date: '2024-01-10'
        }
    ];

    sampleStories.forEach(story => {
        const storyCard = createCommunityStoryCard(story);
        sharedStoriesGrid.appendChild(storyCard);
    });
}

function createCommunityStoryCard(story) {
    const card = document.createElement('div');
    card.className = 'story-card';
    
    card.innerHTML = `
        <div class="story-image">
            <i class="fas fa-book-open"></i>
        </div>
        <div class="story-content">
            <h3 class="story-title">${story.title}</h3>
            <span class="story-language">${story.language}</span>
            <p class="story-description">By ${story.author}</p>
            <div class="story-meta">
                <span>${story.date}</span>
                <span><i class="fas fa-heart"></i> Like</span>
            </div>
        </div>
    `;

    return card;
}

function populateArtworkGallery() {
    const artworkGallery = document.getElementById('artworkGallery');
    if (!artworkGallery) return;

    artworkGallery.innerHTML = '';

    // Add user artworks
    appState.userArtworks.forEach(artwork => {
        const artworkCard = createArtworkCard(artwork);
        artworkGallery.appendChild(artworkCard);
    });

    // Add some sample artworks
    const sampleArtworks = [
        {
            id: 'art1',
            title: 'Beautiful Sunset',
            artist: 'Zara',
            type: 'Drawing',
            date: '2024-01-20'
        },
        {
            id: 'art2',
            title: 'Forest Animals',
            artist: 'Bello',
            type: 'Coloring',
            date: '2024-01-18'
        }
    ];

    sampleArtworks.forEach(artwork => {
        const artworkCard = createArtworkCard(artwork);
        artworkGallery.appendChild(artworkCard);
    });
}

function createArtworkCard(artwork) {
    const card = document.createElement('div');
    card.className = 'story-card';
    
    card.innerHTML = `
        <div class="story-image">
            <i class="fas fa-palette"></i>
        </div>
        <div class="story-content">
            <h3 class="story-title">${artwork.title}</h3>
            <span class="story-language">${artwork.type}</span>
            <p class="story-description">By ${artwork.artist}</p>
            <div class="story-meta">
                <span>${artwork.date}</span>
                <span><i class="fas fa-heart"></i> Like</span>
            </div>
        </div>
    `;

    return card;
}

// Progress Functions
function loadUserProgress() {
    const savedProgress = localStorage.getItem('nigerianStoriesProgress');
    if (savedProgress) {
        appState.userProgress = JSON.parse(savedProgress);
    }
    updateProgressDisplay();
}

function saveUserProgress() {
    localStorage.setItem('nigerianStoriesProgress', JSON.stringify(appState.userProgress));
}

function updateProgressDisplay() {
    const storiesRead = document.getElementById('storiesRead');
    const gamesPlayed = document.getElementById('gamesPlayed');
    const artworksCreated = document.getElementById('artworksCreated');

    if (storiesRead) storiesRead.textContent = appState.userProgress.storiesRead;
    if (gamesPlayed) gamesPlayed.textContent = appState.userProgress.gamesPlayed;
    if (artworksCreated) artworksCreated.textContent = appState.userProgress.artworksCreated;
}

// Utility Functions
function checkAnswer(answer) {
    if (answer === 'cleverness') {
        alert('Correct! The tortoise used his cleverness to win the race! 🎉');
    } else {
        alert('Try again! Think about what made the tortoise special.');
    }
}

function startMemoryGame() {
    // Memory game logic would go here
    alert('Memory game started! Click on cards to find matching pairs.');
}

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const storyModal = document.getElementById('storyModal');
    const gameModal = document.getElementById('gameModal');
    
    if (e.target === storyModal) {
        closeStoryModal();
    }
    
    if (e.target === gameModal) {
        closeGameModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeStoryModal();
        closeGameModal();
    }
    
    if (e.key === 'ArrowRight') {
        if (document.getElementById('storyModal').classList.contains('active')) {
            nextPage();
        }
    }
    
    if (e.key === 'ArrowLeft') {
        if (document.getElementById('storyModal').classList.contains('active')) {
            previousPage();
        }
    }
});

// User Management Functions
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const success = advancedFeatures.userManager.login(email, password);
    if (success) {
        closeUserModal();
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const age = document.getElementById('registerAge').value;
    
    const success = advancedFeatures.userManager.register(username, email, password, age);
    if (success) {
        showLoginForm();
        showNotification('Registration successful! Please login.', 'success');
    } else {
        showNotification('Registration failed. Please try again.', 'error');
    }
}

function handleLogout() {
    advancedFeatures.userManager.logout();
    closeUserModal();
    showNotification('Logged out successfully', 'success');
}

function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('userProfile').style.display = 'none';
}

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('userProfile').style.display = 'none';
}

function showUserProfile() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('userProfile').style.display = 'block';
    
    const user = advancedFeatures.userManager.currentUser;
    if (user) {
        document.getElementById('profileUsername').textContent = user.username;
        document.getElementById('profileStoriesRead').textContent = user.stats.storiesRead || 0;
        document.getElementById('profileGamesPlayed').textContent = user.stats.gamesPlayed || 0;
        document.getElementById('profileArtworksCreated').textContent = user.stats.artworksCreated || 0;
    }
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
}

// Social Features Functions
function addFriend() {
    const friendId = document.getElementById('friendId').value;
    if (friendId.trim()) {
        const success = advancedFeatures.socialSystem.addFriend(friendId);
        if (success) {
            document.getElementById('friendId').value = '';
            updateSocialTabs();
            showNotification('Friend added successfully!', 'success');
        } else {
            showNotification('Failed to add friend. Please try again.', 'error');
        }
    }
}

function shareCurrentStory() {
    if (appState.currentStory) {
        const success = advancedFeatures.socialSystem.shareStory(appState.currentStory);
        if (success) {
            showNotification('Story shared successfully!', 'success');
        } else {
            showNotification('Failed to share story. Please try again.', 'error');
        }
    } else {
        showNotification('No story selected to share', 'error');
    }
}

function shareCurrentArtwork() {
    const canvas = document.getElementById('drawingCanvas');
    if (canvas) {
        const dataURL = canvas.toDataURL();
        const success = advancedFeatures.socialSystem.shareArtwork(dataURL);
        if (success) {
            showNotification('Artwork shared successfully!', 'success');
        } else {
            showNotification('Failed to share artwork. Please try again.', 'error');
        }
    } else {
        showNotification('No artwork to share', 'error');
    }
}

function closeSocialModal() {
    document.getElementById('socialModal').style.display = 'none';
}

function updateSocialTabs() {
    // Update friends list
    const friendsList = document.getElementById('friendsList');
    if (friendsList) {
        friendsList.innerHTML = advancedFeatures.socialSystem.friends.map(friend => `
            <div class="friend-item">
                <div class="friend-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="friend-info">
                    <h4>${friend.username}</h4>
                    <p>Age: ${friend.age}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Update shared content list
    const sharedContentList = document.getElementById('sharedContentList');
    if (sharedContentList) {
        sharedContentList.innerHTML = advancedFeatures.socialSystem.sharedContent.map(content => `
            <div class="shared-content-item">
                <div class="content-header">
                    <span class="content-type">${content.type}</span>
                    <small>${new Date(content.timestamp).toLocaleDateString()}</small>
                </div>
                <div class="content-meta">
                    <span>By: ${content.author}</span>
                    <span>Likes: ${content.likes}</span>
                </div>
                <div class="content-actions">
                    <button class="btn btn-small" onclick="likeContent('${content.id}')">
                        <i class="fas fa-heart"></i> Like
                    </button>
                    <button class="btn btn-small" onclick="commentContent('${content.id}')">
                        <i class="fas fa-comment"></i> Comment
                    </button>
                </div>
            </div>
        `).join('');
    }
}

function likeContent(contentId) {
    advancedFeatures.socialSystem.likeContent(contentId);
    updateSocialTabs();
}

function commentContent(contentId) {
    const comment = prompt('Enter your comment:');
    if (comment) {
        advancedFeatures.socialSystem.commentContent(contentId, comment);
        updateSocialTabs();
        showNotification('Comment added successfully!', 'success');
    }
}

// Social Tab Switching
document.addEventListener('DOMContentLoaded', function() {
    // Add social tab switching functionality
    const socialTabs = document.querySelectorAll('.social-tab');
    const socialTabContents = document.querySelectorAll('.social-tab-content');
    
    socialTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            socialTabs.forEach(t => t.classList.remove('active'));
            socialTabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + 'Tab').classList.add('active');
        });
    });
});

// Advanced Audio Functions
function closeAudioModal() {
    document.getElementById('audioModal').style.display = 'none';
}

function toggleRecording() {
    if (advancedFeatures.advancedAudio.isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    const success = advancedFeatures.advancedAudio.recordAudio();
    if (success) {
        document.getElementById('recordButton').classList.add('recording');
        document.getElementById('stopButton').style.display = 'inline-block';
        document.getElementById('recordingStatus').textContent = 'Recording...';
    } else {
        showNotification('Failed to start recording. Please check microphone permissions.', 'error');
    }
}

function stopRecording() {
    const audioBlob = advancedFeatures.advancedAudio.stopRecording();
    if (audioBlob) {
        document.getElementById('recordButton').classList.remove('recording');
        document.getElementById('stopButton').style.display = 'none';
        document.getElementById('recordingStatus').textContent = 'Recording saved!';
        
        // Save to local storage
        advancedFeatures.advancedAudio.saveAudioToStorage(audioBlob);
        showNotification('Audio recording saved successfully!', 'success');
    }
}

// Audio Settings
document.addEventListener('DOMContentLoaded', function() {
    const speechRate = document.getElementById('speechRate');
    const speechPitch = document.getElementById('speechPitch');
    const rateValue = document.getElementById('rateValue');
    const pitchValue = document.getElementById('pitchValue');
    
    if (speechRate && rateValue) {
        speechRate.addEventListener('input', function() {
            rateValue.textContent = this.value;
            audioSystem.setRate(parseFloat(this.value));
        });
    }
    
    if (speechPitch && pitchValue) {
        speechPitch.addEventListener('input', function() {
            pitchValue.textContent = this.value;
            audioSystem.setPitch(parseFloat(this.value));
        });
    }
});

// Voice Selection
function populateVoiceSelection() {
    const voiceSelection = document.getElementById('voiceSelection');
    if (voiceSelection) {
        const voices = advancedFeatures.advancedAudio.getAvailableVoices();
        voiceSelection.innerHTML = voices.map(voice => `
            <div class="voice-option" onclick="selectVoice('${voice.name}')">
                <h5>${voice.name}</h5>
                <p>${voice.lang} - ${voice.localService ? 'Local' : 'Online'}</p>
            </div>
        `).join('');
    }
}

function selectVoice(voiceName) {
    advancedFeatures.advancedAudio.selectVoice(voiceName);
    
    // Update UI
    document.querySelectorAll('.voice-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.closest('.voice-option').classList.add('selected');
    
    showNotification(`Voice changed to ${voiceName}`, 'success');
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize advanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Initialize voice selection
    populateVoiceSelection();
    
    // Update social tabs
    updateSocialTabs();
    
    // Show user profile if logged in
    if (advancedFeatures.userManager.isLoggedIn) {
        showUserProfile();
    }
});

// Payment System and Flutterwave Integration
const paymentSystem = {
    // Configuration
    config: {
        publicKey: 'FLWPUBK_TEST-your-flutterwave-public-key', // Replace with your actual Flutterwave public key
        environment: 'sandbox', // Change to 'live' for production
        currency: 'NGN',
        country: 'NG'
    },
    
    // Current subscription state
    currentSubscription: {
        plan: null,
        status: 'inactive',
        amount: 0,
        nextBilling: null,
        features: []
    },
    
    // Plan configurations
    plans: {
        basic: {
            name: 'Basic',
            amount: 500,
            features: [
                'Access to 50+ stories',
                'Basic games',
                'Standard audio',
                'Community access'
            ]
        },
        premium: {
            name: 'Premium',
            amount: 1200,
            features: [
                'Access to 200+ stories',
                'All games & activities',
                'Advanced audio features',
                'Priority support',
                'Ad-free experience',
                'Download stories offline'
            ]
        },
        family: {
            name: 'Family',
            amount: 2500,
            features: [
                'Up to 5 child accounts',
                'All Premium features',
                'Parent dashboard',
                'Progress tracking',
                'Custom content creation',
                '24/7 support'
            ]
        }
    },
    
    // Initialize payment system
    init() {
        this.loadSubscriptionData();
        this.updateUIElements();
        this.setupCardFormatting();
    },
    
    // Load subscription data from localStorage
    loadSubscriptionData() {
        const saved = localStorage.getItem('subscriptionData');
        if (saved) {
            this.currentSubscription = { ...this.currentSubscription, ...JSON.parse(saved) };
        }
    },
    
    // Save subscription data to localStorage
    saveSubscriptionData() {
        localStorage.setItem('subscriptionData', JSON.stringify(this.currentSubscription));
    },
    
    // Update UI elements based on subscription status
    updateUIElements() {
        const premiumBtn = document.querySelector('.btn-premium');
        if (this.currentSubscription.status === 'active') {
            premiumBtn.innerHTML = '<i class="fas fa-crown"></i><span>Premium Active</span>';
            premiumBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        }
        
        // Update subscription management modal
        this.updateSubscriptionStatus();
    },
    
    // Setup card number formatting
    setupCardFormatting() {
        const cardNumberInput = document.getElementById('cardNumber');
        const expiryInput = document.getElementById('expiryDate');
        
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
                let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                e.target.value = formattedValue;
            });
        }
        
        if (expiryInput) {
            expiryInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }
    },
    
    // Process payment using Flutterwave
    async processPayment(planData, customerData) {
        try {
            // Generate transaction reference
            const txRef = 'nigerianstories_' + Date.now();
            
            // Flutterwave payment configuration
            const paymentData = {
                public_key: this.config.publicKey,
                tx_ref: txRef,
                amount: planData.amount,
                currency: this.config.currency,
                country: this.config.country,
                payment_options: 'card,banktransfer,ussd',
                customer: {
                    email: customerData.email,
                    phone_number: customerData.phone,
                    name: customerData.name
                },
                customizations: {
                    title: 'Nigerian Stories Premium Subscription',
                    description: `${planData.planName} Plan Subscription`,
                    logo: 'https://your-domain.com/logo.png' // Replace with your logo URL
                },
                callback: this.handlePaymentCallback.bind(this),
                onclose: this.handlePaymentClose.bind(this)
            };
            
            // Initialize Flutterwave payment
            FlutterwaveCheckout(paymentData);
            
        } catch (error) {
            console.error('Payment processing error:', error);
            this.showPaymentError('Failed to initialize payment. Please try again.');
        }
    },
    
    // Handle payment callback
    handlePaymentCallback(response) {
        if (response.status === 'successful') {
            // Verify payment on your backend (simulated here)
            this.verifyPayment(response.transaction_id, response.tx_ref);
        } else {
            this.showPaymentError('Payment was not successful. Please try again.');
        }
    },
    
    // Handle payment modal close
    handlePaymentClose() {
        console.log('Payment modal closed');
    },
    
    // Verify payment (simulate backend verification)
    async verifyPayment(transactionId, txRef) {
        try {
            // In a real implementation, this would be a call to your backend
            // to verify the payment with Flutterwave's API
            
            // Simulate verification delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate successful verification
            const verification = {
                status: 'success',
                data: {
                    status: 'successful',
                    amount: this.selectedPlan.amount,
                    currency: this.config.currency,
                    tx_ref: txRef
                }
            };
            
            if (verification.status === 'success' && verification.data.status === 'successful') {
                this.activateSubscription(this.selectedPlan);
                this.showPaymentSuccess();
            } else {
                this.showPaymentError('Payment verification failed. Please contact support.');
            }
            
        } catch (error) {
            console.error('Payment verification error:', error);
            this.showPaymentError('Payment verification failed. Please contact support.');
        }
    },
    
    // Activate subscription
    activateSubscription(planData) {
        const now = new Date();
        const nextBilling = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
        
        this.currentSubscription = {
            plan: planData.planName.toLowerCase(),
            status: 'active',
            amount: planData.amount,
            nextBilling: nextBilling.toISOString(),
            features: this.plans[planData.planName.toLowerCase()].features
        };
        
        this.saveSubscriptionData();
        this.updateUIElements();
        
        // Add billing history entry
        this.addBillingHistoryEntry({
            date: now.toISOString(),
            plan: planData.planName,
            amount: planData.amount,
            status: 'paid'
        });
        
        // Update app features based on subscription
        this.enablePremiumFeatures();
    },
    
    // Enable premium features
    enablePremiumFeatures() {
        // Unlock premium stories
        // Unlock advanced games
        // Enable ad-free experience
        // Add any other premium feature enablement
        console.log('Premium features enabled');
    },
    
    // Add billing history entry
    addBillingHistoryEntry(entry) {
        let history = JSON.parse(localStorage.getItem('billingHistory') || '[]');
        history.unshift(entry);
        localStorage.setItem('billingHistory', JSON.stringify(history.slice(0, 10))); // Keep last 10 entries
    },
    
    // Show payment success
    showPaymentSuccess() {
        document.querySelector('.subscription-plans').style.display = 'none';
        document.querySelector('.payment-section').style.display = 'none';
        document.querySelector('.payment-error').style.display = 'none';
        
        const successDiv = document.getElementById('paymentSuccess');
        successDiv.style.display = 'block';
        
        // Update success message
        document.getElementById('successPlanName').textContent = this.selectedPlan.planName;
        
        // Update features list
        const featuresList = document.getElementById('successFeaturesList');
        featuresList.innerHTML = this.plans[this.selectedPlan.planName.toLowerCase()].features
            .map(feature => `<li>${feature}</li>`)
            .join('');
    },
    
    // Show payment error
    showPaymentError(message) {
        document.querySelector('.subscription-plans').style.display = 'none';
        document.querySelector('.payment-section').style.display = 'none';
        document.querySelector('.payment-success').style.display = 'none';
        
        const errorDiv = document.getElementById('paymentError');
        errorDiv.style.display = 'block';
        
        document.getElementById('errorMessage').textContent = message;
    },
    
    // Update subscription status in management modal
    updateSubscriptionStatus() {
        if (this.currentSubscription.status === 'active') {
            document.getElementById('currentPlanName').textContent = this.plans[this.currentSubscription.plan].name;
            document.getElementById('currentPlanStatus').textContent = 'Active';
            document.getElementById('nextBillingDate').textContent = new Date(this.currentSubscription.nextBilling).toLocaleDateString();
            document.getElementById('currentPlanAmount').textContent = `₦${this.currentSubscription.amount}`;
            document.getElementById('cancelBtn').style.display = 'inline-block';
        }
        
        this.updateBillingHistory();
    },
    
    // Update billing history display
    updateBillingHistory() {
        const history = JSON.parse(localStorage.getItem('billingHistory') || '[]');
        const billingList = document.getElementById('billingList');
        
        if (history.length === 0) {
            billingList.innerHTML = '<p>No billing history available.</p>';
            return;
        }
        
        billingList.innerHTML = history.map(entry => `
            <div class="billing-item">
                <div class="billing-date">${new Date(entry.date).toLocaleDateString()}</div>
                <div class="billing-plan">${entry.plan} Plan</div>
                <div class="billing-amount">₦${entry.amount}</div>
                <div class="billing-status ${entry.status}">${entry.status}</div>
            </div>
        `).join('');
    }
};

// Payment Modal Functions
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'block';
    
    // Reset to plans view
    document.querySelector('.subscription-plans').style.display = 'block';
    document.querySelector('.payment-section').style.display = 'none';
    document.querySelector('.payment-success').style.display = 'none';
    document.querySelector('.payment-error').style.display = 'none';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function selectPlan(planType, amount, period) {
    paymentSystem.selectedPlan = {
        planName: planType.charAt(0).toUpperCase() + planType.slice(1),
        amount: amount,
        period: period
    };
    
    // Update selected plan info
    document.getElementById('selectedPlanName').textContent = paymentSystem.selectedPlan.planName;
    document.getElementById('selectedPlanAmount').textContent = `₦${amount}/${period}`;
    
    // Show payment section
    document.querySelector('.subscription-plans').style.display = 'none';
    document.querySelector('.payment-section').style.display = 'block';
    
    // Pre-fill email if user is logged in
    if (advancedFeatures.userManager.isLoggedIn) {
        document.getElementById('paymentEmail').value = advancedFeatures.userManager.currentUser.email;
    }
}

function goBackToPlans() {
    document.querySelector('.subscription-plans').style.display = 'block';
    document.querySelector('.payment-section').style.display = 'none';
    document.querySelector('.payment-success').style.display = 'none';
    document.querySelector('.payment-error').style.display = 'none';
}

function retryPayment() {
    goBackToPlans();
}

// Process payment form submission
document.addEventListener('DOMContentLoaded', function() {
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const cardName = document.getElementById('cardName').value;
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const email = document.getElementById('paymentEmail').value;
            const phone = document.getElementById('paymentPhone').value;
            
            if (!cardName || !cardNumber || !expiryDate || !cvv || !email || !phone) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            if (cardNumber.length < 13 || cardNumber.length > 19) {
                showNotification('Please enter a valid card number', 'error');
                return;
            }
            
            if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
                showNotification('Please enter a valid expiry date (MM/YY)', 'error');
                return;
            }
            
            if (cvv.length < 3 || cvv.length > 4) {
                showNotification('Please enter a valid CVV', 'error');
                return;
            }
            
            // Process payment
            const customerData = {
                name: cardName,
                email: email,
                phone: phone
            };
            
            paymentSystem.processPayment(paymentSystem.selectedPlan, customerData);
        });
    }
});

// Subscription Management Functions
function openSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    modal.style.display = 'block';
    paymentSystem.updateSubscriptionStatus();
}

function closeSubscriptionModal() {
    document.getElementById('subscriptionModal').style.display = 'none';
}

function manageBilling() {
    showNotification('Billing management feature coming soon!', 'info');
}

function cancelSubscription() {
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
        paymentSystem.currentSubscription.status = 'cancelled';
        paymentSystem.saveSubscriptionData();
        paymentSystem.updateUIElements();
        showNotification('Subscription cancelled successfully', 'success');
        closeSubscriptionModal();
    }
}

// Initialize payment system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Initialize payment system
    paymentSystem.init();
    
    // Add payment button to navigation if not already there
    const paymentAccess = document.querySelector('.payment-access');
    if (paymentAccess) {
        paymentAccess.addEventListener('click', function() {
            if (paymentSystem.currentSubscription.status === 'active') {
                openSubscriptionModal();
            } else {
                openPaymentModal();
            }
        });
    }
});

