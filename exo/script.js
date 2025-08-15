const butons = {
  pierre: document.getElementById("pierre"),
  papier: document.getElementById("papier"),
  ciseaux: document.getElementById("ciseaux"),
};

const resultat = document.getElementById("resultat");
const score = document.getElementById("score");
const choixPossible = ["pierre", "papier", "ciseaux"];

let scoreUtilisateur = 0;
let scoreOrdinateur = 0;
let manche = 1;

function jouer(choixUtilisateur) {
  const choixOrdinateur = choixPossible[Math.floor(Math.random() * 3)];
  let resultat = "";

  if (choixUtilisateur === choixOrdinateur) {
    resultat = "Egalite";
  } else if (
    (choixUtilisateur === "pierre" && choixOrdinateur === "ciseaux") ||
    (choixUtilisateur === "ciseaux" && choixOrdinateur === "papier") ||
    (choixUtilisateur === "papier" && choixOrdinateur === "pierre")
  ) {
    resultat = "Gagner";
    scoreUtilisateur++;
  } else {
    resultat = "Perdu";
    scoreOrdinateur++;
  }
  manche++;

  if (manche > 5) {
    scoreTotal();
  }

  afficheResultat(choixUtilisateur, choixOrdinateur, resultat);
}

function afficheResultat(jouer, ordinateur, res) {
  resultat.innerHTML = `
     <p>Jouer a choisir : <strong> ${jouer} </strong></p>
     <p>L'ordinateur a choisir : <strong> ${ordinateur} </strong></p>
     <p> <strong> ${res} </strong> </p>
    `;
}

function scoreTotal() {
  let messager = "";
  if (scoreUtilisateur > scoreOrdinateur) {
    messager = "Vous-avez : gagner";
  } else if (scoreUtilisateur < scoreOrdinateur) {
    messager = "Ordinateur : gagner";
  } else {
    messager = "Egalite";
  }
  score.innerHTML = `
  <p> Score final : </p>
  <p>joueur : <strong> ${scoreUtilisateur} </strong>  | L'ordinateur : <strong> ${scoreOrdinateur} </strong>  </p>
  <p> <strong> ${messager} </strong>  </p>
  `;

  butons.pierre.disabled = true;
  butons.papier.disabled = true;
  butons.ciseaux.disabled = true;
}

butons.pierre.addEventListener("click", () => jouer("pierre"));
butons.papier.addEventListener("click", () => jouer("papier"));
butons.ciseaux.addEventListener("click", () => jouer("ciseaux"));

const rejouer = document.getElementById("Rejouer");

rejouer.addEventListener("click", () => {
  location.reload();
});
