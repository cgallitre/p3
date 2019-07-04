class Signature {
    constructor() {
        this.initialisation();
    };

    initialisation() {
        // on récupère l'élément HTML Canvas
        var canvas = document.getElementById("signature");
        // Vérification du support par le navigateur
        if (canvas.getContext) {
            // Le navigateur est compatible : on récupère le contexte en 2D
            var context = canvas.getContext('2d');
        } else {
            // Navigateur ne supporte pas le canvas
            $('#confirmation').html("Votre navigateur est trop ancien pour réaliser une réservation.")
        };

        // Gestion de l'écriture du canvas
        // Clic sur souris
        $('#signature').mousedown(function (e) {
            var mouseX = e.pageX - this.offsetLeft; // position du clic - position de l'élément
            var mouseY = e.pageY - this.offsetTop;
            paint = true;
            addClick(mouseX, mouseY); // Mémorise la position de départ (pas de lien avec un précédent point)
            redraw();
        });

        // démarrage tactile
        $('#signature').bind('touchstart', function (e) {
            e.preventDefault();
            var mouseX = e.pageX - this.offsetLeft; // position du clic - position de l'élément
            var mouseY = e.pageY - this.offsetTop;
            paint = true;
            addClick(mouseX, mouseY); // Mémorise la position de départ (pas de lien avec un précédent point)
            redraw();
        });

        // Mouvement de souris
        $('#signature').mousemove(function (e) {
            // On enregistre les points si le bouton souris est enfoncé (avec lien entre les points)
            if (paint) {
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                redraw();
            }
        });

        // mouvement tactile
        $('#signature').bind('touchmove', function (e) {
            e.preventDefault();
            // On enregistre les points si le bouton souris est enfoncé (avec lien entre les points)
            if (paint) {
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                redraw();
            }
        });

        // clic relâché
        $('#signature').mouseup(function (e) {
            paint = false;
        });

        // Sortie de l'espace du canvas
        $('#signature').mouseleave(function (e) {
            paint = false;
        });

        // Sauvegarde de la position
        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array(); // le point est-t-il lié au précédent ?
        var paint;

        // Mémorise la position du clic
        function addClick(x, y, dragging) {
            clickX.push(x);
            clickY.push(y);
            clickDrag.push(dragging); // true ou false en fonction de l'existence d'un lien
        }

        // Effacement et reécriture du canvas à chaque appel de la fonction
        function redraw() {
            // On efface tout
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            // Style d'écriture
            context.strokeStyle = "#00E64D";
            context.lineJoin = "round";
            context.lineWidth = 3;
            // on redessine l'ensemble
            for (let i = 0; i < clickX.length; i++) {
                context.beginPath();
                if (clickDrag[i]) {
                    context.moveTo(clickX[i - 1], clickY[i - 1]);
                } else {
                    context.moveTo(clickX[i] - 1, clickY[i]);
                }
                context.lineTo(clickX[i], clickY[i]);
                context.closePath();
                context.stroke();
            };
        };

        // Bouton effacer
        $('#clear').on('click', function () {
            // Efface le canvas
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            // Supprime la liste des points mémorisés
            clickX = [];
            clickY = [];
            clickDrag = [];
        })

        // Bouton valider
        $('#ok').on('click', () => {
            // confirmation de la réservation
            maResa.allowResa = false;
            maResa.confirmer();
            
            // lancement du chrono
            let monChrono = new Chrono(minGlobal, secGlobal);
            monChrono.initialisation();
        });
    };
};