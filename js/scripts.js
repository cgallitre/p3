$(document).ready(function(){

    // Diaporama
    let diapos = [
        "<img src='img/photo1.jpg'>",
        "<img src='img/photo2.jpg'>",
        "<img src='img/photo3.jpg'>"
    ];

    let diapoEnCours = 0;
    let nbDiapos = diapos.length-1;
    let arret = false;

    // Gestion de la souris pour arrêter / relancer le diaporama
    $('#diaporama').hover(
        function() { 
            arret = true;
            $('#pause').fadeIn(500);
        },
        function() { 
            arret = false; 
            $('#pause').fadeOut(500);
            changeImage();
         }
    );

    // Gestion des touches pour contrôler le diaporama
    document.addEventListener("keydown",function(e){
        switch (e.keyCode) {
            case 37: // Flèche gauche
                diapoEnCours--;
                document.getElementById("diaporama").innerHTML = diapos[diapoEnCours];
                break;
            case 39: // Flèche droite
                diapoEnCours++;
                document.getElementById("diaporama").innerHTML = diapos[diapoEnCours];
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
            diapoEnCours++;
            setTimeout(changeImage, 2000);
        };
    };

    // Premier lancement
    changeImage();
});