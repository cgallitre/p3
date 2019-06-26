/* var map = L.map('mapid').setView([47.218371, -1.553621], 13);
// var marker = L.marker([47.218371, -1.553621]).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); */

class Map {
    constructor(cible, ville, latitude, longitude){
        this.cible=cible;
        this.ville=ville;
        this.longitude=longitude;
        this.latitude=latitude;
        this.afficheCarte();
    };

    afficheCarte(){
        // fond de carte
        let map = L.map(this.cible).setView([this.latitude, this.longitude], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // chargement des stations
        let that = this;
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=" + this.ville + "&apiKey=3a8b6dc2ac73396c5c2fb5135a07718936b00887", function (reponse) {
            let stations = JSON.parse(reponse);
            for (let station of stations) {
                // ajout des marqueurs         
                ajaxGet("https://api.jcdecaux.com/vls/v3/stations/" + station.number + "?contract="+that.ville+"&apiKey=3a8b6dc2ac73396c5c2fb5135a07718936b00887", function (rep) {
                    let infos = JSON.parse(rep);
                    let marqueur = L.marker([infos.position.latitude, infos.position.longitude]).addTo(map);
                    marqueur.bindPopup(
                    "<p>" + station.name +
                    "<br>Capacité : " + infos.totalStands.capacity + 
                    "<br>Vélos disponibles : " + infos.totalStands.availabilities.bikes +
                    "<br>Emplacements libres : " + infos.totalStands.availabilities.stands +
                    "</p>"
                    );
                });
            };
        });
    };
};