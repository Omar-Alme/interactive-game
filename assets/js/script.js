window.addEventListener('DOMContentLoaded', main);

// Game data
const planets = [{
        name: "Whispering Stones",
        description: "Strange rock formations cover the landscape.",
        story: "Legends say that the rocks whisper secrets of the universe, echoing the thoughts of ancient beings who once roamed this land. Travelers often report hearing faint voices carried by the wind, guiding them to hidden treasures and forgotten knowledge. The vibrant colors of the rocks shift with the time of day, creating a mesmerizing spectacle that draws explorers from across the galaxy.",
        voiceover: "/assets/media/sounds/alienVoice.mp3",
        items: [{
                name: "Oxygen Tank",
                image: "/assets/media/objects/oxygenTank.png"
            },
            {
                name: "Water Purifier",
                image: "/assets/media/objects/waterPurifier.png"
            }
        ],
        alien: "Zorg",
        secretPlace: {
            title: "Eerie Cave",
            description: "An eerie cave emitting strange noises.",
            film: "/assets/media/videos/A.mp4"
        },
        // backgroundImage: "/assets/media/Planets/planetA.png",
        backgroundImage: "/assets/media/Planets/whisperingStones.png"
    },
    {
        name: "Luminous Grove",
        description: "Lush forests with glowing plants.",
        story: "The glowing plants are said to be the tears of ancient spirits, weeping for the lost harmony of nature. As night falls, the forest transforms into a magical realm, illuminated by the soft glow of bioluminescent flora. It is believed that these plants hold the memories of the planet's past, and those who listen closely can hear the stories of the spirits that once thrived here, sharing wisdom and warnings to those who dare to explore.",
        voiceover: "/assets/media/sounds/alienVoice.mp3",
        items: [{
            name: "Fuel",
            image: "/assets/media/objects/fuel.png",
        }],
        alien: "Xylo",
        secretPlace: {
            title: "Whispering Waterfall",
            description: "A hidden waterfall that seems to whisper.",
            film: "/assets/media/videos/B.mp4"
        },
        // backgroundImage: "/assets/media/Planets/planetB.png",
        backgroundImage: "/assets/media/Planets/luminousGrove.png"
    },
    {
        name: "Crystal Dunes",
        description: "A vast desert with crystal sands.",
        story: "The crystals are remnants of a long-lost civilization, shimmering under the relentless sun. Each crystal is said to contain the essence of the people who once inhabited this land, their dreams and aspirations trapped within. As the wind sweeps across the dunes, it creates haunting melodies that tell tales of glory and despair. Adventurers who brave the desert often seek these crystals, hoping to unlock the secrets of the past and harness their power.",
        voiceover: "/assets/media/sounds/alienVoice.mp3",
        items: [{
            name: "Space Map",
            image: "/assets/media/objects/spaceMap.png",
        }],
        alien: "Quark",
        secretPlace: {
            title: "Ancient Ruins",
            description: "An ancient ruin with mysterious symbols.",
            film: "/assets/media/videos/C.mp4"
        },
        // backgroundImage: "/assets/media/Planets/planetC.png",
        backgroundImage: "/assets/media/Planets/crystalDunes.png"
    },
    {
        name: "Celestial Peaks",
        description: "Ice-covered mountains touch the sky.",
        story: "It is said that the mountains hold the memories of the stars, their icy peaks reflecting the cosmos in a breathtaking display. The air is filled with the sound of cracking ice, reminiscent of the whispers of celestial beings. Many believe that hidden within the glaciers are ancient artifacts that can reveal the history of the universe. Those who venture here often find themselves in a battle against the elements, but the rewards are said to be beyond imagination.",
        voiceover: "/assets/media/sounds/alienVoice.mp3",
        items: [{
            name: "Energy Crystal",
            image: "/assets/media/objects/energyCrystal.png",
        }],
        alien: "Frost",
        secretPlace: {
            title: "Frozen Lake",
            description: "A frozen lake that reflects other worlds.",
            film: "/assets/media/videos/D.mp4"
        },
        // backgroundImage: "/assets/media/Planets/planetD.png",
        backgroundImage: "/assets/media/Planets/celestialPeaks.png"
    },
    {
        name: "Inferno's Heart",
        description: "Volcanic plains with rivers of lava.",
        story: "The lava flows are believed to be the veins of a sleeping giant, pulsating with the life force of the planet. The air is thick with the scent of sulfur and the heat radiates from the ground, creating an otherworldly atmosphere. Legends tell of a time when the giant awoke, reshaping the landscape and bringing forth new life. Explorers often seek the heart of the volcano, hoping to witness the raw power of nature and uncover the secrets buried beneath the molten rock.",
        voiceover: "/assets/media/sounds/alienVoice.mp3",
        items: [{
            name: "Heat Shield",
            image: "/assets/media/objects/heatShield.png",
        }],
        alien: "Blaze",
        secretPlace: {
            title: "Fiery Cave",
            description: "A fiery cave with a pulsating glow.",
            film: "/assets/media/videos/E.mp4"
        },
        // backgroundImage: "/assets/media/Planets/planetE.png",
        backgroundImage: "/assets/media/Planets/infernoHeart.png"
    }
];

// State Variables
let currentPlanetIndex = parseInt(localStorage.getItem('currentPlanetIndex')) || -1;
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let playerName = localStorage.getItem('playerName') || "";
// Dialogue Overlay
const dialogueOverlay = document.getElementById('dialogue-overlay');
const dialogueContent = document.getElementById('dialogue-content');
const dialogueText = document.getElementById('dialogue-text');
const dialogueCloseBtn = document.getElementById('dialogue-close-btn');
// Input Overlay
const inputOverlay = document.getElementById('input-overlay');
const inputContent = document.getElementById('input-content');
const playerNameInput = document.getElementById('player-name-input');
const playerNameSubmitBtn = document.getElementById('player-name-submit-btn');
// Inventory Elements
const inventoryPanel = document.getElementById('inventory');
const inventoryList = document.getElementById('inventory-list');
const inventoryToggleBtn = document.getElementById('inventory-toggle-btn');
// Audio Elements
const pickupSound = document.getElementById("pickup-sound");
const travelSound = document.getElementById("travel-sound");
const jumpSound = document.getElementById("jump-sound");
const alienSound = document.getElementById("alien-sound");

// Game Main
const gameMain = document.getElementById('game-main');


/**
 * Initializes the game by setting up event listeners and handling initial state.
 */
function main() {
    inventoryToggle();
    initializeEventListeners();

    if (!playerName) {
        showOverlay(inputOverlay);
        playerNameInput.focus();
    } else if (currentPlanetIndex === -1) {
        // showPlanetSelection();
    } else {
        renderInventory();
        renderPlanet();
    }
}

// -------------------------------------------EVENTSLISTENERS
function initializeEventListeners() {

    // Close Dialogue
    dialogueCloseBtn.addEventListener('click', () => {
        hideOverlay(dialogueOverlay);
        if (travelSound) {
            travelSound.pause(); 
            travelSound.currentTime = 0;
        }

        if (alienSound) {
            alienSound.pause(); 
            alienSound.currentTime = 0;
        }

        // if (voiceover) {
        //     voiceover.pause(); 
        //     voiceover.currentTime = 0;
        // }
    });

    // Submit player Name
    playerNameSubmitBtn.addEventListener('click', submitPlayerName);


    // Keypress to submit player name
    playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            playerNameSubmitBtn.click();
        }
    });

    // Inventory toggle button
    inventoryToggleBtn.addEventListener('click', inventoryToggle);

}

// -------------------------------------------TOGGLE

function inventoryToggle() {
    // inventoryToggleBtn.classList.toggle('hidden');
    // inventoryList.classList.toggle('hidden');
    inventoryPanel.classList.toggle('visible');
}


// -------------------------------------------OVERLAYS
function showOverlay(overlay) {
    overlay.classList.add('visible');
}

function hideOverlay(overlay) {
    overlay.classList.remove('visible');
}


// -------------------------------------------SUBMIT PLAYERNAME
function submitPlayerName() {
    const name = playerNameInput.value.trim();
    if (name !== "") {
        playerName = name;
        localStorage.setItem('playerName', playerName);
        hideOverlay(inputOverlay);
        showPlanetSelection();
    } else {
        alert("Please Enter a valid name to start")
    }
}

// -------------------------------------------SHOW PLANET CHOICES
function showPlanetSelection() {

    const planetOptions = planets.map((planet, index) => `<option value="${index}">${planet.name}</option>`).join('');


    dialogueText.innerHTML = `
    <p>hmmm What a weird human name...</p>
    Anyways, Welcome to the outside ${playerName}! Please select a planet to explore first:</p>
        <select id="planet-select">
            ${planetOptions}
        </select>
        <br>
        <button id="confirm-planet-btn">Confirm Selection</button>
    `;
    showOverlay(dialogueOverlay);
    renderInventory();

    const confirmPlanetBtn = document.getElementById('confirm-planet-btn');
    confirmPlanetBtn.addEventListener('click', () => {
        const planetSelect = document.getElementById('planet-select');
        const selectedIndex = parseInt(planetSelect.value);
        if (!isNaN(selectedIndex)) {
            currentPlanetIndex = selectedIndex;
            localStorage.setItem('currentPlanetIndex', currentPlanetIndex);
            hideOverlay(dialogueOverlay);
            renderPlanet();
            renderInventory();
        } else {
            alert("Please select a valid planet.");
        }
    }, {
        once: true
    });
}

// -------------------------------------------RENDER INVENTORY LIST
function renderInventory() {
    inventoryList.innerHTML = "";
    if (inventory.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No items in inventory.";
        inventoryList.appendChild(li);
        return;
    }
    inventory.forEach(item => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.title = item.name;
        li.appendChild(img);
        const span = document.createElement("span");
        span.textContent = item.name;
        li.appendChild(span);
        inventoryList.appendChild(li);
    });

}



// -------------------------------------------RENDER PLANET 
function renderPlanet() {
    const planet = planets[currentPlanetIndex];

    gameMain.style.backgroundImage = `url('${planet.backgroundImage}')`;

    // Create plant Name
    const planetName = document.createElement('h2');
    planetName.id = 'planet-name';
    planetName.textContent = planet.name;


    // Create planet description
    const description = document.createElement('div');
    description.id = 'planet-description';
    description.textContent = planet.description;

    // Create Items Section
    const itemsSection = document.createElement('div');
    itemsSection.id = 'planet-items';

    if (planet.items && planet.items.length > 0) {
        planet.items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item');
            itemDiv.dataset.itemIndex = index;

            const itemImg = document.createElement('img');
            itemImg.src = item.image;

            const itemName = document.createElement('p');
            itemName.textContent = item.name;

            itemDiv.appendChild(itemImg);
            itemDiv.appendChild(itemName);

            // Click to pick up items
            itemDiv.addEventListener('click', () => {
                pickUpItem(index);
            });

            itemsSection.appendChild(itemDiv);
        });
    } else {
        itemsSection.textContent = "No items available on this planet.";
    }



    // ACTIONS BUTTON CONTAINER
    const actionButtons = document.createElement('div');
    actionButtons.classList.add('action-buttons');

    // Talk to alien button
    const talkAlienBtn = document.createElement('button');
    talkAlienBtn.textContent = `Talk to ${planet.alien}`;
    talkAlienBtn.addEventListener('click', talkToAlien);

    // Explore Planet Button
    const exploreBtn = document.createElement('button');
    exploreBtn.textContent = "Explore Planet";
    exploreBtn.addEventListener('click', explorePlanet);

    // Travel to Next Planet Button
    const travelBtn = document.createElement('button');
    travelBtn.textContent = "Travel to Next Planet";
    travelBtn.addEventListener('click', travelToNextPlanet);

    // Visit hidden spot
    const hiddenSpotBtn = document.createElement('button');
    hiddenSpotBtn.textContent = `Visit ${planet.secretPlace.title}`;
    hiddenSpotBtn.addEventListener('click', visitHiddenSpot);


    actionButtons.appendChild(exploreBtn);
    actionButtons.appendChild(travelBtn);
    actionButtons.appendChild(talkAlienBtn);
    actionButtons.appendChild(hiddenSpotBtn);


    // Add all elements to game area
    gameMain.innerHTML = '';
    gameMain.appendChild(planetName);
    gameMain.appendChild(description);
    gameMain.appendChild(itemsSection);
    gameMain.appendChild(actionButtons);
}


// -------------------------------------------TALK TO ALEIN
function talkToAlien() {
    const planet = planets[currentPlanetIndex];
    if (!planet || !planet.alien) {
        dialogueText.innerHTML = `<p>There is no one to talk to here.</p>`;
    } else {
        dialogueText.innerHTML = `<p>You meet ${planet.alien}, who shares mysterious knowledge.</p>`;

        if (alienSound) {
            alienSound.currentTime = 0;
            alienSound.play();
        }
    }
    showOverlay(dialogueOverlay);
}

// -------------------------------------------PICKUP ITEMS
function pickUpItem(itemIndex) {
    const planet = planets[currentPlanetIndex];
    // Remove the item from the planet
    const item = planet.items.splice(itemIndex, 1)[0];
    // Add the item to inventory
    inventory.push(item);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    localStorage.setItem('currentPlanetIndex', currentPlanetIndex);

    // Play pickup sound
    if (pickupSound) {
        pickupSound.currentTime = 0;
        pickupSound.play();
    }

    renderInventory();
    renderPlanet();

    // Show dialogue confirming item pickup
    dialogueText.innerHTML = `<p>You picked up: ${item.name}!</p>`;
    showOverlay(dialogueOverlay);
}


// -------------------------------------------EXPLOTE CURRENT PLANET
function explorePlanet() {
    const planet = planets[currentPlanetIndex];
    if (!planet || !planet.story) {
        dialogueText.innerHTML = `<p>There is nothing much to explore here.</p>`;
    } else {
        dialogueText.innerHTML = `<p>${planet.story}</p>`;

        // const voiceover = planet.voiceover; 
        // if (voiceover) {
        //     const audio = new Audio(voiceover);
        //     audio.play();
        // }
    }
    showOverlay(dialogueOverlay);
}

// -------------------------------------------TRAVEL TO NEXT PLANET
function travelToNextPlanet() {
    if (travelSound) {
        travelSound.currentTime = 0;
        travelSound.play();
    }

    // Check which planet we are at
    let nextPlanetIndex = currentPlanetIndex + 1;
    if (nextPlanetIndex >= planets.length) {
        // LOop back to first planet after all passed
        nextPlanetIndex = 0;
    }

    currentPlanetIndex = nextPlanetIndex;
    localStorage.setItem('currentPlanetIndex', currentPlanetIndex);

    renderPlanet();

    // Show a dialogue showign travel destination
    dialogueText.innerHTML = `<p>Traveling to ${planets[currentPlanetIndex].name}...</p>`;
    showOverlay(dialogueOverlay);
}

// -------------------------------------------------- VISTIT HIDDEN SPOT
function visitHiddenSpot(){
    const planet = planets[currentPlanetIndex];
    if (!planet || !planet.secretPlace.film) {
        dialogueText.innerHTML = `<p>There is no secret place to visit here.</p>`;
        showOverlay(dialogueOverlay);
        return;
    }

    // Create video elementt
    const video = document.createElement('video');
    video.id = 'dialogue-video';
    video.src = planet.secretPlace.film;
    video.controls = true;
    video.autoplay = true;

    const description = document.createElement('p');
    description.innerHTML = `You venture into the secret place: <br> ${planet.secretPlace.description}`;

    // Set dialogue content
    dialogueText.innerHTML = '';
    dialogueText.appendChild(description);
    dialogueText.appendChild(video);

    showOverlay(dialogueOverlay);
}