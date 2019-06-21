class Diaporama  {
    constructor(cible,tableau, rep, duree){
        this.Image=$('cible');
        this.Tableau=tableau;
        this.Rep=rep;
        this.imageEnCours = -1;
        this.Duree=duree;
        this.diap();
    }
    diap(){
        this.imageEnCours++;
        this.cible.src=this.Rep+this.Tableau[this.imageEnCours]+'jpg';
        if(this.imageEnCours==this.Tableau.lenght-1){
            this.imageEnCours=-1;
        }
    setTimeout(() => {
            this.diap()
        }, this.Duree);
    }
}

