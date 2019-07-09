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
        // masque la vérif saisir éventuelle
        $('#verifSaisie').hide();
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
                this.verifSaisie(e);
            });

        } else {
            $('#formResa').hide();
        };
    };

    verifSaisie(e) {
        if ($('#nom').val() === '' || $('#prenom').val() === '') {
            $('#verifSaisie').html('Merci de renseigner complètement le formulaire avant de réserver.');
            $('#verifSaisie').show();
        } else {
            $('#verifSaisie').hide();
            $('#formResa').hide();
            $('#sign').show();
            // Enregistrement des données de la réservation
            maResa.station = this.nom;
            maResa.prenom = $('#prenom').val();
            maResa.nom = $('#nom').val();
            maResa.stockeInfos();
            // Lancement du canvas
            new Signature();
        };
    };
};