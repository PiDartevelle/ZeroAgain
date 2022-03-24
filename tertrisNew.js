// ---------- DECLARATION DES VARIABLES ---------- //

const gameBoard = document.getElementById("gameBoard");
const canvas = document.createElement('canvas');
const nextPiece = document.querySelector(".nextPiece");
const canvasNextPiece = document.createElement("canvas");
const numberLines = document.getElementById("lines");
const playButton = document.querySelector(".play-button");
const score = document.getElementById("score");
let largeurCanvas = gameBoard.clientWidth; // récupère la largeur en pixel de la div gameBoard
let hauteurCanvas = gameBoard.clientHeight; // récupère la hauteur en pixel de la div gameBoard

let delay = 300; // délai de rafraichissement de la fonction refreshCanvas
const largeurGrille = 14; // Nombre de cases en largeur
const hauteurGrille = 28; // Nombre de cases en hauteur
// const carreaux = largeurCanvas / largeurGrille; //Taille en pixel d'une case de la grille
const carreaux = hauteurCanvas / hauteurGrille;
const largeurDiv = largeurGrille * carreaux;
gameBoard.style.width = `${largeurDiv}px`;

const xInitial = 5; // Position de départ de la forme sur la grille
const yInitial = 0; // Position de départ de la forme sur la grille
let xForm = xInitial;
let yForm = yInitial;

let numForm = 0; // Numéro de la forme à afficher
let rotation = 0; // Numéro de la rotation de la forme à afficher
let formeSuivante = 0;
let ctrlLigne = 0; // compteur de lignes complètées
let scoreNb = 0;
let verifPourComptes = false;

// Tableau des couleurs des formes (1: remplissage, 2: contour)
let couleursFormes = [
    ["#3300FF", "#33FF00", "#FF0000", "#9C27B0", "#FF9900", "#FFFF00", "#66FFFF"],
    ["#17202A",  "#17202A",  "#17202A",  "#17202A",  "#17202A", "#17202A",  "#17202A"]
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
function drawForme(numeroForme, rotationFct, xPosition, yPosition) {
    for(let i = 0; i < forme[numeroForme][rotationFct].length;i++){
        for(let j = 0; j < forme[numeroForme][rotationFct].length; j++){
            if(forme[numeroForme][rotationFct][j][i] == 1){
                context.fillStyle = couleursFormes[1][numeroForme]; // Couleur de contour de la forme
                context.fillRect((xPosition + i) * carreaux, (yPosition + j) * carreaux, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][numeroForme]; // Couleur de remplissage de la forme
                context.fillRect((xPosition + i) * carreaux + 1, (yPosition + j) * carreaux + 1, carreaux - 2, carreaux - 2);
            }
        }
    }
};

// Fonction qui dessine dans la partie next piece
function drawNextPiece(numeroForme, rotationFct, xPosition, yPosition) {
    for(let i = 0; i < forme[numeroForme][rotationFct].length;i++){
        for(let j = 0; j < forme[numeroForme][rotationFct].length; j++){
            if(forme[numeroForme][rotationFct][j][i] == 1){
                contextNextPiece.fillStyle = couleursFormes[1][numeroForme]; // Couleur de contour de la forme
                contextNextPiece.fillRect((xPosition + i) * carreaux, (yPosition + j) * carreaux, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                contextNextPiece.fillStyle = couleursFormes[0][numeroForme]; // Couleur de remplissage de la forme
                contextNextPiece.fillRect((xPosition + i) * carreaux + 1, (yPosition + j) * carreaux + 1, carreaux - 2, carreaux - 2);
            }
        }
    }
};

// Fonction de rafraichissement de l'affichage
// Efface le canvas et dessine la forme
function refreshCanvas(){
    context.clearRect(0, 0, largeurGrille * carreaux, hauteurGrille * carreaux); // met en noir transparent tous les pixels dans le rectangle définis en supprimant tout ce qui a été dessiné avant. 
    // clearRect(coordonnée x du point de départ du rect, coordonnée y du point de départ du rect, largeur, hauteur)
    drawForme(numForm, rotation, xForm, yForm);
    yForm++;
    if(collision()){
        if(yForm <= 1){
            gameOver();
            return;
        };
        yForm--;
        copieFormeDansLaGrille();
        effaceLigne(verifierLignes());
        if(verifPourComptes){
            ctrlLigne++;
            numberLines.innerText = ctrlLigne;
            scoreCount();
        };
        yForm = yInitial;
        xForm = xInitial;
        rotation = 0;
        numForm = formeSuivante;
        formeSuivante = nouvelleForme();
    }
    drawGrille();
};

// Fonction de gestion des collisions
function collision(){
    console.log('enter collision function')
    for(let i = 0; i < forme[numForm][rotation].length; i++){
        for(let j = 0; j < forme[numForm][rotation].length; j++){
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
    const currentForm = numForm;
    for(let i = 0; i < grille.length; i++){
        for(let j = 0; j < grille[i].length; j++){
                const x = j * carreaux
                const y = i * carreaux
        
            switch(grille[i][j]){
                case 0:
                    context.fillStyle = couleursFormes[1][0]; // Couleur de contour de la forme
                context.fillRect(x, y, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][0]; // Couleur de remplissage de la forme
                context.fillRect(x + 1, y + 1, carreaux - 2, carreaux - 2);
                break;
                case 1:
                    context.fillStyle = couleursFormes[1][1]; // Couleur de contour de la forme
                context.fillRect(x, y, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][1]; // Couleur de remplissage de la forme
                context.fillRect(x + 1, y + 1, carreaux - 2, carreaux - 2);
                break;
                case 2:
                    context.fillStyle = couleursFormes[1][2]; // Couleur de contour de la forme
                context.fillRect(x, y, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][2]; // Couleur de remplissage de la forme
                context.fillRect(x + 1, y + 1, carreaux - 2, carreaux - 2);
                break;
                case 3:
                    context.fillStyle = couleursFormes[1][3]; // Couleur de contour de la forme
                context.fillRect(x, y, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][3]; // Couleur de remplissage de la forme
                context.fillRect(x + 1, y + 1, carreaux - 2, carreaux - 2);
                break;
                case 4:
                    context.fillStyle = couleursFormes[1][4]; // Couleur de contour de la forme
                context.fillRect(x, y, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][4]; // Couleur de remplissage de la forme
                context.fillRect(x + 1, y + 1, carreaux - 2, carreaux - 2);
                break;
                case 5:
                    context.fillStyle = couleursFormes[1][5]; // Couleur de contour de la forme
                context.fillRect(x, y, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][5]; // Couleur de remplissage de la forme
                context.fillRect(x + 1, y + 1, carreaux - 2, carreaux - 2);
                break;
                case 6:
                    context.fillStyle = couleursFormes[1][6]; // Couleur de contour de la forme
                context.fillRect(x, y, carreaux, carreaux); // fillRect(coordonnée x, coordonnée y, largeur, hauteur)
                context.fillStyle = couleursFormes[0][6]; // Couleur de remplissage de la forme
                context.fillRect(x + 1, y + 1, carreaux - 2, carreaux - 2);
                break;
            }
        }
    }
};

// Fonction qui envoie un numForm aléatoire
function nouvelleForme(){
    return Math.floor(Math.random() * (forme.length - 0) + 0);
};

// Fonction de rafraichissement du canvas nouvelle piece
function refershNextPiece(){
    contextNextPiece.clearRect(0, 0, 6 * carreaux, 6 * carreaux);
    drawNextPiece(formeSuivante, 0, 1, 2);
};

// Fonction qui efface la ligne qui est pleine
function effaceLigne(ligneAEffacer){
    verifPourComptes = false;
    grille.splice(ligneAEffacer, 1);
    if(grille[0].length < 14){
        verifPourComptes = true;
    };
    grille.unshift([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
    return grille;
};

// Fonction qui vérifie si une ligne est complétée
function verifierLignes(){
    for(let i = 0; i < hauteurGrille; i++){
        if(grille[i].every(valeur => valeur > -1)){
            return i;
        }
    }
};

// Fonction de game over
function gameOver(){
    clearTimeout(refreshCanvas);
    alert("GAME OVER");
}

// Fonction score
function scoreCount(){
    if(ctrlLigne < 10){
    scoreNb = scoreNb + 10
    }
    if(ctrlLigne >= 10 && ctrlLigne < 30){
        scoreNb = scoreNb + 30;
    }
    if(ctrlLigne >= 30){
        scoreNb = scoreNb + 50;
    }
    score.innerText = scoreNb;
}
// ---------- CODE ---------- //

// initialisation du canvas
canvas.width = largeurGrille * carreaux;
canvas.height = hauteurGrille * carreaux;
canvas.style.border = "1px solid";
gameBoard.appendChild(canvas);
const context = canvas.getContext('2d');
canvasNextPiece.width = 6 * carreaux;
canvasNextPiece.height = 6 * carreaux;
nextPiece.appendChild(canvasNextPiece);
const contextNextPiece = canvasNextPiece.getContext('2d');
canvasNextPiece.style.border = "1px solid";

playButton.addEventListener("click", () =>{
numForm = nouvelleForme();
formeSuivante = nouvelleForme();
initGrille();
refreshCanvas();
setInterval(refreshCanvas, delay);
refershNextPiece();
setInterval(refershNextPiece, delay);
});

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


