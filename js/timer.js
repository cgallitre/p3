class Chrono {
    constructor(duree) {
        this.duree = duree; // duree est exprimée en minutes
        this.initialisation();
    };


    initialisation() {
        $('#messageConfirmation').html("Réservation en cours. Temps restant : " + this.duree + ":00");
        $('#confirmation').show();
        let min = this.duree - 1;
        let sec = 59;

        let timer = window.setInterval(function () {
            $('#messageConfirmation').html("Réservation en cours. Temps restant : " + min + ":" + sec);
            if (min === 0 && sec === 0) {
                clearInterval(timer);
            } else if (sec === 0) {
                min--;
                sec = 59;
            } else {               
                sec--;
            };

        }, 1000);

        $('#annuler').on('click', () => {
            clearInterval(timer);
        });
    };
}