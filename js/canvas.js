class Signature {
    constructor() {
        this.initialisation();
    };

    initialisation() {
        // on récupère l'élément HTML Canvas
        var canvas = document.getElementById("signature");
        // Vérification du support par le navigateur
        if (canvas.getContext) {
            // Le navigateur est compatible : on récupère le contexte en 2D
            var ctx = canvas.getContext('2d');
        } else {
            // Navigateur ne supporte pas le canvas
            $('confirmation').html("Votre navigateur est trop ancien pour réaliser une réservation.")
        };
    };
};
