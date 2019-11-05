/**
 * Gère le comportement de la fenêtre modale pour les réservations dans index.html.
 */

// Déclaration des selectors
function init() {
    // tarif
    tarifSelect = document.querySelectorAll("select[name='tarif']");
    // seance
    seanceSelect = document.querySelectorAll("select[name='seance']");
    // nombre de places à réserver
    quantiteSelect = document.querySelectorAll("input[name='quantite']");
    // prix Unitaire et prix Total
    prixUnit = document.querySelectorAll('.prixUnit');
    prixTotal = document.querySelectorAll('.prixTotal');
    // Table de la fenetre modale de reservations
    tableResBody = document.querySelector('#tableReservBody');
    // Une ligne de réservations de la table
    rowRes = document.querySelector('.rowReserv');
    // total
    grandTotal = document.querySelector('#grandTotal');
}

// Création d'un tableau des tarifs
let arrayTarifs = {
    "enfant": {
        'semaineJournee': 5,
        'semaineSoiree': 6,
        'weekend': 6
    }, "normal": {
        'semaineJournee': 10,
        'semaineSoiree': 12,
        'weekend': 12.5
    }
}

// Function qui met à jour les prix unitaires, totaux et le grand total.
function updatePrix() {
    let total = 0;
    for (let i=0; i<tarifSelect.length; i++) {
        prixUnit[i].textContent = arrayTarifs[tarifSelect[i].value][seanceSelect[i].value] + "€";
        total += arrayTarifs[tarifSelect[i].value][seanceSelect[i].value] * quantiteSelect[i].value;
        prixTotal[i].textContent = arrayTarifs[tarifSelect[i].value][seanceSelect[i].value] * quantiteSelect[i].value + "€";
    }
    grandTotal.textContent = total;
}

// Initialisation
init();
updatePrix();

// -----------------------------------------------------------------------------------
// Fonctionnalités des autres boutons de la fenetre modale
// Enlève toutes les lignes supplémentaires de réservation.
function removeReserv() {
    // On parcours chaque ligne, et on supprime toutes les lignes qui ne sont pas à l'index 0.
    let lignes = document.querySelectorAll('.rowReserv');
    for (let i=1; i<tarifSelect.length; i++) {
        lignes[i].remove();
    }
    init();
    updatePrix();
}
function popupFlippant() {
    document.querySelector('#montant').textContent = grandTotal.textContent;
    $('.toast').toast('show');
}

function addLine() {
    let foo = rowRes.cloneNode(true);
    foo.querySelector("input[name='quantite']").value = 0;
    tableResBody.appendChild(foo);
    init();
    updatePrix();
}

// Bouton Payer
let btnPay = document.querySelector('#btnPayer');
btnPay.onclick = popupFlippant;

// Bouton Effacer
let btnEffacer = document.querySelector('#btnEffacer');
btnEffacer.onclick = removeReserv;

// Bouton Nouvelle Réservation
let btnNew = document.querySelector('#btnNew');
btnNew.onclick = addLine;