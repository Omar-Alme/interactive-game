window.addEventListener('DOMContentLoaded', main);

'use strict';

// Game data
const planets = [
    {
        name: "Planet A",
        description: "Strange rock formations cover the landscape.",
        items: [
            { name: "Oxygen Tank", image: "/assets/media/objects/oxygenTank.png"},
            { name: "Water Purifier", image: "/assets/media/objects/waterPurifier.png"}
        ],
        alien: "Zorg",
        secretPlace: "An eerie cave emitting strange noises.",
        backgroundImage: "/assets/media/Planets/planetA.png"
    },
    {
        name: "Planet B",
        description: "Lush forests with glowing plants.",
        items: [
            { name: "Fuel", image: "/assets/media/objects/fuel.png", x: 350, y: 250 }
        ],
        alien: "Xylo",
        secretPlace: "A hidden waterfall that seems to whisper.",
        backgroundImage: "/assets/media/Planets/planetB.png"
    },
    {
        name: "Planet C",
        description: "A vast desert with crystal sands.",
        items: [
            { name: "Space Map", image: "/assets/media/objects/spaceMap.png", x: 200, y: 300 }
        ],
        alien: "Quark",
        secretPlace: "An ancient ruin with mysterious symbols.",
        backgroundImage: "/assets/media/Planets/planetC.png"
    },
    {
        name: "Planet D",
        description: "Ice-covered mountains touch the sky.",
        items: [
            { name: "Energy Crystal", image: "/assets/media/objects/energyCrystal.png", x: 250, y: 350 }
        ],
        alien: "Frost",
        secretPlace: "A frozen lake that reflects other worlds.",
        backgroundImage: "/assets/media/Planets/planetD.png"
    },
    {
        name: "Planet E",
        description: "Volcanic plains with rivers of lava.",
        items: [
            { name: "Heat Shield", image: "/assets/media/objects/heatShield.png", x: 300, y: 400 }
        ],
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


function main(){
    inventoryToggle();
    initializeEventListeners();
}


function initializeEventListeners(){

    // Close Dialogue


    // Submit player Name


    // Keypress to submit player name


    // Inventory toggle button
    inventoryToggleBtn.addEventListener('click', inventoryToggle);

}


function inventoryToggle(){
    // inventoryToggleBtn.classList.toggle('hidden');
    // inventoryList.classList.toggle('hidden');
    inventoryPanel.classList.toggle('visible');

}
