function ajaxGet(url, callback) {
    // Création d'une requête HTTP
    var req = new XMLHttpRequest();
    // Configuration de la Requête HTTP GET asynchrone
    req.open("GET", url);
    // Gestion des erreurs de traitement sur le serveur
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Affiche la réponse reçue dans la fonction passée en paramètre
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });

    // Gestion des erreurs réseau (ex : serveur introuvable)
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });

    // Envoi de la requête
    req.send(null);
}