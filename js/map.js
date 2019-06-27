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
                for (let station of stations) {
                        // ajout des marqueurs         
                        // Définition de la couleur du marqueur
                        let marqueur = L.marker([station.position.lat, station.position.lng]).addTo(map);

                        // Affichage des infos dans un popup
                        marqueur.bindPopup(
                            "<p>" + station.name +
                            "<br>" + station.address +
                            "<br>Capacité : " + station.bike_stands +
                            "<br>Vélos disponibles : " + station.available_bikes +
                            "<br>Emplacements libres : " + station.available_bike_stands +
                            "</p>"
                        );
                    };
                });
        };
    };