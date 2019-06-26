function demarreDiapo(){
    let tabDiapo = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
    let diaporama = new Diaporama('diapo',tabDiapo,'img/',5000);
    diaporama.executeDiaporama(); // Lance le diaporama
    diaporama.executeSouris(); // active la gestion de la souris
    diaporama.executeClavier(); // active la gestion du clavier

}

function initialisation(){
    demarreDiapo();
    let maCarte = new Map("mapid", "Nantes", 47.218371, -1.553621);
}
window.addEventListener("load", initialisation, false);
