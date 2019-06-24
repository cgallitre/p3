class Diaporama  {
    constructor(cible,tableau,rep, duree){
        this.image=document.getElementById(cible)
        this.tableau=tableau;
        this.rep=rep;
        this.imageEnCours = -1;
        this.duree=duree;
    }

    executeDiaporama() { 
        this.imageEnCours++;
        this.image.src=this.rep + this.tableau[this.imageEnCours];
        if(this.imageEnCours==this.tableau.length-1){
            this.imageEnCours=-1;
        }
        setTimeout(() => {
            this.executeDiaporama()
            }, this.duree);  
    };
}

