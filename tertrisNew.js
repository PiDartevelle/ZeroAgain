// ---------- DECLARATION DES VARIABLES ---------- //

const gameBoard = document.getElementById("gameBoard");
const context = gameBoard.getContext('2d');

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
                context.fillStyle = couleursFormes[1][numForme]; // Couleur de contour de la forme
                context.fillRect((xForm + i) * carreaux, (yForm + j) * carreaux, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][numForm]; // Couleur de remplissage de la forme
                context.fillRect((xForm + i) * carreaux + 1, (yForm + j) * carreaux + 1, carreaux - 2, carreaux - 2);
            }
        }
    }
};

// Fonction de rafraichissement de l'affichage
// Efface le canvas et dessine la forme
function refreshCanvas(){
    context.clearRect(0, 0, largeurGrille * carreaux, hauteurGrille * carreaux); // met en noir transparent tous les pixels dans le rectangle définis en supprimant tout ce qui a été dessiné avant. 
    //v clearRect(coordonnée x du point de départ du rect, coordonnée y du point de départ du rect, largeur, hauteur)
    drawForme();
    yForm++;
    if(yForm > hauteurGrille){
        yForm = 0;
    }
};

// Fonction de gestion des collisions
  /* function collision(){
        for(let i = 0; i < forme[numForme][rotation].length; i++){
            for(let j = 0; i < forme[numForme][rotation].length; j++){
                if(forme[numForme][rotation][j][i] == 1){
                    if(formX > 0 && formX < LARGEUR_GRILLE){
                        return true;
                    }
                    if(formY > HAUTEUR_GRILLE){
                        return true
                    }
                    return false;
                }
            }
        }

    }*/

// ---------- CODE ---------- //

gameBoard.width = largeurGrille * carreaux;
gameBoard.height = hauteurGrille * carreaux;
gameBoard.style.border = "1px solid";
