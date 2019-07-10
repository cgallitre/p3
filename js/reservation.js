class Reservation {
    constructor(station, nom, prenom, allowResa) {
        this.nom = nom;
        this.prenom = prenom;
        this.station = station;
        this.allowResa = allowResa;
    };

    stockeInfos() {
        localStorage.setItem('prenom', this.prenom);
        localStorage.setItem('nom', this.nom);
        sessionStorage.setItem('station', this.station);
    };

    confirmer(){
        sessionStorage.setItem('allowResa', this.allowResa);
    };
};