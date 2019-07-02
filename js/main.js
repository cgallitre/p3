function demarreDiapo(){
    let tabDiapo = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
    let diaporama = new Diaporama('diapo',tabDiapo,'img/',5000);
    diaporama.executeDiaporama(); // Lance le diaporama
    diaporama.executeSouris(); // active la gestion de la souris
    diaporama.executeClavier(); // active la gestion du clavier

}

function initialisation(){
    // Lancement du diaporama
    demarreDiapo();
    // Initialisation de la carte
    let maCarte = new Map("mapid", "Nantes", 47.218371, -1.553621);
    // Vérification de l'existence d'une réservation
    if (sessionStorage.getItem('timerMin')) {
        $('#messageConfirmation').html(
            "Réservation en cours. Temps restant : " +
            sessionStorage.getItem('timerMin') + ":" +
            sessionStorage.getItem('timerSec')
        );
        new Chrono(sessionStorage.getItem('timerMin'), sessionStorage.getItem('timerSec'));
    };
}

window.addEventListener("load", initialisation, false);
// window.onbeforeunload(Chrono.annulation);
