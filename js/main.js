function initialisation() {

    // Lancement du diaporama
    let tabDiapo = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
    let monDiapo = new Diaporama('diapo', tabDiapo, 'img/', 5000);
    monDiapo.executeDiaporama(); // Lance le diaporama
    monDiapo.executeSouris(); // active la gestion de la souris
    monDiapo.executeClavier(); // active la gestion du clavier

    // Initialisation de la carte
    let maCarte = new Map("mapid", "Nantes", 47.218371, -1.553621);
    maCarte.afficher(); // affiche la carte principale avec les marqueurs

    // Vérification de l'existence d'une réservation
    if (sessionStorage.getItem('allowResa')) {
        // Réservation existante : on lance le chrono en récupérant les valeurs temps
        let monChrono = new Chrono(sessionStorage.getItem('timerMin'), sessionStorage.getItem('timerSec'));
        // Lance le chrono
        monChrono.initialisation(); 
        $('#detailsStation').html("Une réservation est en cours, veuillez l'annuler avant d'en faire une nouvelle.");
    };
};

// Lance la fonction principale
window.addEventListener("load", initialisation, false);