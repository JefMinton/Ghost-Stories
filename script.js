// Story database with harrowing tales
const stories = [
    {
        text: "In 1587, the entire population of Roanoke Colony in Virginia vanished without explanation. When supply ships returned three years later, they found the settlement abandoned with only the word 'CROATOAN' carved into a post. No bodies were ever discovered, and the fate of over 100 colonists remains unknown to this day.",
        isTrue: true,
        details: "The Lost Colony of Roanoke is one of America's oldest unsolved mysteries. Governor John White returned from England in 1590 to find the colony deserted. Despite numerous theories ranging from assimilation with Native American tribes to Spanish attacks, no definitive evidence has ever been found to explain the disappearance."
    },
    {
        text: "During renovations of Edinburgh Castle in 2001, workers discovered a hidden chamber sealed since the 1650s. Inside was a journal belonging to a plague doctor, detailing his experimental treatments on victims. The final entry, dated the day before the chamber was sealed, simply read: 'The cure works, but at what cost? God forgive me, they are no longer human.'",
        isTrue: false,
        details: null
    },
    {
        text: "In 1872, the merchant ship Mary Celeste was found adrift in the Atlantic Ocean. The vessel was seaworthy, cargo intact, and personal belongings undisturbed, but all ten crew members and passengers had vanished. The ship's only lifeboat was missing, yet no distress signal was ever sent. The crew was never found.",
        isTrue: true,
        details: "The Mary Celeste is perhaps history's most famous ghost ship. Captain Benjamin Briggs, his family, and seven crew members disappeared without explanation. Theories range from piracy to underwater earthquakes, but official maritime investigations concluded the abandonment was deliberate, though no motive could be determined."
    },
    {
        text: "In 1911, three lighthouse keepers vanished from Flannan Isles in Scotland. Their colleagues found an untouched meal on the table, an overturned chair, and all three sets of waterproof gear missing—despite regulations requiring one keeper to remain inside at all times. A log entry mentioned a storm, but weather records show the day was calm.",
        isTrue: true,
        details: "The Flannan Isles mystery remains unsolved. The official investigation by the Northern Lighthouse Board found no evidence of foul play. Captain James Harvey reported finding two sets of oilskins missing, suggesting two men went outside, but the third keeper's absence remains unexplained. No bodies were recovered."
    },
    {
        text: "In Victorian London, Dr. Aldous Crowe operated an asylum in Whitechapel where patients reportedly died at an alarming rate. His notebooks, discovered during demolition in 1952, described attempts to 'separate the soul from its mortal vessel.' Scotland Yard found evidence of mass graves beneath the building, containing over 200 bodies.",
        isTrue: false,
        details: null
    },
    {
        text: "The Overtoun Bridge in Scotland has been the site of over 600 documented cases of dogs suddenly leaping to their deaths since the 1950s. The animals show no signs of distress before jumping, and always from the same spot on the right side of the bridge. Several dogs have survived and immediately attempted to jump again.",
        isTrue: true,
        details: "Overtoun Bridge's canine suicide phenomenon is well-documented by the Scottish SPCA. While paranormal theories abound, researchers believe minks nesting below the bridge emit a scent that dogs find irresistible, causing them to leap without seeing the drop. The frequency remains unusually high compared to similar structures."
    },
    {
        text: "During the renovation of Château de Brissac in France in 1897, workers unearthed a bricked-up room containing the skeletal remains of a woman in a green dress. Parish records revealed she was the illegitimate daughter of the Duke, murdered in 1462. Since the discovery, staff and visitors report seeing a woman in green wandering the halls, moaning softly.",
        isTrue: false,
        details: null
    },
    {
        text: "In 1945, five U.S. Navy bombers vanished during a routine training flight over the Bermuda Triangle. The lead pilot reported his compass malfunctioning and claimed they couldn't determine which way was west. Radio contact was lost, and no wreckage was ever found. A rescue plane sent to find them also disappeared with 13 crew members aboard.",
        isTrue: true,
        details: "Flight 19's disappearance remains one of the most documented incidents in the Bermuda Triangle. The Naval Board of Inquiry's original verdict blamed the flight leader's confusion and judgment, though this was later changed to 'causes unknown' due to family pressure. Despite extensive searches, neither the bombers nor the rescue plane were recovered."
    },
    {
        text: "In the catacombs beneath Paris, urban explorers in 2004 discovered a fully equipped cinema hidden in a restricted section, complete with a screen, seats carved from stone, and a bar. When authorities investigated three days later, everything had been removed except a note on the floor reading: 'Ne cherchez pas.' Do not search.",
        isTrue: true,
        details: "The underground cinema was discovered by Parisian police during a training exercise. The setup included professionally installed electrical systems, a stocked bar, and recent films. The group responsible, believed to be an underground art collective called 'Les UX,' has never been identified, and they continue operating in the catacombs."
    },
    {
        text: "Poveglia Island near Venice was used as a quarantine station during the Black Death, then as an asylum in the 1920s. The asylum's chief physician, Dr. Vicenzo Orsini, allegedly conducted lobotomies without anesthesia. In 1937, patients rioted and forced him from the bell tower. His ghost now rings the bell at midnight—despite the tower being dismantled in 1950.",
        isTrue: false,
        details: null
    },
    {
        text: "In 2007, the body of Elisa Lam was found in the water tank on the roof of the Cecil Hotel in Los Angeles. Security footage showed her behaving erratically in the elevator, pressing multiple buttons and appearing to hide from someone unseen. The roof access required a key, and the water tank's hatch was heavy enough to require two people to lift.",
        isTrue: true,
        details: "Elisa Lam's death was ruled accidental drowning with bipolar disorder as a significant factor. However, numerous questions remain about how she accessed the locked roof and climbed into the sealed tank. The elevator footage sparked widespread speculation, though experts suggest it's consistent with a mental health episode."
    },
    {
        text: "The Winchester Mystery House in California was built by Sarah Winchester, widow of the rifle magnate, who believed she was haunted by victims of Winchester rifles. A medium told her to continuously build rooms to confuse the spirits. Construction continued 24 hours a day for 38 years, creating staircases to nowhere and doors opening to walls.",
        isTrue: true,
        details: "Sarah Winchester's architectural oddity is a real mansion in San Jose. After her husband and infant daughter died, she allegedly consulted a medium who warned her of vengeful spirits. Whether she truly believed in the curse or was simply an eccentric architect is debated, but construction stopped only when she died in 1922."
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
