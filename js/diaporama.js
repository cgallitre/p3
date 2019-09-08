class Diaporama {
    constructor(cibleImage, cibleLegende, tableau, rep, duree) {
        this.image = document.getElementById(cibleImage);
        this.legende = document.getElementById(cibleLegende);
        this.tableau = tableau;
        this.rep = rep;
        this.imageEnCours = -1;
        this.duree = duree;
        this.boucleDiapo = 0; // Identifiant de la boucle du diaporama
        this.finSouris = false; // pointeur sur la diaporama ou non
    };

    // initialise le diaporama avec toutes les méthodes
    initDiaporama() {
        this.executeDiaporama();
        this.executeSouris();
        this.executeClavier();
    };

    // Boucle principale du diaporama
    executeDiaporama() {

        // Passage à la diapo suivante
        if (this.finSouris === false){
            this.diapoSuivante();
        };
        this.finSouris = false;

        // lecture en boucle
        this.boucleDiapo = setTimeout(() => this.executeDiaporama(), this.duree);
    };

    // Gestion de la souris : on stoppe si au-dessus du diapo
    executeSouris() {

        // Passage en manuel si pointeur sur le slider
        $('#slider').hover(
            () => {
                clearTimeout(this.boucleDiapo);
                // Affiche les commandes de passage de diapos
                $('#right-arrow').css('display', 'inline-block');
                $('#left-arrow').css('display', 'inline-block');
            },
            () => {

                // Masque les commandes de passage de diapos
                $('#right-arrow').css('display', 'none');
                $('#left-arrow').css('display', 'none');
                this.finSouris = true;

                // Relance l'exécution automatique
                this.executeDiaporama();
            }
        );

        // Gestion de la souris
        $('#left-arrow').click(() => this.diapoPrecedente());
        $('#right-arrow').click(() => this.diapoSuivante());
    };

    // Gestion du clavier
    executeClavier() {
        
        // action au relâchement d'une touche
        $(document).keyup((e) => {
            switch (e.keyCode) {

                // Flèche gauche
                case 37: 
                    this.diapoPrecedente();
                    break;

                // Flèche droite    
                case 39: 
                    this.diapoSuivante();
                    break;

                // rien à faire pour les autres touches    
                default : 
                    break;
            };
        });
    };

    // diapo précédente
    diapoPrecedente() {
        this.imageEnCours--;
        if (this.imageEnCours === -1) {
            this.imageEnCours = this.tableau.length - 1;
        };

        // On récupère l'image dans le tableau (position 0)
        this.image.src = this.rep + this.tableau[this.imageEnCours][0];

        // On récupère la légende dans le tableau (position 1)
        this.legende.innerHTML = this.tableau[this.imageEnCours][1];
    };

    // diapo suivante
    diapoSuivante() {
        this.imageEnCours++;
        if (this.imageEnCours === this.tableau.length) {
            this.imageEnCours = 0;
        };
        this.image.src = this.rep + this.tableau[this.imageEnCours][0];
        this.legende.innerHTML = this.tableau[this.imageEnCours][1];
    };
};