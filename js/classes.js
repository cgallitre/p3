class Diaporama  {
    constructor(cible,tableau,rep, duree){
        this.Image=document.getElementById(cible)
        this.Tableau=tableau;
        this.Rep=rep;
        this.imageEnCours = -1;
        this.Duree=duree;
    }

    diap() { () => {
        this.imageEnCours++;
        console.log(this.imageEnCours);
        this.Image.src=this.Rep + this.Tableau[this.imageEnCours];
        if(this.imageEnCours==this.Tableau.lenght-1){
            this.imageEnCours=-1;
        }
        setTimeout(() => {
            this.diap()
        }, this.Duree);  
    };
    }
}

