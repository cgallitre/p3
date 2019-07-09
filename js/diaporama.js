class Diaporama {
    constructor(cibleImage, cibleLegende, tableau, rep, duree) {
        this.image = document.getElementById(cibleImage);
        this.legende = document.getElementById(cibleLegende);
        this.tableau = tableau;
        this.rep = rep;
        this.imageEnCours = -1;
        this.duree = duree;
        this.boucleDiapo = 0;
        this.finSouris = false;
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
                $('#right-arrow').css('display', 'inline-block');
                $('#left-arrow').css('display', 'inline-block');
            },
            () => {
                $('#right-arrow').css('display', 'none');
                $('#left-arrow').css('display', 'none');
                this.finSouris = true;
                this.executeDiaporama();
            }
        );
        // Gestion de la souris
        $('#left-arrow').click(() => this.diapoPrecedente());
        $('#right-arrow').click(() => this.diapoSuivante());
    };

    // Gestion du clavier
    executeClavier() {
        $(document).keyup((e) => { // action au relâchement d'une touche
            switch (e.keyCode) {
                case 37: // Flèche gauche
                    this.diapoPrecedente();
                    break;
                case 39: // Flèche droite
                    this.diapoSuivante();
                    break;
                default : // rien à faire pour les autres touches
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
        this.image.src = this.rep + this.tableau[this.imageEnCours][0];
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