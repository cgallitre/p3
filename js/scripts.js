// Diaporama
let diapos = [
    "<div id='photo1'>Photo 1<br><img src='img/photo1.jpg'></div>",
    "<div id='photo2'>Photo 2<br><img src='img/photo2.jpg'></div>",
    "<div id='photo3'>Photo 3<br><img src='img/photo3.jpg'></div>"
];

let diapoEnCours = 0;
let nbDiapos = diapos.length-1;
let arret = false;

// Boucle principale : le diaporama fonctionne
window.addEventListener("load", function(){
    changeImage();
}, false);

// Gestion du clic souris pour arrêter / relancer le diaporama
document.getElementById("diaporama").addEventListener("click", function(){
    if (arret===false){
        console.log("arrêt diaporama");
        arret = true;
    } else {
        console.log("reprise diaporama");
        arret = false;
        // on relance
        changeImage();
        }
    }
);

// Gestion des touches pour contrôler le diaporama
document.addEventListener("keydown",function(e){
    switch (e.keyCode) {
        case 37: // Flèche gauche
            diapoEnCours = diapoEnCours-1;
            changeImage();
            break;
        case 39: // Flèche droite
            diapoEnCours++;
            changeImage();
            break;
        case 27: // Echap
    }
})

// fonction principale qui change les diapos en boucle sauf si un clic souris a été détecté (arret === false)
function changeImage(){
    if (diapoEnCours > nbDiapos){
        diapoEnCours = 0;
    };

    if (arret===false){
        document.getElementById("diaporama").innerHTML=diapos[diapoEnCours];
        diapoEnCours ++;
        setTimeout(changeImage, 2000);
    };
};
