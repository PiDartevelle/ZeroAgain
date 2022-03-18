// ---------- DECLARATION DES VARIABLES ----------
    const gameBord = document.getElementById("gameBoard");
    let delay = 300; // délai de rafraichissement de la fonction refreshCanvas()
    let ctx;
    
	const LARGEUR_GRILLE = 14;  // Nombre de cases en largeur
    const HAUTEUR_GRILLE = 28;  // Nombre de cases en hauteur
    const CARREAU = 20;	        // Taille en pixels d'une case de la grille
    
	// Position de la forme sur la grille
	const X_INITIAL = 5;
	const Y_INITIAL = 0;
    let formX = X_INITIAL;
    let formY = Y_INITIAL;

	// Numéro de la forme (du tableau "forme") à afficher 
	let numForme = 0;
	// Sélection de la version de la forme à afficher (différentes rotations possibles)
    let rotation = 0;
    // Tableau de couleur des formes
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
// ---------- Fin de déclaration des variables ----------
    
// ---------- FONCTIONS ----------
	
    // drawForme()
	//   Dessine une forme à l'écran 
	//   Variable utilisées :
	//		numForme : numéro de la forme à afficher (tableau forme)
	//		rotation : version de la forme à afficher (tableau forme[numForme])
	//		formX : Position horizontale de la forme sur la grille
	//		formY : Position verticale de la forme sur la grille
    function drawForme() {
		for(let i = 0 ; i < forme[numForme][rotation].length ; i++) {
			for(let j = 0 ; j < forme[numForme][rotation].length ; j++) {
                if(forme[numForme][rotation][j][i] == 1) {
                    ctx.fillStyle = couleursFormes[1][numForme]; // Couleur du contour de la forme
                    ctx.fillRect((formX + i) * CARREAU, (formY + j) * CARREAU, CARREAU, CARREAU); // Contour de la forme
                    ctx.fillStyle = couleursFormes[0][numForme]; // Couleur de remplissage de la forme
                    ctx.fillRect((formX + i) * CARREAU + 1, (formY + j) * CARREAU + 1, CARREAU - 2, CARREAU - 2); // Remplissage de la forme
                }
            }
        }
    }

    // refreshCanvas()
	//   Rafraichi l'affichage :
	//      - efface le canvas
	//      - dessine la forme
    //      Utilisation de l'objet canvas : https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial/Basic_usage
    function refreshCanvas() {
		ctx.clearRect(0,0,LARGEUR_GRILLE * CARREAU, HAUTEUR_GRILLE * CARREAU); // Efface la grille
		drawForme(); // Dessine la forme
        formY++;
        if(formY > HAUTEUR_GRILLE){
            formY = 0;
        }
    };

    // inti()
	//   Initialisation du canvas
    function init() {
        canvas = document.createElement('canvas');
        canvas.width = LARGEUR_GRILLE * CARREAU;
        canvas.height = HAUTEUR_GRILLE * CARREAU;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);  // Ajoute le canvas à la page html
        //gameBord.appendChild(canvas);
        ctx = canvas.getContext('2d');

		refreshCanvas();
    }

    ////////////////////////////
    // colision()
    // Détermination des cas de colision
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
// ---------- Fin des fonctions -----------

// ---------- CODE ----------

    // Initialisation du canvas

    gameBord.width = LARGEUR_GRILLE * CARREAU;
    gameBord.height = HAUTEUR_GRILLE * CARREAU;
    ctx = gameBord.getContext('2d');
    setInterval(refreshCanvas, delay);
    
	// Gestion des évènements clavier
    window.addEventListener("keydown", function(event) {
        let key = event.key;
        let temporaire = 0;  // Pour mémoriser temporairement la rotation
        switch(key) {
            // Remarque : Pour connaitre les "keycodes" : https://keycode.info/
            case 'ArrowUp':  // flèche haut => rotation horaire de la forme
            temporaire = rotation;    
            rotation++;
                if(rotation >  forme[numForme].length - 1){
                    rotation = 0;
                }
               /* if(collision()){
                    rotation = temporaire;
                }*/
                break;

            case 'ArrowDown': // flèche bas => rotation anti-horaire de la forme
            temporaire = rotation;    
            rotation--;
                if(rotation < 0){
                    rotation = forme[numForme].length - 1;
                }
               /* if(collision()){
                    rotation = temporaire;
                }*/
                break;
            
            case 't':  // toutche t
                rotation = 0;
                numForme++;
                if(numForme > forme.length - 1){
                    numForme = 0;
                }
                break;

            case 'ArrowLeft': // flèche gauche
               temporaire = formX;
                if(formX > 0){
                    formX--;
                }
                /*if(collision()){
                    
                }*/
                break;

            case 'ArrowRight': // flèche droite
                if(formX < LARGEUR_GRILLE - 3){
                    formX++;
                }
                break;
        }
      }, true);
