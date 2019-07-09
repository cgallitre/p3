class Map {
    constructor(cible, ville, latitude, longitude) {
        // Paramètres de la carte en entrée
        this.cible = cible;
        this.ville = ville;
        this.longitude = longitude;
        this.latitude = latitude;
        // Définition de la carte
        this.map = L.map(cible).setView([latitude, longitude], 13);
        // Marqueurs
        this.marqueur;
        this.couleurIcon;
        this.icon;
        // station
        this.mesDetails;
    };

    afficher() {
        // fond de carte 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // Ajoute les stations
        this.listingStations();
    };

    // chargement des stations
    listingStations() {
        ajaxGet(`https://api.jcdecaux.com/vls/v1/stations?contract=${this.ville}&apiKey=3a8b6dc2ac73396c5c2fb5135a07718936b00887`, (reponse) => {
            let stations = JSON.parse(reponse);
            for (const station of stations) {
                // Détermine la couleur du marqueur
                this.couleurMarqueurs(station);
                // Affichage des marqueurs
                this.marqueur = L.marker([station.position.lat, station.position.lng], {
                    icon: this.icon
                }).addTo(this.map);
                // Affichage des infos dans un popup
                this.marqueur.bindPopup(station.name);
                // Affichage du formulaire contextuel
                this.marqueur.on('click', () => this.detailsStation(station));
            };
        });
    };

    couleurMarqueurs(station) {
        // Calcul de la couleur du marqueur
        if (station.status === "CLOSED" || station.available_bikes === 0) {
            this.couleurIcon = "img/red-dot.png";
        } else if (station.available_bikes < 5) {
            this.couleurIcon = "img/yellow-dot.png";
        } else {
            this.couleurIcon = "img/green-dot.png";
        };

        // Définition de la couleur
        this.icon = L.icon({
            iconUrl: this.couleurIcon
        });
    };

    detailsStation(station) {
        if (!(sessionStorage.getItem('allowResa'))) {
            this.mesDetails = new details(
                station.name,
                station.status,
                station.address,
                station.bike_stands,
                station.available_bikes,
                station.available_bike_stands
            );
            this.mesDetails.initialisation();
            // Cache la signature éventuellement
            $('#sign').hide();
        };
    };
};