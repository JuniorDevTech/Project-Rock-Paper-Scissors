const boutons = {
  pierre: document.getElementById("pierre"),
  feuille: document.getElementById("feuille"),
  ciseaux: document.getElementById("ciseaux"),
};

const resultat = document.getElementById("resultat");
const score = document.getElementById("score");
const rejouer = document.getElementById("rejouer");

const choixPossible = ["pierre", "feuille", "ciseaux"];

const emojis = {
  pierre: "🪨",
  feuille: "📄",
  ciseaux: "✂️",
};

let scoreHumain = 0;
let scoreOrdinateur = 0;
let manche = 0;

// On cache le bouton rejouer au départ
rejouer.style.display = "none";

function jouer(choixUtilisateur) {
  if (manche >= 5) return;

  manche++;

  const choixOrdinateur =
    choixPossible[Math.floor(Math.random() * choixPossible.length)];

  let resultatManche = "";

  if (choixUtilisateur === choixOrdinateur) {
    resultatManche = "🤝 Égalité";
  } else if (
    (choixUtilisateur === "pierre" && choixOrdinateur === "ciseaux") ||
    (choixUtilisateur === "ciseaux" && choixOrdinateur === "feuille") ||
    (choixUtilisateur === "feuille" && choixOrdinateur === "pierre")
  ) {
    resultatManche = "✅ Vous gagnez cette manche";
    scoreHumain++;
  } else {
    resultatManche = "❌ L'ordinateur gagne cette manche";
    scoreOrdinateur++;
  }

  afficherResultat(choixUtilisateur, choixOrdinateur, resultatManche);

  if (manche === 5) {
    afficherTotal();
  }
}

function afficherResultat(joueur, ordinateur, resultatManche) {
  resultat.innerHTML = `
    <h3>Manche ${manche}/5</h3>

    <p>
      👤 Joueur :
      <strong>${emojis[joueur]} ${joueur}</strong>
    </p>

    <p>
      💻 Ordinateur :
      <strong>${emojis[ordinateur]} ${ordinateur}</strong>
    </p>

    <p>
      <strong>${resultatManche}</strong>
    </p>
  `;

  score.innerHTML = `
    <p>
      Score : 
      <strong>${scoreHumain}</strong>
      -
      <strong>${scoreOrdinateur}</strong>
    </p>
  `;
}

function afficherTotal() {
  let messageFinal = "";

  if (scoreHumain > scoreOrdinateur) {
    messageFinal = "🏆 Félicitations ! Vous avez remporté la partie.";
  } else if (scoreHumain < scoreOrdinateur) {
    messageFinal = "😢 L'ordinateur a remporté la partie.";
  } else {
    messageFinal = "🤝 Match nul !";
  }

  score.innerHTML += `
    <hr>
    <h2>Fin de la partie</h2>

    <p>
      Joueur : <strong>${scoreHumain}</strong> |
      Ordinateur : <strong>${scoreOrdinateur}</strong>
    </p>

    <p><strong>${messageFinal}</strong></p>
  `;

  boutons.pierre.disabled = true;
  boutons.feuille.disabled = true;
  boutons.ciseaux.disabled = true;

  rejouer.style.display = "inline-block";
}

function recommencerPartie() {
  scoreHumain = 0;
  scoreOrdinateur = 0;
  manche = 0;

  resultat.innerHTML =
    "<p>Choisissez Pierre, Feuille ou Ciseaux pour commencer.</p>";

  score.innerHTML = "<p>Score : <strong>0</strong> - <strong>0</strong></p>";

  boutons.pierre.disabled = false;
  boutons.feuille.disabled = false;
  boutons.ciseaux.disabled = false;

  rejouer.style.display = "none";
}

boutons.pierre.addEventListener("click", () => jouer("pierre"));
boutons.feuille.addEventListener("click", () => jouer("feuille"));
boutons.ciseaux.addEventListener("click", () => jouer("ciseaux"));

rejouer.addEventListener("click", recommencerPartie);

// État initial
resultat.innerHTML =
  "<p>Choisissez Pierre, Feuille ou Ciseaux pour commencer.</p>";

score.innerHTML = "<p>Score : <strong>0</strong> - <strong>0</strong></p>";
