// Story database with harrowing tales
const stories = [
    {
        text: "In 1971, a family moved into a farmhouse in Harrisville, Rhode Island. They reported experiencing paranormal activity including furniture moving on its own, mysterious smells, and the appearance of spirits. The family claimed to be tormented by a malevolent entity for years until paranormal investigators Ed and Lorraine Warren helped them.",
        isTrue: true,
        details: "This is the true story of the Perron family, which inspired the 2013 horror film 'The Conjuring.' The family lived in the house for a decade, and Carolyn Perron reported being possessed by the spirit of Bathsheba Sherman, a 19th-century woman suspected of practicing witchcraft."
    },
    {
        text: "A Tokyo apartment building had to be demolished in 2019 after every tenant on the 13th floor reported seeing the same ghostly woman in traditional dress walking through their walls at exactly 3:33 AM. The city council determined it was safer to tear down the building than risk further incidents.",
        isTrue: false,
        details: null
    },
    {
        text: "In 1967, two volunteers at a church in Barbados opened a sealed tomb that hadn't been disturbed in decades. Inside, all eight lead coffins had moved from their original positions, some standing upright. The coffins were too heavy for one person to move, and there were no signs of forced entry or flooding.",
        isTrue: true,
        details: "The Chase Vault in Christ Church Parish Cemetery, Barbados, is a documented case. Between 1812 and 1820, the vault was opened several times for burials, and each time the coffins were found in disarray. The mystery remained unsolved, and the vault was eventually abandoned in 1820."
    },
    {
        text: "A cruise ship in the Caribbean Sea in 2015 had to return to port when passengers reported that mirrors in cabin 1408 would show reflections of people who weren't there. The ship's captain ordered all mirrors on that deck to be covered, but guests still complained of hearing voices behind the glass.",
        isTrue: false,
        details: null
    },
    {
        text: "In 1952, police in California investigated a case where a woman reported that invisible forces were attacking her. Officers witnessed objects flying through the air, and one officer was struck by a flying kitchen knife. The phenomenon continued for weeks and was documented in official police reports.",
        isTrue: true,
        details: "This is the case of Doris Bither, which occurred in Culver City, California, in 1974 (not 1952). The case was investigated by paranormal researchers Kerry Gaynor and Barry Taff, who photographed mysterious light phenomena in the house. The case inspired the 1982 film 'The Entity.'"
    },
    {
        text: "A lighthouse keeper in Maine vanished in 1988 after reporting in his log that he could hear tapping sounds coming from inside the lighthouse walls. His last entry read: 'They're in the walls. They want out.' His body was never found, but his logbook was discovered in a sealed room at the top of the lighthouse.",
        isTrue: false,
        details: null
    },
    {
        text: "In Romania in the 1970s, a photograph was taken at a military installation that appeared to show a disc-shaped UFO. The photo was classified by the government and only recently declassified. Military personnel at the base reported equipment malfunctions and missing time during the sighting.",
        isTrue: true,
        details: "Multiple UFO sightings were reported in Romania during the Cold War era, and the Romanian government did classify various UFO-related documents. However, specific details vary by case. The most famous Romanian UFO case occurred in Transylvania in the 1960s-70s, with photographs that remain unexplained."
    },
    {
        text: "A family in Scotland bought an antique mirror at an estate sale in 2012. Within days, their pets refused to enter the room where it hung. Family members reported feeling watched and seeing shadows move across the mirror's surface even when the room was empty. They eventually burned the mirror, and the activity stopped.",
        isTrue: false,
        details: null
    }
];

// Game state
let currentStoryIndex = 0;
let consecutiveScore = 0;
let usedStories = [];

// DOM elements
const storyText = document.getElementById('story-text');
const trueBtn = document.getElementById('true-btn');
const falseBtn = document.getElementById('false-btn');
const storySection = document.getElementById('story-section');
const revealSection = document.getElementById('reveal-section');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const detailsBox = document.getElementById('details-box');
const detailsText = document.getElementById('details-text');
const nextBtn = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score');

// Initialize game
function initGame() {
    currentStoryIndex = getRandomStoryIndex();
    displayStory();
}

// Get random story that hasn't been used recently
function getRandomStoryIndex() {
    let availableIndices = [];
    for (let i = 0; i < stories.length; i++) {
        if (!usedStories.includes(i)) {
            availableIndices.push(i);
        }
    }
    
    // If all stories have been used, reset
    if (availableIndices.length === 0) {
        usedStories = [];
        availableIndices = stories.map((_, index) => index);
    }
    
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    usedStories.push(randomIndex);
    
    // Keep only last 5 used stories to allow repetition after some time
    if (usedStories.length > 5) {
        usedStories.shift();
    }
    
    return randomIndex;
}

// Display current story
function displayStory() {
    const story = stories[currentStoryIndex];
    storyText.textContent = story.text;
    
    // Reset UI
    storySection.classList.remove('hidden');
    revealSection.classList.add('hidden');
    trueBtn.disabled = false;
    falseBtn.disabled = false;
}

// Handle answer
function handleAnswer(userAnswer) {
    const story = stories[currentStoryIndex];
    const isCorrect = userAnswer === story.isTrue;
    
    // Disable buttons
    trueBtn.disabled = true;
    falseBtn.disabled = true;
    
    // Update score
    if (isCorrect) {
        consecutiveScore++;
    } else {
        consecutiveScore = 0;
    }
    updateScore();
    
    // Show reveal section
    showReveal(isCorrect, story);
}

// Show reveal section
function showReveal(isCorrect, story) {
    storySection.classList.add('hidden');
    revealSection.classList.remove('hidden');
    
    // Set result
    if (isCorrect) {
        resultTitle.textContent = "✅ Correct!";
        resultTitle.className = "result-title correct";
        resultText.textContent = `You guessed correctly! This story is ${story.isTrue ? 'TRUE' : 'FALSE'}.`;
    } else {
        resultTitle.textContent = "❌ Incorrect";
        resultTitle.className = "result-title incorrect";
        resultText.textContent = `Sorry, that's wrong. This story is actually ${story.isTrue ? 'TRUE' : 'FALSE'}.`;
    }
    
    // Show details if it's a true story
    if (story.isTrue && story.details) {
        detailsBox.classList.remove('hidden');
        detailsText.textContent = story.details;
    } else {
        detailsBox.classList.add('hidden');
    }
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = consecutiveScore;
}

// Move to next story
function nextStory() {
    currentStoryIndex = getRandomStoryIndex();
    displayStory();
}

// Event listeners
trueBtn.addEventListener('click', () => handleAnswer(true));
falseBtn.addEventListener('click', () => handleAnswer(false));
nextBtn.addEventListener('click', nextStory);

// Start game
initGame();
