const boutons = {
  pierre: document.getElementById("pierre"),
  feuille: document.getElementById("feuille"),
  ciseaux: document.getElementById("ciseaux"),
};

const resultat = document.getElementById("resultat");
const score = document.getElementById("score");
const choixPossible = ["pierre", "feuille", "ciseaux"];

let scoreHumain = 0;
let scoreOrdinateur = 0;
let manche = 1;

function jouer(choixUtilisateur) {
  const choixOrdinateur = choixPossible[Math.floor(Math.random() * 3)];
  let resultat = "";

  if (choixUtilisateur === choixOrdinateur) {
    resultat = "egalite";
  } else if (
    (choixUtilisateur === "pierre" && choixOrdinateur === "ciseaux") ||
    (choixUtilisateur === "ciseaux" && choixOrdinateur === "feuille") ||
    (choixUtilisateur === "feuille" && choixOrdinateur === "pierre")
  ) {
    resultat = "gagner";
    scoreHumain++;
  } else {
    resultat = "perdue";
    scoreOrdinateur++;
  }
  manche++;

  if (manche > 5) {
    afficherTotal();
  }

  afficherResultat(choixUtilisateur, choixOrdinateur, resultat);
}

function afficherResultat(jouer, ordi, res) {
  resultat.innerHTML = `
     <p> joueur a choisir : <strong> ${jouer} </strong> </p>
     <p> L'ordinateur a choisir : <strong> ${ordi} </strong> </p>
      <p>  <strong> ${res} </strong> </p>   
    `;
}

function afficherTotal() {
  let messager = "";
  if (scoreHumain > scoreOrdinateur) {
    messager = "vous avez gagner";
  } else if (scoreHumain < scoreOrdinateur) {
    messager = "ordinateur a gagner";
  } else {
    messager = "Egalite";
  }
  score.innerHTML = `
    <p> Le score final : </p>
    <p> Joueur :  <strong> ${scoreHumain} </strong> | ordinateur : <strong> ${scoreOrdinateur} </strong> </p>
    <p>  <strong> ${messager} </strong>  </p>
  `;

  document.getElementById("pierre").disabled = true;
  document.getElementById("feuille").disabled = true;
  document.getElementById("ciseaux").disabled = true;
}

boutons.pierre.addEventListener("click", () => jouer("pierre"));
boutons.feuille.addEventListener("click", () => jouer("feuille"));
boutons.ciseaux.addEventListener("click", () => jouer("ciseaux"));

const rejouer = document.getElementById("rejouer");
rejouer.addEventListener("click", () => {
  location.reload();
});
