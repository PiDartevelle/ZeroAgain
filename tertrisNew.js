// ---------- DECLARATION DES VARIABLES ---------- //

const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext('2d');

let delay = 300; // délai de rafraichissement de la fonction refreshCanvas
const largeurGrille = 14; // Nombre de cases en largeur
const hauteurGrille = 28; // Nombre de cases en hauteur
const carreaux = 20; //Taille en pixel d'une case de la grille

const xInitial = 5; // Position de départ de la forme sur la grille
const yInitial = 0; // Position de départ de la forme sur la grille
let xForm = xInitial;
let yForm = yInitial;

let numForm = 0; // Numéro de la forme à afficher
let rotation = 0; // Numéro de la rotation de la forme à afficher

// Tableau des couleurs des formes (1: remplissage, 2: contour)
let couleursFormes = [
    ["#00FF00", "#FFD700", "#FF00FF", "#00FFFF", "#FF0000", "#FF4500", "#8A2BE2"],
    ["#FFD700",  "#FF00FF",  "#00FFFF",  "#FF0000",  "#FF4500", "#8A2BE2",  "#00FF00"]
];

// Tableau de définition des formes
let forme = new Array();
forme[0]= [ // Forme 1
    [	// rotation 0
        [0,0,0],
        [1,1,1],
        [0,0,1]
    ],
    [	// rotation 1
        [0,1,0],
        [0,1,0],
        [1,1,0]
    ],
    [	// rotation 2
        [1,0,0],
        [1,1,1],
        [0,0,0]
    ],
    [	// rotation 3
        [0,1,1],
        [0,1,0],
        [0,1,0]
    ]
]; 

forme[1] = [ // Forme 2
    [	// rotation 0 (cette forme là n'a besoin que de 2 rotations)
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    [	// rotation 1
        [0,1,0],
        [0,1,1],
        [0,0,1]
    ]
];

forme[2] = [ // Form 3
    [   // rotation 0
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    [   // rotation 1
        [0,1,0],
        [1,1,0],
        [1,0,0]
    ]
];

forme[3] = [  // Forme 4
    [   // rotation 0
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],
    [   // rotation 1
        [0,1,0],
        [0,1,1],
        [0,1,0]
    ],
    [   // rotation 2
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ],
    [   // rotation 3
        [0,1,0],
        [1,1,0],
        [0,1,0]
    ]
];

forme[4] = [  // Forme 5
    [   // rotation 0
        [0,0,0],
        [1,1,1],
        [1,0,0]
    ],
    [   // rotation 1
        [1,1,0],
        [0,1,0],
        [0,1,0]
    ],
    [   // rotation 2
        [0,0,1],
        [1,1,1],
        [0,0,0]
    ],
    [   // rotation 3
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ]
];

forme[5] = [  // Forme 6
   [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
   ]
];

forme[6] = [  // Forme 7
  [ //rotation 0
    [0,0,0,0],
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0]
  ],
  [ //rotation 1
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
  ],
]; 

// ---------- FONCTIONS ---------- //

// Fonction de dessin des formes. 
// Seules les cases ou il y a un 1 dans le tableau des formes sont coloriées.
function drawForme() {
    for(let i = 0; i < forme[numForme][rotation].length;i++){
        for(let j = 0; j < forme[numForm][rotation].length; j++){
            if(forme[numForm][rotation][j][i] == 1){
                
            }
        }
    }
}