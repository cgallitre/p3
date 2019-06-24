function demarreDiapo(){
    let tabDiapo = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
    let diaporama = new Diaporama('diapo',tabDiapo,'img/',500);
    diaporama.executeDiaporama();
    diaporama.executeManuel();

}

window.addEventListener("load", demarreDiapo, false);
