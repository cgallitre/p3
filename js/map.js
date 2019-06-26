/* var map = L.map('mapid').setView([47.218371, -1.553621], 13);
// var marker = L.marker([47.218371, -1.553621]).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); */

class Map {
    constructor(cible, latitude, longitude){
        this.cible=cible;
        this.longitude=longitude;
        this.latitude=latitude;
        this.afficheCarte();
    }

    afficheCarte(){
        let map = L.map(this.cible).setView([this.latitude, this.longitude], 13)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: ' <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }

    chargeStations(){
        
    }
}