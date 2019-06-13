$(document).ready(function(){

    // Variables
    let diapos = [ // liste des images du diaporama
        "<img src='img/photo1.jpg'>",
        "<img src='img/photo2.jpg'>",
        "<img src='img/photo3.jpg'>"
    ];

    let diapoEnCours = -1; // image affichée à l'instant t. On commence à 0. Incrément de 1 en début de boucle
    let nbDiapos = diapos.length-1; // index de la dernière image
    let boucle; // identifiant de la boucle principale

    // Gestion des touches pour contrôler le diaporama manuellement
    function controlManuel(){
        $(document).keyup(function(e){ // action au relâchement d'une touche
            switch (e.keyCode) {
                case 37: // Flèche gauche
                    diapoEnCours--;
                    if (diapoEnCours < 0) { diapoEnCours = 0}; // on bloque à la première diapo
                    break;
                case 39: // Flèche droite
                    diapoEnCours++;
                    if (diapoEnCours > nbDiapos) { diapoEnCours = nbDiapos }; // on bloque à la dernière
                    break;
            };
            $('#diaporama').html(diapos[diapoEnCours]); // Affichage de l'image
        });
    };
    
    // fonction principale qui change les diapos en boucle
    function changeImage(){
        diapoEnCours++;
        if (diapoEnCours > nbDiapos) { diapoEnCours = 0 };
        $('#diaporama').html(diapos[diapoEnCours]); 
        boucle = setTimeout(changeImage, 2000); // change les images toutes les 2s
    };

    // Premier lancement
    changeImage();

    // Gestion de la souris pour arrêter / relancer le diaporama
    $('#diaporama').hover(
        function() { 
            clearTimeout(boucle); // arrête le chargement des images
            controlManuel(); // lance le gestionnaire d'événement sur les touches
            $('#pause').fadeIn(500); // Affiche les contrôles
        },
        function() { 
            $(document).off('keyup'); // Supprime le gestionnaire d'événement sur les touches
            changeImage(); // relance le diaporama
            $('#pause').fadeOut(500); // supprime l'affichage des contrôles
         }
    );
});