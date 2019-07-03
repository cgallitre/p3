class details {
    constructor(nom, status, adresse, capacite, dispo, libre) {
        this.nom = nom;
        this.status = status;
        this.adresse = adresse;
        this.capacite = capacite;
        this.dispo = dispo;
        this.libre = libre;
    };

    initialisation() {
        // Affiche le détail d'une station
        $('#detailsStation').html(`
                ${this.nom} --> ${this.status}<br>
                ${this.adresse}<br><br>
                Capacité : ${this.capacite}<br>
                Vélos disponibles : ${this.dispo}<br>
                Emplacements libres : ${this.libre}
           `);
        // On affiche le formulaire de réservation
        this.afficherResa();
    };

    afficherResa() {
        if (this.status === "OPEN" && this.dispo > 0) {
            $('#formResa').show();
            // On affiche les infos déjà présentes
            $('#nom').val(localStorage.getItem('nom'));
            $('#prenom').val(localStorage.getItem('prenom'));

            // Clic sur réserver
            $('#reserver').on('click', (e) => {
                e.preventDefault(); // annuler l'envoi des données
                $('#formResa').hide();
                $('#sign').show();
                // Enregistrement des données de la réservation
                let mesInfos = new Stockage(this.nom, $('#nom').val(), $('#prenom').val(), false);
                mesInfos.stockeInfos();
                // Lancement du canvas
                new Signature();
            });
        } else {
            $('#formResa').hide();
        };
    };
};