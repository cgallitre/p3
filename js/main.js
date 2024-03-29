// Variables globales : temps par défaut d'une réservation
const minGlobal = 20; // minutes
const secGlobal = 0; // secondes

// Durée diaporama en millisecondes
const dureeDiapo = 5000;

// Création de la réservation
const maResa = new Reservation();
const maSignature = new Signature();

// Appel de la fonction principale
window.addEventListener("load", initialisation, false);

function initialisation() {
    // Lancement du diaporama
    const tabDiapo = [
        ['nantes.jpg','1- Cliquez sur la station qui vous intéresse puis...'],
        ['soir.jpg','2- Saisissez votre nom et...'],
        ['elephant.jpg','3- Signez, c\'est réservé !']
    ];

    const monDiapo = new Diaporama('diapo', 'legende', tabDiapo, 'img/', dureeDiapo);

    // démarre le diaporama
    monDiapo.initDiaporama();

    // Initialisation de la carte
    const maCarte = new Map("mapid", "Nantes", 47.218371, -1.553621);
    
    // affiche la carte principale avec les marqueurs
    maCarte.afficher();

    // Vérification de l'existence d'une réservation
    if (sessionStorage.getItem('allowResa') === 'false') {

        // Réservation existante : on créé le chrono en récupérant les valeurs temps
        let monChrono = new Chrono(sessionStorage.getItem('timerMin'), sessionStorage.getItem('timerSec'));

        // Lance le chrono
        monChrono.initialisation();
        $('#detailsStation').html("Une réservation est en cours, veuillez l'annuler avant d'en faire une nouvelle.");
    };
};