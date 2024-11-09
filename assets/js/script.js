
const planets = [
    {
        name: "Planet A",
        description: "Strange rock formations cover the landscape.",
        items: ["Oxygen Tank"],
        alien: "Zorg",
        secretPlace: "An eerie cave emitting strange noises.",
        backgroundImage: "/assets/media/Planets/planetA.png"
    },
    {
        name: "Planet B",
        description: "Lush forests with glowing plants.",
        items: ["Fuel"],
        alien: "Xylo",
        secretPlace: "A hidden waterfall that seems to whisper.",
        backgroundImage: "/assets/media/Planets/planetB.png"
    },
    {
        name: "Planet C",
        description: "A vast desert with crystal sands.",
        items: ["Space Map"],
        alien: "Quark",
        secretPlace: "An ancient ruin with mysterious symbols.",
        backgroundImage: "/assets/media/Planets/planetC.png"
    },
    {
        name: "Planet D",
        description: "Ice-covered mountains touch the sky.",
        items: ["Energy Crystal"],
        alien: "Frost",
        secretPlace: "A frozen lake that reflects other worlds.",
        backgroundImage: "/assets/media/Planets/planetD.png"
    },
    {
        name: "Planet E",
        description: "Volcanic plains with rivers of lava.",
        items: ["Heat Shield"],
        alien: "Blaze",
        secretPlace: "A fiery cave with a pulsating glow.",
        backgroundImage: "/assets/media/Planets/planetE.png"
    }
];


function main() {
    askPlayerName();
}

function askPlayerName() {
    playerName = prompt("Welcome Human, Please tell us your name before going forward.");
    if (playerName) {
        localStorage.setItem('playerName', playerName);
    } else {
        alert("Name is required to start the game.");
        askPlayerName();
    }
}



window.onload = main;
