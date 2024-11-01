
// Initialiser le panier ou le récupérer depuis localStorage
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// Fonction pour ajouter un produit au panier
function ajouterAuPanier(nom, prix) {
    const produit = { nom, prix };
    panier.push(produit);
    localStorage.setItem("panier", JSON.stringify(panier));
    alert(nom + " a été ajouté au panier !");
}

// Fonction pour supprimer un produit du panier
function supprimerDuPanier(index) {
    panier.splice(index, 1);  // Supprime l'article à l'index donné
    localStorage.setItem("panier", JSON.stringify(panier)); // Mettre à jour localStorage
    afficherPanier(); // Rafraîchir l'affichage du panier
}

// Fonction pour afficher les articles dans la page du panier
function afficherPanier() {
    const panierElement = document.getElementById("contenu-panier");

    // Recharger le panier depuis localStorage à chaque appel
    panier = JSON.parse(localStorage.getItem("panier")) || [];

    if (panier.length === 0) {
        panierElement.innerHTML = "<p>Votre panier est vide.</p>";
    } else {
        panierElement.innerHTML = panier.map((produit, index) => `
            <div class="article-panier">
                <p>${produit.nom}</p>
                <p>${produit.prix}</p>
                <button onclick="supprimerDuPanier(${index})">Supprimer</button>
            </div>
        `).join("");

        const total = panier.reduce((acc, produit) => acc + parseFloat(produit.prix.replace('€', '')), 0);
        panierElement.innerHTML += `<h3>Total: ${total.toFixed(2)}€</h3>`;
    }
}

// Charger le panier sur la page panier uniquement
if (window.location.pathname.includes("panier.html")) {
    afficherPanier();
    window.addEventListener("storage", afficherPanier); // Mise à jour en temps réel
}
