window.addEventListener('DOMContentLoaded', main);

'use strict';

// Game data
const planets = [{
        name: "Planet A",
        description: "Strange rock formations cover the landscape.",
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
        secretPlace: "An eerie cave emitting strange noises.",
        backgroundImage: "/assets/media/Planets/planetA.png"
    },
    {
        name: "Planet B",
        description: "Lush forests with glowing plants.",
        items: [{
            name: "Fuel",
            image: "/assets/media/objects/fuel.png",
            x: 350,
            y: 250
        }],
        alien: "Xylo",
        secretPlace: "A hidden waterfall that seems to whisper.",
        backgroundImage: "/assets/media/Planets/planetB.png"
    },
    {
        name: "Planet C",
        description: "A vast desert with crystal sands.",
        items: [{
            name: "Space Map",
            image: "/assets/media/objects/spaceMap.png",
            x: 200,
            y: 300
        }],
        alien: "Quark",
        secretPlace: "An ancient ruin with mysterious symbols.",
        backgroundImage: "/assets/media/Planets/planetC.png"
    },
    {
        name: "Planet D",
        description: "Ice-covered mountains touch the sky.",
        items: [{
            name: "Energy Crystal",
            image: "/assets/media/objects/energyCrystal.png",
            x: 250,
            y: 350
        }],
        alien: "Frost",
        secretPlace: "A frozen lake that reflects other worlds.",
        backgroundImage: "/assets/media/Planets/planetD.png"
    },
    {
        name: "Planet E",
        description: "Volcanic plains with rivers of lava.",
        items: [{
            name: "Heat Shield",
            image: "/assets/media/objects/heatShield.png",
            x: 300,
            y: 400
        }],
        alien: "Blaze",
        secretPlace: "A fiery cave with a pulsating glow.",
        backgroundImage: "/assets/media/Planets/planetE.png"
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
}



// -------------------------------------------RENDER PLANET 
function renderPlanet() {
    const planet = planets[currentPlanetIndex];
    
    gameMain.style.backgroundImage = `url('${planet.backgroundImage}')`;

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


    // Talk to alien button
    const talkAlienBtn = document.createElement('button');
    talkAlienBtn.textContent = `Talk to ${planet.alien}`;
    talkAlienBtn.style.marginTop = '20px';
    talkAlienBtn.style.padding = '10px 20px';
    talkAlienBtn.style.fontSize = '16px';
    talkAlienBtn.style.backgroundColor = '#444';
    talkAlienBtn.style.color = '#fff';
    talkAlienBtn.style.border = 'none';
    talkAlienBtn.style.borderRadius = '4px';
    talkAlienBtn.style.cursor = 'pointer';
    talkAlienBtn.style.transition = 'background-color 0.3s';

    talkAlienBtn.addEventListener('click', () => {
        talkToAlien();
    });

    talkAlienBtn.addEventListener('mouseenter', () => {
        talkAlienBtn.style.backgroundColor = '#666';
    });

    talkAlienBtn.addEventListener('mouseleave', () => {
        talkAlienBtn.style.backgroundColor = '#444';
    });
    // talkToAlien();

    // Add all elements to game area
    gameMain.innerHTML = '';
    gameMain.appendChild(description);
    gameMain.appendChild(itemsSection);
    gameMain.appendChild(talkAlienBtn);
}


// -------------------------------------------TALK TO ALEIN
function talkToAlien() {
    const planet = planets[currentPlanetIndex];
    if (!planet || !planet.alien) {
        dialogueText.innerHTML = `<p>There is no one to talk to here.</p>`;
    } else {
        dialogueText.innerHTML = `<p>You meet ${planet.alien}, who shares mysterious knowledge.</p>`;
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
    

    renderInventory();
    renderPlanet();

    // Show dialogue confirming item pickup
    dialogueText.innerHTML = `<p>You picked up: ${item.name}!</p>`;
    showOverlay(dialogueOverlay);
}


// -------------------------------------------PLAY AUDIO
