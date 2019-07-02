class Map {
    constructor(cible, ville, latitude, longitude) {
        this.cible = cible;
        this.ville = ville;
        this.longitude = longitude;
        this.latitude = latitude;
        this.afficheCarte();
    };

    afficheCarte() {
        // fond de carte
        let map = L.map(this.cible).setView([this.latitude, this.longitude], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // chargement des stations
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + this.ville + "&apiKey=3a8b6dc2ac73396c5c2fb5135a07718936b00887", function (reponse) {
            let stations = JSON.parse(reponse);
            let couleurIcon;
            for (let station of stations) {
                // ajout des marqueurs    

                // Calcul de la couleur du marqueur
                if (station.status === "OPEN") {
                    // la station est ouverte
                    if (station.available_bikes > 0 && station.available_bikes < 5) {
                        // nb vélos dispo entre 0 et 5 exclus
                        couleurIcon = "img/yellow-dot.png";
                    } else if (station.available_bikes === 0) {
                        // aucun vélo dispo
                        couleurIcon = "img/red-dot.png";
                    } else {
                        // nb vélos dispo > 5
                        couleurIcon = "img/green-dot.png";
                    }
                } else {
                    // station fermée
                    couleurIcon = "img/red-dot.png"
                };

                // Définition de la couleur
                let icon = L.icon({
                    iconUrl: couleurIcon
                });

                // Affichage des marqueurs
                let marqueur = L.marker([station.position.lat, station.position.lng], {
                    icon: icon
                }).addTo(map);

                // Affichage des infos dans un popup
                marqueur.bindPopup(station.name);

                // Affichage du formulaire contextuel
                marqueur.on('click', function () {
                    // Affiche le formulaire de résa
                    $('#resa').show();
                    // Masque la signtaure
                    $('#sign').hide();
                    // Affiche le détail d'une station
                    $('#detailsStation').html(
                        station.name + " --> " + station.status + "<br>" +
                        station.address + "<br>" +
                        "<br>Capacité : " + station.bike_stands +
                        "<br>Vélos disponibles : " + station.available_bikes +
                        "<br>Emplacements libres : " + station.available_bike_stands
                    );
                    // On ajoute le formulaire de réservation en fonction des dispos de vélos
                    // On vérifie d'abord qu'une réservation n'est pas en cours
                    if (sessionStorage.getItem('allowResa') === null) {
                       if (station.status === "OPEN" && station.available_bikes > 0) {
                            $('#formResa').show();
                            // On affiche les infos déjà présentes
                            $('#nom').val(localStorage.getItem('nom'));
                            $('#prenom').val(localStorage.getItem('prenom'));
                            
                            // Clic sur réserver
                            $('#reserver').on('click', function (e) {
                                e.preventDefault(); // annuler l'envoi des données
                                $('#formResa').hide();
                                $('#sign').show();
                                // Enregistrement des données de la réservation
                                new Reservation (station.name, $('#nom').val(), $('#prenom').val(), false);
                                new Signature();      
                            });
                        } else {
                            $('#formResa').hide();
                        };
                    } else {
                        $('#detailsStation').html("Une réservation est en cours, veuillez l'annuler avant d'en faire une nouvelle");
                        $('#detailsStation').show();
                    };
                });
            };
        });
    };
};

class Reservation {
    constructor(station, nom, prenom, allowResa) {
        this.nom = nom;
        this.prenom = prenom;
        this.station = station;
        this.allowResa = allowResa;
        this.stockeInfos();
    };

    stockeInfos() {
        localStorage.setItem('prenom', this.prenom);
        localStorage.setItem('nom', this.nom);
        sessionStorage.setItem('station', this.station);
        sessionStorage.setItem('allowResa', this.allowResa);
    };

}