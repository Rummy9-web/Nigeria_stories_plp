// ============================================
// NIGERIAN STORIES - COMPLETE FUNCTIONAL SCRIPT
// ============================================

// ============================================
// APP STATE MANAGEMENT
// ============================================
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

// ============================================
// GAME STATE MANAGEMENT
// ============================================
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

// ============================================
// STORY DATABASE
// ============================================
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

// ============================================
// TEXT-TO-SPEECH / AUDIO SYSTEM
// ============================================
const audioSystem = {
    enabled: false,
    synth: window.speechSynthesis,
    currentUtterance: null,
    voices: [],
    settings: {
        rate: 0.8,
        pitch: 1.1,
        volume: 1,
        lang: 'en-US'
    },

    init() {
        this.loadVoices();
        
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
        
        const savedSettings = localStorage.getItem('audioSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
        
        const savedEnabled = localStorage.getItem('audioEnabled');
        this.enabled = savedEnabled === 'true';
        
        this.updateAudioButton();
    },

    loadVoices() {
        this.voices = this.synth.getVoices();
    },

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('audioEnabled', this.enabled);
        
        if (!this.enabled && this.currentUtterance) {
            this.stop();
        }
        
        this.updateAudioButton();
        return this.enabled;
    },

    updateAudioButton() {
        const audioToggle = document.getElementById('audioToggle');
        if (!audioToggle) return;
        
        const icon = audioToggle.querySelector('i');
        if (this.enabled) {
            audioToggle.classList.remove('disabled');
            icon.className = 'fas fa-volume-up';
            audioToggle.title = 'Disable Audio Narration';
        } else {
            audioToggle.classList.add('disabled');
            icon.className = 'fas fa-volume-mute';
            audioToggle.title = 'Enable Audio Narration';
        }
    },

    speak(text) {
        if (!this.enabled || !text) return;
        
        this.stop();
        
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        this.currentUtterance.rate = this.settings.rate;
        this.currentUtterance.pitch = this.settings.pitch;
        this.currentUtterance.volume = this.settings.volume;
        this.currentUtterance.lang = this.settings.lang;
        
        const voice = this.voices.find(v => v.lang === this.settings.lang);
        if (voice) {
            this.currentUtterance.voice = voice;
        }
        
        this.synth.speak(this.currentUtterance);
    },

    stop() {
        if (this.synth.speaking) {
            this.synth.cancel();
        }
    },

    setRate(rate) {
        this.settings.rate = rate;
        this.saveSettings();
    },

    setPitch(pitch) {
        this.settings.pitch = pitch;
        this.saveSettings();
    },

    saveSettings() {
        localStorage.setItem('audioSettings', JSON.stringify(this.settings));
    }
};

// ============================================
// WORD SCRAMBLE GAME
// ============================================
const wordScrambleGame = {
    words: [
        { word: 'TORTOISE', hint: 'Clever animal from our story', meaning: 'A slow-moving reptile' },
        { word: 'WISDOM', hint: 'Quality of the tortoise', meaning: 'Deep knowledge and good judgment' },
        { word: 'FOREST', hint: 'Where the animals live', meaning: 'A large area with many trees' },
        { word: 'CALABASH', hint: 'Magical object', meaning: 'A traditional African container' },
        { word: 'VILLAGE', hint: 'Where Ada lived', meaning: 'A small community' },
        { word: 'HUNTER', hint: 'Kemi was a young...', meaning: 'Someone who hunts animals' },
        { word: 'BRAVE', hint: 'Quality of Kemi', meaning: 'Showing courage' },
        { word: 'RIVER', hint: 'Where Ada found the calabash', meaning: 'A large stream of water' },
        { word: 'MAGIC', hint: 'Power of the calabash', meaning: 'Supernatural power' },
        { word: 'FRIEND', hint: 'What animals became', meaning: 'A person you like and trust' }
    ],
    currentWord: null,
    currentIndex: 0,
    scrambledWord: '',
    score: 0,
    timeLeft: 60,
    timer: null,
    isActive: false,

    start() {
        this.score = 0;
        this.timeLeft = 60;
        this.currentIndex = 0;
        this.isActive = true;
        
        this.loadNewWord();
        this.startTimer();
        this.render();
    },

    loadNewWord() {
        if (this.currentIndex >= this.words.length) {
            this.end();
            return;
        }
        
        this.currentWord = this.words[this.currentIndex];
        this.scrambledWord = this.scrambleWord(this.currentWord.word);
        this.render();
    },

    scrambleWord(word) {
        const arr = word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr.join('');
    },

    checkAnswer(answer) {
        if (!this.isActive) return;
        
        if (answer.toUpperCase() === this.currentWord.word) {
            this.score += 10;
            showNotification('Correct! +10 points', 'success');
            this.currentIndex++;
            this.loadNewWord();
        } else {
            showNotification('Try again!', 'error');
        }
    },

    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            const timeElement = document.getElementById('wordScrambleTime');
            if (timeElement) {
                timeElement.textContent = this.timeLeft;
            }
            
            if (this.timeLeft <= 0) {
                this.end();
            }
        }, 1000);
    },

    end() {
        this.isActive = false;
        clearInterval(this.timer);
        
        appState.userProgress.gamesPlayed++;
        updateProgressDisplay();
        saveUserProgress();
        
        const container = document.getElementById('gameContainer');
        container.innerHTML = `
            <div class="game-completion">
                <h3>🎉 Game Over! 🎉</h3>
                <p>You scored ${this.score} points!</p>
                <p>Words completed: ${this.currentIndex}/${this.words.length}</p>
                <button class="btn btn-primary" onclick="closeGameModal()">Close</button>
                <button class="btn btn-secondary" onclick="createGame('word-scramble')">Play Again</button>
            </div>
        `;
    },

    render() {
        const display = document.getElementById('wordScrambleDisplay');
        if (!display) return;
        
        display.innerHTML = `
            <div class="word-scramble-content">
                <div class="scrambled-word">
                    <h2>${this.scrambledWord}</h2>
                </div>
                <div class="word-hint">
                    <p><strong>Hint:</strong> ${this.currentWord.hint}</p>
                    <p><em>${this.currentWord.meaning}</em></p>
                </div>
                <div class="word-input">
                    <input type="text" id="wordAnswer" placeholder="Type your answer..." autocomplete="off">
                    <button class="btn btn-primary" onclick="wordScrambleGame.checkAnswer(document.getElementById('wordAnswer').value)">
                        Submit
                    </button>
                </div>
                <div class="word-progress">
                    <p>Word ${this.currentIndex + 1} of ${this.words.length}</p>
                </div>
            </div>
        `;
        
        const input = document.getElementById('wordAnswer');
        if (input) {
            input.focus();
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkAnswer(input.value);
                }
            });
        }
        
        const scoreElement = document.getElementById('wordScrambleScore');
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
    }
};

// ============================================
// STORY SEQUENCER GAME
// ============================================
const storySequencerGame = {
    stories: {
        1: {
            title: "The Clever Tortoise",
            parts: [
                "Once upon a time, in a beautiful forest, there lived a clever tortoise named Tobi.",
                "The other animals often made fun of Tobi because he was slow, but he was very wise.",
                "One day, a fierce lion challenged all the animals to a race around the forest.",
                "All the animals were afraid, but Tobi had a clever plan.",
                "He asked the lion to wait while he prepared, then he secretly asked his friends to help.",
                "When the race started, the lion ran fast, but at every turn, he saw what he thought was Tobi.",
                "The lion was so tired from running that he gave up, and Tobi was declared the winner!",
                "From that day on, all the animals respected Tobi for his wisdom and cleverness."
            ]
        },
        2: {
            title: "The Magic Calabash",
            parts: [
                "In a small village by the river, there lived a kind girl named Ada.",
                "One day, while fetching water, Ada found a beautiful calabash floating in the river.",
                "The calabash sparkled with strange colors and seemed to whisper her name.",
                "Ada carefully picked it up and took it home to show her grandmother.",
                "Her grandmother smiled and said, 'This is a magic calabash, my child.'",
                "'It will grant you three wishes, but only if your heart is pure and kind.'",
                "Ada thought carefully about her wishes and decided to help others first.",
                "She wished for food for the hungry, medicine for the sick, and peace for her village.",
                "The calabash granted all her wishes, and Ada learned that helping others brings the greatest joy."
            ]
        }
    },
    currentStory: null,
    shuffledParts: [],
    userSequence: [],
    isActive: false,

    start(storyId = 1) {
        this.currentStory = this.stories[storyId];
        this.shuffledParts = this.shuffleArray([...this.currentStory.parts]);
        this.userSequence = [];
        this.isActive = true;
        this.render();
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    addToSequence(index) {
        if (!this.isActive) return;
        
        const part = this.shuffledParts[index];
        this.userSequence.push(part);
        this.render();
        
        if (this.userSequence.length === this.currentStory.parts.length) {
            this.checkSequence();
        }
    },

    removeFromSequence(index) {
        this.userSequence.splice(index, 1);
        this.render();
    },

    checkSequence() {
        const isCorrect = this.userSequence.every((part, index) => {
            return part === this.currentStory.parts[index];
        });
        
        const score = this.calculateScore();
        
        appState.userProgress.gamesPlayed++;
        updateProgressDisplay();
        saveUserProgress();
        
        const container = document.getElementById('gameContainer');
        container.innerHTML = `
            <div class="game-completion">
                <h3>${isCorrect ? '🎉 Perfect! 🎉' : '🌟 Good Try! 🌟'}</h3>
                <p>Your Score: ${score}%</p>
                <p>${isCorrect ? 'You arranged the story perfectly!' : 'The sequence was not quite right.'}</p>
                ${!isCorrect ? '<p><em>Tip: Read the story carefully to understand the order of events.</em></p>' : ''}
                <button class="btn btn-primary" onclick="closeGameModal()">Close</button>
                <button class="btn btn-secondary" onclick="createGame('story-sequencer')">Try Another Story</button>
            </div>
        `;
    },

    calculateScore() {
        let correctPositions = 0;
        this.userSequence.forEach((part, index) => {
            if (part === this.currentStory.parts[index]) {
                correctPositions++;
            }
        });
        return Math.round((correctPositions / this.currentStory.parts.length) * 100);
    },

    render() {
        const display = document.getElementById('storySequencerDisplay');
        if (!display) return;
        
        const availableParts = this.shuffledParts.filter(part => !this.userSequence.includes(part));
        
        display.innerHTML = `
            <div class="story-sequencer-content">
                <div class="sequencer-title">
                    <h4>${this.currentStory.title}</h4>
                </div>
                
                <div class="user-sequence">
                    <h5>Your Story Order:</h5>
                    <div class="sequence-container">
                        ${this.userSequence.length === 0 ? '<p class="empty-state">Click parts below to build your story...</p>' : ''}
                        ${this.userSequence.map((part, index) => `
                            <div class="sequence-part placed" onclick="storySequencerGame.removeFromSequence(${index})">
                                <span class="part-number">${index + 1}</span>
                                <p>${part}</p>
                                <span class="remove-icon">✕</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="available-parts">
                    <h5>Available Parts:</h5>
                    <div class="parts-container">
                        ${availableParts.map((part) => {
                            const originalIndex = this.shuffledParts.indexOf(part);
                            return `
                                <div class="sequence-part" onclick="storySequencerGame.addToSequence(${originalIndex})">
                                    <p>${part}</p>
                                    <span class="add-icon">+</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                ${this.userSequence.length === this.currentStory.parts.length ? `
                    <button class="btn btn-primary btn-large" onclick="storySequencerGame.checkSequence()">
                        Check My Story
                    </button>
                ` : ''}
            </div>
        `;
    }
};

// ============================================
// COLORING SYSTEM
// ============================================
const coloringSystem = {
    canvas: null,
    ctx: null,
    currentImage: null,
    currentColor: '#FF6B6B',
    isColoring: false,
    showingExample: false,
    
    templates: {
        lion: {
            name: 'Lion',
            svgPath: `
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <!-- Mane -->
                    <circle cx="200" cy="180" r="90" fill="REGION_0" stroke="#000" stroke-width="2"/>
                    <circle cx="160" cy="140" r="25" fill="REGION_0" stroke="#000" stroke-width="2"/>
                    <circle cx="240" cy="140" r="25" fill="REGION_0" stroke="#000" stroke-width="2"/>
                    <circle cx="140" cy="180" r="25" fill="REGION_0" stroke="#000" stroke-width="2"/>
                    <circle cx="260" cy="180" r="25" fill="REGION_0" stroke="#000" stroke-width="2"/>
                    <circle cx="150" cy="220" r="25" fill="REGION_0" stroke="#000" stroke-width="2"/>
                    <circle cx="250" cy="220" r="25" fill="REGION_0" stroke="#000" stroke-width="2"/>
                    
                    <!-- Face -->
                    <circle cx="200" cy="180" r="60" fill="REGION_1" stroke="#000" stroke-width="2"/>
                    
                    <!-- Eyes -->
                    <circle cx="185" cy="170" r="8" fill="#000"/>
                    <circle cx="215" cy="170" r="8" fill="#000"/>
                    <circle cx="187" cy="168" r="3" fill="#fff"/>
                    <circle cx="217" cy="168" r="3" fill="#fff"/>
                    
                    <!-- Nose -->
                    <path d="M 200 185 L 195 195 L 205 195 Z" fill="#000"/>
                    
                    <!-- Mouth -->
                    <path d="M 200 195 Q 190 200 180 195" stroke="#000" stroke-width="2" fill="none"/>
                    <path d="M 200 195 Q 210 200 220 195" stroke="#000" stroke-width="2" fill="none"/>
                    
                    <!-- Body -->
                    <ellipse cx="200" cy="290" rx="70" ry="80" fill="REGION_2" stroke="#000" stroke-width="2"/>
                    
                    <!-- Front Legs -->
                    <rect x="170" y="340" width="25" height="50" rx="5" fill="REGION_3" stroke="#000" stroke-width="2"/>
                    <rect x="205" y="340" width="25" height="50" rx="5" fill="REGION_4" stroke="#000" stroke-width="2"/>
                    
                    <!-- Back Legs -->
                    <ellipse cx="160" cy="350" rx="20" ry="35" fill="REGION_5" stroke="#000" stroke-width="2"/>
                    <ellipse cx="240" cy="350" rx="20" ry="35" fill="REGION_6" stroke="#000" stroke-width="2"/>
                    
                    <!-- Tail -->
                    <path d="M 260 310 Q 300 320 310 280" stroke="REGION_7" stroke-width="8" fill="none" stroke-linecap="round"/>
                    <circle cx="310" cy="280" r="12" fill="REGION_0" stroke="#000" stroke-width="2"/>
                </svg>
            `,
            regions: [
                { id: 0, name: 'Mane', exampleColor: '#CD853F' },
                { id: 1, name: 'Face', exampleColor: '#F4A460' },
                { id: 2, name: 'Body', exampleColor: '#DAA520' },
                { id: 3, name: 'Front Left Leg', exampleColor: '#DAA520' },
                { id: 4, name: 'Front Right Leg', exampleColor: '#DAA520' },
                { id: 5, name: 'Back Left Leg', exampleColor: '#CD853F' },
                { id: 6, name: 'Back Right Leg', exampleColor: '#CD853F' },
                { id: 7, name: 'Tail', exampleColor: '#CD853F' }
            ]
        },
        elephant: {
            name: 'Elephant',
            svgPath: `
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <!-- Body -->
                    <ellipse cx="220" cy="250" rx="100" ry="80" fill="REGION_0" stroke="#000" stroke-width="2"/>
                    
                    <!-- Head -->
                    <circle cx="180" cy="180" r="65" fill="REGION_1" stroke="#000" stroke-width="2"/>
                    
                    <!-- Ears -->
                    <ellipse cx="140" cy="160" rx="35" ry="55" fill="REGION_2" stroke="#000" stroke-width="2"/>
                    <ellipse cx="220" cy="160" rx="35" ry="55" fill="REGION_3" stroke="#000" stroke-width="2"/>
                    
                    <!-- Trunk -->
                    <path d="M 180 210 Q 170 250 160 290 Q 155 310 165 320" 
                          stroke="REGION_4" stroke-width="25" fill="none" stroke-linecap="round"/>
                    
                    <!-- Trunk end -->
                    <circle cx="165" cy="320" r="12" fill="REGION_4" stroke="#000" stroke-width="2"/>
                    
                    <!-- Eyes -->
                    <circle cx="170" cy="170" r="6" fill="#000"/>
                    <circle cx="172" cy="168" r="2" fill="#fff"/>
                    
                    <!-- Tusks -->
                    <path d="M 160 200 Q 140 210 135 225" stroke="#FFFFF0" stroke-width="6" fill="none" stroke-linecap="round"/>
                    <path d="M 175 205 Q 155 215 150 230" stroke="#FFFFF0" stroke-width="6" fill="none" stroke-linecap="round"/>
                    
                    <!-- Legs -->
                    <rect x="170" y="310" width="30" height="70" rx="8" fill="REGION_5" stroke="#000" stroke-width="2"/>
                    <rect x="210" y="310" width="30" height="70" rx="8" fill="REGION_6" stroke="#000" stroke-width="2"/>
                    <rect x="250" y="310" width="30" height="70" rx="8" fill="REGION_7" stroke="#000" stroke-width="2"/>
                    <rect x="290" y="310" width="30" height="70" rx="8" fill="REGION_8" stroke="#000" stroke-width="2"/>
                    
                    <!-- Tail -->
                    <path d="M 310 250 Q 340 260 350 240" stroke="#708090" stroke-width="4" fill="none"/>
                </svg>
            `,
            regions: [
                { id: 0, name: 'Body', exampleColor: '#808080' },
                { id: 1, name: 'Head', exampleColor: '#808080' },
                { id: 2, name: 'Left Ear', exampleColor: '#696969' },
                { id: 3, name: 'Right Ear', exampleColor: '#696969' },
                { id: 4, name: 'Trunk', exampleColor: '#808080' },
                { id: 5, name: 'Leg 1', exampleColor: '#696969' },
                { id: 6, name: 'Leg 2', exampleColor: '#696969' },
                { id: 7, name: 'Leg 3', exampleColor: '#696969' },
                { id: 8, name: 'Leg 4', exampleColor: '#696969' }
            ]
        },
        tree: {
            name: 'Tree',
            svgPath: `
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <!-- Trunk -->
                    <rect x="170" y="200" width="60" height="180" rx="5" fill="REGION_0" stroke="#000" stroke-width="2"/>
                    
                    <!-- Tree rings on trunk -->
                    <ellipse cx="200" cy="250" rx="25" ry="15" fill="none" stroke="#654321" stroke-width="1" opacity="0.5"/>
                    <ellipse cx="200" cy="300" rx="28" ry="18" fill="none" stroke="#654321" stroke-width="1" opacity="0.5"/>
                    
                    <!-- Bottom leaves -->
                    <ellipse cx="200" cy="200" rx="100" ry="60" fill="REGION_1" stroke="#000" stroke-width="2"/>
                    
                    <!-- Middle leaves -->
                    <ellipse cx="200" cy="150" rx="90" ry="55" fill="REGION_2" stroke="#000" stroke-width="2"/>
                    
                    <!-- Top leaves -->
                    <ellipse cx="200" cy="100" rx="75" ry="50" fill="REGION_3" stroke="#000" stroke-width="2"/>
                    
                    <!-- Top of tree -->
                    <circle cx="200" cy="70" r="35" fill="REGION_4" stroke="#000" stroke-width="2"/>
                    
                    <!-- Roots -->
                    <path d="M 170 380 Q 140 390 120 385" stroke="REGION_5" stroke-width="8" fill="none" stroke-linecap="round"/>
                    <path d="M 230 380 Q 260 390 280 385" stroke="REGION_6" stroke-width="8" fill="none" stroke-linecap="round"/>
                    
                    <!-- Ground -->
                    <rect x="0" y="380" width="400" height="20" fill="#8B7355" opacity="0.3"/>
                </svg>
            `,
            regions: [
                { id: 0, name: 'Trunk', exampleColor: '#8B4513' },
                { id: 1, name: 'Bottom Leaves', exampleColor: '#228B22' },
                { id: 2, name: 'Middle Leaves', exampleColor: '#32CD32' },
                { id: 3, name: 'Top Leaves', exampleColor: '#90EE90' },
                { id: 4, name: 'Tree Top', exampleColor: '#98FB98' },
                { id: 5, name: 'Left Root', exampleColor: '#654321' },
                { id: 6, name: 'Right Root', exampleColor: '#654321' }
            ]
        }
    },
    
    coloredRegions: {},
    
    selectImage(imageType) {
        this.currentImage = imageType;
        this.coloredRegions = {};
        this.openColoringCanvas();
    },
    
    openColoringCanvas() {
        const modal = document.getElementById('gameModal');
        const title = document.getElementById('gameTitle');
        const container = document.getElementById('gameContainer');
        
        title.textContent = `Color the ${this.templates[this.currentImage].name}`;
        
        container.innerHTML = `
            <div class="coloring-game-container">
                <div class="coloring-tools">
                    <h4>Select Color:</h4>
                    <div class="color-palette">
                        <div class="color-swatch" style="background: #FF0000" onclick="coloringSystem.selectColor('#FF0000')" title="Red"></div>
                        <div class="color-swatch" style="background: #FFA500" onclick="coloringSystem.selectColor('#FFA500')" title="Orange"></div>
                        <div class="color-swatch" style="background: #FFFF00" onclick="coloringSystem.selectColor('#FFFF00')" title="Yellow"></div>
                        <div class="color-swatch" style="background: #00FF00" onclick="coloringSystem.selectColor('#00FF00')" title="Green"></div>
                        <div class="color-swatch" style="background: #0000FF" onclick="coloringSystem.selectColor('#0000FF')" title="Blue"></div>
                        <div class="color-swatch" style="background: #800080" onclick="coloringSystem.selectColor('#800080')" title="Purple"></div>
                        <div class="color-swatch" style="background: #FFC0CB" onclick="coloringSystem.selectColor('#FFC0CB')" title="Pink"></div>
                        <div class="color-swatch" style="background: #8B4513" onclick="coloringSystem.selectColor('#8B4513')" title="Brown"></div>
                        <div class="color-swatch" style="background: #808080" onclick="coloringSystem.selectColor('#808080')" title="Gray"></div>
                        <div class="color-swatch" style="background: #000000" onclick="coloringSystem.selectColor('#000000')" title="Black"></div>
                        <div class="color-swatch" style="background: #FFFFFF; border: 2px solid #ccc;" onclick="coloringSystem.selectColor('#FFFFFF')" title="White"></div>
                        <div class="color-swatch" style="background: #A52A2A" onclick="coloringSystem.selectColor('#A52A2A')" title="Dark Brown"></div>
                    </div>
                    <div class="custom-color-picker">
                        <label>Custom Color:</label>
                        <input type="color" id="customColorPicker" value="#FF6B6B" onchange="coloringSystem.selectColor(this.value)">
                    </div>
                    <div class="current-color-display">
                        <span>Current Color:</span>
                        <div class="current-color-box" id="currentColorBox" style="background: #FF6B6B; border: 2px solid #333;"></div>
                    </div>
                </div>
                <div class="coloring-canvas-wrapper">
                    <div id="coloringDisplay" style="width: 100%; max-width: 500px; margin: 0 auto;">
                        <!-- SVG will be inserted here -->
                    </div>
                    <div class="coloring-instructions">
                        <p><strong>Click on different parts to color them!</strong></p>
                        <p style="font-size: 0.9em; color: #666;">Each part can be colored separately. Choose your colors and make it beautiful!</p>
                    </div>
                </div>
                <div class="coloring-actions">
                    <button class="btn btn-secondary" onclick="coloringSystem.reset()" style="background: #dc3545; color: white;">
                        <i class="fas fa-undo"></i> Reset
                    </button>
                    <button class="btn btn-info" onclick="coloringSystem.toggleExample()" style="background: #17a2b8; color: white;">
                        <i class="fas fa-eye"></i> <span id="exampleBtnText">Show Example</span>
                    </button>
                    <button class="btn btn-primary" onclick="coloringSystem.save()">
                        <i class="fas fa-save"></i> Save Artwork
                    </button>
                    <button class="btn btn-secondary" onclick="closeGameModal()" style="background: #6c757d; color: white;">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
        
        setTimeout(() => {
            this.renderSVG();
        }, 100);
    },
    
    renderSVG() {
        const display = document.getElementById('coloringDisplay');
        if (!display) return;
        
        const template = this.templates[this.currentImage];
        let svg = template.svgPath;
        
        // Replace region placeholders with current colors or white
        template.regions.forEach(region => {
            const color = this.showingExample ? region.exampleColor : (this.coloredRegions[region.id] || '#FFFFFF');
            svg = svg.replace(`REGION_${region.id}`, color);
        });
        
        display.innerHTML = svg;
        
        // Add click handlers to SVG elements
        const svgElement = display.querySelector('svg');
        if (svgElement) {
            svgElement.style.cursor = 'pointer';
            svgElement.style.maxWidth = '100%';
            svgElement.style.height = 'auto';
            
            // Add click event to the SVG
            svgElement.addEventListener('click', (e) => {
                if (this.showingExample) {
                    showNotification('Exit example mode to color!', 'info');
                    return;
                }
                
                // Find which region was clicked
                const target = e.target;
                const fillColor = target.getAttribute('fill');
                
                // Check if this element belongs to a region
                template.regions.forEach(region => {
                    const currentColor = this.coloredRegions[region.id] || '#FFFFFF';
                    if (fillColor === currentColor || target.getAttribute('stroke') === currentColor) {
                        this.coloredRegions[region.id] = this.currentColor;
                        this.renderSVG();
                        showNotification(`Colored ${region.name}!`, 'success');
                    }
                });
            });
        }
    },
    
    toggleExample() {
        this.showingExample = !this.showingExample;
        const btnText = document.getElementById('exampleBtnText');
        
        if (this.showingExample) {
            btnText.textContent = 'Hide Example';
            showNotification('This is how it should look! Click "Hide Example" to continue coloring.', 'info');
        } else {
            btnText.textContent = 'Show Example';
        }
        
        this.renderSVG();
    },
    
    selectColor(color) {
        this.currentColor = color;
        const colorBox = document.getElementById('currentColorBox');
        if (colorBox) {
            colorBox.style.background = color;
        }
        const customPicker = document.getElementById('customColorPicker');
        if (customPicker) {
            customPicker.value = color;
        }
    },
    
    reset() {
        if (confirm('Are you sure you want to reset your coloring? This will erase all your colors.')) {
            this.coloredRegions = {};
            this.showingExample = false;
            const btnText = document.getElementById('exampleBtnText');
            if (btnText) btnText.textContent = 'Show Example';
            this.renderSVG();
            showNotification('Canvas reset! Start coloring again.', 'info');
        }
    },
    
    save() {
        appState.userProgress.artworksCreated++;
        updateProgressDisplay();
        saveUserProgress();
        
        // Get the SVG element
        const svgElement = document.querySelector('#coloringDisplay svg');
        if (!svgElement) return;
        
        // Convert SVG to data URL
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);
        
        // Create canvas to convert to PNG
        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');
        
        const img = new Image();
        img.onload = () => {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            const dataURL = canvas.toDataURL('image/png');
            
            // Download
            const link = document.createElement('a');
            link.download = `${this.currentImage}_colored_${Date.now()}.png`;
            link.href = dataURL;
            link.click();
            
            showNotification('Artwork saved successfully!', 'success');
            
            // Save to user artworks
            appState.userArtworks.push({
                id: Date.now(),
                title: `Colored ${this.templates[this.currentImage].name}`,
                artist: 'You',
                type: 'Coloring',
                date: new Date().toLocaleDateString(),
                dataURL: dataURL
            });
            
            populateArtworkGallery();
            URL.revokeObjectURL(url);
        };
        
        img.src = url;
    }
};

// ============================================
// LIKE SYSTEM FOR COMMUNITY
// ============================================
const likeSystem = {
    likes: {},
    
    init() {
        const savedLikes = localStorage.getItem('communityLikes');
        if (savedLikes) {
            this.likes = JSON.parse(savedLikes);
        }
    },
    
    toggleLike(itemId) {
        if (this.likes[itemId]) {
            delete this.likes[itemId];
        } else {
            this.likes[itemId] = true;
        }
        
        this.save();
        this.updateUI(itemId);
    },
    
    isLiked(itemId) {
        return !!this.likes[itemId];
    },
    
    save() {
        localStorage.setItem('communityLikes', JSON.stringify(this.likes));
    },
    
    updateUI(itemId) {
        const heartIcon = document.querySelector(`[data-item-id="${itemId}"] .like-button i`);
        if (heartIcon) {
            if (this.isLiked(itemId)) {
                heartIcon.style.color = '#FF0000';
                heartIcon.className = 'fas fa-heart';
            } else {
                heartIcon.style.color = '#666';
                heartIcon.className = 'far fa-heart';
            }
        }
    }
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadUserProgress();
    populateStories();
    populateCommunityContent();
    audioSystem.init();
    likeSystem.init();
    premiumSystem.init();
    setupCardFormatting();
    setupPaymentForm();
});

function setupPaymentForm() {
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', processPayment);
    }
}

function initializeApp() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = appState.currentLanguage;
    }
    
    showSection('home');
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('href').substring(1);
            navigateToSection(section);
        });
    });

    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            appState.currentLanguage = this.value;
            updateLanguage();
        });
    }

    const storyLanguageFilter = document.getElementById('storyLanguageFilter');
    if (storyLanguageFilter) {
        storyLanguageFilter.addEventListener('change', filterStories);
    }

    const storyCategoryFilter = document.getElementById('storyCategoryFilter');
    if (storyCategoryFilter) {
        storyCategoryFilter.addEventListener('change', filterStories);
    }

    const activityTabs = document.querySelectorAll('.activity-tab');
    activityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const activity = this.getAttribute('data-activity');
            switchActivity(activity);
        });
    });

    const communityTabs = document.querySelectorAll('.community-tab');
    communityTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchCommunityTab(tabName);
        });
    });

    setupDrawingCanvas();
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================
function navigateToSection(sectionName) {
    showSection(sectionName);
    updateNavigation(sectionName);
}

function showSection(sectionName) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        appState.currentSection = sectionName;
    }
}

function updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    const activeLink = document.querySelector(`[href="#${activeSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function updateLanguage() {
    console.log(`Language changed to: ${appState.currentLanguage}`);
    populateStories();
}

// ============================================
// STORY FUNCTIONS
// ============================================
function populateStories() {
    const storiesGrid = document.getElementById('storiesGrid');
    if (!storiesGrid) return;

    storiesGrid.innerHTML = '';
    
    let storiesToShow = [];
    
    if (appState.currentLanguage === 'en') {
        Object.values(storiesDatabase).forEach(languageStories => {
            storiesToShow.push(...languageStories);
        });
    } else {
        storiesToShow.push(...storiesDatabase[appState.currentLanguage] || []);
        storiesToShow.push(...storiesDatabase.en);
    }

    storiesToShow.forEach(story => {
        const storyCard = createStoryCard(story);
        storiesGrid.appendChild(storyCard);
    });
}

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
        const pageText = appState.currentStory.content[currentPage];
        text.textContent = pageText;
        
        audioSystem.speak(pageText);
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
    
    audioSystem.stop();
    
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
    
    if (languageFilter === 'all') {
        Object.values(storiesDatabase).forEach(languageStories => {
            storiesToShow.push(...languageStories);
        });
    } else {
        storiesToShow.push(...(storiesDatabase[languageFilter] || []));
    }

    if (categoryFilter !== 'all') {
        storiesToShow = storiesToShow.filter(story => story.category === categoryFilter);
    }

    storiesToShow.forEach(story => {
        const storyCard = createStoryCard(story);
        storiesGrid.appendChild(storyCard);
    });
}

// ============================================
// AUDIO FUNCTIONS
// ============================================
function toggleAudio() {
    audioSystem.toggle();
}

// ============================================
// GAME FUNCTIONS
// ============================================
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
            wordScrambleGame.start();
            break;
        case 'story-sequencer':
            title.textContent = 'Story Sequencer Game';
            container.innerHTML = createStorySequencerGame();
            const allStories = [];
            Object.values(storiesDatabase).forEach(langStories => {
                allStories.push(...langStories);
            });
            const randomStoryId = Math.floor(Math.random() * 2) + 1;
            storySequencerGame.start(randomStoryId);
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
    
    const startBtn = document.querySelector('.memory-game .btn-primary');
    if (startBtn) {
        startBtn.textContent = 'Game in Progress...';
        startBtn.disabled = true;
    }
}

function resetMemoryGame() {
    clearInterval(gameState.memory.timer);
    initializeMemoryGame();
    const startBtn = document.querySelector('.memory-game .btn-primary');
    if (startBtn) {
        startBtn.textContent = 'Start Game';
        startBtn.disabled = false;
    }
}

function endMemoryGame() {
    gameState.memory.isActive = false;
    clearInterval(gameState.memory.timer);
    
    const endTime = Date.now();
    const duration = Math.floor((endTime - gameState.memory.startTime) / 1000);
    
    appState.userProgress.gamesPlayed++;
    updateProgressDisplay();
    saveUserProgress();
    
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
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    const puzzleSlots = document.querySelectorAll('.puzzle-slot');
    
    puzzlePieces.forEach(piece => {
        piece.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.innerHTML);
            e.target.style.opacity = '0.5';
        });
        
        piece.addEventListener('dragend', (e) => {
            e.target.style.opacity = '1';
        });
    });
    
    puzzleSlots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
            slot.style.background = '#e0e0e0';
        });
        
        slot.addEventListener('dragleave', () => {
            slot.style.background = '';
        });
        
        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.style.background = '';
            const data = e.dataTransfer.getData('text/plain');
            slot.innerHTML = data;
            
            const allFilled = Array.from(puzzleSlots).every(s => s.innerHTML !== '');
            if (allFilled) {
                setTimeout(endPuzzleGame, 500);
            }
        });
    });
}

function endPuzzleGame() {
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
                    <button class="quiz-option" onclick="checkAnswer('speed')">A. His speed</button>
                    <button class="quiz-option" onclick="checkAnswer('cleverness')">B. His cleverness</button>
                    <button class="quiz-option" onclick="checkAnswer('strength')">C. His strength</button>
                    <button class="quiz-option" onclick="checkAnswer('size')">D. His size</button>
                </div>
            </div>
        </div>
    `;
}

function initializeQuizGame() {
    // Quiz is ready to play
}

function checkAnswer(answer) {
    if (answer === 'cleverness') {
        showNotification('Correct! The tortoise used his cleverness to win the race! 🎉', 'success');
        setTimeout(() => {
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
        }, 2000);
    } else {
        showNotification('Try again! Think about what made the tortoise special.', 'error');
    }
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
    // Basic coloring game
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
            </div>
            <div class="game-controls">
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
            <p>Click story parts to arrange them in the correct sequence!</p>
            <div id="storySequencerDisplay">
            </div>
        </div>
    `;
}

function closeGameModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('active');
}

// ============================================
// ACTIVITY FUNCTIONS
// ============================================
function switchActivity(activityName) {
    const activityTabs = document.querySelectorAll('.activity-tab');
    activityTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTab = document.querySelector(`[data-activity="${activityName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    const activityPanels = document.querySelectorAll('.activity-panel');
    activityPanels.forEach(panel => {
        panel.classList.remove('active');
    });

    const targetPanel = document.getElementById(activityName);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

// ============================================
// DRAWING CANVAS FUNCTIONS
// ============================================
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

        const currentTool = document.querySelector('.tool-btn.active')?.getAttribute('data-tool') || 'pencil';
        const color = document.getElementById('colorPicker')?.value || '#000000';
        const size = document.getElementById('brushSize')?.value || 5;

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

// ============================================
// COLORING IMAGE SELECTION
// ============================================
function selectColoringImage(imageType) {
    coloringSystem.selectImage(imageType);
}

// ============================================
// STORY CREATION FUNCTIONS
// ============================================
function saveStory() {
    const title = document.getElementById('storyTitle').value;
    const language = document.getElementById('storyLanguage').value;
    const content = document.getElementById('storyContent').value;

    if (!title || !content) {
        showNotification('Please fill in both title and story content!', 'error');
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
    
    document.getElementById('storyTitle').value = '';
    document.getElementById('storyContent').value = '';
    
    showNotification('Story saved successfully! You can view it in the Community section.', 'success');
    
    populateCommunityContent();
}

// ============================================
// COMMUNITY FUNCTIONS
// ============================================
function switchCommunityTab(tabName) {
    const communityTabs = document.querySelectorAll('.community-tab');
    communityTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    const communityPanels = document.querySelectorAll('.community-panel');
    communityPanels.forEach(panel => {
        panel.classList.remove('active');
    });

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

    appState.userStories.forEach(story => {
        const storyCard = createCommunityStoryCard(story);
        sharedStoriesGrid.appendChild(storyCard);
    });

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
    card.setAttribute('data-item-id', story.id);
    card.style.cursor = 'pointer';
    
    const isLiked = likeSystem.isLiked(story.id);
    
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
                <button class="like-button" style="background: none; border: none; cursor: pointer; padding: 5px 10px;">
                    <i class="${isLiked ? 'fas' : 'far'} fa-heart" style="color: ${isLiked ? '#FF0000' : '#666'}"></i> Like
                </button>
            </div>
        </div>
    `;
    
    // Add click event to the card itself
    card.addEventListener('click', function(e) {
        // Don't open if clicking the like button
        if (e.target.closest('.like-button')) {
            return;
        }
        openCommunityStory(story.id);
    });
    
    // Add click event to the like button
    const likeButton = card.querySelector('.like-button');
    if (likeButton) {
        likeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            likeSystem.toggleLike(story.id);
        });
    }

    return card;
}

function populateArtworkGallery() {
    const artworkGallery = document.getElementById('artworkGallery');
    if (!artworkGallery) return;

    artworkGallery.innerHTML = '';

    appState.userArtworks.forEach(artwork => {
        const artworkCard = createArtworkCard(artwork);
        artworkGallery.appendChild(artworkCard);
    });

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
    card.setAttribute('data-item-id', artwork.id);
    card.style.cursor = 'pointer';
    
    const isLiked = likeSystem.isLiked(artwork.id);
    
    card.innerHTML = `
        <div class="story-image">
            ${artwork.dataURL ? `<img src="${artwork.dataURL}" alt="${artwork.title}" style="width: 100%; height: 100%; object-fit: cover;">` : '<i class="fas fa-palette"></i>'}
        </div>
        <div class="story-content">
            <h3 class="story-title">${artwork.title}</h3>
            <span class="story-language">${artwork.type}</span>
            <p class="story-description">By ${artwork.artist}</p>
            <div class="story-meta">
                <span>${artwork.date}</span>
                <button class="like-button" style="background: none; border: none; cursor: pointer; padding: 5px 10px;">
                    <i class="${isLiked ? 'fas' : 'far'} fa-heart" style="color: ${isLiked ? '#FF0000' : '#666'}"></i> Like
                </button>
            </div>
        </div>
    `;
    
    // Add click event to the card itself
    card.addEventListener('click', function(e) {
        // Don't open if clicking the like button
        if (e.target.closest('.like-button')) {
            return;
        }
        viewArtwork(artwork.id);
    });
    
    // Add click event to the like button
    const likeButton = card.querySelector('.like-button');
    if (likeButton) {
        likeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            likeSystem.toggleLike(artwork.id);
        });
    }

    return card;
}

// ============================================
// COMMUNITY STORY AND ARTWORK VIEWING
// ============================================
function openCommunityStory(storyId) {
    // Find story in user stories
    let story = appState.userStories.find(s => s.id == storyId);
    
    // If not found, create a sample story object
    if (!story) {
        const sampleStories = {
            'sample1': {
                id: 'sample1',
                title: 'The Friendly Elephant',
                author: 'Aisha',
                language: 'English',
                category: 'adventure',
                description: 'A heartwarming tale of a friendly elephant who helps the village.',
                content: [
                    "In a village near the great forest, there lived a friendly elephant named Tembo.",
                    "Tembo was loved by all the children because he would give them rides on his back.",
                    "One day, the village well dried up and everyone was worried about water.",
                    "Tembo remembered a hidden spring deep in the forest that his mother had shown him.",
                    "He led the villagers through the dense forest to the secret spring.",
                    "The villagers were so grateful that they built a special shelter for Tembo.",
                    "From that day on, Tembo became the village's guardian and best friend.",
                    "The children learned that true friendship means helping others in need."
                ],
                ageGroup: "5-8",
                readingTime: "5 min"
            },
            'sample2': {
                id: 'sample2',
                title: 'The Wise Old Tree',
                author: 'Kemi',
                language: 'English',
                category: 'folktale',
                description: 'An ancient tree shares wisdom with the forest animals.',
                content: [
                    "At the edge of the village stood an ancient baobab tree, older than anyone could remember.",
                    "The animals of the forest would come to the tree seeking wisdom and advice.",
                    "One day, a young monkey named Koko came crying to the tree.",
                    "Koko had lost his favorite toy and couldn't find it anywhere.",
                    "The wise tree rustled its leaves and spoke in a gentle voice.",
                    "It told Koko to retrace his steps and look carefully where he had been playing.",
                    "Koko followed the advice and found his toy hidden under some fallen leaves.",
                    "He learned that patience and careful thinking can solve many problems."
                ],
                ageGroup: "6-9",
                readingTime: "6 min"
            }
        };
        
        story = sampleStories[storyId];
    }
    
    if (story) {
        // Convert community story format to story modal format
        const storyForModal = {
            id: story.id,
            title: story.title,
            category: story.category || 'folktale',
            language: story.language || 'en',
            description: story.description || `A story by ${story.author}`,
            content: Array.isArray(story.content) ? story.content : [story.content],
            ageGroup: story.ageGroup || "5-10",
            readingTime: story.readingTime || "5 min"
        };
        
        openStory(storyForModal);
    }
}

function viewArtwork(artworkId) {
    // Find artwork
    let artwork = appState.userArtworks.find(a => a.id == artworkId);
    
    // If not found, check sample artworks
    if (!artwork) {
        const sampleArtworks = {
            'art1': {
                id: 'art1',
                title: 'Beautiful Sunset',
                artist: 'Zara',
                type: 'Drawing',
                date: '2024-01-20',
                description: 'A colorful sunset over the Nigerian landscape'
            },
            'art2': {
                id: 'art2',
                title: 'Forest Animals',
                artist: 'Bello',
                type: 'Coloring',
                date: '2024-01-18',
                description: 'Colorful animals from Nigerian forests'
            }
        };
        
        artwork = sampleArtworks[artworkId];
    }
    
    if (artwork) {
        // Open artwork in modal
        const modal = document.getElementById('gameModal');
        const title = document.getElementById('gameTitle');
        const container = document.getElementById('gameContainer');
        
        title.textContent = artwork.title;
        
        container.innerHTML = `
            <div class="artwork-viewer">
                <div class="artwork-display">
                    ${artwork.dataURL ? 
                        `<img src="${artwork.dataURL}" alt="${artwork.title}" style="max-width: 100%; max-height: 500px; border-radius: 10px;">` 
                        : 
                        '<div style="width: 400px; height: 400px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border-radius: 10px;"><i class="fas fa-palette" style="font-size: 100px; color: #ccc;"></i></div>'
                    }
                </div>
                <div class="artwork-info" style="margin-top: 20px; text-align: center;">
                    <h3>${artwork.title}</h3>
                    <p><strong>Artist:</strong> ${artwork.artist}</p>
                    <p><strong>Type:</strong> ${artwork.type}</p>
                    <p><strong>Date:</strong> ${artwork.date}</p>
                    ${artwork.description ? `<p>${artwork.description}</p>` : ''}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button class="btn btn-secondary" onclick="closeGameModal()">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    }
}

// ============================================
// PROGRESS FUNCTIONS
// ============================================
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

// ============================================
// UTILITY FUNCTIONS
// ============================================
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
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// MODAL FUNCTIONS
// ============================================
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

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeStoryModal();
        closeGameModal();
    }
    
    if (e.key === 'ArrowRight') {
        if (document.getElementById('storyModal')?.classList.contains('active')) {
            nextPage();
        }
    }
    
    if (e.key === 'ArrowLeft') {
        if (document.getElementById('storyModal')?.classList.contains('active')) {
            previousPage();
        }
    }
});

// ============================================
// PAYMENT SYSTEM AND PREMIUM FEATURES
// ============================================
const premiumSystem = {
    isActive: false,
    currentPlan: null,
    selectedPlan: null,
    
    plans: {
        basic: {
            name: 'Basic',
            price: 500,
            period: 'month',
            features: [
                'Access to 50+ stories',
                'Basic games',
                'Standard audio',
                'Community access',
                'Save progress'
            ]
        },
        premium: {
            name: 'Premium',
            price: 1200,
            period: 'month',
            features: [
                'Access to 200+ stories',
                'All games & activities',
                'Advanced audio features',
                'Priority support',
                'Ad-free experience',
                'Download stories offline',
                'Exclusive premium stories',
                'Custom avatars'
            ]
        },
        family: {
            name: 'Family',
            price: 2500,
            period: 'month',
            features: [
                'Up to 5 child accounts',
                'All Premium features',
                'Parent dashboard',
                'Progress tracking',
                'Custom content creation',
                '24/7 support',
                'Family challenges',
                'Parental controls'
            ]
        }
    },
    
    init() {
        this.loadSubscription();
        this.updatePremiumStatus();
    },
    
    loadSubscription() {
        const saved = localStorage.getItem('premiumSubscription');
        if (saved) {
            const data = JSON.parse(saved);
            this.isActive = data.isActive;
            this.currentPlan = data.currentPlan;
        }
    },
    
    saveSubscription() {
        localStorage.setItem('premiumSubscription', JSON.stringify({
            isActive: this.isActive,
            currentPlan: this.currentPlan,
            activatedDate: new Date().toISOString()
        }));
    },
    
    updatePremiumStatus() {
        const premiumBtn = document.querySelector('.btn-premium');
        if (premiumBtn) {
            if (this.isActive) {
                premiumBtn.innerHTML = '<i class="fas fa-crown"></i><span>Premium Active</span>';
                premiumBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            }
        }
    },
    
    activatePremium(planType) {
        this.isActive = true;
        this.currentPlan = planType;
        this.saveSubscription();
        this.updatePremiumStatus();
        showNotification(`${planType.charAt(0).toUpperCase() + planType.slice(1)} plan activated!`, 'success');
    }
};

// ============================================
// PAYMENT MODAL FUNCTIONS
// ============================================
function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (!modal) {
        showNotification('Payment system is loading...', 'info');
        return;
    }
    
    modal.style.display = 'block';
    
    // Reset to plans view
    document.querySelector('.subscription-plans').style.display = 'block';
    document.querySelector('.payment-section').style.display = 'none';
    document.querySelector('.payment-success').style.display = 'none';
    document.querySelector('.payment-error').style.display = 'none';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function selectPlan(planType, amount, period) {
    premiumSystem.selectedPlan = {
        planType: planType,
        planName: planType.charAt(0).toUpperCase() + planType.slice(1),
        amount: amount,
        period: period
    };
    
    // Update selected plan info
    document.getElementById('selectedPlanName').textContent = premiumSystem.selectedPlan.planName;
    document.getElementById('selectedPlanAmount').textContent = `₦${amount}/${period}`;
    
    // Show payment section
    document.querySelector('.subscription-plans').style.display = 'none';
    document.querySelector('.payment-section').style.display = 'block';
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

// ============================================
// FLUTTERWAVE PAYMENT PROCESSING
// ============================================
function processPayment(event) {
    event.preventDefault();
    
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const email = document.getElementById('paymentEmail').value;
    const phone = document.getElementById('paymentPhone').value;
    
    // Validate form
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
    
    // Show loading
    showNotification('Processing payment...', 'info');
    
    // Simulate payment processing (in production, use actual Flutterwave API)
    setTimeout(() => {
        simulateFlutterwavePayment(premiumSystem.selectedPlan, {
            name: cardName,
            email: email,
            phone: phone
        });
    }, 2000);
}

function simulateFlutterwavePayment(planData, customerData) {
    // In production, this would integrate with Flutterwave's actual API
    // For demo purposes, we'll simulate a successful payment
    
    const txRef = 'nigerianstories_' + Date.now();
    
    // Simulate API call delay
    const success = Math.random() > 0.1; // 90% success rate for demo
    
    if (success) {
        // Payment successful
        premiumSystem.activatePremium(planData.planType);
        showPaymentSuccess(planData);
        
        // Save transaction
        saveTransaction({
            txRef: txRef,
            plan: planData.planName,
            amount: planData.amount,
            date: new Date().toISOString(),
            status: 'successful'
        });
    } else {
        // Payment failed
        showPaymentError('Payment was declined. Please check your card details and try again.');
    }
}

function showPaymentSuccess(planData) {
    document.querySelector('.subscription-plans').style.display = 'none';
    document.querySelector('.payment-section').style.display = 'none';
    document.querySelector('.payment-error').style.display = 'none';
    
    const successDiv = document.getElementById('paymentSuccess');
    successDiv.style.display = 'block';
    
    document.getElementById('successPlanName').textContent = planData.planName + ' Plan';
    
    const featuresList = document.getElementById('successFeaturesList');
    const features = premiumSystem.plans[planData.planType].features;
    featuresList.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');
}

function showPaymentError(message) {
    document.querySelector('.subscription-plans').style.display = 'none';
    document.querySelector('.payment-section').style.display = 'none';
    document.querySelector('.payment-success').style.display = 'none';
    
    const errorDiv = document.getElementById('paymentError');
    errorDiv.style.display = 'block';
    
    document.getElementById('errorMessage').textContent = message;
}

function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.unshift(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions.slice(0, 20)));
}

// ============================================
// CARD FORMATTING
// ============================================
function setupCardFormatting() {
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
}

// ============================================
// SUBSCRIPTION MANAGEMENT
// ============================================
function openSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (!modal) return;
    
    modal.style.display = 'block';
    updateSubscriptionDisplay();
}

function closeSubscriptionModal() {
    const modal = document.getElementById('subscriptionModal');
    if (modal) modal.style.display = 'none';
}

function updateSubscriptionDisplay() {
    if (premiumSystem.isActive && premiumSystem.currentPlan) {
        const plan = premiumSystem.plans[premiumSystem.currentPlan];
        document.getElementById('currentPlanName').textContent = plan.name;
        document.getElementById('currentPlanStatus').textContent = 'Active';
        document.getElementById('currentPlanAmount').textContent = `₦${plan.price}`;
        
        const activatedDate = new Date();
        const nextBilling = new Date(activatedDate.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.getElementById('nextBillingDate').textContent = nextBilling.toLocaleDateString();
        
        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) cancelBtn.style.display = 'inline-block';
    }
    
    updateBillingHistory();
}

function updateBillingHistory() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const billingList = document.getElementById('billingList');
    
    if (!billingList) return;
    
    if (transactions.length === 0) {
        billingList.innerHTML = '<p>No billing history available.</p>';
        return;
    }
    
    billingList.innerHTML = transactions.map(tx => `
        <div class="billing-item">
            <div class="billing-date">${new Date(tx.date).toLocaleDateString()}</div>
            <div class="billing-plan">${tx.plan} Plan</div>
            <div class="billing-amount">₦${tx.amount}</div>
            <div class="billing-status ${tx.status}">${tx.status}</div>
        </div>
    `).join('');
}

function manageBilling() {
    openSubscriptionModal();
}

function cancelSubscription() {
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
        premiumSystem.isActive = false;
        premiumSystem.currentPlan = null;
        premiumSystem.saveSubscription();
        premiumSystem.updatePremiumStatus();
        
        showNotification('Subscription cancelled successfully', 'success');
        closeSubscriptionModal();
    }
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    if (modal) modal.style.display = 'none';
}

function closeSocialModal() {
    const modal = document.getElementById('socialModal');
    if (modal) modal.style.display = 'none';
}

function closeAudioModal() {
    const modal = document.getElementById('audioModal');
    if (modal) modal.style.display = 'none';
}

// ============================================
// PREMIUM BADGE DISPLAY
// ============================================
function showPremiumBadge() {
    if (premiumSystem.isActive) {
        const userName = document.getElementById('userName');
        if (userName && !userName.querySelector('.premium-badge')) {
            const badge = document.createElement('span');
            badge.className = 'premium-badge';
            badge.innerHTML = ' <i class="fas fa-crown" style="color: #FFD700; font-size: 0.8em;"></i>';
            userName.appendChild(badge);
        }
    }
}

// Update premium status when page loads
setTimeout(showPremiumBadge, 1000);

// ============================================
// EXPORT SYSTEMS FOR GLOBAL ACCESS
// ============================================
window.audioSystem = audioSystem;
window.wordScrambleGame = wordScrambleGame;
window.storySequencerGame = storySequencerGame;
window.coloringSystem = coloringSystem;
window.likeSystem = likeSystem;

console.log('Nigerian Stories App Loaded Successfully! 🎉');