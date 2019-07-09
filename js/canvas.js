// 4 méthodes : initialisation, gestionEvenements, ajoutClic, Redessine

class Signature {
    constructor() {
        // on récupère l'élément HTML Canvas
        this.canvas = document.getElementById("signature");
        this.context;
        // Variables pour mémoriser les positions des points dans différents tableaux
        this.clickX = new Array; // position en abscisse
        this.clickY = new Array; // position en ordonnée
        this.clickDrag = new Array; // le point est-t-il lié au précédent ?
        this.paint = false; // Le bouton de la souris est-il enfoncé ?
        this.nb = 0;
        this.initialisation();
    };

    initialisation() {
        // Vérification du support par le navigateur
        if (this.canvas.getContext) {
            // Le navigateur est compatible : on récupère le contexte en 2D
            this.context = this.canvas.getContext('2d');
            // On efface tout
            this.effaceSignature();
            // On active la gestion des événements
            this.gestionEvenements();
        } else {
            // Navigateur ne supporte pas le canvas
            $('#confirmation').html("Votre navigateur est trop ancien pour réaliser une réservation.")
        };
    };

    gestionEvenements() {
        // Clic sur souris
        $('#signature').mousedown(e => appui(e));

        // Touch tactile
        $('#signature').bind('touchstart', (e => {
            e.preventDefault();
            appui(e);
        }));

        // clic relâché
        $('#signature').mouseup(e => this.paint = false);

        // Sortie de l'espace du canvas
        $('#signature').mouseleave(e => this.paint = false);

        // Mouvement de souris
        $('#signature').mousemove((e) => {
            // On enregistre les points si le bouton souris est enfoncé (avec lien entre les points)
            if (this.paint) {
                this.ajoutClic(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, true);
                this.redessine();
            }
        });

        // mouvement tactile
        $('#signature').bind('touchmove', (e) => {
            e.preventDefault();
            // On enregistre les points si le bouton souris est enfoncé (avec lien entre les points)
            if (this.paint) {
                this.ajoutClic(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, true);
                this.redessine();
            }
        });

        // enregistre la position du clic ou touch
        let appui = (e) => {
            let mouseX = e.pageX - e.offsetLeft; // position du clic - position de l'élément
            let mouseY = e.pageY - e.offsetTop;
            this.paint = true;
            this.ajoutClic(mouseX, mouseY); // Mémorise la position (pas de lien avec un précédent point)
            this.redessine();
        };

        // Bouton effacer
        $('#clear').on('click', () => {
            this.effaceSignature();
        });

        // Bouton valider
        $('#ok').on('click', () => {
            this.nb++;
            console.log(this.nb);
            // Vérification de la signature
            this.verifSignature();
        });
    };

    // Mémorise la position du clic dans les variables tableaux
    ajoutClic(x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging); // true ou false en fonction de l'existence d'un lien
    };

    // Effacement et réécriture du canvas à chaque appel de la fonction
    redessine() {
        // On efface tout
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        // Style d'écriture
        this.context.strokeStyle = "#5cadd3";
        this.context.lineJoin = "round";
        this.context.lineWidth = 3;
        // on redessine l'ensemble
        for (let i = 0; i < this.clickX.length; i++) {
            this.context.beginPath(); // début du trajet
            if (this.clickDrag[i]) {
                this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
            } else {
                this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
            }
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath(); // Fermeture du trajet
            this.context.stroke(); // Dessine le trajet
        };
    };

    verifSignature() {
        if (this.clickX.length === 0) {

            $('#verifSaisie').html('Vous devez signer avant de valider.');
            $('#verifSaisie').show();
            this.effaceSignature();

        } else {
           
            $('#verifSaisie').hide();
            // confirmation de la réservation
            maResa.allowResa = false;
            maResa.confirmer();

            // lancement du chrono
            let monChrono = new Chrono(minGlobal, secGlobal);
            monChrono.initialisation();

            // On bloque la signature
            $('#detailsStation').html("Une réservation est en cours, veuillez l'annuler avant d'en faire une nouvelle.");
            $('#sign').hide();
        };
    };

    effaceSignature() {
        // Efface le canvas
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        // Supprime la liste des points mémorisés
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    };
};