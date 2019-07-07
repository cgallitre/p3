// Variables globales : temps par défaut d'une réservation
const minGlobal = 1; // minutes
const secGlobal = 5; // secondes

// Création de la réservation
const maResa = new Reservation();

// Appel de la fonction principale
window.addEventListener("load", initialisation, false);

function initialisation() {
    // Lancement du diaporama
    const tabDiapo = [
        ['nantes.png','1- Cliquez sur la station qui vous intéresse puis...'],
        ['soir.png','2- Saisissez votre nom et...'],
        ['elephant.png','3- Signez, c\'est réservé !']
    ];

    const monDiapo = new Diaporama('diapo', 'legende', tabDiapo, 'img/', 5000);
    monDiapo.executeDiaporama(); // Lance le diaporama
    monDiapo.executeSouris(); // active la gestion de la souris
    monDiapo.executeClavier(); // active la gestion du clavier

    // Initialisation de la carte
    const maCarte = new Map("mapid", "Nantes", 47.218371, -1.553621);
    maCarte.afficher(); // affiche la carte principale avec les marqueurs

    // Vérification de l'existence d'une réservation
    if (sessionStorage.getItem('allowResa') === 'false') {
        // Réservation existante : on lance le chrono en récupérant les valeurs temps
        let monChrono = new Chrono(sessionStorage.getItem('timerMin'), sessionStorage.getItem('timerSec'));
        // Lance le chrono
        monChrono.initialisation();
        $('#detailsStation').html("Une réservation est en cours, veuillez l'annuler avant d'en faire une nouvelle.");
    };
};