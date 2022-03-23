// ---------- DECLARATION DES VARIABLES ---------- //

const gameBoard = document.getElementById("gameBoard");
const canvas = document.createElement('canvas');
let largeurCanvas = gameBoard.clientWidth; // récupère la largeur en pixel de la div gameBoard
let hauteurCanvas = gameBoard.clientHeight; // récupère la hauteur en pixel de la div gameBoard

let delay = 300; // délai de rafraichissement de la fonction refreshCanvas
const largeurGrille = 14; // Nombre de cases en largeur
const hauteurGrille = 28; // Nombre de cases en hauteur
// const carreaux = largeurCanvas / largeurGrille; //Taille en pixel d'une case de la grille
const carreaux = hauteurCanvas / hauteurGrille;

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

function getShapeYSize(matrix) {
    let size = matrix.length;
    for (let rowNum = matrix.length - 1; rowNum >= 0; rowNum-=1) {
        let rowIsEmpty = true
        for (let colNum = 0; colNum < matrix.length; colNum+=1) {
            if(matrix[rowNum][colNum] === 1) {
                rowIsEmpty = false
            }
        }
        if (rowIsEmpty) size -= 1
        else return size
    }
    return size
}

// Tableau de définition des formes
let forme = new Array(); // const shapes = []
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
        [1,1],
        [1,1],
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

const grille = new Array(hauteurGrille);

// ---------- FONCTIONS ---------- //

// Fonction de dessin des formes. 
// Seules les cases ou il y a un 1 dans le tableau des formes sont coloriées.
function drawForme() {
    for(let i = 0; i < forme[numForm][rotation].length;i++){
        for(let j = 0; j < forme[numForm][rotation].length; j++){
            if(forme[numForm][rotation][j][i] == 1){
                context.fillStyle = couleursFormes[1][numForm]; // Couleur de contour de la forme
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
    // clearRect(coordonnée x du point de départ du rect, coordonnée y du point de départ du rect, largeur, hauteur)
    drawForme();
    yForm++;
    if(collision()){
        console.log('collision')
        yForm--;
        copieFormeDansLaGrille();
        yForm = yInitial;
        xForm = xInitial;
    }
    drawGrille();

    /*
    //console.log(yForm);
    //console.log(collision());
       /*if(yForm > hauteurGrille){
       yForm = 0;
    }
    if(collision()){
        yForm--;
        copieFormeDansLaGrille();
        drawForme();
        console.table(grille);
        yForm = yInitial;
        xForm = xInitial;
        rotation = 0;
    }
    */
};

// Fonction de gestion des collisions
function collision(){
    console.log('enter collision function')
    for(let i = 0; i < forme[numForm][rotation].length; i++){
        for(let j = 0; j < forme[numForm][rotation].length; j++){
            console.log('checking cell')
            console.log(i, j)
            if(forme[numForm][rotation][j][i] === 1){ // Pour toutes les cases des formes qui sont égales à 1 
                if(xForm < 0 || xForm + forme[numForm][rotation].length > largeurGrille){ // on autorise les mouvements de gauche à droite 
                    return true
                }
                const hasHitFloor = yForm + getShapeYSize(forme[numForm][rotation]) > hauteurGrille;
                if (hasHitFloor) return true
                
                if(grille[yForm + j][xForm + i] != -1 ){
                    return true
                }    
            }
        }
    }
    return false;
};

// Fonction d'initialisation de la grille
function initGrille(){
    for(let i = 0; i < grille.length; i++){
        grille[i] = new Array(largeurGrille);
    }
    for(let j = 0; j < grille.length; j++){
        for(let k = 0; k < grille[j].length; k++){
            grille[j][k] = -1;
        }
    }
};

// Fonction de copie de la forme dans la grille
function copieFormeDansLaGrille(){
    for(let i = 0; i < forme[numForm][rotation].length; i++){
        for(let j = 0; j < forme[numForm][rotation].length; j++){
            if(forme[numForm][rotation][j][i] == 1){
                grille[yForm + j][xForm + i] = numForm;
            }
        }
    }
};

// Fonction pour afficher la grille
function drawGrille(){
    for(let i = 0; i < grille.length; i++){
        for(let j = 0; j < grille[i].length; j++){
            if(grille[i][j] > -1){
                const x = j * carreaux
                const y = i * carreaux
                context.fillStyle = couleursFormes[1][numForm]; // Couleur de contour de la forme
                context.fillRect(x, y, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][numForm]; // Couleur de remplissage de la forme
                context.fillRect(x + 1, y + 1, carreaux - 2, carreaux - 2);
            }
        }
    }
}
// ---------- CODE ---------- //

// initialisation du canvas
canvas.width = largeurGrille * carreaux;
canvas.height = hauteurGrille * carreaux;
canvas.style.border = "1px solid";
gameBoard.appendChild(canvas);
const context = canvas.getContext('2d');
initGrille();
refreshCanvas();
setInterval(refreshCanvas, delay);

// Gestion des évènements clavier
window.addEventListener("keydown", function(event){
    let key = event.key;
    let temporaire = 0; // Pour mémoriser temorairement la rotation 
    switch(key){
        case 'ArrowUp':
            temporaire = rotation;
            rotation++;
            if(rotation > forme[numForm].length - 1){
                rotation = 0;
            }
            if(collision()){
                rotation = temporaire;
            }
            break;
        case 'ArrowDown':
            temporaire = rotation;
            rotation--;
            if(rotation < 0){
                rotation = forme[numForm].length - 1;
            }
            if(collision()){
                rotation = temporaire;
            }
            break;
        case 't':
            rotation = 0;
            numForm++;
            if(numForm > forme.length - 1){
                numForm = 0;
            }
            break;
        case 'ArrowLeft':
            temporaire = xForm;
            if(xForm > 0){
                xForm--;
            }
            if(collision()){
                xForm = temporaire;
            }
            break;
        case 'ArrowRight':
            temporaire = xForm;
            if(xForm < largeurGrille - 3){
                xForm++;
            }
            if(collision()){
                xForm = temporaire;
            }
            break;
    }
});


