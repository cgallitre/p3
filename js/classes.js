class Diaporama  {
    constructor(cible,tableau,rep, duree){
        this.image=document.getElementById(cible)
        this.tableau=tableau;
        this.rep=rep;
        this.imageEnCours = -1;
        this.duree=duree;
        this.boucleDiapo = 0;
        this.cible = cible;
    }

    executeDiaporama() {
    // Passage à la diapo suivante
        this.imageEnCours++;
        if (this.imageEnCours >= this.tableau.length ) {
            this.imageEnCours = 0;
        };
        this.image.src=this.rep + this.tableau[this.imageEnCours];
 
        // lecture en boucle
        this.boucleDiapo = setTimeout(() => {
            this.executeDiaporama()
            }, this.duree);
    };

    // Gestion de la souris et du clavier : on stoppe si au-dessus du diapo
    executeManuel() {
        $('#slider').hover(
            () => {
                clearTimeout(this.boucleDiapo);
                this.executeClavier();
                $('#right-arrow').css('display','inline-block');
                $('#left-arrow').css('display', 'inline-block');
                this.executeSouris();
            },
            () => {
                $('#right-arrow').css('display', 'none');
                $('#left-arrow').css('display', 'none');
                $(document).off('keyup');
                this.executeDiaporama();
            }
        );
    };

    // Gestion du clavier
    executeClavier(){
        $(document).keyup((e) => { // action au relâchement d'une touche
            switch (e.keyCode) {
                case 37: // Flèche gauche
                    this.imageEnCours--;
                    if (this.imageEnCours ==-1) {
                        this.imageEnCours = this.tableau.length -1;
                    };
                    break;
                case 39: // Flèche droite
                    this.imageEnCours++;
                    if (this.imageEnCours == this.tableau.length) {
                        this.imageEnCours = 0;
                    };
                    break;
                };
                this.image.src = this.rep + this.tableau[this.imageEnCours];
        });
    };
    // Gestion de la souris
    executeSouris() {
        $('#left-arrow').click(() => {
                this.imageEnCours--;
                if (this.imageEnCours == -1) {
                    this.imageEnCours = this.tableau.length - 1;
                };
                this.image.src = this.rep + this.tableau[this.imageEnCours];
            }
        );

        $('#right-arrow').click(() => {
            this.imageEnCours++;
            if (this.imageEnCours == this.tableau.length) {
                this.imageEnCours = 0;
            };
            this.image.src = this.rep + this.tableau[this.imageEnCours];
        });

    };
};

