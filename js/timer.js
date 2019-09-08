class Chrono {
    constructor(min, sec) {
        this.min = min; 
        this.sec = sec;
        this.timer;
    };

    initialisation() {
        this.affichageResa();
        $('#annuler').show();
        this.timer = window.setInterval( () => {
            this.affichageResa();
            if (this.min <= 0 && this.sec === 0) {
                this.annulation();
            } else if (this.sec === 0) {
                this.min--;
                this.sec = 59;
            } else {
                this.sec--;
            };

            // Conservation des données du timer
            sessionStorage.setItem('timerMin', this.min);
            sessionStorage.setItem('timerSec', this.sec);
        }, 1000);
        $('#annuler').show();
        $('#annuler').on('click', () => this.annulation());
    };

    // Réservation échue ou clic sur annuler
    annulation() {
        clearInterval(this.timer);
        $('#sign').hide();
        $('#detailsStation').html('Veuillez sélectionner une station dans la carte.');
        $('#messageConfirmation').html('Aucune réservation en cours.');
        $('#annuler').hide();
        sessionStorage.clear();
    };

    // Affiche réservation
    affichageResa() {

        // condition ternaire pour afficher un 0 pour les secondes < 10
        const chiffreEnPlus = this.sec < 10 ? `0` : ``; 

        // Affichage
        $('#messageConfirmation').html(`
            Vélo réservé à la station 
            ${sessionStorage.getItem('station')} par 
            ${localStorage.getItem('prenom')} 
            ${localStorage.getItem('nom')}.<br>
            Temps restant : ${this.min}m${chiffreEnPlus}${this.sec}s.
        `);
    };
};